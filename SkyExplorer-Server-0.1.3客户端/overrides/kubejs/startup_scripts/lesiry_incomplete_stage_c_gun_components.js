// Stage C components: registration and textures only; no recipes.
StartupEvents.registry('item', event => {
  event.create('kubejs:incomplete_gun_heat_resistant_precision_barrel', 'create:sequenced_assembly')
    .displayName('未完成的耐热精密枪管')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/heat_resistant_precision_barrel')
    .tooltip('序列组装中间产物，继续加工以完成耐热精密枪管。')
    .tag('lesiry:incomplete_gun_components');

  event.create('kubejs:incomplete_gun_armored_receiver', 'create:sequenced_assembly')
    .displayName('未完成的装甲机匣')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/armored_receiver')
    .tooltip('序列组装中间产物，继续加工以完成装甲机匣。')
    .tag('lesiry:incomplete_gun_components');

});
