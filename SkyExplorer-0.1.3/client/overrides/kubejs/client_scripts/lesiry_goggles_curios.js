// Recognize aviator goggles equipped in Curios for Create's goggle information overlay.
var seGogglesCuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')
var seGogglesItems = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries').ITEM
var seGogglesLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
Java.loadClass('com.simibubi.create.content.equipment.goggles.GogglesItem').addIsWearingPredicate(function (player) {
    var inventory = seGogglesCuriosApi.getCuriosInventory(player)
    if (!inventory.isPresent()) return false
    return inventory.get().isEquipped(seGogglesItems.get(seGogglesLocation.parse('aeronautics:aviators_goggles')))
})
