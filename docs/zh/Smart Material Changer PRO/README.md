# Smart Material Changer PRO

版本: 1.1

## 简介

- 基于脚本配置而不是notecard。更快的加载/传输速度，更自由的书写。
- 内核与产品功能分离，可以支持菜单、HUD，本地与远端消息。
- 容易扩展且没有硬性束缚。
- 智能的匹配规则

## 用户导引

### 菜单形式的应用

通过点击物体本身，或者通过本地消息、远程消息（gesture）唤起菜单

1. 准备好您的物体，放入脚本
2. 分别命名，相同材质的部分可以有相同的名称。
3. 根据您的想法，根据颜色、样式、主题、主题等规划您的纹理组。 将它们写入配置文件。
4. 将脚本和配置文件放入对象中，可以是根 prim 或 子prim。
5. 点击它开始使用。

### HUD形式的应用

通过HUD与目标物体通信进行材质更换

1. 准备好您的物体（本体），放入脚本。
2. 准备另一个物体作为hud，放入脚本。
3. 在HUD的子prim按钮的备注中写入定义好的part和set，中间用 "." 分隔，比如 PartA.Style1
4. 点击hud上的按钮，更新本体的属性

## 示例

### 简单的例子

### 在Linkset中

## 配置项

| 配置项 | 类型 | 取值 | 默认 | 说明 |
|---|---|---|---|---|
| LOCAL | integer | -2147483648 ~ 2147483647 (0 无效) | 0 | 本地通信频道，多用于菜单形式 |
| REMOTE | integer | -10000 ~ 10000 | 0 | 远程通信频道偏移量（注意: 这是私有频道偏移量，并不是确切的频道），一般用于HUD。 |
| CACHE | integer | 0 / 1 | 0 | 资源缓冲(UUID)，如果配置中使用的图片出现大量重用的情况，建议开启，可以节省大量内存。 |
| LINES | list |  |  | 详细书写规则会在下文中介绍 |

## 关于 LINES

为了规范书写，方便识别，所以使用了变量替代字符串的方式，下面将详细介绍

### PART

部位/目标

- PART代表一个或者多个目标( prim + face )，会被更换材质的部位。可以理解为：PART所定义的是一个选择(查找)器。
- PART后面必须跟随**4个参数**

| 参数 | 描述 | 说明 |
|---|---|---|
| PART | 表示这一行是个部位/目标的定义 |
| 1 | PART 的名称 | 一组LINES的配置中，不可重复，这是用来换材质的依据之一，在本地菜单模式中也会作为选项来使用 |
| 2 | 匹配类型 | FULL：全量匹配<br>PREFIX：以此文本为开始的<br>SUFFIX：以此文本为结束的<br>SMART：智能/正则匹配（未实装，暂时不可用）<br>CONST：常量匹配，包括LINK_THIS、LINK_ROOT、LINK_SET、LINK_ALL_CHILDREN、LINK_ALL_OTHERS |
| 3 | 匹配文本 | 目前为对PRIM的名称进行匹配，与参数2配合进行定义 |
| 4 | 面 | 目标PRIM的哪个(些)面，PRIM的面编号(0~7)。<br>可以传递字符串比如“0267”，将会匹配多个面，不必按顺序，但不可重复。<br>也可以写 ALL_SIDES(-1)，此时不可再写连其它面，因为ALL_SIDES代表所有面。|

```lsl
list LINES = [
  PART, "名称", {匹配类型}, "PRIM名称或规则", {面}
];
```

### SET 

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

| 属性 | 对应 | 描述 | 参数长度 | 值 | 说明 |
|---|---|---|---|---|---|
| D | [PRIM_TEXTURE](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_TEXTURE) | 漫反射贴图 | 1 | "{UUID}" | 仅换图，其它属性继承 |
| DP | [PRIM_TEXTURE](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_TEXTURE) | 漫反射(详细) | 4 | "{UUID}", {重复}, {位置}, {旋转} | 设置漫反射相关的所有属性 |
| N | [PRIM_NORMAL](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_NORMAL) | 硬表面贴图 | 1 | "{UUID}" | 仅换图，其它属性继承 |
| NP | [PRIM_NORMAL](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_NORMAL) | 硬表面(详细) | 4 | "{UUID}", {重复}, {位置}, {旋转} | 设置硬表面相关的所有属性 |
| S | [PRIM_SPECULAR](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_SPECULAR) | 光泽贴图 | 1 | "{UUID}" | 仅换图，其它属性继承 |
| SP | [PRIM_SPECULAR](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_SPECULAR) | 光泽(详细) | 7 | "{UUID}", {重复}, {位置}, {旋转}, {反光颜色}, {反光度}, {环境光强度} | 设置光泽相关的所有属性 |
| G | [PRIM_GLOW](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_GLOW) | 发光 | 1 | {强度} | 灯泡一样的光 |
| F | [PRIM_FULLBRIGHT](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_FULLBRIGHT) | 全亮模式 | 1 | {TRUE/FALSE} | 开启或者关闭 |
| B | [PRIM_BUMP_SHINY](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_BUMP_SHINY) | 硬表面和反光 | 2 | {强度}, {模式} | 系统自带的那个 |
| T | [PRIM_TEXGEN](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_TEXGEN) | 贴图模式 | 1 | {模式} | 默认/平面 |
| M | [PRIM_ALPHA_MODE](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_ALPHA_MODE) | 透明模式 | 2 | {模式}, {遮罩屏蔽} | 不管用不用 alpha masking，第二个参数都不能少 |
| C | [PRIM_COLOR](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_COLOR) | 颜色 | 1 | {颜色} | color 与 alpha 可以分开设置
| A | [PRIM_COLOR](https://wiki.secondlife.com/wiki/LlSetPrimitiveParams#PRIM_COLOR) | 透明度 | 1 | {透明度} | color 与 alpha 可以分开设置

**如果值给予空字符串，表示不替换（继承当前的值）**

**例子**

1. 更换贴图，全部硬表面，透明度，发光

```lsl
[SET, "name_1", D, "{uuid}", NP, "{uuid}", <1.0, 1.0, 0.0>, <0.0, 0.0, 0.0>, 0.0, A, 0.6, G, 0.02]
```

2. 更换颜色，全亮模式，清空光泽贴图

```lsl
[SET, "name_2", C, <1.0, 0.0, 0.0>, F, TRUE, S, NULL_KEY]
```

3. 更换漫反射的位置和旋转，同时，不改变现有的贴图和重复值

```lsl
[SET, "name_3", DP, "", "", <0.125, 0.4, 0.0>, 135.65]
```

