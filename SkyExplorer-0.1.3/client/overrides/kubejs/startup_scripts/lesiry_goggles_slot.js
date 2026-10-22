// Meowchanics permits only the head slot by default; also allow the dedicated goggles slot.
var seGogglesEquipResult = Java.loadClass('net.neoforged.neoforge.common.util.TriState')
var seGogglesEquipRegistry = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries').ITEM
NativeEvents.onEvent('top.theillusivec4.curios.api.event.CurioCanEquipEvent', function (event) {
    if (String(event.getSlotContext().identifier()) !== 'goggles') return
    if (String(seGogglesEquipRegistry.getKey(event.getStack().getItem())) !== 'laowu:cat_engineer_goggles') return
    event.setEquipResult(seGogglesEquipResult.TRUE)
})
