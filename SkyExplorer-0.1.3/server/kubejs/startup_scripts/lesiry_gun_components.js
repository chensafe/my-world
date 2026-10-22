// Sky Pioneers: shared firearm components. Minecraft 1.21.1 / KubeJS 2101.
// Registration and textures only. Restart the game after adding this file.
// Existing items and recipes are intentionally not modified.
StartupEvents.registry('item', event => {
  event.create('kubejs:gun_basic_receiver')
    .displayName('基础机匣')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/basic_receiver')
    .tooltip('基础枪械的承载结构。')
    .tag('lesiry:gun_components');

  event.create('kubejs:gun_reinforced_receiver')
    .displayName('强化机匣')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/reinforced_receiver')
    .tooltip('为高负载枪械加固的承载结构。')
    .tag('lesiry:gun_components');

  event.create('kubejs:gun_standard_barrel')
    .displayName('标准枪管')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/standard_barrel')
    .tooltip('适用于常规枪械的通用枪管。')
    .tag('lesiry:gun_components');

  event.create('kubejs:gun_precision_barrel')
    .displayName('精密长枪管')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/precision_barrel')
    .tooltip('经精密校准的长枪管。')
    .tag('lesiry:gun_components');

  event.create('kubejs:gun_heavy_barrel')
    .displayName('重型枪管')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/heavy_barrel')
    .tooltip('适用于重型军械的加厚枪管。')
    .tag('lesiry:gun_components');

  event.create('kubejs:gun_basic_trigger')
    .displayName('基础击发组件')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/basic_trigger')
    .tooltip('由齿轮、弹簧与连杆组成的击发组件。')
    .tag('lesiry:gun_components');

  event.create('kubejs:gun_precision_trigger')
    .displayName('缚魂击发组件')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/precision_trigger')
    .tooltip('以腐化灵魂驱动的精密击发机构。')
    .tag('lesiry:gun_components');

  event.create('kubejs:gun_wooden_stock')
    .displayName('木制枪托')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/wooden_stock')
    .tooltip('带有金属护尾与黄铜接口的木制枪托。')
    .tag('lesiry:gun_components');

  console.info('[Sky Pioneers] Registered 8 shared firearm components.');
});
