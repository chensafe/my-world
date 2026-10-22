// Registration only: no recipes. Requires a full game restart.
StartupEvents.registry('item', event => {
  event.create('kubejs:incomplete_gun_runic_cooling_manifold', 'create:sequenced_assembly')
    .displayName('未完成的符文冷却导流器')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/runic_cooling_manifold')
    .tooltip('序列组装中间产物，继续加工以完成符文冷却导流器。')
    .tag('lesiry:incomplete_gun_components');
});
