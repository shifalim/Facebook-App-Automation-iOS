# Facebook-App-Automation-IOS
 This code will test Facebooks apps features on Android using an iOS device. This will use Jest for the testing. 

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

## Login Test
```
test('Successfull Login', async() =>{
   await(client.pause(1000));
   //Declare Values
   const NOT_NOW_BTN = '~Not Now';
   const SKIP_BTN = '~Skip';
   const PROFILE = '~Profile';
 
   await client.$(EMAIL_TXT_FIELD).setValue(CORRECT_EMAIL);
   await client.$(PASSWORD_TXT_FIELD).setValue(CORRECT_PASS);
   await client.$(LOGIN_BTN).click();
   await(client.pause(300));

   if (await client.$(NOT_NOW_BTN).isDisplayed()){
       await client.$(NOT_NOW_BTN).click();
   }
 
   if (await client.$(SKIP_BTN).isDisplayed()){
       await client.$(SKIP_BTN).click();
   }
 
   await(client.pause(2000));
   const confirmed = await client.$(PROFILE).isDisplayed();
   expect(confirmed).toBe(true);
});
```
## Testing if Facebook email is in their database 
```
//This tests if Facebook has the email entered in their database
test('No Account Found', async() =>{
   //Declare Values
   const WRONG_ACCOUNT = "~Need help finding your account?";

   //declare element selector values
   await client.$(EMAIL_TXT_FIELD).setValue('fakemailtester333@gmail.com');
   await client.$(PASSWORD_TXT_FIELD).setValue('fakepassword333!');
   await client.$(LOGIN_BTN).click();

   await(client.pause(4000));

   const confirmed = await client.$(WRONG_ACCOUNT).getText();
   expect(confirmed).toBe('Need help finding your account?');
});
```
## Testing Post
```
//This tests posting on Facebook
test('Facebook post successfull', async() =>{
   await(client.pause(1000));
   //Declare Values
   const TEXT_FIELD = '(//XCUIElementTypeButton[@name="What\'s on your mind?"])[2]';
   const INPUT_FIELD = '//XCUIElementTypeStaticText[@name="What\'s on your mind?"]'
   const POST_BTN = '(//XCUIElementTypeButton[@name="Post"])[2]';
   const PUBLISHED_CONFIRMATION = '//XCUIElementTypeStaticText[@name="Your post is now published."]';
 
   await client.$(TEXT_FIELD).click();
   await client.$(INPUT_FIELD).setValue('Test Post4');
   await client.$(POST_BTN).click();
 
   await(client.pause(500));
   const confirmed = await client.$(PUBLISHED_CONFIRMATION).isDisplayed();
   expect(confirmed).toBe(true);
});
```
## 
```

## Important Links
-  Install the LTS Version: [Node.js](https://nodejs.org/en/)
-  [Homebrew](https://brew.sh)
-  [Jest](https://jestjs.io)
- [Installing Appium](https://www.youtube.com/watch?v=ElD5YrKcuRc)
- [Installing Xcode](https://www.youtube.com/watch?v=W8jz8Csuzx4)
- [Running Safari on Appium Inspector](https://www.youtube.com/watch?v=dDHJfRG0VBo)
