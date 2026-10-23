// Cataclysm ammunition transitional items. User-provided textures; no recipes.
StartupEvents.registry('item', event => {
  event.create('kubejs:incomplete_cataclysm_rocket_bullet', 'create:sequenced_assembly')
    .displayName('未完成的不稳定熔岩电池')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_cataclysm_ammo/rocket_bullet')
    .tooltip('序列组装中间产物，继续加工以完成不稳定熔岩电池。')
    .tag('lesiry:incomplete_cataclysm_ammunition');

  event.create('kubejs:incomplete_cataclysm_ghost_bullet', 'create:sequenced_assembly')
    .displayName('未完成的残魂石碑')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_cataclysm_ammo/ghost_bullet')
    .tooltip('序列组装中间产物，继续加工以完成残魂石碑。')
    .tag('lesiry:incomplete_cataclysm_ammunition');

  event.create('kubejs:incomplete_cataclysm_storm_bullet', 'create:sequenced_assembly')
    .displayName('未完成的风暴霰弹')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_cataclysm_ammo/storm_bullet')
    .tooltip('序列组装中间产物，继续加工以完成风暴霰弹。')
    .tag('lesiry:incomplete_cataclysm_ammunition');

  event.create('kubejs:incomplete_cataclysm_sawblade_bullet', 'create:sequenced_assembly')
    .displayName('未完成的锯片')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_cataclysm_ammo/sawblade_bullet')
    .tooltip('序列组装中间产物，继续加工以完成锯片。')
    .tag('lesiry:incomplete_cataclysm_ammunition');

  event.create('kubejs:incomplete_cataclysm_arson_bullet', 'create:sequenced_assembly')
    .displayName('未完成的烈焰马格南弹')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_cataclysm_ammo/arson_bullet')
    .tooltip('序列组装中间产物，继续加工以完成烈焰马格南弹。')
    .tag('lesiry:incomplete_cataclysm_ammunition');

  event.create('kubejs:incomplete_cataclysm_remnant_bullet', 'create:sequenced_assembly')
    .displayName('未完成的全金属霰弹')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_cataclysm_ammo/remnant_bullet')
    .tooltip('序列组装中间产物，继续加工以完成全金属霰弹。')
    .tag('lesiry:incomplete_cataclysm_ammunition');

  event.create('kubejs:incomplete_cataclysm_abyss_bullet', 'create:sequenced_assembly')
    .displayName('未完成的深渊利齿')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_cataclysm_ammo/abyss_bullet')
    .tooltip('序列组装中间产物，继续加工以完成深渊利齿。')
    .tag('lesiry:incomplete_cataclysm_ammunition');

  event.create('kubejs:incomplete_cataclysm_void_bullet', 'create:sequenced_assembly')
    .displayName('未完成的紫颂狙击弹')
    .maxStackSize(1)
    .texture('lesiry:item/incomplete_cataclysm_ammo/void_bullet')
    .tooltip('序列组装中间产物，继续加工以完成紫颂狙击弹。')
    .tag('lesiry:incomplete_cataclysm_ammunition');

});
