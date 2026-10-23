// 统一碳粉与钢锭：保留原子核动版本。事件仅在配方/标签加载时执行。
ServerEvents.tags('item', function(event) {
    event.removeAllTagsFrom('create_biotech:carbon_powder');
    event.removeAllTagsFrom('createbigcannons:steel_ingot');
    event.add('c:ingots/steel', 'createnuclear:steel_ingot');
    event.add('c:dusts/coal', 'createnuclear:coal_dust');
    event.add('c:coal_dusts', 'createnuclear:coal_dust');
});
ServerEvents.recipes(function(event) {
    // 先替换所有支持的原料字段，涵盖工作台、熔炼、混合、动力合成和嵌套序列等。
    event.replaceInput({}, 'create_biotech:carbon_powder', 'createnuclear:coal_dust');
    event.replaceInput({}, 'createbigcannons:steel_ingot', 'createnuclear:steel_ingot');
    // 旧物品不再由配方产出；石墨制钻石的副产物已在data中统一，不删除该流程。
    event.remove({output: 'create_biotech:carbon_powder'});
    event.remove({output: 'createbigcannons:steel_ingot'});
});
