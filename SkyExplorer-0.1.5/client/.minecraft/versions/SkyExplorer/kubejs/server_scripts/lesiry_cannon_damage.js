// SkyExplorer 中后期火炮平衡。只提高选定炮弹的实体爆炸伤害，保留范围、遮挡、减伤及方块破坏。
// 事件关联键为 DamageSource 弱引用，值仅为倍率，不保存世界、实体或爆炸对象。
var seCannonCustomExplosion = Java.loadClass('rbasamoyai.createbigcannons.remix.CustomExplosion');
var seCannonExplosionScales = new (Java.loadClass('java.util.WeakHashMap'))();
var seCannonBlastTargets = {
  "createbigcannons:ap_shell": 1000,
  "createbigcannons:drop_mortar_shell": 1000,
  "createbigcannons:he_shell": 1800,
  "cbcmoreshells:airdropped_torpedo": 4500,
  "cbcmoreshells:antiair_he_shell": 1000,
  "cbcmoreshells:antiair_shrapnel_shell": 600,
  "cbcmoreshells:apbc_shell": 1500,
  "cbcmoreshells:aphe_bomb": 5000,
  "cbcmoreshells:aphe_bouncing_bomb": 4000,
  "cbcmoreshells:aphe_cannon_rocket": 2000,
  "cbcmoreshells:aphe_loitering_rocket": 1500,
  "cbcmoreshells:aphe_rocket": 2000,
  "cbcmoreshells:cannon_torpedo": 4500,
  "cbcmoreshells:deepwater_shrapnel_torpedo": 2000,
  "cbcmoreshells:depth_charge": 5000,
  "cbcmoreshells:dual_aphe_rocket": 1000,
  "cbcmoreshells:dual_he_rocket": 1500,
  "cbcmoreshells:early_torpedo": 2250,
  "cbcmoreshells:extended_antiair_he_shell": 480,
  "cbcmoreshells:gambler_medium_range_torpedo": 4500,
  "cbcmoreshells:hesh_shell": 3000,
  "cbcmoreshells:he_bomb": 5000,
  "cbcmoreshells:he_bouncing_bomb": 4000,
  "cbcmoreshells:he_cannon_rocket": 3000,
  "cbcmoreshells:he_loitering_rocket": 2500,
  "cbcmoreshells:he_rocket": 3000,
  "cbcmoreshells:highspeed_long_range_torpedo": 4500,
  "cbcmoreshells:highspeed_torpedo": 4500,
  "cbcmoreshells:incendiary_he_shell": 1200,
  "cbcmoreshells:inferior_he_shell": 900,
  "cbcmoreshells:light_high_speed_torpedo": 3500,
  "cbcmoreshells:long_range_shrapnel_torpedo": 2000,
  "cbcmoreshells:long_range_torpedo": 4500,
  "cbcmoreshells:medium_range_deepwater_torpedo": 4500,
  "cbcmoreshells:medium_range_deepwater_torpedo_typeb": 7500,
  "cbcmoreshells:medium_range_torpedo": 4500,
  "cbcmoreshells:medium_range_torpedo_typeb": 7500,
  "cbcmoreshells:normal_antiair_he_shell": 600,
  "cbcmoreshells:normal_apbc_shell": 900,
  "cbcmoreshells:normal_ap_shell": 600,
  "cbcmoreshells:normal_he_shell": 1080,
  "cbcmoreshells:normal_incendiary_he_shell": 720,
  "cbcmoreshells:normal_sap_shell": 1080,
  "cbcmoreshells:primary_torpedo": 3000,
  "cbcmoreshells:racked_torpedo": 6000,
  "cbcmoreshells:reductive_highspeed_torpedo": 4500,
  "cbcmoreshells:reductive_long_range_torpedo": 4500,
  "cbcmoreshells:reductive_medium_range_torpedo": 4500,
  "cbcmoreshells:reinforced_long_range_torpedo": 7500,
  "cbcmoreshells:reinforced_medium_range_torpedo": 7500,
  "cbcmoreshells:reinforced_reductive_medium_range_torpedo": 7500,
  "cbcmoreshells:reinforced_reductive_short_range_torpedo": 7500,
  "cbcmoreshells:reinforced_short_range_torpedo": 7500,
  "cbcmoreshells:sap_shell": 1800,
  "cbcmoreshells:sharpnel_torpedo": 2000,
  "cbcmoreshells:shelless_he_shell": 1350,
  "cbcmoreshells:shelless_incendiary_he_shell": 900,
  "cbcmoreshells:shelless_sap_shell": 1350,
  "cbcmoreshells:short_range_torpedo": 4500,
  "cbcmoreshells:slow_long_range_torpedo": 4500,
  "cbcmoreshells:ultraspeed_torpedo": 3800
};
NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.level.ExplosionEvent$Start', function(event) {
    if (event.getLevel().isClientSide()) return;
    var explosion = event.getExplosion();
    if (!(explosion instanceof seCannonCustomExplosion)) return;
    var projectile = explosion.getDirectSourceEntity();
    if (projectile == null) return;
    var id = String(projectile.type);
    var target = seCannonBlastTargets[id];
    if (target == null) return;
    var power = Number(explosion.getEntityRadius());
    // 未武装火箭等半径为零的爆炸仍保持原状，不借此绕过保险距离。
    if (!(power > 0)) return;
    seCannonExplosionScales.put(explosion.getDamageSource(), Number(target) / (14 * power + 1));
});
NativeEvents.onEvent('HIGH', 'net.neoforged.neoforge.event.entity.living.LivingIncomingDamageEvent', function(event) {
    if (event.getEntity().level.isClientSide()) return;
    var scale = seCannonExplosionScales.get(event.getSource());
    if (scale != null) event.setAmount(event.getAmount() * Number(scale));
});
