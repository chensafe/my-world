// Ignitium firing assembly and transitional item. No recipes or combat attributes.
StartupEvents.registry('item', event => {
  event.create('kubejs:gun_ignitium_trigger')
    .displayName('腾炎击发组件')
    .maxStackSize(64)
    .texture('lesiry:item/gun_parts/ignitium_trigger')
    .tooltip('腾炎合金约束炽热核心的高级击发机构。')
    .tag('lesiry:gun_components');

  event.create('kubejs:incomplete_gun_ignitium_trigger', 'create:sequenced_assembly')
    .displayName('未完成的腾炎击发组件')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_gun_parts/ignitium_trigger')
    .tooltip('序列组装中间产物，继续加工以完成腾炎击发组件。')
    .tag('lesiry:incomplete_gun_components');

});
