// Register before InControl's common-setup HIGHEST listener so its health action
// cannot erase the remaining-health fraction of a living entity that joins.
global.skyExplorerHealthJoinRatios = Java.loadClass('java.util.Collections').synchronizedMap(new (Java.loadClass('java.util.WeakHashMap'))())
var seHealthCaptureLiving = Java.loadClass('net.minecraft.world.entity.LivingEntity')
var seHealthCaptureManager = Java.loadClass('com.mobspawncontroller.command.MobSpawnManager')
var seHealthCaptureLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
var seHealthBridge = Java.loadClass('com.lesiry.healthbridge.HealthBridge')
var seHealthCaptureKey = seHealthCaptureLocation.parse('minecraft:generic.max_health')
NativeEvents.onEvent('HIGHEST', 'net.neoforged.neoforge.event.entity.EntityJoinLevelEvent', function (event) {
    var entity = event.getEntity()
    if (event.getLevel().isClientSide() || !(entity instanceof seHealthCaptureLiving) || !entity.isAlive()) return
    if (seHealthCaptureManager.getAttributeOverride(seHealthCaptureLocation.parse(String(entity.type)), seHealthCaptureKey) == null) return
    var max = entity.getMaxHealth()
    var savedRatio = seHealthBridge == null ? null : seHealthBridge.takeSavedRatio(entity)
    global.skyExplorerHealthJoinRatios.put(entity, savedRatio != null ? savedRatio : (max > 0 ? Math.max(0, Math.min(1, entity.getHealth() / max)) : 1))
})
