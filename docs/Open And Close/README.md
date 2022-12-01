# Open and close

OAC System

## Configuration

One notecard represents one configuration field

Format: .OAC {key} {value}

| key | type | value | default | description |
|---|---|---|---|---|
| DURATION | float | Any | 0.0 | If less than 0.1, it is treated as 0.0, 0.0 means no transformation process |
| DISTANCE | vector | Any | <0.0, 0.0, 0.0> | Transform distance |
| ROTATION | vector | Any | <0.0, 0.0, 0.0> | Transform rotation, The meaning of this vector is <ROLL, PITCH, YAW>. <br>* The rotation is always relative to the prim's local directional vector. |
| ORIGIN | integer | 0:local<br>1:root<br>2:region | 0 | see special note below |
| TIMING_FUNC | integer | 0:linear<br>1:ease-in-out<br>2:ease-in<br>3:ease-out | 0 | see special note below |

### About ORIGIN

#### 0: local

The transformation will refer to the local directional vector.

#### 1: root

The transformation will refer to the root prim directional vector.

It only works for child prims in linkset. When the object is the root prim or it is a standalone prim, **root=region**

#### 2: region

The transformation will refer to the region directional vector.

### About TIMING_FUNC

![img/TIMING_FUNC.png](img/TIMING_FUNC.png)

## BASE mechanism

The base position and rotation of the prim will be recorded in the description, which is used to prevent deviations during the change process.

If you want to rebase, there are several ways.

- Edit any .OAC config notecard, will rebase if changed
- Use any method to change the inventory, such as creating a new script, deleting something.
- Use the confirmer script.
- *Passive: If there is a link or unlink behavior, a rebase will be performed before the transformation starts.

## linkset message

### Control submit

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

#### Confirm

Rebase start position and rotation

```lsl
llMessageLinked(LINK_SET, 802840, "CONFIRM", "");
```

### Event broadcast

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
