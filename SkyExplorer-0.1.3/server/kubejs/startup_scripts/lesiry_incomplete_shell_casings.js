// Transitional items only. Reuse existing casing textures; no recipes.
StartupEvents.registry('item', event => {
  event.create('kubejs:incomplete_grenade_shell', 'create:sequenced_assembly')
    .displayName('未完成的气动榴弹壳')
    .maxStackSize(1)
    .texture('lesiry:item/grenade_shell')
    .tooltip('序列组装中间产物，继续加工以完成弹壳。');

  event.create('kubejs:incomplete_40mmshell_casing', 'create:sequenced_assembly')
    .displayName('未完成的40mm高爆弹壳')
    .maxStackSize(1)
    .texture('lesiry:item/40mmshell_casing')
    .tooltip('序列组装中间产物，继续加工以完成弹壳。');

});
