# Open And Close (OAC Devkit)

Open And Close Development Kit

Version: 2.2

[PDF Document](https://iobeeta.github.io/prod/Open%20And%20Close/OAC%20Devkit.pdf)

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
| AgentSensorToggle | Open when someone is nearby, close when no one is around. |

## Configuration

One notecard represents one configuration field, drag notecard to inventory, edit its name.

Format: .OAC {key} {value}

| key | type | value | default | description | version |
|---|---|---|---|---|---|
| DURATION | float | Any | 0.0 | If less than 0.1, it is treated as 0.0,<br/>0.0 means no transformation process | 1.7 |
| DISTANCE | vector | Any | <0.0,0.0,0.0> | Transform distance | 1.7 |
| ROTATION | vector | Any | <0.0,0.0,0.0> | Transform rotation, The meaning of this vector is <ROLL, PITCH, YAW>. <br/>* The rotation is always relative to the prim's local directional vector. | 1.8 |
| SCALE | float | > 0.0 | 1.0 | Transform scale, if less than or equal to 0.0, it is regarded as unchanged, equivalent to 1.0 | 2.1 |
| ORIGIN | integer | 0/1/2 | 0 | see special note below | 2.0 |
| TIMING_FUNC | integer | 0/1/2/3 | 0 | see special note below | 2.0 |

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

## Linkset message

### Link Message to Send

Num: **802840**

#### Open

positive movement

```lsl
llMessageLinked(LINK_SET, 802840, "OPEN", "");
```

#### Close

reverse movement

```lsl
llMessageLinked(LINK_SET, 802840, "CLOSE", "");
```

#### Toggle

Switch the current direction of movement

```lsl
llMessageLinked(LINK_SET, 802840, "TOGGLE", "");
```

### Link Message to Receive

Num: **802841**

#### Transform started

To: `LINK_SET`

```lsl
TRANSFORM_STARTED|{direction}
```

direction:

- 1: open, positive movement
- -1: close, reverse movement

#### Transform finished

To: `LINK_SET`

```lsl
TRANSFORM_FINISHED|{direction}
```

direction:

- 1: open, positive movement
- -1: close, reverse movement
