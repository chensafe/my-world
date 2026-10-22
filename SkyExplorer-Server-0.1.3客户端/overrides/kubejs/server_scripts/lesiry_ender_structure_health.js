// Cataclysm structure/altar spawning can bypass NeoForge FinalizeSpawnEvent.
// Retain the existing filename so the old two-entity fix is replaced, not stacked.
// Read Mob Spawn Controller's live rules; never hard-code the user's health settings.
var seCataclysmHealthManager = Java.loadClass('com.mobspawncontroller.command.MobSpawnManager')
var seCataclysmHealthLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
var seCataclysmHealthAttributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')
var seCataclysmHealthKey = seCataclysmHealthLocation.parse('minecraft:generic.max_health')

function seApplyCataclysmHealth(entity) {
    if (entity == null || String(entity.type).indexOf('cataclysm:') !== 0 || !entity.isAlive()) return
    try {
        var rule = seCataclysmHealthManager.getAttributeOverride(seCataclysmHealthLocation.parse(String(entity.type)), seCataclysmHealthKey)
        if (rule == null) return
        var attribute = entity.getAttribute(seCataclysmHealthAttributes.MAX_HEALTH)
        if (attribute == null) return
        var desired = seCataclysmHealthAttributes.MAX_HEALTH.value().sanitizeValue(Number(rule))
        if (Math.abs(attribute.getBaseValue() - desired) < 0.001) return
        var oldMax = entity.getMaxHealth()
        var oldHealth = entity.getHealth()
        // Keep all existing attribute modifiers and preserve the fraction of health remaining.
        attribute.setBaseValue(desired)
        var ratio = oldMax > 0 ? Math.max(0, Math.min(1, oldHealth / oldMax)) : 1
        entity.setHealth(entity.getMaxHealth() * ratio)
    } catch (error) {
        console.error('[Cataclysm configured health] ' + entity.type + ': ' + error)
    }
}

NativeEvents.onEvent('net.neoforged.neoforge.event.entity.EntityJoinLevelEvent', function (event) {
    if (!event.getLevel().isClientSide()) seApplyCataclysmHealth(event.getEntity())
})

// One pass on startup/script reload. Unloaded chunks are repaired when their entities join.
// No per-tick scans, forced chunk loads, or restoration of health on repeated joins.
ServerEvents.loaded(function (event) {
    event.getServer().scheduleInTicks(1, function () {
        var levels = event.getServer().getAllLevels().iterator()
        while (levels.hasNext()) {
            var entities = levels.next().getAllEntities().iterator()
            while (entities.hasNext()) seApplyCataclysmHealth(entities.next())
        }
    })
})
