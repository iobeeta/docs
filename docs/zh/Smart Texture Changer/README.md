# Smart Texture Changer

## 配置信息

### 日志输出级别

- 取值: 0(静默), 15(info), 31(debug), 63(trace/全部)
- 默认: 0

```lsl
LOG_LEVEL 0
```

### 部件菜单提示文字

- 默认: 空字符串

```lsl
MENU_TEXT_PARTS PART
```

### 贴图方案菜单提示文字

- 默认: 空字符串

```lsl
MENU_TEXT_SETS SET
```

### 是否可以通过点击弹出菜单

- 取值: 0(否), 1(是)
- 默认: 1

```lsl
TOUCH 1
```

### 点击行为属性

当本脚本在子prim中, 有点击弹出菜单行为时会用到

- 取值: 0, 1, 2
- 默认: 0
- 详见 [https://wiki.secondlife.com/wiki/LlPassTouches](https://wiki.secondlife.com/wiki/LlPassTouches)

```lsl
PASS_TOUCHS 0
```

### 只有所有者可以点击

- 取值: 0(否), 1(是)
- 默认: 1

```lsl
OWNER_ONLY 1
```

### 本地频道唤起弹出菜单

不为"0"时生效

- 取值: −2147483648 ~ +2147483647
- 默认: 0

```lsl
CHANNEL_LOCAL_MENU 0
```

### 本地频道返回上一级菜单

上一级菜单需要通过本地消息监听本频道，不为"0"时生效

- 当本项目配置之后，它将作为 PART 菜单的选项显示在菜单中，显示为 "[^] BACK"
- 取值: −2147483648 ~ +2147483647
- 默认: 0

```lsl
CHANNEL_LOCAL_MENU_BACK 0
```

### 本地接收以应用套装

用于接收 CHANNEL_LOCAL_BOARDCAST 的广播数据，不为"0"时生效

- 注意！无论本体或多层使用，CHANNEL_LOCAL_SYNC 与 CHANNEL_LOCAL_BOARDCAST 不可形成闭环！切记！
- 取值: −2147483648 ~ +2147483647
- 默认: 0

```lsl
CHANNEL_LOCAL_SYNC 0
```

### 本地频道广播套装

会被同值的CHANNEL_LOCAL_SYNC接收，不为"0"时生效

- 注意！无论本体或多层使用，CHANNEL_LOCAL_SYNC 与 CHANNEL_LOCAL_BOARDCAST 不可形成闭环！切记！
- 取值: −2147483648 ~ +2147483647
- 默认: 0

```lsl
CHANNEL_LOCAL_BOARDCAST 0
```

### 套装选项名称

用于批量生效多个部件的某一种贴图方案。

- 当本项目配置之后，它将作为 PART 菜单的选项显示在菜单中，并会自动生成或根据SETS关键词构建套装列表。
- 留空则此选项无效
- 默认：空字符串

```lsl
MENU_OPTION_SETS [set name]
```

### 自定义的套装列表

- 以MENU_OPTION_SETS为入口，进入后显示此列表
- 如果未设置或为空字符串，将会自动生成列表，包括所有 PART 中的全部 SET 关键字。
- 默认：空字符串

```lsl
SETS RED|GREEN
```

### 部件

同一个linkset中可以有多个同名物体，他们都会被匹配并替换

- 第三个参数 face 可以使用常量 ALL_SIDES

```lsl
PART OBJ_1|object name 1|ALL_SIDES
```

### 贴图方案

PART部件的子选项

- 可使用SL常量包括 TEXTURE_BLANK, TEXTURE_DEFAULT, TEXTURE_TRANSPARENT, TEXTURE_PLYWOOD, NULL_KEY。当然您也可以直接使用他们对应的UUID
- 详见：[https://wiki.secondlife.com/wiki/Category:LSL_Constants](https://wiki.secondlife.com/wiki/Category:LSL_Constants)
- *如果某个贴图的UUID留空，它将会被忽略（保持之前的贴图不变），如果想覆盖失效某个贴图，请使用 NULL_KEY。
- *贴图方案SET必须跟随在某一个部件PART之后，它们作为PART的下一级菜单展示。

```lsl
SET RED|TEXTURE_BLANK|NULL_KEY|NULL_KEY
SET GREEN|TEXTURE_BLANK||
```

### PART*

与 PART 都表示一个部件，不同的是PART*并不会显示在部件菜单中。套装对此部件有效。

```lsl
PART* OBJ_2|object name 2|ALL_SIDES
SET RED|TEXTURE_BLANK|NULL_KEY|NULL_KEY
SET GREEN|TEXTURE_BLANK|NULL_KEY|NULL_KEY
```

### 自定义菜单

- 与 PART 显示在同一级菜单中，点击可发送本地消息。
- 第三个参数可以"\|"分隔

```lsl
BUTTON MORE|100|arguments
```

## 示例

### 简单的例子

```lsl
PART A|a|ALL_SIDES
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
PART A|a|ALL_SIDES
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||

PART B|b|3
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||
```

```PART B|b|3``` 控制名为"b"的物件中第3个面

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

PART A|a|ALL_SIDES
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||

PART B|b|3
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

下面代码中 PART A 包括 Default, RED, GREEN, PART B 包括 Default, RED, BLUE, 套装中将自动生成贴图方案包括: Default, RED, GREEN, BLUE, 点击它们将会对自己所关联的PART生效。

- Default, RED 对名为 a 的全部面和名为 b 的第3个面有效
- GREEN 只对 a 的全部面有效
- BLUE 只对 b 第3个面有效

```lsl
MENU_OPTION_SETS [THEMES]

PART A|a|ALL_SIDES
SET Default|TEXTURE_PLYWOOD||
SET RED|9c198f45-3f70-1a50-f38c-8ce19044b396||
SET GREEN|2f8ae0e4-22be-20c8-c0cc-c50bbfaf2871||

PART B|b|3
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