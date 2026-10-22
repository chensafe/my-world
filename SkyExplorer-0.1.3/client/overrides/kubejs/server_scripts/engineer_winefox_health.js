// 酒狐按原生好感度四档成长：0/64/192/384 点 -> 200/350/500/650 点生命上限。
// 保留原模组的基础生命，以独立永久加成实现成长，避免升档时原生基础值重置导致掉血。
// 加载/迁移旧酒狐时保留受伤比例；升档不自动回血，不进行逐刻或周期性世界扫描。
const SkyExplorerWinefoxHealthMaid = Java.loadClass('com.github.tartaricacid.touhoulittlemaid.entity.passive.EntityMaid');
const SkyExplorerWinefoxHealthAttributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes');
const SkyExplorerWinefoxHealthModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier');
const SkyExplorerWinefoxHealthOperation = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation');
const SkyExplorerWinefoxHealthLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');
const SkyExplorerWinefoxHealthModifierId = SkyExplorerWinefoxHealthLocation.parse('kubejs:engineer_winefox_health_growth');
const SkyExplorerWinefoxHealthByLevel = [200, 350, 500, 650];
const SkyExplorerWinefoxNativeHealthByLevel = [20, 30, 40, 80];
const SkyExplorerWinefoxHealthTargetTag = 'SkyExplorerWinefoxHealthGrowthTarget';

function skyExplorerWinefoxApplyHealth(maid, preserveRatio, levelOverride) {
    if (!(maid instanceof SkyExplorerWinefoxHealthMaid) || maid.level.isClientSide()) return;
    const attribute = maid.getAttribute(SkyExplorerWinefoxHealthAttributes.MAX_HEALTH);
    if (attribute === null) return;
    const model = String(maid.getModelId());
    const existing = attribute.getModifier(SkyExplorerWinefoxHealthModifierId);
    if (model.indexOf('engineer_winefox:') !== 0 && model.indexOf('geckolib:winefox') !== 0) {
        if (existing !== null) {
            attribute['removeModifier(net.minecraft.resources.ResourceLocation)'](SkyExplorerWinefoxHealthModifierId);
            maid.setHealth(Math.min(maid.getHealth(), maid.getMaxHealth()));
        }
        return;
    }
    const level = levelOverride === undefined ? maid.getFavorabilityManager().getLevel() : levelOverride;
    const index = Math.max(0, Math.min(3, Number(level)));
    const nativeBase = SkyExplorerWinefoxNativeHealthByLevel[index];
    const target = SkyExplorerWinefoxHealthByLevel[index];
    const bonus = target - nativeBase;
    const data = maid.getPersistentData();
    if (attribute.getBaseValue() === nativeBase && existing !== null && data.getInt(SkyExplorerWinefoxHealthTargetTag) === target) return;
    const previousMax = maid.getMaxHealth();
    const previousHealth = maid.getHealth();
    attribute.setBaseValue(nativeBase);
    // 显式指定重载，避免 Rhino 将 ResourceLocation 同时转换成 AttributeModifier。
    if (existing !== null) attribute['removeModifier(net.minecraft.resources.ResourceLocation)'](SkyExplorerWinefoxHealthModifierId);
    attribute.addPermanentModifier(new SkyExplorerWinefoxHealthModifier(
        SkyExplorerWinefoxHealthModifierId, bonus, SkyExplorerWinefoxHealthOperation.ADD_VALUE
    ));
    data.putInt(SkyExplorerWinefoxHealthTargetTag, target);
    const newMax = maid.getMaxHealth();
    const health = preserveRatio && previousMax > 0 ? previousHealth * newMax / previousMax : previousHealth;
    maid.setHealth(Math.max(0, Math.min(newMax, health)));
}

NativeEvents.onEvent('net.neoforged.neoforge.event.entity.EntityJoinLevelEvent', event => {
    if (!event.getLevel().isClientSide()) skyExplorerWinefoxApplyHealth(event.getEntity(), true);
});

NativeEvents.onEvent('com.github.tartaricacid.touhoulittlemaid.api.event.MaidFavorabilityLevelChangeEvent', event => {
    skyExplorerWinefoxApplyHealth(event.getMaid(), false, event.getNewLevel());
});

// 脚本加载/重载后仅检查一次已加载实体，不请求加载区块。
ServerEvents.loaded(event => {
    const server = event.getServer();
    server.scheduleInTicks(1, () => {
        const levels = server.getAllLevels().iterator();
        while (levels.hasNext()) {
            const entities = levels.next().getAllEntities().iterator();
            while (entities.hasNext()) skyExplorerWinefoxApplyHealth(entities.next(), true);
        }
    });
});
