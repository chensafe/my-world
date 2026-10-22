// Boss summon shop: kill once, retain completion, replenish only the manual summon reward.
var seBossShopEntries = [
  {
    "quest": "6C6A70EA234F3D5A",
    "task": "511F075C179D2B26",
    "reward": "07B61E31B28E855F",
    "entity": "cataclysm:netherite_monstrosity",
    "icon": "cataclysm:monstrous_eye",
    "name": "下界合金巨兽",
    "eye_task": "2D0C17F509EEE469"
  },
  {
    "quest": "10C3E7183C4D73C1",
    "task": "59AECAC0F693F06F",
    "reward": "75AB3FA8058E262E",
    "entity": "cataclysm:the_harbinger",
    "icon": "cataclysm:mech_eye",
    "name": "先驱者",
    "eye_task": "3397C1C2CA032681"
  },
  {
    "quest": "5A56A13E6C92718E",
    "task": "37011540B09DA62B",
    "reward": "12588F598ACA35FF",
    "entity": "cataclysm:ender_guardian",
    "icon": "cataclysm:void_eye",
    "name": "末影守卫",
    "eye_task": "6CDD060646973984"
  },
  {
    "quest": "097DE32166AAEA3A",
    "task": "121978BE05D9CAD2",
    "reward": "0F1E840A91512D96",
    "entity": "cataclysm:the_leviathan",
    "icon": "cataclysm:abyss_eye",
    "name": "利维坦",
    "eye_task": "4374D2FC6CF07197"
  },
  {
    "quest": "56EBB9315B909B5B",
    "task": "17F8F654FD805E10",
    "reward": "2E272FC711E8E0D8",
    "entity": "cataclysm:ignis",
    "icon": "cataclysm:flame_eye",
    "name": "焰魔",
    "eye_task": "7EA7B31423F7C9CF"
  },
  {
    "quest": "62B8666E6039AC26",
    "task": "5FD159E413B83C68",
    "reward": "11774EA62F18F98A",
    "entity": "cataclysm:maledictus",
    "icon": "cataclysm:cursed_eye",
    "name": "咒翼灵骸",
    "eye_task": "60D99E2001D8D849"
  },
  {
    "quest": "068BDD24DFB4AFEC",
    "task": "60326BB27AB1DE11",
    "reward": "2EE2AF41ECA5631A",
    "entity": "cataclysm:scylla",
    "icon": "cataclysm:storm_eye",
    "name": "斯库拉",
    "eye_task": "48EAD344035ADFE8"
  },
  {
    "quest": "625160EACE9FD8B5",
    "task": "7C3DE55FEFCABFDF",
    "reward": "23A071CF12761778",
    "entity": "cataclysm:ancient_remnant",
    "icon": "cataclysm:desert_eye",
    "name": "远古遗魂",
    "eye_task": "7B7E290518DF16B8"
  },
  {
    "quest": "5981A93543FF3F0B",
    "task": "21BBC339725D8B7A",
    "reward": "6F1ECD1ED17F7135",
    "entity": "legendary_monsters:overgrown_colossus",
    "icon": "legendary_monsters:eye_of_moss",
    "name": "蔓生巨像",
    "eye_task": "3AB9FDE4B25E55EB"
  },
  {
    "quest": "16AF8B0BC72A0168",
    "task": "1C60DE6316CBA336",
    "reward": "27BCDCBF5F04DA47",
    "entity": "legendary_monsters:frostbitten_golem",
    "icon": "legendary_monsters:eye_of_frost",
    "name": "霜冻傀儡",
    "eye_task": "3D187915273DC9A3"
  },
  {
    "quest": "2CF60368F570C196",
    "task": "5A16FB9C885D6CE8",
    "reward": "44E2F5C9E7EF8474",
    "entity": "legendary_monsters:dune_sentinel",
    "icon": "legendary_monsters:eye_of_sandstorm",
    "name": "沙丘哨兵",
    "eye_task": "64BDC2FF6C140070"
  },
  {
    "quest": "5DED0FF61B6570CC",
    "task": "1D1629543871027A",
    "reward": "6A4A439E4C2BE9CA",
    "entity": "legendary_monsters:ancient_guardian",
    "icon": "legendary_monsters:eye_of_many_ribs",
    "name": "荒古守卫者",
    "eye_task": "6D9AF560D8AD99E3"
  },
  {
    "quest": "2A67377BCAC881B2",
    "task": "3CCD45C4E7B8558D",
    "reward": "7A5AB83A34DF5FAF",
    "entity": "legendary_monsters:posessed_paladin",
    "icon": "legendary_monsters:eye_of_ghost",
    "name": "堕落圣骑",
    "eye_task": "4163F3EE8BC0D8B3"
  },
  {
    "quest": "02A7219E8ADCA520",
    "task": "7F14AA55C09FB03F",
    "reward": "1BB2ADA568320E95",
    "entity": "legendary_monsters:cloud_golem",
    "icon": "legendary_monsters:eye_of_air",
    "name": "云筑魔像",
    "eye_task": "0536203C704993D3"
  },
  {
    "quest": "0CE65E118D4BC2BB",
    "task": "4EDAE47EFB19E54D",
    "reward": "4F86B678E3C18196",
    "entity": "legendary_monsters:lava_eater",
    "icon": "legendary_monsters:eye_of_magma",
    "name": "噬焰蜥",
    "eye_task": "741B61D4D6A24D9C"
  },
  {
    "quest": "75E60568E06C3979",
    "task": "76AFEB2F45CDC1F8",
    "reward": "08BA307565C8CB0E",
    "entity": "legendary_monsters:skeletosaurus",
    "icon": "legendary_monsters:eye_of_bones",
    "name": "骸骨巨龙",
    "eye_task": "7761FAE443FE8235"
  },
  {
    "quest": "4998A8CF006AA547",
    "task": "5B1D57256A39DD75",
    "reward": "55599BE348BD108B",
    "entity": "legendary_monsters:withered_abomination",
    "icon": "legendary_monsters:eye_of_soul",
    "name": "凋零恶煞",
    "eye_task": "4735E1EEC6FBEE28"
  },
  {
    "quest": "4332BA2043C0AC5A",
    "task": "6261C66B2431035A",
    "reward": "75373B2D4CFFA78C",
    "entity": "legendary_monsters:endersent",
    "icon": "legendary_monsters:eye_of_chorus",
    "name": "紫颂遣使",
    "eye_task": "5FA8231BCDAE7857"
  },
  {
    "quest": "32C26925409EF165",
    "task": "2D7B8EA0B60E360D",
    "reward": "3C40C45048D2C5B2",
    "entity": "legendary_monsters:shulker_mimic",
    "icon": "legendary_monsters:eye_of_shulker",
    "name": "潜影拟态者",
    "eye_task": "777652C53859BD5B"
  },
  {
    "quest": "26D1F85FF1150EC1",
    "task": "1EC519AD002A57D4",
    "reward": "3B6BAA3496CA9EF4",
    "entity": "legendary_monsters:the_obliterator",
    "icon": "legendary_monsters:eye_of_annihilation",
    "name": "湮灭构造体",
    "eye_task": "0DB606A7C111365A"
  }
]
var seBossShopByQuest = {}
seBossShopEntries.forEach(function (entry) { seBossShopByQuest[entry.quest] = entry })

function seBossShopTeam(player) {
    return Java.loadClass('dev.ftb.mods.ftbquests.quest.TeamData').get(player)
}

function seBossShopRequirementsMet(team, quest) {
    var complete = true
    quest.getTasks().forEach(function (task) {
        if (team.getProgress(task) < task.getMaxProgress()) complete = false
    })
    return complete
}

function seBossShopRestoreHistory(player) {
    var team = seBossShopTeam(player)
    if (team == null) return
    var registry = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries').ENTITY_TYPE
    var location = Java.loadClass('net.minecraft.resources.ResourceLocation')
    var stats = Java.loadClass('net.minecraft.stats.Stats')
    team.getFile().getAllChapters().forEach(function (chapter) {
        if (String(chapter.getCodeString()).toUpperCase() !== '5AC1AAB49E672FAA') return
        chapter.getQuests().forEach(function (quest) {
            var entry = seBossShopByQuest[String(quest.getCodeString()).toUpperCase()]
            if (entry == null) return
            var type = registry.get(location.parse(entry.entity))
            if (player.getStats().getKilled(type) > 0) {
                quest.getTasks().forEach(function (task) {
                    if (String(task.getCodeString()).toUpperCase() === entry.task && team.getProgress(task) < 1) team.setProgress(task, 1)
                })
            }
            // Newly added eye tasks must also gate old completed quests; retain every task's progress.
            if (team.isCompleted(quest) && !seBossShopRequirementsMet(team, quest)) {
                team.setCompleted(Java.loadClass('java.lang.Long').valueOf(String(quest.getCodeString()), 16), null)
            }
            if (team.isCompleted(quest)) quest.getRewards().forEach(function (reward) {
                if (String(reward.getCodeString()).toUpperCase() === entry.reward) team.resetReward(player.uuid, reward)
            })
        })
    })
}

seBossShopEntries.forEach(function (entry) {
    FTBQuestsEvents.customReward(entry.reward, function (event) {
        var player = event.player
        var team = seBossShopTeam(player)
        var reward = event.reward
        if (team == null || !team.isCompleted(reward.getQuest()) || !seBossShopRequirementsMet(team, reward.getQuest())) return
        try {
            var level = player.serverLevel()
            var pos = Java.loadClass('dev.ryanhcode.sable.Sable').HELPER.projectOutOfSubLevel(level, player.position())
            var command = 'execute in ' + String(level.dimension) + ' positioned ' + pos.x + ' ' + pos.y + ' ' + pos.z
                + ' rotated ' + player.yaw + ' 0 run summon ' + entry.entity
                + ' ^ ^ ^12 {PersistenceRequired:1b,is_Sleep:0b,is_Awaken:1b,has_necklace:1b,Act:1b,Tags:["skyexplorer_boss_shop"]}'
            player.server.runCommandSilent(command)
        } catch (err) {
            console.error('[Boss summon shop] ' + entry.entity + ': ' + err)
            player.tell('§c本次召唤失败，请查看 KubeJS 日志。')
        }
        // Quest completion remains permanent; reset only this player's reward claim.
        player.server.scheduleInTicks(2, function () { team.resetReward(player.uuid, reward) })
    })
})

PlayerEvents.loggedIn(function (event) {
    var player = event.player
    player.server.scheduleInTicks(40, function () { seBossShopRestoreHistory(player) })
})

// Summon with custom boss NBT skips vanilla finalizeSpawn. Reuse the attribute mod's live rules.
function seBossShopApplyAttributes(entity, preserveRatio) {
    if (entity == null || !entity.getTags().contains('skyexplorer_boss_shop')) return
    var id = String(entity.type)
    var known = seBossShopEntries.some(function (entry) { return entry.entity === id })
    if (!known) return
    try {
        var previousMax = entity.getMaxHealth()
        var previousHealth = entity.getHealth()
        var manager = Java.loadClass('com.mobspawncontroller.command.MobSpawnManager')
        var location = Java.loadClass('net.minecraft.resources.ResourceLocation')
        var maxRule = manager.getAttributeOverride(location.parse(id), location.parse('minecraft:generic.max_health'))
        var controls = []
        if (maxRule != null) entity.getTags().forEach(function (tag) {
            if (String(tag).indexOf('ctrlHealth') === 0) controls.push(String(tag))
        })
        manager.applyAttributeOverrides(entity)
        // InControl stores health multipliers in the base value and marks each rule as already applied.
        // Only after resetting configured health, replay those marked health actions against the new base.
        if (controls.length > 0) {
            controls.forEach(function (tag) { entity.removeTag(tag) })
            var handlers = Java.loadClass('mcjty.incontrol.ForgeEventHandlers')
            var join = Java.loadClass('net.neoforged.neoforge.event.entity.EntityJoinLevelEvent')
            new handlers().onEntityJoinWorld(new join(entity, entity.level, false))
        }
        if ((preserveRatio || previousHealth < previousMax) && previousMax > 0) {
            entity.setHealth(Math.max(0, Math.min(entity.getMaxHealth(), previousHealth * entity.getMaxHealth() / previousMax)))
        }
    } catch (err) {
        console.error('[Boss summon shop attributes] ' + id + ': ' + err)
    }
}

NativeEvents.onEvent('net.neoforged.neoforge.event.entity.EntityJoinLevelEvent', function (event) {
    if (!event.getLevel().isClientSide()) seBossShopApplyAttributes(event.getEntity(), event.loadedFromDisk())
})

// Correct already-loaded shop bosses once on reload, preserving damage and avoiding chunk loads.
ServerEvents.loaded(function (event) {
    var server = event.getServer()
    server.scheduleInTicks(1, function () {
        var levels = server.getAllLevels().iterator()
        while (levels.hasNext()) {
            var entities = levels.next().getAllEntities().iterator()
            while (entities.hasNext()) seBossShopApplyAttributes(entities.next(), true)
        }
    })
})
