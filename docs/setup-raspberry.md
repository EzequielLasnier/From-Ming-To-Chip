# Raspberry Pi Setup Guide

This guide explains how to configure a Raspberry Pi to run the "From Ming to Chip" installation autonomously.

## 1. System Requirements
* **OS:** Raspberry Pi OS (Desktop version recommended for the LED display).
* **Node.js:** Version 16.x or higher.
* **Utilities:** `unclutter` (to hide the mouse) and `pm2` (process management).

## 2. Hardware Wiring (GPIO)
The stepper motor driver should be connected to the following Physical Pins:
* **STEP:** Pin 11 (GPIO 17)
* **DIR:** Pin 13 (GPIO 27)
* **GND:** Pin 6 or 9

## 3. Installation

### Backend (Server)
Install PM2 to ensure the server starts on boot and restarts if it crashes:
```bash
sudo npm install -g pm2
cd ~/from-ming-to-chip/server
npm install
pm2 start server.js --name "ming-server"
pm2 startup
pm2 save
```

### Frontend (Kiosk Mode)
1- Install unclutter to hide the cursor:
```bash
sudo apt-get install unclutter
```
2- Edit the LXDE autostart file:
```bash
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
```
3- Add these lines at the end:
```bash
@xset s off
@xset -dpms
@xset s noblank
@unclutter -idle 0.1 -root
@chromium-browser --kiosk --incognito http://localhost:3000/led-display
```
## 4. Network Configuration
Ensure the Raspberry Pi has a static IP address or is reachable via raspberrypi.local so the mobile devices can connect to the WebSocket server reliably.