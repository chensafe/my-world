// 从JEI物品列表隐藏停用的两种材料；配方输入统一由服务端脚本处理。
RecipeViewerEvents.removeEntries('item', function(event) {
    event.remove('create_biotech:carbon_powder');
    event.remove('createbigcannons:steel_ingot');
});
