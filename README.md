# csgo-c4-hue-node

These scripts will change the colors of your Philips Hue lights based on the C4 bomb status in Counter-Strike: Global Offensive.

[![CS:GO C4 Hue Lights](http://i.imgur.com/2lrbSMc.gif)](https://www.youtube.com/watch?v=QBdI54MHB-k)

The Python version can be found here: [csgo-c4-hue](https://github.com/doobix/csgo-c4-hue)

## Features

* Each light blinks red 1-by-1 when bomb has been planted.
* All lights blink red when bomb has been planted for at least 30 seconds.
* All lights turn orange when bomb has exploded.
* All lights turn blue when bomb has been defused.
* All lights turn white when there is no bomb status.

## Installation

1. Copy `gamestate_integration_c4_hue.cfg` to your CS:GO cfg directory.

  OS X: `/Users/<username>/Library/Application Support/Steam/SteamApps/common/Counter-Strike Global Offensive/csgo/cfg`

  Windows: `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg`

2. Install Node.js and npm if your machine doesn't have them.

3. Run `npm install`

4. Edit `csgo-c4-hue.js` and fill in the values for your [hue bridge IP](#how-to-get-hue-bridge-ip) and [hue user](#how-to-make-a-hue-user).

  Example:

  ```
  var HUE_BRIDGE_IP = '192.168.1.100'
  var HUE_USER = '1a2a3a4a5a6a7a8a9a0a'
  ```

## Usage

Run `node csgo-c4-hue.js` and `node csgo-c4-hue-server.js` while playing CS:GO.

The `csgo-c4-hue-server.js` script will be receiving the gamestate data from CS:GO and it will write the bomb status to the file named `bomb_status`.

The `csgo-c4-hue.js` script will be reading the `bomb_status` file every 250 ms and will change the hue lights depending on what is in that file.

## Appendix

### How to get hue bridge IP

To get your hue bridge IP, visit: http://www.meethue.com/api/nupnp

### How to make a hue user

You can make a new user by going to the API Debug Tool: `http://<your hue bridge ip>/debug/clip.html`

For the url input box, enter `/api`.

For the message body, enter `{"devicetype":"csgo_c4#user"}`

Now you can press the link button on the bridge and then click the POST button in the API Debug Tool.

You should see a success message along with `"username": "<long random character string>"` in the command response area.

The long random character string is what needs to be copy/pasted into `csgo-c4-hue.py`.
