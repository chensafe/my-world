// SkyExplorer / lesiry
// Create: Structures Arise 176.49.48 logs every config value read at DEBUG.
// Apply a logger-specific INFO threshold before world generation starts.
// This preserves INFO/WARN/ERROR and leaves generation settings unchanged.
// Runs once per process, on both the client and the dedicated server.
(function () {
    try {
        var Configurator = Java.loadClass('org.apache.logging.log4j.core.config.Configurator');
        var Level = Java.loadClass('org.apache.logging.log4j.Level');
        Configurator.setLevel('createstructuresarise.CreateStructuresAriseMod', Level.INFO);
        console.info('[SkyExplorer/CSA] 结构模组日志级别已设为 INFO，已抑制逐项配置读取的 DEBUG 日志。');
    } catch (error) {
        console.error('[SkyExplorer/CSA] 无法设置结构模组日志级别：' + error);
    }
})();
