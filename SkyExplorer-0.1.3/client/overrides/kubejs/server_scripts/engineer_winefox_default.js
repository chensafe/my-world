// 工程师酒狐默认外观，仅针对首次加入世界的新女仆。
// 使用原生加载标记区分新生成和存档恢复，保留已有女仆与手动更换的外观。
const SkyExplorerEngineerMaid = Java.loadClass('com.github.tartaricacid.touhoulittlemaid.entity.passive.EntityMaid');
NativeEvents.onEvent('net.neoforged.neoforge.event.entity.EntityJoinLevelEvent', event => {
    if (event.getLevel().isClientSide()) return;
    const maid = event.getEntity();
    if (!(maid instanceof SkyExplorerEngineerMaid)) return;
    const data = maid.getPersistentData();
    const marker = 'SkyExplorerEngineerDefaultApplied';
    if (event.loadedFromDisk()) {
        data.putBoolean(marker, true);
        return;
    }
    if (data.getBoolean(marker)) return;
    maid.setModelId('engineer_winefox:engineer_winefox');
    data.putBoolean(marker, true);
});
