# Facebook-App-Automation-IOS
 This code will test Facebooks apps features on Android using an iOS device. This will use Jest for the testing. 
## Required Downloads
https://github.com/facebook/idb

## Setup Enviromental Variables

MacOS

Iphone 

## Create Emulated Device
Open Xcode and click 'Xcode'. Click 'Open Developer Tool'. Click 'Simulator'.

## Installation Required 
- Xcode
- Appium GUI 
- Appium Inspector
- Visual Studio Code
- Node JS
- Jest 
- Brew 
- Webdriverio

## Setting up Appium Inspector 
First launch Xcode simulator -> Appium Server -> Appium Inspector 
In Appium Inspector use the following capabilities: 
```
{
  "platformName": "iOS",
  "appium:deviceName": "iPhone 12 Pro Max",
  "appium:automationName": "XCUITest",
  "appium:platformVersion": "14.5",
  "browserName": "Safari"
}
```
Capabilities may change depending on the device name which will be displayed on the top of the Simulator and platform Version you are using. Both of these can be located on the top of the Simulator. Through this you will start session and Safari will launch on Appium. 

## Important Links
-  Install the LTS Version: [Node.js](https://nodejs.org/en/)
-  [Homebrew](https://brew.sh)
-  [Jest](https://jestjs.io)
- [Installing Appium](https://www.youtube.com/watch?v=ElD5YrKcuRc)
- [Installing Xcode](https://www.youtube.com/watch?v=W8jz8Csuzx4)
- [Running Safari on Appium Inspector](https://www.youtube.com/watch?v=dDHJfRG0VBo)
