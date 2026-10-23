// Stage C components: registration and textures only; no recipes.
StartupEvents.registry('item', event => {
  event.create('kubejs:gun_heat_resistant_precision_barrel')
    .displayName('耐热精密枪管')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/heat_resistant_precision_barrel')
    .tooltip('耐热包覆与精密校准结构，适用于进阶枪械。')
    .tag('lesiry:gun_components');

  event.create('kubejs:gun_armored_receiver')
    .displayName('装甲机匣')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/armored_receiver')
    .tooltip('由多层装甲与加固承力框架构成的高级机匣。')
    .tag('lesiry:gun_components');

});
