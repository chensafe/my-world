StartupEvents.registry('item', event => {
    // 创建一个物品，
    event.create('potato_hand')
        .displayName('土豆手部组件') // 设置显示名称
        .texture('lesiry:item/potato_hand'); // 指定材质路径

    event.create('40mmshell_casing')
        .displayName('40mm高爆弹壳') // 设置显示名称
        .texture('lesiry:item/40mmshell_casing'); // 指定材质路径
    
    event.create('shell_casing')
        .displayName('次口径穿甲弹壳') // 设置显示名称
        .texture('lesiry:item/shell_casing'); // 指定材质路径
    
    event.create('piercing_shell')
        .displayName('凸缘钝头穿甲弹壳') // 设置显示名称
        .texture('lesiry:item/piercing_shell'); // 指定材质路径

    event.create('grenade_shell')
        .displayName('气动榴弹壳') // 设置显示名称
        .texture('lesiry:item/grenade_shell'); // 指定材质路径

    event.create('pistol_casing')
        .displayName('气动手枪弹壳') // 设置显示名称
        .texture('lesiry:item/pistol_casing'); // 指定材质路径

    event.create('aerocoin')
        .displayName('航空币') // 设置显示名称
        .texture('lesiry:item/aerocoin'); // 指定材质路径

    event.create('yumi')
        .displayName('玉米面粉') // 设置显示名称
        .texture('lesiry:item/yumi'); // 指定材质路径

        
});

StartupEvents.registry('block', event => {
   event.create('anshanbox')
    .displayName('安山万能机械')
    .hardness(1.5)
    .resistance(6.0)
     .texture('lesiry:block/anshanbox'); 

     event.create('hongshibox')
    .displayName('红石万能机械')
    .hardness(1.5)
    .resistance(6.0)
     .texture('lesiry:block/hongshibox'); 

     event.create('huangtongbox')
    .displayName('黄铜万能机械')
    .hardness(1.5)
    .resistance(6.0)
     .texture('lesiry:block/huangtongbox'); 

     event.create('tongbox')
    .displayName('铜万能机械')
    .hardness(1.5)
    .resistance(6.0)
     .texture('lesiry:block/tongbox'); 
});