# SkyExplorer 0.1.3 客户端/服务端探索基线

> 注：本文记录的是追加 AE2、GuideME、AE2CT、YSM 之前的 0.1.3 基线；追加记录见 `2026-10-23-add-ae2-guideme-ae2ct-ysm.md`。

- 生成日期：2026-10-23
- 工作区：`D:\my world`
- 对象：`SkyExplorer-0.1.3/client`、`SkyExplorer-0.1.3/server`
- 本轮性质：只读静态检查；未启动游戏/服务端，未做联机、性能采样或长期运行测试。
- 说明：本文只记录现状、结构、引用和文件级验证结果，不做风险收益判断。

## 1. 版本与体量

| 项目 | 客户端 | 服务端 |
|---|---:|---:|
| 声明版本 | `modrinth.index.json` 的 `versionId = 1.0.0` | `整合包版本.json` 的 `0.1.3` |
| Minecraft | 1.21.1 | 1.21.1 |
| NeoForge | 21.1.249 | 21.1.249 |
| Java 要求 | 21 | 21 |
| 文件数 | 7,300（含清单） | 7,447 |
| 总量 | 约 1,181.01 MiB（清单下载 684.56 + `overrides` 496.44） | 约 1,304.28 MiB |
| 目录结构 | Modrinth 清单 + `overrides` | 完整服务端发行目录 |

服务端目录的主要体量：

| 目录 | 文件数 | 大小 |
|---|---:|---:|
| `mods` | 173 jar | 691.82 MiB |
| `libraries` | 102 个文件，其中 94 jar | 175.79 MiB |
| `config` | 1,713 | 255.61 MiB |
| `kubejs` | 1,016 | 55.14 MiB |
| `tacz` | 3,153 | 85.51 MiB |
| `tlm_custom_pack` | 1,261 | 37.73 MiB |

客户端 `overrides` 的主要体量：

| 目录 | 文件数 | 大小 |
|---|---:|---:|
| `config` | 1,817 | 255.83 MiB |
| `kubejs` | 1,019 | 55.14 MiB |
| `tacz` | 3,153 | 85.51 MiB |
| `tlm_custom_pack` | 1,261 | 37.73 MiB |
| `mods` | 14 jar | 53.94 MiB |
| `config/quest_enhance` | 292 | 205.00 MiB |
| `config/visual_loot_edit` | 962 | 29.85 MiB |

## 2. 客户端结构

### 2.1 Modrinth 清单

`client/modrinth.index.json`：

- `formatVersion = 1`，`game = minecraft`
- `name = SkyExplorer`
- `versionId = 1.0.0`
- 没有 `versionNumber`
- 依赖：`minecraft = 1.21.1`、`neoforge = 21.1.249`
- 195 个下载项，684.56 MiB：
  - 192 个模组：679.01 MiB
  - 2 个光影包：4.70 MiB
  - 1 个资源包：0.85 MiB
- 所有下载 URL 均为 HTTPS；路径均为相对路径，无 `..` 或绝对路径
- 文件条目没有 `env` 字段；客户端专属/服务端适配信息没有在清单中显式标注

### 2.2 模组总数和两端关系

- 客户端总计 206 个模组：192 个清单模组 + 14 个 `overrides/mods` 本地 jar。
- 服务端 173 个模组全部能在客户端找到同名文件。
- 服务端 173 个模组中：
  - 160 个来自客户端 Modrinth 清单；文件名和大小完全一致。
  - 13 个来自客户端 `overrides/mods`；SHA256 完全一致。
- 客户端另有 33 个不在服务端的模组：
  - 32 个来自 Modrinth 清单。
  - 1 个为 `zoomify-neoforge-1.4.0.jar`（客户端本地 jar）。
- 因此：服务端模组集合是客户端模组集合的真子集，而不是两端各自独立维护。

### 2.3 33 个客户端独有模组

清单中独有：

`JEI`、`Xaero 世界地图`、`XaeroPlus`、`Xaero 小地图`、`加速渲染`、`加速碰撞`、`EntityCulling`、`AsyncParticles`、`BetterF1`、`BetterF3`、`Mod Menu`、`物品图标导出器`、`网络音乐机：登登你的`、`I18nUpdateMod`、`AppleSkin`、`IMBlocker`、`JECharacters`、`Flerovium`、`Sodium`、`Mouse Tweaks`、`Better Advanced Tooltips`、`ColorWheel`、`CreateBetterFPS`、`ImmediatelyFast`、`Immersive Overlays`、`Iris`、`Item Descriptions`、`Ixeris`、`Roxy`、`Smooth F5`、`Visual Keybinder`、`Voxy`。

`overrides/mods` 中独有：`Zoomify`。

这些模组的主要方向是地图、JEI、界面/输入、汉化、渲染和客户端性能辅助；是否真正只能放在客户端，仍应以各模组元数据和实际服务端启动日志为准。

### 2.4 资源包和光影

- `overrides/resourcepacks`：3 个本地资源包，5.11 MiB。
- `overrides/shaderpacks`：
  - `Bliss-Shader-Unstable.zip` 完整文件；
  - BSL、Photon 由 Modrinth 清单下载；目录中另有对应的 `.zip.txt` 说明/占位文件。
- `options.txt` 中启用的资源包包括：
  - `Minecraft-Mod-Language-Modpack-Converted-1.21.1.zip`
  - `Aero-HotAir-Discard.zip`
  - `create_mcGUI_1.0.0.zip`
  - `primal个人汉化.zip`
- `config/iris.properties`：`enableShaders=true`，当前 `shaderPack=BSL_v10.1.1.zip`，`maxShadowRenderDistance=32`。

### 2.5 客户端个人化状态

`options.txt` 中包含明显的本机/个人设置，例如：

- `fullscreen=true`
- `guiScale=5`
- `fov=0.0`
- `maxFps=260`
- `renderDistance=12`
- `simulationDistance=12`
- `particles=0`
- `soundDevice="OpenAL Soft on 头戴式耳机..."`

`PCL/Setup.ini` 记录 PCL 启动器配置：Minecraft 1.21.1、NeoForge 21.1.249；`PCL/config.json` 仅包含 `InstanceMigratedJava: true`。

## 3. 服务端结构

### 3.1 启动链

- `启动服务端.bat` -> `start.bat` -> Java 直接启动 NeoForge `21.1.249`。
- `start.bat` 使用 `java` 或 `JAVA_HOME`，也支持 `java_path.txt`；它执行 `java -version` 检查命令是否可用，但没有解析 Java 主版本。
- `start.sh` 使用 `java` 或 `JAVA_HOME`，直接 `exec`，未执行版本探测。
- `user_jvm_args.txt`：`-Xms2G`、`-Xmx8G`、`-Dfile.encoding=UTF-8`。
- `libraries/.../win_args.txt` 引用 66 个库 jar，全部存在；`unix_args.txt` 也存在且同样大小。
- `eula.txt` 已预置 `eula=true`。
- 当前服务端根目录没有 `world`、`logs`、`crash-reports`、`ops.json`、`whitelist.json`、`banned-*` 或 `usercache.json`。

### 3.2 `server.properties`

当前仅显式写入：

- `server-port=25565`
- `online-mode=true`
- `level-name=world`
- `motd=SkyExplorer 0.1.3`
- `view-distance=6`
- `simulation-distance=4`
- `max-players=10`
- `allow-flight=true`
- `spawn-protection=0`
- `max-tick-time=180000`

其余属性采用服务端/NeoForge 默认值。

### 3.3 世界生成与预生成

- `Tectonic`：`max_y=768`、`min_y=-64`、`vertical_scale=2.5`、`elevation_boost=1.6`、`ultrasmooth=true`、`snow_start_offset=512`。
- `Terralith`：`custom_structures=true`、`skylands=true`、`terrain_slabs=true`、`vanilla_stone_gen=false`。
- `byepregen.toml`：所有可调项均为 `Default`。
- `chunky/config.json`：`continueOnRestart=false`、`forceLoadExistingChunks=false`、`silent=false`、`updateInterval=1`；包内没有预生成任务文件。
- `C2ME`：除 `version=3` 外，其余配置项均为 `default`。
- `VSS` 服务配置 `vss-server-config.yaml`：
  - `service.enabled=true`
  - `generation.enabled=false`
  - 默认 LOD 半径：主世界 512、下界 64、末地 512
  - 并发生成上限：全局 40、每玩家 40
  - LOD 存储启用，`max_size_mib=0`（不限）
  - 带宽：每玩家 25 MiB/s、全局 75 MiB/s
  - 远玩家：`mode=on`，`update_interval_ticks=10`，`max_blocks=2048`
- 同时还存在 `voxy_server_lod-common.toml`，其中是 `lod_radius=96`、`lod_radius_max=96`、`lod_chunks_per_tick=4`、`lod_generation_mode=disk_only`。这形成了两套 LOD 参数文件，实际加载链需要在后续运行时确认。

### 3.4 生物与健康值控制层

- `config/mobspawncontroller/rules.json`：209 个实体规则，208 个最大生命值规则，24 个 vanilla spawn 规则，28 个 extra spawn 规则；最大生命值范围 15 到 150,000。
- `config/incontrol/spawn.json`：对 `legendary_monsters` 设置 `healthmultiply=8.0`。
- KubeJS 还单独处理：
  - 末影结构实体：服务端脚本固定 `cataclysm:ender_guardian=90000`、`cataclysm:ender_golem=10000`；
  - Boss 召唤商店：加入实体后按 MobSpawnController 当前规则重新应用属性；
  - 工程师酒狐：按好感度四档设置 200/350/500/650 生命上限；
  - 食物生命：`solcarrot-server.toml` 中 `heartsPerMilestone=1`，KubeJS 按所有可选食物自动生成 milestones。

当前 MobSpawnController 规则中末影守卫为 90,000、末影傀儡为 10,000，与服务端脚本的硬编码值一致。

## 4. 两端一致性

### 4.1 共享目录对比

| 目录 | 客户端 | 服务端 | 共同文件 | 完全相同 | 内容不同 | 客户端独有 | 服务端独有 |
|---|---:|---:|---:|---:|---:|---:|---:|
| `config` | 1,817 | 1,713 | 1,713 | 1,712 | 1 | 104 | 0 |
| `kubejs` | 1,019 | 1,016 | 1,016 | 1,015 | 1 | 3 | 0 |
| `defaultconfigs` | 2 | 2 | 2 | 2 | 0 | 0 | 0 |
| `tacz` | 3,153 | 3,153 | 3,153 | 3,153 | 0 | 0 | 0 |
| `tlm_custom_pack` | 1,261 | 1,261 | 1,261 | 1,261 | 0 | 0 | 0 |
| `ldlib2` | 4 | 4 | 4 | 4 | 0 | 0 | 0 |
| `piq-fc` | 1 | 1 | 1 | 1 | 0 | 0 | 0 |
| `schematics` | 9 | 9 | 9 | 9 | 0 | 0 | 0 |
| `Sable-Schematics` | 2 | 2 | 2 | 2 | 0 | 0 | 0 |
| `enxv_aeronautics_structures` | 1 | 1 | 1 | 1 | 0 | 0 | 0 |

客户端另有 `data`、`fancymenu_data`、`PCL`、`resourcepacks`、`shaderpacks`；服务端另有 `libraries`。

### 4.2 明确的内容差异

1. `config/ftbquests/quests/lang/zh_cn.snbt`
   - 客户端比服务端多一行任务描述文本：`诗梦铭卿`。
   - 客户端 2,302 行，服务端 2,301 行。

2. `kubejs/server_scripts/lesiry_ender_structure_health.js`
   - 客户端版本：读取 MobSpawnController 的实时 `minecraft:generic.max_health` 规则，对所有 `cataclysm:` 实体应用。
   - 服务端版本：硬编码只处理 `cataclysm:ender_guardian` 和 `cataclysm:ender_golem`，固定为 90,000 和 10,000。
   - 当前配置下两者对这两个实体的数值一致，但实现方式不同。

3. `kubejs/client_scripts/`
   - 客户端有 3 个脚本：`lesiry_goggles_curios.js`、`lesiry_voxy_distantgen.js`、`main.js`。
   - 服务端没有 `client_scripts` 目录，这符合客户端/服务端分工。

4. 配置侧
   - 104 个客户端专属配置，主要是 JEI、Xaero、`*-client.toml`、渲染/输入/界面配置。
   - 服务端没有服务端独有配置文件；服务端配置都能在客户端找到。

## 5. KubeJS、任务和玩法链

### 5.1 KubeJS 文件

- 服务端 KubeJS：27 个 JS（16 个 startup、11 个 server），另有 1,016 个数据/资源文件。
- 客户端 KubeJS：30 个 JS（服务端同源 27 个 + 3 个 client_scripts）。
- 30 个 JS 经 Node `--check` 语法检查全部通过。
- 脚本中的 47 个贴图路径全部能在 `kubejs/assets` 找到。

### 5.2 任务书

- 54 个章节文件，9 个章节组，合计约 2,016 个 quest。
- `data.snbt`：
  - `progression_mode="linear"`
  - `default_autoclaim_rewards="disabled"`
  - `drop_book_on_death=false`
  - `detection_delay=20`
  - `emergency_items_cooldown=300`
- 9 个章节组：
  - 品味万物
  - 武器与防具
  - 生机万物
  - 跟boss打八角笼
  - 不得不品的机械动力
  - 何为旅途
  - 娱乐项目
  - 购物商店
  - 实用物品与量产材料

### 5.3 脚本引用完整性

- 20 个 Boss 召唤商店条目：quest/task/reward/eye_task 的硬编码 ID 全部能在章节 SNBT 中找到。
- 2 个 VSS 奖励 ID 全部存在。
- 78 个野生动物图鉴条目：对应的 78 个 advancement 文件全部存在。
- 203 个 `quest_enhance:` 贴图引用全部解析成功。
- 任务章节中的 232 个贴图引用中，229 个资源位于本地，3 个来自原版/其他模组资源（Quark、FTBLibrary、Minecraft）。

### 5.4 战利品表的两段式结构

- `kubejs/data/lesiry_exploration/loot_table/`：247 个 JSON，全部是 `pools: []` 的空表。
- `config/visual_loot_edit/data/lesiry_exploration/loot_table/`：247 个同名 JSON，内容是完整战利品表。
- `Visual Loot Edit` 的 `LootTableEventHandler` 在 `LootTableLoadEvent` 读取 `config/visual_loot_edit/data/<namespace>/loot_table/<path>.json`，并用配置的 `pools` 替换当前表。
- 因此这里是“KubeJS 空表 + Visual Loot Edit 事件替换”的两段式设计，而不是两份随机保留的重复文件。

### 5.5 TaCZ 和角色包

- `tacz/tacz_default_gun`：
  - 54 个 gun index
  - 24 个 ammo index
  - 99 个 attachment index
  - 3 个 block index
  - 3,150 个文件，76.70 MiB
- `tacz/create.zip`：521 个条目，解压 9.04 MiB。
- `tacz/cataclysm.zip`：250 个条目，解压 2.73 MiB。
- `.export-state.json` 记录默认枪包的导出状态。
- `tlm_custom_pack/touhou_little_maid-1.0.0`：1,260 个文件，37.37 MiB。
- `tlm_custom_pack/engineer_winefox-1.0.1.zip`：22 个条目，解压 3.4 MiB。

## 6. 资源、重复内容和未引用候选

### 6.1 大资源目录

- `config/quest_enhance`：292 个文件、205.00 MiB；其中 227 张 PNG、65 个 `.mcmeta`；227 张图合计约 352.91 百万像素，110 张为 1254×1254。
- `config/visual_loot_edit`：962 个文件、29.85 MiB；959 个 JSON 数据表，另有 `pack.mcmeta`、`blacklists.json` 和 1 个备份。
- `config/fancymenu`：21 个文件、15.4 MiB；2 张 PNG，其中 1 张为 3840×2036、13.41 MiB。
- `kubejs/assets`：118 个文件、25.65 MiB；77 张 PNG、31 个 `.mcmeta`、10 个 JSON。
- `kubejs/data`：867 个文件、29.43 MiB；435 个 JSON、432 个 NBT。

### 6.2 同内容重复统计

按 SHA256 对文件内容分组：

- 服务端：457 个重复组，重复内容约 21.98 MiB。
  - `config` 约 16.97 MiB
  - `tacz` 约 4.02 MiB
  - `kubejs` 约 0.72 MiB
  - `tlm_custom_pack` 约 0.24 MiB
- 客户端 `overrides`：470 个重复组，重复内容约 22.01 MiB。
  - `config` 约 17.00 MiB
  - `tacz` 约 4.02 MiB
  - `kubejs` 约 0.72 MiB
  - `tlm_custom_pack` 约 0.24 MiB

这些数字是“同内容文件”的统计，不表示可以直接删除；尤其是 Visual Loot Edit 的 variants/original 表、TaCZ 复用音效，需要结合实际加载路径判断。

### 6.3 静态未直接引用候选

- `quest_enhance`：按任务章节 SNBT 直接字符串引用扫描，24 张 PNG 没有被直接引用，合计 15.08 MiB。
- `kubejs/assets/lesiry/textures/gui/food_journal`：6 张大图没有在服务端文本配置中直接出现，合计约 6.33 MiB：
  - `banner_v1.png`
  - `v2/background.png`
  - `v2/sticker_harvest.png`
  - `v2/sticker_tea.png`
  - `v2/sticker_sweets.png`
  - `v2/sticker_wine.png`
- 这 6 张图可能由客户端 UI 代码动态加载，静态字符串扫描不能单独证明未使用。

## 7. 文件级验证结果

| 检查 | 结果 |
|---|---|
| 服务端 SHA256 校验清单 | 7,446 条，缺失 0，内容不匹配 0；仅清单自身不列入 |
| 服务端 jar | 267 个 jar 全部可打开，无坏 ZIP 条目 |
| 客户端本地 jar | 14 个全部可打开 |
| 客户端 zip | 7 个全部可打开 |
| 服务端 NBT | 445 个，443 个 gzip、2 个原始 NBT；头部检查无坏文件 |
| 服务端 PNG | 1,432 个，PNG 签名/IHDR 全部通过 |
| 服务端 OGG | 1,779 个，OggS 头部全部通过 |
| 服务端 TOML | 337 个全部可被 TOML 解析器读取 |
| SNBT 括号平衡 | 服务端 63 个、客户端 67 个，全部平衡 |
| KubeJS JS 语法 | 30 个，Node `--check` 全部通过 |
| 严格 JSON | 5,761 个可严格解析；320 个 `.json` 不符合严格 JSON，抽查为 JSON5/带注释/未加引号键风格；JSON5 语义未全量解析 |
| YAML | 未做全量解析，环境中没有 PyYAML；仅人工读取了 `vss-server-config.yaml` 的关键段 |

## 8. 服务端启动与运行状态

- 当前目录没有 `world`、`logs` 或崩溃报告，因此无法独立复核随包文档中所说的“新世界启动、save-all flush、stop 保存退出、同世界重启”过程。
- 没有 `ops.json`、`whitelist.json`、`banned-*` 或 `usercache.json`，是干净的服务端初始目录。
- 本轮未运行服务端，因此没有新的启动日志、TPS/MSPT、内存、联机或长时间运行数据。

## 9. 后续可继续核对的事项

以下仅为后续检查入口，不含风险收益判断：

1. 统一客户端清单的 `versionId` 与整合包版本号（当前 1.0.0 / 0.1.3）。
2. 确认 `lesiry_ender_structure_health.js` 两端版本的同步策略；当前数值一致，但实现路径不同。
3. 确认 VSS 实际读取的是 `vss-server-config.yaml` 还是 `voxy_server_lod-common.toml`，或两者分别由不同组件读取。
4. 记录 Visual Loot Edit 的 variants/original/rich_v2 生成规则，后续修改战利品表时避免把“同内容副本”当作独立数据源。
5. 对 24 张 quest_enhance PNG 和 6 张 food_journal PNG 做 UI/模型引用追踪，确认是否为存档资源。
6. 明确服务端为何需要携带 `fancymenu`、`quest_enhance`、`kubejs/assets` 等客户端可见资源。
7. 明确客户端 `overrides/mods` 的 14 个本地 jar 是否需要纳入独立的 hash/版本清单。
8. 在后续运行时采集中补齐启动、任务、Boss、VSS、战利品和多人场景的实际日志。
