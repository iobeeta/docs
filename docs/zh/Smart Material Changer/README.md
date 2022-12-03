# Smart Material Changer

版本: 1.14

## 用户导引

### 简介

这是基于对话框菜单的纹理替换。它可以管理同一个链接集中多个prims的多个面。 无论是家具、汽车、飞机、衣服、玩具……

高效便捷，一个统一的规划让复杂的事情变得简单

### 快速开始。按照这个，一步一步

1. 准备好你的对象，它可以是prim、mesh或它们的linkset。
2. 分别命名，相同纹理的部分可以有相同的名称。
3. 根据您的想法，根据颜色、样式、主题、主题等规划您的纹理组。 将它们写入配置文件。
4. 将脚本和配置文件放入对象中，可以是根 prim 或 子prim。
5. 点击它开始使用。

## 示例

### 简单的例子

```lsl
PART A|a|0|ALL_SIDES
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||
```

|||
|---|---|
| ![img/E1-1.png](img/E1-1.png) | ![img/E1-2.png](img/E1-2.png) |
| 1. 单物件名为"a", 点击 | 2. 选择"A" |
| ![img/E1-3.png](img/E1-3.png) | ![img/E1-4.png](img/E1-4.png) |
| 3. 选择"RED" | 4. a所有面都应用了RED贴图 |

### 在Linkset中

脚本在主Prim，控制多个物件、多个面

```lsl
PART A|a|0|ALL_SIDES
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||

PART B|b|0|3
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||
```

```PART B|b|0|3``` 控制名为"b"的物件中第3个面

|||
|---|---|
| ![img/E2-1.png](img/E2-1.png) | ![img/E2-2.png](img/E2-2.png) |
| 1. Linkset包含"a"和"b", 脚本在主prim, 点击 | 2. 选择"B" |
| ![img/E2-3.png](img/E2-3.png) | ![img/E2-4.png](img/E2-4.png) |
| 3. 选择"RED" | 4. b的第3个面应用了RED贴图 |

### 多个同名子prim

配置同上面的例子, 我们再创建一个盒子, 名字也是"b", 并把它连接。
执行同样的操作

|||
|---|---|
| ![img/E3-1.png](img/E3-1.png) | ![img/E3-2.png](img/E3-2.png) |
| 1. Linkset包含"a"和两个"b" | 2. 同样的操作, 所有"b"的第3个面都被应用了RED |

### 脚本在子prim

同时，主prim也有其它点击弹出菜单的情况下

配置同上, 依然是包含"a"和"b"两个成员的linkset, "a"为主prim, 让我们把"a"中的所有脚本, 放入子prim:"b"中

|||
|---|---|
| ![img/E4-1.png](img/E4-1.png) | ![img/E4-2.png](img/E4-2.png) |
| 1. 点击"a", 弹出菜单 | 2. 点击"b", 弹出两个菜单 |

此时打开配置文件，更改配置
加入 ```PASS_TOUCHS 2```

```lsl
PASS_TOUCHS 2

PART A|a|0|ALL_SIDES
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||

PART B|b|0|3
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||
```

|||
|---|---|
| ![img/E4-3.png](img/E4-3.png) ||
| 此时, 点击"b", 只弹出属于"b"的菜单 ||

### 套装

设置```MENU_OPTION_SETS```以开启套装

下面代码中 PART A 包括 Default, RED, GREEN, PART B 包括 Default, RED, BLUE, 套装中将自动生成贴图方案包括: Default, RED, GREEN, BLUE

点击它们将会对自己所关联的PART生效。

- Default, RED 对名为 a 的全部面和名为 b 的第3个面有效
- GREEN 只对 a 的全部面有效
- BLUE 只对 b 第3个面有效

```lsl
MENU_OPTION_SETS [THEMES]

PART A|a|0|ALL_SIDES
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||

PART B|b|0|3
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET BLUE|2ddd156d-8107-6761-9b54-7165ec249704||
```

|||
|---|---|
| ![img/E5-1.png](img/E5-1.png) | ![img/E5-2.png](img/E5-2.png) |
| 1. 点击"a", 弹出菜单 | 2. 点击"\[THEMES\]", 展示方案列表 |
| ![img/E5-3.png](img/E5-3.png) | ![img/E5-4.png](img/E5-4.png) |
| 点击"RED" | 点击"GREEN" |
| ![img/E5-5.png](img/E5-5.png) | ![img/E5-6.png](img/E5-6.png) |
| 点击"BLUE" | 点击"Default" |

### 自定义套装列表

配置```SETS```选项

下面代码中，套装菜单只包括RED，BLUE两个选项，如果想使用Default与RED需要进入PART

```lsl
MENU_OPTION_SETS [THEMES]
SETS RED|BLUE

PART A|a|0|ALL_SIDES
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||

PART B|b|0|3
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET BLUE|2ddd156d-8107-6761-9b54-7165ec249704||
```

|||
|---|---|
| ![img/E6-1.png](img/E6-1.png) | ![img/E6-2.png](img/E6-2.png) |
| 1. 点击"a", 弹出菜单 | 2. 点击"\[THEMES\]", 展示方案列表 |

## 配置信息

### LOADING_TEXT

加载进度浮动文本展示

- 类型: integer
- 取值:
  - 0: 关闭
  - 1: 开启
- 默认: 0

```lsl
LOADING_TEXT 0
```

### LOG_LEVEL

日志输出级别

- 类型: integer
- 取值:
  - 0: 静默
  - 1: 显示用户级别提示
  - 2: Debug调试
- 默认: 0

```lsl
LOG_LEVEL 0
```

### MENU_TEXT_PARTS

部件菜单提示文字

- 类型: string
- 默认: 空字符串

```lsl
MENU_TEXT_PARTS 部件:
```

### MENU_TEXT_SETS

贴图方案菜单提示文字

- 类型: string
- 默认: 空字符串

```lsl
MENU_TEXT_SETS 配色:
```

### TOUCH

是否可以通过点击弹出菜单

- 类型: integer
- 取值:
  - 0: 否
  - 1: 是
- 默认: 1

```lsl
TOUCH 1
```

### PASS_TOUCHS

设置 prim 的 pass-touches 属性。 单击 子prim 时会弹出多个菜单，这很有用。

请参考: [https://wiki.secondlife.com/wiki/LlPassTouches](https://wiki.secondlife.com/wiki/LlPassTouches)

- 类型: integer
- 取值
  - 0: 如果 prim 中没有处理事件的脚本，则传递给根prim。
  - 1: 触摸总是传递给根prim。
  - 2: 触摸永远不会传递给根prim。
- 默认值: 0

```lsl
PASS_TOUCHS 0
```

### OWNER_ONLY

只有所有者可以点击

- 类型: integer
- 取值:
  - 0: 否
  - 1: 是
- 默认: 1

```lsl
OWNER_ONLY 1
```

### REMEMBER_MENU_STATS

记忆菜单状态，下一次菜单弹出时将展示之前关闭时的状态。

- 类型: integer
- 取值:
  - 0: 否
  - 1: 是
- 默认: 0

```lsl
REMEMBER_MENU_STATS 0
```

### CHANNEL_LOCAL_MENU

本地频道唤起弹出菜单，不为"0"时生效

- 类型: integer
- 取值:
  - 0: 无效
  - 不为 0: 有效
- 默认: 0

```lsl
CHANNEL_LOCAL_MENU 0
```

### CHANNEL_LOCAL_MENU_BACK

本地频道返回上一级菜单，上一级菜单需要通过本地消息监听本频道，不为"0"时生效。

当本项目配置之后，它将作为 PART 菜单的选项显示在菜单中，显示为 "[^] BACK"。

- 类型: integer
- 取值:
  - 0: 无效
  - 不为 0: 有效
- 默认: 0

```lsl
CHANNEL_LOCAL_MENU_BACK 0
```

### CHANNEL_LOCAL_SYNC

本地接收以应用套装，用于接收 CHANNEL_LOCAL_BOARDCAST 的广播数据，不为"0"时生效。

**注意！无论本体或多层使用，CHANNEL_LOCAL_SYNC 与 CHANNEL_LOCAL_BOARDCAST 不可形成闭环！切记！**

- 类型: integer
- 取值:
  - 0: 无效
  - 不为 0: 有效
- 默认: 0

```lsl
CHANNEL_LOCAL_SYNC 0
```

### CHANNEL_LOCAL_BOARDCAST

本地频道广播套装，会被同值的 CHANNEL_LOCAL_SYNC 接收，不为"0"时生效

**注意！无论本体或多层使用，CHANNEL_LOCAL_SYNC 与 CHANNEL_LOCAL_BOARDCAST 不可形成闭环！切记！**

- 类型: integer
- 取值:
  - 0: 无效
  - 不为 0: 有效
- 默认: 0

```lsl
CHANNEL_LOCAL_BOARDCAST 0
```

### MENU_OPTION_SETS

套装选项名称，用于批量生效多个部件的某一种贴图方案。

当本项目配置之后，它将作为 PART 菜单的选项显示在菜单中，并会自动生成或根据SETS关键词构建套装列表。

- 类型: string
- 默认: 空字符串

```lsl
MENU_OPTION_SETS [set name]
```

### SETS_ON_TOP

是否将套装列表菜单作为顶层菜单，必须设置 MENU_OPTION_SETS 本项才会生效。

当本项目开启之后，将使用套装列表菜单代替顶层菜单，另外，顶部菜单中配置的 BUTTON 自定义菜单将无法显示。

- 类型: integer
- 取值:
  - 0: 否
  - 1: 是
- 默认: 0

### SETS

自定义的套装列表

以MENU_OPTION_SETS为入口，进入后显示此列表。

如果未设置或为空字符串，将会自动生成列表，包括所有 PART 中的全部 SET 关键字。

- 类型: string
- 默认: 空字符串

```lsl
SETS RED|GREEN
```

### PART

部件，同一个linkset中可以有多个同名物体，他们都会被匹配并替换

- 参数 1:
  - 类型: string
  - 取值: 部件名称（菜单展示名）
- 参数 2:
  - 类型: string
  - 取值: 物体实际名称。
    - 可使用关键字: LINK_THIS、LINK_ROOT、LINK_SET、LINK_ALL_CHILDREN、LINK_ALL_OTHERS，设置下一个参数为"3"时可生效
- 参数 3:
  - 类型: integer
  - 取值:
    - 0: 完整匹配物体名称
    - 1: 当做前缀来匹配物体名称
    - 2: 当做后缀来匹配物体名称
    - 3: 系统常量（如果命中常量，若未命中按字符串处理，同 0）
  - 默认: 0
- 参数 3:
  - 类型: integer
  - 取值: 0 ~ 7 和 -1(ALL_SIDES)

```lsl
PART OBJ_1|object name 1|0|ALL_SIDES
```

### PART*

与 PART 都表示一个部件，不同的是PART*并不会显示在部件菜单中。套装对此部件有效。

```lsl
PART* OBJ_2|object name 2|0|ALL_SIDES
SET RED|TEXTURE_BLANK|NULL_KEY|NULL_KEY
SET GREEN|TEXTURE_BLANK|NULL_KEY|NULL_KEY
```

### SET

配色/贴图方案

贴图可使用SL常量包括 TEXTURE_BLANK, TEXTURE_DEFAULT, TEXTURE_TRANSPARENT, TEXTURE_PLYWOOD, NULL_KEY。

当然您也可以直接使用他们对应的UUID

详见: [https://wiki.secondlife.com/wiki/Category:LSL_Constants](https://wiki.secondlife.com/wiki/Category:LSL_Constants)

SET是PART部件菜单的子选项，贴图方案SET必须跟随在某一个部件PART之后，它们作为PART的下一级菜单展示。

- 参数 1, 名称:
  - 类型: string
  - 取值: 方案名称
- 参数 2, diffuse 漫反射贴图:
  - 类型: string
  - 取值: UUID / NULL_KEY / 空字符串
- 参数 3, normal 法线贴图:
  - 类型: string
  - 取值: UUID / NULL_KEY / 空字符串
- 参数 4, specular 光泽贴图:
  - 类型: string
  - 取值: UUID / NULL_KEY / 空字符串
- 参数 5, 颜色:
  - 类型: vector
  - 取值: 颜色格式的字符串, 如: <1.0, 0.5, 0.0>
- 参数 6, 透明度:
  - 类型: float
  - 取值: 0.0 ~ 1.0, 0.0(淡) <=> 1.0(浓)
- 参数 7, 发光:
  - 类型: float
  - 取值: 0.0 ~ 1.0, 0.0(无) <=> 1.0(亮)
- 参数 8, 全亮模式:
  - 类型: string
  - 取值: 0/1 或者 FALSE/TRUE

***如果某个贴图的UUID留空，它将会被忽略（保持之前的贴图不变），如果想覆盖失效某个贴图，请使用 NULL_KEY。**

```lsl
SET RED|TEXTURE_BLANK|NULL_KEY|NULL_KEY|<1.0, 0.0, 0.0>|1.0|0.0|TRUE
SET GREEN|TEXTURE_BLANK||
SET BLUE|TEXTURE_BLANK|||<0.0, 0.0, 1.0>||0.05
```

### BUTTON

自定义菜单

与 PART 显示在同一级菜单中，点击可发送本地消息。

第三个参数可以"\|"分隔

- 参数 1:
  - 类型: string
  - 取值: 按钮名称
- 参数 2:
  - 类型: integer
  - 取值: 除了 0
- 参数 3: (非必需)
  - 类型: string
- 更多...

```lsl
BUTTON MORE|100|arg1|arg2|arg3|...
BUTTON MORE|100|
```
