// Component registration only. No recipes or gun stat changes.
StartupEvents.registry('item', event => {
  event.create('kubejs:gun_runic_cooling_manifold')
    .displayName('符文冷却导流器')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/runic_cooling_manifold')
    .tooltip('以冰冻符文为核心的冷却导流组件。')
    .tag('lesiry:gun_components');
});
