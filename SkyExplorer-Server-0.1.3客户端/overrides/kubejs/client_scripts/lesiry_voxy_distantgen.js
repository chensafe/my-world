// VSS 开关只控制地形预生成；普通 Voxy 远景记录保持开启。
var seVssClientPending = null

function seApplyVssState(event, enabled) {
    try {
        var config = Java.loadClass('me.cortex.voxy.client.config.VoxyConfig').CONFIG
        config.ingestEnabled = true
        config.save()
        if (enabled) {
            var vss = Java.loadClass('dev.vox.lss.config.LSSClientConfig').CONFIG
            if (!vss.receiveServerLods()) {
                var store = vss.store()
                var document = store.read()
                var changes = new (Java.loadClass('java.util.HashMap'))()
                changes.put('lod.receive', Java.loadClass('java.lang.Boolean').TRUE)
                store.saveDraft(document.hash(), changes)
                vss.reload(message => console.info('[SkyExplorer] VSS_CLIENT_RELOAD ' + String(message)))
            }
            seVssClientPending = { ticks: 0 }
        } else {
            seVssClientPending = null
        }
        console.info('[SkyExplorer] VSS_CLIENT enabled=' + enabled + ' silent=' + !!event.data.silent)
        if (Client.player != null && !event.data.silent) Client.player.tell(enabled
            ? '§aVSS 已允许生成未探索地形；单人无需开放局域网。'
            : '§eVSS 已暂停提交新生成任务；已有远景继续显示。')
    } catch (err) {
        seVssClientPending = null
        console.error('[SkyExplorer] VSS 客户端同步失败：' + err)
        if (Client.player != null) Client.player.tell('§cVSS 客户端同步失败，请查看日志。')
    }
}

ClientEvents.tick(event => {
    if (seVssClientPending == null) return
    if (Client.player == null || Client.level == null) {
        seVssClientPending = null
        return
    }
    try {
        var config = Java.loadClass('dev.vox.lss.config.LSSClientConfig').CONFIG
        if (config.receiveServerLods()) {
            Java.loadClass('dev.vox.lss.networking.client.LSSClientNetworking').triggerHostHandshake()
            seVssClientPending = null
            return
        }
        seVssClientPending.ticks++
        if (seVssClientPending.ticks > 200) {
            seVssClientPending = null
            Client.player.tell('§cVSS 未能开启远景接收，请查看日志。')
        }
    } catch (err) {
        seVssClientPending = null
        console.error('[SkyExplorer] VSS 握手失败：' + err)
    }
})

NetworkEvents.dataReceived('skyexplorer:voxy_autogen_on', event => seApplyVssState(event, true))
NetworkEvents.dataReceived('skyexplorer:voxy_autogen_off', event => seApplyVssState(event, false))
