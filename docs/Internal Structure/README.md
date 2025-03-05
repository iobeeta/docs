# Internal Structure

This is a body plugin designed to showcase internal structures. Currently, it is only compatible with the eBody Reborn.

## Features

Divided into **Open Version** and **Internal Version**:

- **Open Version**: Uses the official eBody script to automatically hide and apply skin textures.
- **Internal Version**: Includes only the skeleton and internal organs, with slight size differences to avoid clipping during extensive movements.
- Parts: Skeleton (independent sternum), internal organs, and a beating heart.
- Use the HUD to control the visibility of parts, heart rate, and heartbeat volume.
- Integrated with the **Project Arousal** interface, where the heart rate changes according to arousal levels. Supports custom speed levels, volume, and activation.
- Open editing permissions and supports script extension development with provided interfaces.

## Requirements

eBody Reborn body

- **Incompatible**: V-Tech, WaifuBoobs, mound, Juicy, Sensations Boobs, and other components related to hiding the upper body.
- **Compatible**: Sensations Ass, Sensations Vagina, MAZE, etc.

## Project Arousal

You can adjust configuration parameters at the root of the object to achieve the desired effect (simply modify the file name).

The format is ```.ISPA {variable} {value}```.

*PS: Values cannot contain spaces.

| Variable | Default | Description |
|---|---|---|
| AVAILABLE | 1 | Whether the Project Arousal feature is active |
| LEVEL | 0,50,180,200,250,300 | LEVEL is divided into 7 levels, corresponding to arousal levels **0~400** in PA. |
| VOLUME | 0,10,15,25,40,60,90 | The heartbeat volume for each of the 6 levels. |

The numbers in the LEVEL list represent the "arousal level required to reach this level." It is more like a description of intervals, and actually omits the two extreme values of 0 and 400. LEVEL is judged from right to left.

```txt
// .ISPA LEVEL 0,50,180,200,250,300
LEVEL       0   1    2     3     4     5     6
Arousal [0]---0---50---180---200---250---300---[400]
```

Here’s an example: You can set it up like this, where the heartbeat level will be LEVEL-4 when the arousal is less than 250.

```txt
// .ISPA LEVEL 0,0,0,0,250,300
LEVEL       0   1   2   3   4     5     6
Arousal [0]---0---0---0---0---250---300---[400]
```

In the following example, the heartbeat level will remain at the normal LEVEL-2 for most arousal levels (0~340), and will slightly increase during climax (>340). Since exceeding 400 makes it impossible to reach that level, you can set it as high as you want.

```txt
// .ISPA LEVEL 0,0,340,500,800,10000000
LEVEL       0   1   2     3     4     5     6
Arousal [0]---0---0---340---500---800---10000000---[400 =_=|||]
```

## Extensions

The state machine is entirely managed by linkset data. Modify or listen to them to extend functionality.

| LSD Variable | Type | Values | Default | Description |
|---|---|---|---|---|
| \_\_STAT__ | integer | 0~7 | 7 | See below |
| \_\_LEVEL__ | integer | 0~6 | 2 | 0~7 gradually increases heart rate, 0 is default |
| \_\_VOLUME__ | integer | 0~100 | 0 | 0~100 gradually increases volume. Default is muted to avoid disturbing others, can be set in the HUD. |

### About \_\_STAT__

| Value | Description |
|---|---|
| 0x1 | Bones (hiding bones will also hide the sternum) |
| 0x2 | Sternum (showing the sternum will also show bones) |
| 0x4 | Internal organs |

### Examples

**Control Heart Rate**

```lsl
integer LEVEL = 5;
llLinksetDataWrite("__LEVEL__", (string)LEVEL);
```

**Get Current Heartbeat Volume**

```lsl
integer VOLUME = (integer)llLinksetDataRead("__VOLUME__");
```

**Listen for State Changes**

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