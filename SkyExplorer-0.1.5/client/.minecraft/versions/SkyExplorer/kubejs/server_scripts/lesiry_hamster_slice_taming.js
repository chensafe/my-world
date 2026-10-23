// 鼠片喂食规则：手持鼠片右键无主猫咪，消耗1片并直接驯服。
// 这是实体交互规则，不是工作台合成配方。已驯服的猫不消耗鼠片，也不会改换主人。
var SEHamsterCat = Java.loadClass('net.minecraft.world.entity.animal.Cat');
var SEHamsterHooks = Java.loadClass('net.neoforged.neoforge.event.EventHooks');

ItemEvents.entityInteracted('skyexplorer_hamster:hamster_slice', function(event) {
    var cat = event.target;
    if (!(cat instanceof SEHamsterCat) || !cat.isAlive() || cat.isTame()) return;
    if (cat.level.isClientSide()) return;
    var player = event.player;
    if (SEHamsterHooks.onAnimalTame(cat, player)) return;

    cat.tame(player);
    cat.getNavigation().stop();
    cat.setTarget(null);
    cat.setOrderedToSit(true);
    cat.setInSittingPose(true);
    if (!player.getAbilities().instabuild) event.item.shrink(1);
    cat.level.broadcastEntityEvent(cat, 7);
    event.success();
});
