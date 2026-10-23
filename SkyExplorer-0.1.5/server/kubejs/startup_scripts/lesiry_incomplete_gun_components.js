// Create sequenced assembly intermediate items; full game restart required.
StartupEvents.registry('item', event => {
  event.create('kubejs:incomplete_gun_basic_receiver', 'create:sequenced_assembly')
    .displayName('未完成的基础机匣')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/basic_receiver')
    .tooltip('序列组装中间产物，继续加工以完成基础机匣。')
    .tag('lesiry:incomplete_gun_components');

  event.create('kubejs:incomplete_gun_reinforced_receiver', 'create:sequenced_assembly')
    .displayName('未完成的强化机匣')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/reinforced_receiver')
    .tooltip('序列组装中间产物，继续加工以完成强化机匣。')
    .tag('lesiry:incomplete_gun_components');

  event.create('kubejs:incomplete_gun_standard_barrel', 'create:sequenced_assembly')
    .displayName('未完成的标准枪管')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/standard_barrel')
    .tooltip('序列组装中间产物，继续加工以完成标准枪管。')
    .tag('lesiry:incomplete_gun_components');

  event.create('kubejs:incomplete_gun_precision_barrel', 'create:sequenced_assembly')
    .displayName('未完成的精密长枪管')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/precision_barrel')
    .tooltip('序列组装中间产物，继续加工以完成精密长枪管。')
    .tag('lesiry:incomplete_gun_components');

  event.create('kubejs:incomplete_gun_heavy_barrel', 'create:sequenced_assembly')
    .displayName('未完成的重型枪管')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/heavy_barrel')
    .tooltip('序列组装中间产物，继续加工以完成重型枪管。')
    .tag('lesiry:incomplete_gun_components');

  event.create('kubejs:incomplete_gun_basic_trigger', 'create:sequenced_assembly')
    .displayName('未完成的基础击发组件')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/basic_trigger')
    .tooltip('序列组装中间产物，继续加工以完成基础击发组件。')
    .tag('lesiry:incomplete_gun_components');

  event.create('kubejs:incomplete_gun_precision_trigger', 'create:sequenced_assembly')
    .displayName('未完成的缚魂击发组件')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/precision_trigger')
    .tooltip('序列组装中间产物，继续加工以完成缚魂击发组件。')
    .tag('lesiry:incomplete_gun_components');

  event.create('kubejs:incomplete_gun_wooden_stock', 'create:sequenced_assembly')
    .displayName('未完成的木制枪托')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/wooden_stock')
    .tooltip('序列组装中间产物，继续加工以完成木制枪托。')
    .tag('lesiry:incomplete_gun_components');

});
