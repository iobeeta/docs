# Internal Structure

[PDF 文档](https://iobeeta.github.io/docs/zh/Internal%20Structure/Internal%20Structure%20(zh-CN).pdf)

这是一个用于展现内部构造的身体插件，目前它只适配 eBody Reborn

## 功能

分为**开放版本**与**内部版本**

- **开放版本**使用ebody官方脚本自动隐藏、自动应用皮肤材质；
- **内部版本**只有骨骼与内脏，在尺寸上有一定差别，主要是避免大幅度动作产生的穿模；
- 部位：骨骼（独立的胸骨），内脏，心脏可以跳动；
- 使用HUD控制部件的显示/隐藏、心跳速率、心跳音量；
- 集成**Project Arousal**接口，心跳速度会根据兴奋度的变化而改变，支持自定义速度等级、音量、是否启用；
- 开放编辑权限，并支持脚本拓展开发，提供相关接口；

## 使用条件

eBody Reborn 身体

- 不兼容：V-Tech、WaifuBoobs、mound、Juicy、Sensations Boobs 等与隐藏上身相关的组件；
- 可兼容：Sensations Ass、Sensations Vagina、MAZE 等等；

## Project Arousal

在物件的根可以调整配置参数以达到您想要的效果（直接修改文件名称即可）

书写格式为 ```.ISPA {变量} {值}```

*PS: 值不可含有空格

| 变量 | 默认 | 说明 |
|---|---|---|
| AVAILABLE | 1 | Project Arousal 功能是否生效 |
| LEVEL | 0,50,180,200,250,300 | LEVEL分为7个级别，对应PA中 **0~400** 的兴奋度 |
| VOLUME | 0,10,15,25,40,60,90 | 6个级别分别对应的心跳音量 |

LEVEL 列表中的数字含义为：“到达这个级别所需要的兴奋度”，它更像是区间的描述，实际上省略了0和400这两个极限值。LEVEL从右向左进行判断。

```txt
// .ISPA LEVEL 0,50,180,200,250,300
LEVEL       0   1    2     3     4     5     6
Arousal [0]---0---50---180---200---250---300---[400]
```

下面举一个例子，您可以这样设置，心跳级别会在兴奋度小于250的情况下，全部为LEVEL-4

```txt
// .ISPA LEVEL 0,0,0,0,250,300
LEVEL       0   1   2   3   4     5     6
Arousal [0]---0---0---0---0---250---300---[400]
```

而下面这个例子，心跳级别在大部分兴奋度（0~340）都会处于正常状态的LEVEL-2，在高潮的时候心跳才会微微有些许加快（>340）。超过400就永远达不到那个级别了，所以只要够大，您随意。

```txt
// .ISPA LEVEL 0,0,340,500,800,10000000
LEVEL       0   1   2     3     4     5     6
Arousal [0]---0---0---340---500---800---10000000---[400 =_=|||]
```

## 拓展

状态机全部由linkset data管理，通过修改或监听它们实现功能拓展。

| LSD变量 | 类型 | 取值 | 默认 | 说明 |
|---|---|---|---|---|
| \_\_STAT__ | integer | 0~7 | 7 | 见下文 |
| \_\_LEVEL__ | integer | 0~6 | 2 | 0~6心跳逐渐加快，0为不跳动 |
| \_\_VOLUME__ | integer | 0~100 | 0 | 0~100逐渐变强，为了避免打扰到其他人，默认为静音，可在HUD中设置 |

### 关于 \_\_STAT__

| 值 | 说明 |
|---|---|
| 0x1 | 骨头（隐藏骨头会同时隐藏胸骨） |
| 0x2 | 胸骨（显示胸骨会同时显示骨头） |
| 0x4 | 内脏 |

### 举例

**控制心跳速率**

```lsl
integer LEVEL = 5;
llLinksetDataWrite("__LEVEL__", (string)LEVEL);
```

**获取当前心跳音量**

```lsl
integer VOLUME = (integer)llLinksetDataRead("__VOLUME__");
```

**监听状态变化**

```lsl
linkset_data(integer action, string name, string value)
{
    if (action == LINKSETDATA_UPDATE) {
        if(name == "__STAT__") {
            integer stat = (integer)value;
        }
    }
}
```
