// Registration only; no recipes. Uses the user-provided texture unchanged.
StartupEvents.registry('item', event => {
  event.create('kubejs:incomplete_ignitium_ingot', 'create:sequenced_assembly')
    .displayName('未完成的腾炎锭')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_ignitium_ingot')
    .tooltip('序列组装中间产物，继续加工以完成腾炎锭。');
});
