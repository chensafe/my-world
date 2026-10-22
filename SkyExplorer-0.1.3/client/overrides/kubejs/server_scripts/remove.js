ServerEvents.recipes(event => {
    // 通过配方的唯一ID进行精准移除
    event.remove({ id: 'createdieselgenerators:crushing/wood_chip_slabs' });
    event.remove({ id: 'create:crushing/ochrum_recycling' });
    event.remove({ id: 'createnuclear:steel_ingot' });
    event.remove({ id: /^rainbowcompound:create_mixing\// });

})
