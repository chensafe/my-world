# 2026-10-23 追加模组记录

- 来源目录：`D:\my world\待添加mod`
- 目标：
  - 客户端：`D:\my world\SkyExplorer-0.1.3\client\overrides\mods`
  - 服务端：`D:\my world\SkyExplorer-0.1.3\server\mods`

## 追加文件

| 模组 | 文件 | 版本 | 大小 | SHA256 |
|---|---|---|---:|---|
| Applied Energistics 2 | `[应用能源2] appliedenergistics2-19.2.18.jar` | 19.2.18 | 8,236,552 | `df15a07f86ca1ca93aa66373f9d5d84dd3d4586631fceb38f4fbc85dad591e39` |
| GuideME | `guideme-21.1.19.jar` | 21.1.19 | 9,311,992 | `2ce254edb931c3c3cf81d69abaf8f4ce5b871bf85e64984f366bf044173bd66a` |
| AE2:Crafting Tree | `[合成树] ae2ct-1.21.1-1.1.1.jar` | 1.21.1-1.1.1 | 437,906 | `70a704742cf8bc13778a201a2338d0f4108dc0700bca47ed265aba02180f6777` |
| Yes Steve Model | `[是，史蒂夫模型] ysm-2.6.5-neoforge+mc1.21.1-release.jar` | 2.6.5-neoforge+mc1.21.1 | 63,463,229 | `b285c73d4ec010d9a9be3c53c1bee890cf269645be5f1bcf1c27a2e8e82807cb` |

## 依赖链

- `ae2ct` 需要 `ae2 >= 19.0.16`，当前为 19.2.18。
- `ae2` 需要 `guideme >= 21.1.1`，当前为 21.1.19。
- 四者的 Minecraft 版本声明均为 `1.21.1`；NeoForge 范围覆盖当前 `21.1.249`。
- 四个 jar 的修改目标 side 均为 `BOTH`，因此客户端和服务端都放置同一文件。
- `yes_steve_model` 的 Iris 依赖为客户端可选依赖；客户端已有 Iris，服务端不需要 Iris。

## 追加后状态

- 客户端本地 jar：18 个；客户端总模组数：210（192 个清单模组 + 18 个本地 jar）。
- 服务端 jar：177 个。
- 服务端 `文件校验清单.json`：7,450 条，当前实际文件 7,451 个；除清单自身外全部匹配。
- 服务端总大小：约 1,381.96 MiB。
- 客户端发行总量：约 1,258.68 MiB（清单 684.56 MiB + `overrides` 574.12 MiB）。

## 验证

- 4 个 jar 的 ZIP 完整性检查通过。
- 客户端与服务端同名文件 SHA256 一致。
- 递归解析服务端 jar（含嵌套 jar）后，必需依赖缺失数为 0。
- 本轮未启动客户端或服务端，未做运行时兼容性、联机或性能测试。
