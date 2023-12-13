# OAC Devkit

Version: 3.6

[PDF Document](https://iobeeta.github.io/prod/OAC%20Devkit/OAC%20Devkit.pdf)

## Features

- Smooth transformation, easing vision.
- Flexible configuration and combination.
- During the transformation process, the direction can be changed at any time.

## Quick Start. Follow this, step by step

1. Prepare your object.
2. According to your needs, select the configuration file which starts with ".OAC", change their parameters and drag them into the inventory.
3. Drag the main script named ```OAC.KERNEL``` into the inventory.
4. Select the trigger script you need, drag and drop it into the object. Some trigger scripts have been preset for you in "Extra". Of course, you can customize them according to your needs.
5. Done.

### Make a single sliding door

|||
|:-:|:-:|
| ![img/single-door-1.png](img/single-door-1.png) | ![img/single-door-2.png](img/single-door-2.png) |
| Create a box, resized like a door | Select the function you need, drag and drop them to the inventory |
| ![img/single-door-3.png](img/single-door-3.png) | ![img/single-door-4.png](img/single-door-4.png) |
| Change parameters<br/>Move 2 meters in the X direction<br/>The duration 2 seconds<br/>Use the ease-in-out timing function | Drag and drop scripts |

**Touch to see the effect**

![img/single-door-show.gif](img/single-door-show.gif)

**For more detailed examples, please test and edit after rez them in "Example"**

## Scripts

| name | description |
|---|---|
| OAC.KERNEL | **(required)** Main script |

**Extra**

| name | description |
|---|---|
| TouchToggle | Make the prim touchable, touch to trigger toggle, it will only trigger the current prim(LINK_THIS). |
| TouchToggleSync | Make the prim touchable, touch to trigger toggle, it will trigger all prims in the linkset(LINK_SET). |
| AutoClose 30s | Automatically close after 30 seconds when it is opened. |
| AutoToggle after end 20s | When the transformation is end, wait for 20 seconds to switch the state, looping. |
| AgentSensorOpen | Open when someone is nearby. |
| AgentSensorToggle | Open when someone is nearby, close when no one is around. |
| SoundTrigger | Play sound during operation. This script is preset as an electric door, which can be changed arbitrarily. |

## Configuration

One notecard represents one configuration field, drag notecard to inventory, edit its name.

Format: .OAC {key} {value}

| key | type | value | default | description | version |
|---|---|---|---|---|---|
| BROADCAST2 | integer | > -5 && != 0 | -4 | Broadcast sending range, -4:`LINK_THIS`, -3:`LINK_ALL_CHILDREN`, -2:`LINK_ALL_OTHERS`, -1:`LINK_SET`, 1:`LINK_ROOT`, and others | 3.3 |
| DURATION | float | Any | 0.0 | If less than 0.1, it is treated as 0.0,<br/>0.0 means no transformation process | 1.7 |
| DISTANCE | vector | Any | <0.0,0.0,0.0> | Transform distance | 1.7 |
| ROTATION | vector | Any | <0.0,0.0,0.0> | Transform rotation, The meaning of this vector is <ROLL, PITCH, YAW>. <br/>* The rotation is always relative to the prim's local directional vector. | 1.8 |
| SCALE | vector | Greater than <0.0,0.0,0.0> | <1.0,1.0,1.0> | Scale, scale change, no negative value, if equal to ZERO_VECTOR (<0.0,0.0,0.0>), it is considered invalid | 3.0 |
| ORIGIN | integer | 0/1/2 | 0 | see special note below | 2.0 |
| TIMING_FUNC | integer | 0/1/2/3 | 0 | see special note below | 2.0 |
| QUEUE | string | | | Queue mode, see below | 3.0 |

### About ORIGIN

#### local (0)

The transformation will refer to the local directional vector.

Example:

```text
.OAC DISTANCE <1.0, 0.0, 0.0>
.OAC ORIGIN 0
```

![img/local.png](img/local.png)

#### root (1)

The transformation will refer to the root prim directional vector.

Example:

```text
.OAC DISTANCE <1.0, 0.0, 0.0>
.OAC ORIGIN 1
```

![img/root.png](img/root.png)

It only works for child prims in linkset. When the object is the root prim or it is a standalone prim, **root=region**

#### region (2)

The transformation will refer to the region directional vector.

Example:

```text
.OAC DISTANCE <1.0, 0.0, 0.0>
.OAC ORIGIN 2
```

![img/region.png](img/region.png)

### About TIMING_FUNC

| 0: linear | 1: ease-in-out | 2: ease-in | 3: ease-out |
|:-:|:-:|:-:|:-:|
| ![img/timing-func-0.png](img/timing-func-0.png) | ![img/timing-func-1.png](img/timing-func-1.png) | ![img/timing-func-2.png](img/timing-func-2.png) | ![img/timing-func-3.png](img/timing-func-3.png) |
| `.OAC TIMING_FUNC 0` | `.OAC TIMING_FUNC 1` | `.OAC TIMING_FUNC 2` | `.OAC TIMING_FUNC 3` |

**since 3.2**

Two special values, forward movement and negative movement are symmetrical.

For example, if the forward direction is ease-in, then the reverse direction will automatically switch to ease-out.

| 102: ease-in (ease-out when reversed) | 103: ease-out (ease-in when reversed) |
|:-:|:-:|
| `.OAC TIMING_FUNC 102` | `.OAC TIMING_FUNC 103` |

### Queue Mode

The Queue mode is added in version 3.0, which can continuously perform multiple change processes (forward and reverse), and continues the feature of switching directions at any point in time.

```text
.OAC QUEUE {Number}/{DURATION}/{ORIGIN}/{TIMING_FUNC}/{DISTANCE}/{ROTATION}/{SCALE}
```

Yes, it writes the previously supported parameters in one line and assigns them to QUEUE, and then you can add multiple QUEUEs.

{Number} represents the order of QUEUE. In the content of PRIM, files are arranged in ascending order of file names, so as long as the sequence is correct, the number can be specified freely, whether it is 1234... or ABCD....

If you need to wait between two QUEUEs, you can join a QUEUE with only a duration, like this:

```text
.OAC QUEUE 1/5.0///<10.0,0.0,0.0>//
.OAC QUEUE 2/2.0/////
.OAC QUEUE 3/5.0///<0.0,10.0,0.0>//
```

## Linkset message

### Link Message to Send

Num: **802840**

#### Open

positive movement

```lsl
llMessageLinked(..., 802840, "OPEN", "");
```

#### Close

reverse movement

```lsl
llMessageLinked(..., 802840, "CLOSE", "");
```

#### Toggle

Switch the current direction of movement

```lsl
llMessageLinked(..., 802840, "TOGGLE", "");
```

#### Set Direction

Manually submit and change the current running direction status

value:
Greater than 0: Set to opened (to be closed) state, and can be closed at this time (reverse transformation)
Less than or equal to 0: Set to closed (to be opened) state, and can be opened at this time (forward transformation)

```lsl
llMessageLinked(..., 802840, "DIRECTION|1", "");
llMessageLinked(..., 802840, "DIRECTION|-1", "");
```

#### Submit global scale

Acting on DISTANCE, the moving distance magnification of the sub-PRIM in the zoomed state.

Default: 1.0，If the given value <0, the default value is used.

```lsl
llMessageLinked(..., 802840, "SCALE|1.0", "");
```

### Link Message to Receive

Num: **802841**

#### Transform started

To: `BROADCAST2` specified, default is -4:`LINK_THIS`

```lsl
TRANSFORM_STARTED|{direction}
```

direction:

- 1: open, positive movement
- -1: close, reverse movement

#### Transform finished

To: `BROADCAST2` specified, default is -4:`LINK_THIS`

```lsl
TRANSFORM_FINISHED|{direction}
```

direction:

- 1: open, positive movement
- -1: close, reverse movement

#### Transform processing (Queue mode)

To: `BROADCAST2` specified, default is -4:`LINK_THIS`

```lsl
TRANSFORM_PROCESS|{direction}|{queue index}|{effective}
```

direction:

- 1: open, positive movement
- -1: close, reverse movement

effective:

- 0: if no change in DISTANCE, ROTATION, SCALE
- 1: If any of DISTANCE, ROTATION, SCALE changes

### LinksetData Trigger

OAC.KERNEL will listen for ```LINKSETDATA_UPDATE```

name: (string)llGetLinkKey(LINK_ROOT) + "-oac-stat"

- Triggers **CLOSE** when value is an **even number** (**0 [2 4 6...]**)
- Triggers **OPEN** when value is an **odd number** (**1 [3 5 7...]**)

```lsl
llLinksetDataWrite((string)llGetLinkKey(LINK_ROOT) + "-oac-stat", "1"); // OPEN
llLinksetDataWrite((string)llGetLinkKey(LINK_ROOT) + "-oac-stat", "0"); // CLOSE

llLinksetDataWrite((string)llGetLinkKey(LINK_ROOT) + "-oac-stat", "2"); // CLOSE
llLinksetDataWrite((string)llGetLinkKey(LINK_ROOT) + "-oac-stat", "3"); // OPEN
```
