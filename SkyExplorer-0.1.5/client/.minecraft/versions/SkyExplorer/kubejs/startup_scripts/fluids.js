StartupEvents.registry('fluid', event => {
    event.create('beet_juice')
        .stillTexture('minecraft:block/water_still')
        .flowingTexture('minecraft:block/water_flow')
        .tint(0xE74C3C)      // 红色调
        .translucent();    
        
     event.create('carrot_juice')
        .stillTexture('minecraft:block/water_still')
        .flowingTexture('minecraft:block/water_flow')
        .tint(0xFF8000)      // 胡萝卜
        .translucent();   // 必须，否则不透明
    
    event.create('cabbage_juice')
        .stillTexture('minecraft:block/water_still')
        .flowingTexture('minecraft:block/water_flow')
        .tint(0x00ff00)      // 卷心菜
        .translucent();   // 必须，否则不透明

    event.create('cactus_juice')
        .stillTexture('minecraft:block/water_still')
        .flowingTexture('minecraft:block/water_flow')
        .tint(0x00994c)      // 仙人掌
        .translucent();   // 必须，否则不透明

    event.create('powder_juice')
        .stillTexture('minecraft:block/water_still')
        .flowingTexture('minecraft:block/water_flow')
        .tint(0xa0a0a0)      // 烟药竹
        .translucent();   // 必须，否则不透明

    event.create('yumi_juice')
        .stillTexture('minecraft:block/water_still')
        .flowingTexture('minecraft:block/water_flow')
        .tint(0xffff00)      // 玉米
        .translucent();   // 必须，否则不透明
});