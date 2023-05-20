# Smart Material Changer PRO

版本: 1.1

## 简介

- 基于脚本配置而不是notecard。更快的加载/传输速度，更自由的书写。
- 内核与产品功能分离，可以支持菜单、HUD，本地与远端消息。
- 容易扩展且没有硬性束缚。
- 智能的匹配规则

## 脚本列表

### 发送端（内核）

| 脚本 | 说明 |
|---|---|
| SMC.KERNEL | 内核，材质管理器，存储器 |
| .SMC | 用于KERNEL的配置，编写材质配色方案 |

### 客户端（加载器）

| 脚本 | 说明 |
|---|---|
| SMC.Client | 材质配色应用器，放在需要被替换材质的物体，接受KERNEL发出的信息 |
| .SMC.Client | 用于SMC.Client的配置 |

### 其他

| 脚本 | 说明 |
|---|---|
| SMC.HUD.TRIGGER | HUD专用，将Linkset中，Prim的描述以 PART.SET 的格式来发起材质替换 |
| SMC.MENU | 通过点击弹出菜单，选择PART与SET，实现材质的替换 |

- **SMC.KERNEL 与 SMC.Client 可以放在同一个linkset，甚至同一个prim中**
- **同一个linkset中的不同prim中可以分别放置多个 SMC.Client，他们可以负责各自的部位**

Ps: 没有使用Notecard作为配置的载体，是因为丫加载实在是太慢了，太他妈的慢了，实在是太他妈的慢了。

## 用户导引

### 菜单形式的应用

通过点击物体、linkmessage、gesture来唤起菜单，进行材质替换。

- 准备好您的物体
- 放入脚本
  - SMC.KERNEL
  - .SMC
  - SMC.Client
  - .SMC.Client
  - SMC.MENU
- 重命名linkset中的prim
- 撰写配置信息在 .SMC 和 .SMC.Client
- 点击物体开始使用

### HUD形式的应用

通过HUD与目标物体通信进行材质更换

- 准备一个物体，作为HUD
- 放入脚本
  - SMC.KERNEL
  - .SMC
- 撰写配置在 **.SMC**
- (可选) 在HUD中放入脚本 **SMC.HUD.TRIGGER**
  - 在HUD的按钮的备注中写入定义好的PART和SET，中间用 "." 分隔，比如 **PartA.Style1**。SET 必须设置，PART 可以省略，如果不给予 PART 如：**.Style1**，将会替换包含SET为 **Style1** 的所有 PART
  - 如果不使用这个脚本，则需要使用linkmessage发送指令，见下文
- 准备另一个需要更换材质的目标物体，可以是perm、mesh、linkset
- 放入脚本
  - SMC.Client
  - .SMC.Client
- 撰写配置在 **.SMC.Client**，这个文件保存或者放入物体之后就可以删掉了
- 重命名linkset中的prim
- (建议) 公频输入 **/finalise**，固化KERNEL的，此时可以删除 .SMC
- 开始使用

Emmmm, 就算是HUD也可以是菜单形式，比如，点击HUD弹出菜单... :p

## 示例

### 简单的例子

### 在Linkset中


## 配置

### .SMC

| 配置项 | 类型 | 取值 | 默认 | 说明 |
|---|---|---|---|---|
| LOCAL | integer | -2147483648 ~ 2147483647 (0 无效) | 0 | 本地通信频道，多用于菜单形式 |
| REMOTE | integer | -10000 ~ 10000 | 0 | 远程通信频道偏移量（注意: 这是私有频道偏移量，并不是确切的频道），一般用于HUD。 |
| CACHE | integer | 0 / 1 | 0 | 资源缓冲(UUID)，如果配置中使用的图片出现大量重用的情况，建议开启，可以节省大量内存。 |
| LINES | list |  |  | 详细书写规则会在下文中介绍 |

#### LINES

为了规范书写，方便识别，所以使用了变量替代字符串的方式，下面将详细介绍

**PART**

部位/目标/选择器

- PART代表一个或者多个目标( prim + face )，会被更换材质的部位。可以理解为：PART所定义的是一个选择(查找)器。
- PART后面必须跟随**4个参数**

```lsl
list LINES = [
  PART, "名称", {匹配类型}, "PRIM名称或规则", {面}
];
```

| 参数 | 描述 | 说明 |
|---|---|---|
| PART | 表示这一行是个部位/目标的定义 |
| 1 | PART 的名称 | 一组LINES的配置中，不可重复，这是用来换材质的依据之一，在本地菜单模式中也会作为选项来使用 |
| 2 | 匹配类型 | FULL：全量匹配<br>PREFIX：以此文本为开始的<br>SUFFIX：以此文本为结束的<br>SMART：智能/正则匹配（未实装，暂时不可用）<br>CONST：常量匹配，包括LINK_THIS、LINK_ROOT、LINK_SET、LINK_ALL_CHILDREN、LINK_ALL_OTHERS |
| 3 | 匹配文本 | PRIM的名称，与参数2配合进行定义 |
| 4 | 面 | 目标PRIM的哪个(些)面，PRIM的面编号(0~7)。<br>可以传递字符串比如“0267”，将会匹配多个面，不必按顺序，但不可重复。<br>也可以写 ALL_SIDES(-1)，此时不可再写连其它面，因为ALL_SIDES代表所有面。|

**例子**

1. 匹配名称为 "**A**" 的PRIM的第 **3、4** 面

```lsl
list LINES = [
  PART, "Part A", FULL, "A", "34"
];
```

2. 匹配名称 "**前缀是 Rect**" 的PRIM的 **全部面**

```lsl
list LINES = [
  PART, "All part starting with Rect", PREFIX, "Rect", ALL_SIDES
];
```

3. 匹配名称 "**末尾是 3**" 的PRIM的第 **0** 面

```lsl
list LINES = [
  PART, "All part ending with 3", SUFFIX, "3", 0
];
```

4. 匹配 **除了脚本所在PRIM之外的其他PRIM** 的第 **1、2、5** 面

```lsl
list LINES = [
  PART, "All others", CONST, LINK_ALL_OTHERS, "125"
];
```

**SET**

配色/主题/材质方案

- SET代表着一套材质方案，它是非常自由的配置方式。
- SET的定义不能独立存在，**它必须跟在一个PART后面**。
- SET对应多种属性，属性所需参数数量也会有所不同。

```lsl
list LINES = [
  PART, ...,
  SET, {属性}, ..., {属性}, ..., {属性}, ...
];
```

#### 属性

参考 [PRIM_TEXTURE](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_TEXTURE)

| 属性 | 对应值 | 对应属性 | 描述 | 参数数量 | 值 | 说明 |
|---|---|---|---|---|---|---|
| D | 1 | [PRIM_TEXTURE](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_TEXTURE) | 漫反射贴图 | 1 | "{UUID}" | 仅换图，其它属性继承 |
| DP | 2 | [PRIM_TEXTURE](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_TEXTURE) | 漫反射(详细) | 4 | "{UUID}", {重复}, {位置}, {旋转} | 设置漫反射相关的所有属性 |
| N | 3 | [PRIM_NORMAL](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_NORMAL) | 硬表面贴图 | 1 | "{UUID}" | 仅换图，其它属性继承 |
| NP | 4 | [PRIM_NORMAL](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_NORMAL) | 硬表面(详细) | 4 | "{UUID}", {重复}, {位置}, {旋转} | 设置硬表面相关的所有属性 |
| S | 5 | [PRIM_SPECULAR](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_SPECULAR) | 光泽贴图 | 1 | "{UUID}" | 仅换图，其它属性继承 |
| SP | 6 | [PRIM_SPECULAR](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_SPECULAR) | 光泽(详细) | 7 | "{UUID}", {重复}, {位置}, {旋转}, {反光颜色}, {反光度}, {环境光强度} | 设置光泽相关的所有属性 |
| G | 7 | [PRIM_GLOW](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_GLOW) | 发光 | 1 | {强度} | 灯泡一样的光 |
| F | 8 | [PRIM_FULLBRIGHT](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_FULLBRIGHT) | 全亮模式 | 1 | {TRUE/FALSE} | 开启或者关闭 |
| B | 9 | [PRIM_BUMP_SHINY](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_BUMP_SHINY) | 硬表面和反光 | 2 | {强度}, {模式} | 系统自带的那个 |
| T | 10 | [PRIM_TEXGEN](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_TEXGEN) | 贴图模式 | 1 | {模式} | 默认/平面 |
| M | 11 | [PRIM_ALPHA_MODE](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_ALPHA_MODE) | 透明模式 | 2 | {模式}, {遮罩屏蔽} | 不管用不用 alpha masking，第二个参数都不能少 |
| C | 12 | [PRIM_COLOR](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_COLOR) | 颜色 | 1 | {颜色} | color 与 alpha 可以分开设置
| A | 13 | [PRIM_COLOR](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_COLOR) | 透明度 | 1 | {透明度} | color 与 alpha 可以分开设置

**如果值给予空字符串，表示不替换（继承当前的值）**

**例子**

1. 更换贴图，全部硬表面，透明度，发光

```lsl
list LINES = [
  PART, ...,
  SET, "name_1", D, "{uuid}", NP, "{uuid}", <1.0, 1.0, 0.0>, <0.0, 0.0, 0.0>, 0.0, A, 0.6, G, 0.02
]
```

2. 更换颜色，全亮模式，清空光泽贴图

```lsl
list LINES = [
  PART, ...,
  SET, "name_2", C, <1.0, 0.0, 0.0>, F, TRUE, S, NULL_KEY
]
```

3. 更换漫反射的位置和旋转，同时，不改变现有的贴图和重复

```lsl
list LINES = [
  PART, ...,
  SET, "name_3", DP, "", "", <0.125, 0.4, 0.0>, 135.65
]
```

### .SMC.Client

| 配置项 | 类型 | 取值 | 默认 | 说明 |
|---|---|---|---|---|
| LOCAL | integer | -2147483648 ~ 2147483647 (0 无效) | 0 | 本地通信频道，多用于菜单形式 |
| REMOTE | integer | -10000 ~ 10000 | 0 | 远程通信频道偏移量（注意: 这是私有频道偏移量，并不是确切的频道），一般用于HUD。 |
| DEBOUNCE | float | ≥ 0.0 | 0.0 | 防抖时长，在这个时间内的变化均会累计，直到没有更换材质的操作并在本时长后开始生效，避免频繁切换带来的效率瓶颈。 |
| CACHE | integer | 0 / 1 | 0 | 选择器缓存，用缓存换取更高效的匹配速度，注意：开启本选项后，不可以对物体进行link与unlink操作，否则会出现错误。 |
