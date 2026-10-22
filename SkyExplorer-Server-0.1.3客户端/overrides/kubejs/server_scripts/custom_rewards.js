// VSS 0.16.0 的任务书开关。区块生成、配送与队列均由 VSS 自身处理。
var seVssSwitchBusy = false

function seVssIsDedicated(server) {
    return server instanceof Java.loadClass('net.minecraft.server.dedicated.DedicatedServer')
}

function seVssConfig() {
    return Java.loadClass('dev.vox.lss.config.LSSServerConfig').CONFIG
}

function seVssNetwork() {
    return Java.loadClass('dev.vox.lss.networking.server.LSSServerNetworking')
}

function seVssStartLocal(server) {
    if (!seVssIsDedicated(server)) seVssNetwork().startServiceForLan(server)
}

function seVssSendState(player, enabled, silent) {
    player.sendData(enabled ? 'skyexplorer:voxy_autogen_on' : 'skyexplorer:voxy_autogen_off', silent ? { silent: true } : {})
}

function seVssWaitForReload(server, player, config, future, enabled, silent, attempts) {
    server.scheduleInTicks(2, () => {
        try {
            if (!future.isDone()) {
                if (attempts >= 100) throw new Error('VSS 配置重载未完成，请查看日志后重试')
                seVssWaitForReload(server, player, config, future, enabled, silent, attempts + 1)
                return
            }
            var outcome = future.getNow(null)
            if (config.enableChunkGeneration() !== enabled) {
                throw new Error('VSS 未接受生成开关：' + (outcome == null ? '无结果' : outcome.detail()))
            }
            var service = seVssNetwork().getRequestService()
            if (service != null && service.getGenerationService().isAdmissionEnabled() !== enabled) {
                throw new Error('VSS 生成任务提交状态尚未更新')
            }
            if (enabled) seVssStartLocal(server)
            seVssSendState(player, enabled, silent)
            console.info('[SkyExplorer] VSS_SWITCH enabled=' + enabled + ' service=' + (seVssNetwork().getRequestService() != null))
            seVssSwitchBusy = false
        } catch (err) {
            seVssSwitchBusy = false
            console.error('[SkyExplorer] VSS 开关失败：' + err)
            player.tell('§cVSS 切换失败，请查看 KubeJS 日志。')
        }
    })
}

function seSetVssWorldGen(player, enabled, silent) {
    if (player == null) return false
    try {
        var server = player.server
        if (seVssIsDedicated(server) && !player.op) {
            player.tell('§c服务器的超视距生成开关需要管理员权限。')
            return false
        }
        var config = seVssConfig()
        if (!config.enabled()) throw new Error('VSS 服务在配置中被禁用，需要启用 service.enabled 并重启游戏')
        if (seVssSwitchBusy || config.settingsHandle().busy()) {
            player.tell('§eVSS 正在切换，请稍后重试。')
            return false
        }
        seVssSwitchBusy = true
        // 使用 VSS 的原生配置存储器，仅修改这一项；它负责冲突校验和安全写入。
        var store = config.settingsHandle().store()
        var document = store.read()
        var changes = new (Java.loadClass('java.util.HashMap'))()
        changes.put('generation.enabled', Java.loadClass('java.lang.Boolean').valueOf(enabled))
        store.saveDraft(document.hash(), changes)
        var service = seVssNetwork().getRequestService()
        var completedFuture = Java.loadClass('java.util.concurrent.CompletableFuture')
        var future = config.reload(server, (before, after, revision) => service == null
            ? completedFuture.completedFuture(null)
            : service.reconcileSettings(before, after, revision))
        seVssWaitForReload(server, player, config, future, enabled, silent, 0)
        return true
    } catch (err) {
        seVssSwitchBusy = false
        console.error('[SkyExplorer] VSS 开关失败：' + err)
        player.tell('§cVSS 切换失败，请查看 KubeJS 日志。')
        return false
    }
}

FTBQuestsEvents.customReward('1B5EBE46E00443BF', event => seSetVssWorldGen(event.player, false, false))
FTBQuestsEvents.customReward('14CD7481FBA7F807', event => seSetVssWorldGen(event.player, true, false))

PlayerEvents.loggedIn(event => {
    var player = event.player
    var server = player.server
    server.scheduleInTicks(20, () => {
        try {
            var enabled = seVssConfig().enabled() && seVssConfig().enableChunkGeneration()
            if (enabled) seVssStartLocal(server)
            seVssSendState(player, enabled, true)
        } catch (err) {
            console.error('[SkyExplorer] VSS 状态同步失败：' + err)
        }
    })
})

// 整合包提供的兼容指令；原生 Voxy 本身没有这些 distantgen 子指令。
ServerEvents.commandRegistry(event => {
    var commands = event.commands
    event.register(commands.literal('voxy').then(commands.literal('distantgen')
        .then(commands.literal('pause').executes(ctx => seSetVssWorldGen(ctx.source.player, false, false) ? 1 : 0))
        .then(commands.literal('resume').executes(ctx => seSetVssWorldGen(ctx.source.player, true, false) ? 1 : 0))
        .then(commands.literal('status').executes(ctx => {
            var player = ctx.source.player
            if (player == null) return 0
            try {
                var service = seVssNetwork().getRequestService()
                var enabled = service != null && seVssConfig().enabled() && service.getGenerationService().isAdmissionEnabled()
                player.tell(enabled ? '§aVSS：正在生成超视距地形。' : '§eVSS：超视距生成未启动或已暂停。')
                player.tell('§7' + seVssNetwork().getLocalLightStatus())
                return 1
            } catch (err) {
                player.tell('§c无法读取 VSS 状态，请检查模组是否启用。')
                return 0
            }
        }))
    ))
})
