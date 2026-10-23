// Global configured-health fallback. Retain the old filename to replace the Cataclysm-only fix.
var seAllHealthManager = Java.loadClass('com.mobspawncontroller.command.MobSpawnManager')
var seAllHealthLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
var seAllHealthAttributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')
var seAllHealthLiving = Java.loadClass('net.minecraft.world.entity.LivingEntity')
var seAllHealthKey = seAllHealthLocation.parse('minecraft:generic.max_health')
var seAllHealthWinefox = seAllHealthLocation.parse('kubejs:engineer_winefox_health_growth')
var seAllHealthSnapshot = {}

function seAllApplyHealth(entity, ratioHint) {
    if (!(entity instanceof seAllHealthLiving) || entity.level.isClientSide() || !entity.isAlive()) return
    try {
        var rule = seAllHealthManager.getAttributeOverride(seAllHealthLocation.parse(String(entity.type)), seAllHealthKey)
        if (rule == null) return
        var attribute = entity.getAttribute(seAllHealthAttributes.MAX_HEALTH)
        if (attribute == null || attribute.getModifier(seAllHealthWinefox) != null) return
        var desired = seAllHealthAttributes.MAX_HEALTH.value().sanitizeValue(Number(rule))
        var controls = []
        entity.getTags().forEach(function (tag) { if (String(tag).indexOf('ctrlHealth') === 0) controls.push(String(tag)) })
        var oldMax = entity.getMaxHealth()
        var oldHealth = entity.getHealth()
        var ratio = ratioHint != null ? Number(ratioHint) : (oldMax > 0 ? Math.max(0, Math.min(1, oldHealth / oldMax)) : 1)
        if (controls.length === 0 && Math.abs(attribute.getBaseValue() - desired) < 0.001) {
            if (ratioHint != null) entity.setHealth(entity.getMaxHealth() * ratio)
            return
        }
        attribute.setBaseValue(desired)
        if (controls.length > 0) {
            controls.forEach(function (tag) { entity.removeTag(tag) })
            var handlers = Java.loadClass('mcjty.incontrol.ForgeEventHandlers')
            var join = Java.loadClass('net.neoforged.neoforge.event.entity.EntityJoinLevelEvent')
            new handlers().onEntityJoinWorld(new join(entity, entity.level, false))
        }
        entity.setHealth(entity.getMaxHealth() * ratio)
    } catch (error) {
        console.error('[SkyExplorer configured health] ' + entity.type + ': ' + error)
    }
}

NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.entity.EntityJoinLevelEvent', function (event) {
    if (event.getLevel().isClientSide()) return
    var entity = event.getEntity()
    var ratio = global.skyExplorerHealthJoinRatios == null ? null : global.skyExplorerHealthJoinRatios.remove(entity)
    seAllApplyHealth(entity, ratio)
})

function seAllHealthReadRules() {
    var result = {}
    seAllHealthManager.getAttributeOverrideMobs().forEach(function (id) {
        var value = seAllHealthManager.getAttributeOverride(id, seAllHealthKey)
        if (value != null) result[String(id)] = Number(value)
    })
    return result
}

function seAllHealthRefresh(server, changed) {
    var levels = server.getAllLevels().iterator()
    while (levels.hasNext()) {
        var entities = levels.next().getAllEntities().iterator()
        while (entities.hasNext()) {
            var entity = entities.next()
            if (changed == null || changed[String(entity.type)]) seAllApplyHealth(entity, null)
        }
    }
}

ServerEvents.loaded(function (event) {
    event.getServer().scheduleInTicks(1, function () {
        seAllHealthSnapshot = seAllHealthReadRules()
        seAllHealthRefresh(event.getServer(), null)
    })
})

// Check only the small settings map every five seconds. Scan loaded entities only
// after an actual admin edit; never force-load saved chunks or scan the world each tick.
ServerEvents.tick(function (event) {
    if (event.getServer().getTickCount() % 100 !== 0) return
    var next = seAllHealthReadRules()
    var changed = {}
    var dirty = false
    Object.keys(next).forEach(function (id) {
        if (seAllHealthSnapshot[id] !== next[id]) { changed[id] = true; dirty = true }
    })
    seAllHealthSnapshot = next
    if (dirty) seAllHealthRefresh(event.getServer(), changed)
})
