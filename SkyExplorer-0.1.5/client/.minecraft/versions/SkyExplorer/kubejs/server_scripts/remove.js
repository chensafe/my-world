ServerEvents.recipes(event => {
    // 通过配方的唯一ID进行精准移除
    event.remove({ id: 'createdieselgenerators:crushing/wood_chip_slabs' });
    // 赭金砂：移除原版只产出金的粉碎配方，保留可视化配方中的黄铜和金。
    event.remove({ id: 'create:crushing/ochrum' });
    event.remove({ id: 'create:crushing/ochrum_recycling' });
    event.remove({ id: /^rainbowcompound:create_mixing\// });

})
