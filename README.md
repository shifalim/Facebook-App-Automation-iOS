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
## Tagging a Friend in a text Post 
```
test('Successfully Tagged a Friend and checks it from their account', async() =>{
   await(client.pause(1000));
   //Declare Values
   const TEXT_FIELD = '(//XCUIElementTypeButton[@name="What\'s on your mind?"])[2]';
   const INPUT_FIELD = '//XCUIElementTypeStaticText[@name="What\'s on your mind?"]';
   const TAG_FRIEND = "~Critter Goth";
   const POST_BTN = '(//XCUIElementTypeButton[@name="Post"])[2]';
   const PUBLISHED_CONFIRMATION = '//XCUIElementTypeStaticText[@name="Your post is now published."]';
   
   const MAIN_MENU = "~Main Menu"
   const LOG_OUT = '(//XCUIElementTypeLink[@name="Log Out"])[1]';
   const DONT_SAVE_LOGOUT = '(//XCUIElementTypeLink[@name="Create new Page"])[1]';
   const LOGIN_NEW_ACCT = '(//XCUIElementTypeLink[@name="Log Into Another Account"])[1]';
   //const VIEW_RECENT_POST = '//XCUIElementTypeStaticText[@name="Just now"]';
   const CHECK_TAG = '//XCUIElementTypeStaticText[@name="Critter Goth"]'
   const EMAIL_TXT_FIELD = '//XCUIElementTypeOther[@name="main"]/XCUIElementTypeTextField';
   const PASSWORD_TXT_FIELD = '//XCUIElementTypeOther[@name="main"]/XCUIElementTypeSecureTextField';
   const NOT_NOW_BTN = '~Not Now';
   const SKIP_BTN = '~Skip';
   const LOGIN_BTN = '~Log In';
   //const NOTIF_BELL = '(//XCUIElementTypeLink[@name="Notifications"])[1]';
   //const NOTIF_TAGGED = '~tagged you in a post.'
   const WAS_TAGGED = '//XCUIElementTypeStaticText[@name="Sarah Lee tagged you in a post."]';
   const PROFILE = '//XCUIElementTypeImage[@name="Critter Goth"]';
   const TAGGED_CONFIRM = '//XCUIElementTypeOther[@name="Testing tag Critter Goth"]';


   await client.$(TEXT_FIELD).click();
   await client.$(INPUT_FIELD).setValue('Testing tag @Critter');
   await(client.pause(700));
   await client.$(TAG_FRIEND).click();
   await client.$(POST_BTN).click();
   await(client.pause(3000));

   await client.$(MAIN_MENU).click();
   await(client.pause(500));
   await client.$(LOG_OUT).click();
   await(client.pause(500));
   //await client.$(DONT_SAVE_LOGOUT).click();
   //await(client.pause(500));
   await client.$(LOGIN_NEW_ACCT).click();
   await(client.pause(500));
   await client.$(EMAIL_TXT_FIELD).setValue('shifalimengi@gmail.com');
   await client.$(PASSWORD_TXT_FIELD).setValue('TestingPurposes123');
   await client.$(LOGIN_BTN).click();
   await(client.pause(700));
   if (await client.$(NOT_NOW_BTN).isDisplayed()){
      await client.$(NOT_NOW_BTN).click();
   }

   if (await client.$(SKIP_BTN).isDisplayed()){
      await client.$(SKIP_BTN).click();
   }
   await(client.pause(500));
   await client.$(NOTIF_BELL).click();
   await client.$(URL_BAR).click();
   await client.$(URL_BAR).setValue('https://m.facebook.com/100000800735124/' + "\n");
   await(client.pause(500));
   const confirmed = await client.$(TAGGED_CONFIRM).isDisplayed();
   await(client.pause(300));
   expect(confirmed).toBe(true);
});
```
## Accepting a friend request 
```
test('Friend Request', async() =>{
   await(client.pause(1000));
   //Declare Values
   //const SEE_ALL = '//XCUIElementTypeButton[@name="See All"]';
   const FRIEND_REQUEST = '//XCUIElementTypeStaticText[@name="FRIEND REQUESTS"]';
   const ACCEPT = "~Confirm Lizzie Na's friend request";
   const FRIENDS = "~Friends";
   const FRIEND_ACCEPTED = '//XCUIElementTypeOther[@name="Lizzie Na"]';


   await client.$(FRIEND_REQUEST).click();
   //await client.$(SEE_ALL).click();
   await client.$(ACCEPT).click();
   await client.$(FRIENDS).click();
   await(client.pause(1000));
   const confirmed = await client.$(FRIEND_ACCEPTED).isDisplayed();
   expect(confirmed).toBe(true);
});
```
## Declining a Friend Request 
```
test('Declining Friend Request', async() =>{
   await(client.pause(1000));
   //Declare Values
   //const BACK = '//XCUIElementTypeStaticText[@name="News Feed"]';
   //const SEE_ALL = '//XCUIElementTypeButton[@name="See All"]';
   const FRIEND_REQUEST = '//XCUIElementTypeStaticText[@name="FRIEND REQUESTS"]';
   const DECLINE = "~Delete Shifali Mengi's friend request";
   const FRIENDS = "~Friends";
   const FRIEND_ACCEPTED = '//XCUIElementTypeOther[@name="Shifali Mengi"]';
   
   await client.$(URL_BAR).click();
   await client.$(URL_BAR).setValue('facebook.com' + "\n");
   await(client.pause(3000));

   //await client.$(BACK).click();
   await client.$(FRIEND_REQUEST).click();
   //await client.$(SEE_ALL).click();
   await client.$(DECLINE).click();
   await client.$(FRIENDS).click();
   await(client.pause(2000));
   const confirmed = await client.$(FRIEND_ACCEPTED).isDisplayed();
   expect(confirmed).toBe(false);
});
```
## Posting a picture on Facebook
```
test('Facebook post one picture successfull', async() =>{
   await(client.pause(1000));
   //Declare Values
   const TEXT_FIELD = '(//XCUIElementTypeButton[@name="What\'s on your mind?"])[2]';
   const INPUT_FIELD = '//XCUIElementTypeStaticText[@name="What\'s on your mind?"]'
   const POST_BTN = '(//XCUIElementTypeButton[@name="Post"])[2]';
   //const PUBLISHED_CONFIRMATION = '//XCUIElementTypeStaticText[@name="Your post is now published."]';
   const PIC_CONFIRM = '(//XCUIElementTypeImage[@name="May be an image of flower and nature"])[1]';
   const PIC2_CONFIRM = '(//XCUIElementTypeImage[@name="May be an image of waterfall and nature"]';
   const PIC3_CONFIRM = '(//XCUIElementTypeImage[@name="May be an image of nature and tree"]';

   //const PHOTO_BTN = '(//XCUIElementTypeButton[@name="Photo"]';
   const PHOTO_BOX = '(//XCUIElementTypeButton[@name="Add photo"]';
   //const ADD_BTN = '(//XCUIElementTypeButton[@name="Add"]'
   //const PHOTO_LIBRARY = '(//XCUIElementTypeButton[@name="Photo Library"]'
   //const PHOTO = '(//XCUIElementTypeImage[@name="Photo, March 30, 2018, 12:14 PM"]' //Photo, March 30, 2018, 12:14 PM

   const PHOTO_BTN = '~Photo';
   const ADD_BTN = '~Add';
   const PHOTO_LIBRARY = '~Photo Library';
   const PHOTO = '~Photo, March 30, 2018, 12:14 PM';
   const PHOTO2 = '~Photo, August 08, 2012, 2:55 PM';
   const PHOTO3 = '~Photo, October 09, 2009, 2:09 PM';
 
   //await client.$(TEXT_FIELD).click();
   //await client.$(INPUT_FIELD).setValue('I like my job!!!');

   await client.$(PHOTO_BTN).click();
   await client.$(PHOTO_LIBRARY).click();
   await client.$(PHOTO).click();
   await client.$(ADD_BTN).click();

   await client.$(POST_BTN).click();
 
   await(client.pause(10000));

   //refresh page to look for uploaded picture
   await client.$(URL_BAR).click();
   await client.$(URL_BAR).setValue('facebook.com' + "\n");
   await(client.pause(3000));
   const confirmed = await client.$(PIC_CONFIRM).isDisplayed();
   await(client.pause(5000));
   expect(confirmed).toBe(true);
});
```
## Logging out 
```
test('Logged out', async() =>{
   const MAIN_MENU = "~Main Menu"
   const LOG_OUT = '(//XCUIElementTypeLink[@name="Log Out"])[1]';
   const DONT_SAVE_LOGOUT = "~Don't Save and Log Out";
   const WHICH_LOGGED_OUT = '~Which account did you log out of?';

   await(client.pause(1000));
   await client.$(MAIN_MENU).click();
   await(client.pause(500));
   await client.$(LOG_OUT).click();
   await(client.pause(500));

   if (await client.$(DONT_SAVE_LOGOUT).isDisplayed()){
      await client.$(DONT_SAVE_LOGOUT).click();
  }
   await(client.pause(500));
   await client.$(WHICH_LOGGED_OUT).click();

   await(client.pause(1000));
   const confirmed = await client.$(WHICH_LOGGED_OUT).isDisplayed();
   expect(confirmed).toBe(true);


});
```


## Important Links
-  Install the LTS Version: [Node.js](https://nodejs.org/en/)
-  [Homebrew](https://brew.sh)
-  [Jest](https://jestjs.io)
- [Installing Appium](https://www.youtube.com/watch?v=ElD5YrKcuRc)
- [Installing Xcode](https://www.youtube.com/watch?v=W8jz8Csuzx4)
- [Running Safari on Appium Inspector](https://www.youtube.com/watch?v=dDHJfRG0VBo)
