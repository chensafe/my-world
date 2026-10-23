// 在所有模组的创造栏及创造搜索栏中禁用旧碳粉/钢锭，保留物品注册以兼容已有存档。
var seMaterialVisibility = Java.loadClass('net.minecraft.world.item.CreativeModeTab$TabVisibility');
NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.BuildCreativeModeTabContentsEvent', function(event) {
    event.remove(Item.of('create_biotech:carbon_powder'), seMaterialVisibility.PARENT_AND_SEARCH_TABS);
    event.remove(Item.of('createbigcannons:steel_ingot'), seMaterialVisibility.PARENT_AND_SEARCH_TABS);
});
