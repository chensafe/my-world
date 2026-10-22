// Structure markers/altars do not always pass through attribute-mod spawn events.
// Correct these two entity types on join, including old saved entities, without healing wounds.
var seEnderStructureHealth = {
    'cataclysm:ender_guardian': 90000,
    'cataclysm:ender_golem': 10000
}

function seApplyEnderStructureHealth(entity) {
    if (entity == null) return
    var desired = seEnderStructureHealth[String(entity.type)]
    if (desired == null || !entity.isAlive()) return
    try {
        var attribute = entity.getAttribute(Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes').MAX_HEALTH)
        if (attribute == null || Math.abs(attribute.getBaseValue() - desired) < 0.001) return
        var oldMax = entity.getMaxHealth()
        var oldHealth = entity.getHealth()
        attribute.setBaseValue(desired)
        var ratio = oldMax > 0 ? Math.max(0, Math.min(1, oldHealth / oldMax)) : 1
        entity.setHealth(entity.getMaxHealth() * ratio)
    } catch (error) {
        console.error('[Ender structure health] ' + entity.type + ': ' + error)
    }
}

NativeEvents.onEvent('net.neoforged.neoforge.event.entity.EntityJoinLevelEvent', function (event) {
    if (!event.getLevel().isClientSide()) seApplyEnderStructureHealth(event.getEntity())
})

// One pass over already-loaded entities; never force-load saved chunks or scan every tick.
ServerEvents.loaded(function (event) {
    event.getServer().scheduleInTicks(1, function () {
        var levels = event.getServer().getAllLevels().iterator()
        while (levels.hasNext()) {
            var entities = levels.next().getAllEntities().iterator()
            while (entities.hasNext()) seApplyEnderStructureHealth(entities.next())
        }
    })
})
