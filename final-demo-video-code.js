//Setup webdriver
const wdio = require("webdriverio");
jest.setTimeout(200000);
 
//Declare Global Variables
let CORRECT_EMAIL;
let CORRECT_PASS;
let client;
let LOADING;
let EMAIL_TXT_FIELD;
let PASSWORD_TXT_FIELD;
let LOGIN_BTN;
let POPUP;
let URL_BAR;
let FACEBOOK;
let BACK;
let MAIN_MENU;
let LOG_OUT;
let DONT_SAVE_LOGOUT;
let WHICH_LOGGED_OUT;
let NOT_NOW_BTN;
let SKIP_BTN;
let PROFILE;
let RELOAD_BTN;
 
//This code is specific to appium to connect to device
const opts = {
   path: '/wd/hub',
   port: 4723,
   capabilities: {
       platformName: "iOS",
       deviceName: "iPhone 12 Pro Max",
       automationName: "XCUITest",
       platformVersion: "14.3",
       bundleId: "com.apple.mobilesafari"
   }
};
 
//This function waits until there is no longer a loading screen
async function FacebookPage(){
   await client.$(URL_BAR).click();
   await client.$(URL_BAR).setValue('facebook.com' + "\n");
 
   const confirmed = await client.$(FACEBOOK).isDisplayed();
};

 
//This runs before any of the tests run
beforeAll(()=>{
   //ENTER YOUR EMAIL AND PASSWORD
   CORRECT_EMAIL = 'TestingPurposes123@yahoo.com';
   CORRECT_PASS = 'TestingPurpose123';
 
   //Accessibility ID
   URL_BAR = '~URL';
   LOGIN_BTN = '~Log In';
   BACK_BTN = '~back';
   MAIN_MENU = "~Main Menu"
   DONT_SAVE_LOGOUT = "~Don't Save and Log Out";
   WHICH_LOGGED_OUT = '~Which account did you log out of?';
   NOT_NOW_BTN = '~Not Now';
   SKIP_BTN = '~Skip';
   PROFILE = '~Profile';
   RELOAD_BTN = '~ReloadButton';
 
   //Xpath
   EMAIL_TXT_FIELD = '//XCUIElementTypeOther[@name="main"]/XCUIElementTypeTextField';
   PASSWORD_TXT_FIELD = '//XCUIElementTypeOther[@name="main"]/XCUIElementTypeSecureTextField';
   LOADING = '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ProgressBar';
   POPUP = '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.TextView';
   FACEBOOK = '(//XCUIElementTypeLink[@name="facebook"])[1]';
   LOG_OUT = '(//XCUIElementTypeLink[@name="Log Out"])[1]';
});
 
//This runs before each test
beforeEach( async() => {
   client = await wdio.remote(opts);
});
 
//This runs after each test
afterEach( async() => {
   await client.deleteSession();
});
 
test('Connected', async()=>{
   expect(Object.values(client)[1]['bundleId']).toBe('com.apple.mobilesafari');
});

//This checks if the connection was successful
test('Connected To Facebooks Website', async() =>{
   //declare element selector values
   await client.$(URL_BAR).click();
   await client.$(URL_BAR).setValue('facebook.com' + "\n");
 
   const confirmed = await client.$(FACEBOOK).isDisplayed();
   expect(confirmed).toBe(true);
});

/* =========================================================================== */

//1. This tests entering a correct email but incorrect password
test('Incorrect Password', async() =>{
   //Declare Values
   //const INCORRECT_PASS = "~Incorrect password.";
   const INCORRECT_PASS = '//XCUIElementTypeStaticText[@name="Did you forget your password?"]';
   
   //declare element selector values
   await client.$(EMAIL_TXT_FIELD).setValue('testingpurposes123@yahoo.com');
   await client.$(PASSWORD_TXT_FIELD).setValue('Not Password');
   await client.$(LOGIN_BTN).click();

   await(client.pause(7000));
   const confirmed = await client.$(INCORRECT_PASS).isDisplayed();
   expect(confirmed).toBe(true);
});
/* =============================================================================== */

//Positive LOGIN TEST
//2. This tests if the login was successful
test('Successfull Login', async() =>{
   await(client.pause(1000));
 
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
/* =============================================================================== */

//POSTING and TAGGING
//3. TAGGING: This tests tagging a friend in a text post
test('Successfully Tagged a Friend', async() =>{
   await(client.pause(1000));
   //Declare Values
   const TEXT_FIELD = '(//XCUIElementTypeButton[@name="What\'s on your mind?"])[2]';
   const INPUT_FIELD = '//XCUIElementTypeStaticText[@name="What\'s on your mind?"]';
   const TAG_FRIEND = "~Critter Goth";
   const POST_BTN = '(//XCUIElementTypeButton[@name="Post"])[2]';
   const VIEW_RECENT_POST = '//XCUIElementTypeStaticText[@name="Just now"]';
   const CHECK_TAG = '//XCUIElementTypeStaticText[@name="Critter Goth"]'
   const VIEW_POST = '//XCUIElementTypeLink[@name="VIEW POST"]';
 
   await client.$(TEXT_FIELD).click();
   await client.$(INPUT_FIELD).setValue('Testing tagging @Critter');
   // await client.$(URL_BAR).click();
   // await client.$(URL_BAR).setValue('facebook.com' + "\n");
   // await(client.pause(800));
   await client.$(TAG_FRIEND).click();
   await client.$(POST_BTN).click();
   await(client.pause(3000));
   await client.$(VIEW_RECENT_POST).click();
   //await client.$(VIEW_POST).click();
 
   await(client.pause(700));
   const confirmed = await client.$(CHECK_TAG).isDisplayed();
   await(client.pause(400));
   expect(confirmed).toBe(true);
});


//4. PHOTO: This tests posting a picture on Facebook
test('Facebook post a picture successfull', async() =>{
   await(client.pause(2000));
   //Declare Values
   const TEXT_FIELD = '(//XCUIElementTypeButton[@name="What\'s on your mind?"])[2]';
   const POST_BTN = '(//XCUIElementTypeButton[@name="Post"])[2]';
   const PIC_CONFIRM = '(//XCUIElementTypeImage[@name="May be an image of flower and nature"])[1]';
   const PHOTO_BTN = '~Photo';
   const ADD_BTN = '~Add';
   const PHOTO_LIBRARY = '~Photo Library';
   const PHOTO = '~Photo, March 30, 2018, 12:14 PM';
 
   await client.$(BACK_BTN).click();
   //await client.$(URL_BAR).click();
   //await client.$(URL_BAR).setValue('facebook.com' + "\n");
   await(client.pause(800));
   await client.$(TEXT_FIELD).click();
   await client.$(PHOTO_BTN).click();
   await client.$(PHOTO_LIBRARY).click();
   await client.$(PHOTO).click();
   await client.$(ADD_BTN).click();
   await client.$(POST_BTN).click();
   await(client.pause(17000));
   //refresh page to look for uploaded picture
   await client.$(URL_BAR).click();
   await client.$(URL_BAR).setValue('facebook.com' + "\n");
   await(client.pause(1500));
   const confirmed = await client.$(PIC_CONFIRM).isDisplayed();
   await(client.pause(5000));
   expect(confirmed).toBe(true);
});


//5. LIKING: This is a slightly more thorough like test by liking a post and checking the like counts before and after the user likes it
test('Successfully Liked', async() =>{
   const LIKE_BUTTON = '//XCUIElementTypeSwitch[@name="Like"]';
   const LIKE_TEXT = "~Critter Goth and 1 other";
   const THREE_LIKES = '~3 people reacted with Like';
   const BACK_BTN = '~back';
   const RELOAD_BTN = '~ReloadButton';
   const LIKED_TEXT = "~You, Critter Goth and 1 other";
   
   await(client.pause(2000));
   await client.$(URL_BAR).click();
   await client.$(URL_BAR).setValue('https://m.facebook.com/story.php?story_fbid=108437268327202&id=100074827865447&m_entstream_source=timeline' + "\n");
   await(client.pause(1000));
   await client.$(LIKE_TEXT).click();
   await(client.pause(500));
   await client.$(BACK_BTN).click();
   await(client.pause(300));
   await client.$(LIKE_BUTTON).click();
   await(client.pause(300));
   await client.$(RELOAD_BTN).click();
   await(client.pause(300));
   await client.$(LIKED_TEXT).click();
   await(client.pause(500));

   const confirmed = await client.$(THREE_LIKES).isDisplayed();
   expect(confirmed).toBe(true);
});
/* =============================================================================== */


// FRIEND REQUESTS
//6. This test is for accepting a friend Request
//Outside of/before the test is run, Lizzie Na's friend request is sent ahead of time. User is logged in as Sarah Lee
test('Friend Request', async() =>{
   await(client.pause(1000));
   //Declare Values
   const FRIEND_REQUEST = '//XCUIElementTypeStaticText[@name="FRIEND REQUESTS"]';
   const ACCEPT = "~Confirm Lizzie Na's friend request";
   const FRIENDS = "~Friends";
   const FRIEND_ACCEPTED = '//XCUIElementTypeStaticText[@name="Lizzie Na"]';
   //const FRIEND_ACCEPTED = '//XCUIElementTypeOther[@name="Lizzie Na]';

   await client.$(BACK_BTN).click();
   //await client.$(URL_BAR).click();
   //await client.$(URL_BAR).setValue('facebook.com' + "\n");
   await(client.pause(1000));
   await client.$(FRIEND_REQUEST).click();
   await client.$(ACCEPT).click();
   await client.$(FRIENDS).click();
   await(client.pause(1000));
   const confirmed = await client.$(FRIEND_ACCEPTED).isDisplayed();
   expect(confirmed).toBe(true);
});


/* =============================================================================== */

//7. This tests logging out
test('Logged out', async() =>{
   await(client.pause(700));
   await client.$(BACK_BTN).click();
   await(client.pause(1500));
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



/* ===========================================================================================
      Below are works-in-progress/incomplete tasks (mostly variations of some above tasks)
   =========================================================================================== */
/*
//This was an attempt to test the tagging feature in another way. It is currently incomplete.
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


//Work in progress test to post multiple pictures in one post:
test('Facebook post multiple pictures successfull', async() =>{
   await(client.pause(1000));
   //Declare Values
   const TEXT_FIELD = '(//XCUIElementTypeButton[@name="What\'s on your mind?"])[2]';
   const POST_BTN = '(//XCUIElementTypeButton[@name="Post"])[2]';
   //const PUBLISHED_CONFIRMATION = '//XCUIElementTypeStaticText[@name="Your post is now published."]';
   const PICS_CONFIRM = ('(//XCUIElementTypeImage[@name="May be an image of waterfall and nature"])[1]', '(//XCUIElementTypeImage[@name="May be an image of nature and tree"]][1]');
   PICS_CONFIRM = ('(//XCUIElementTypeImage[@name="May be an image of waterfall and nature"]', '(//XCUIElementTypeImage[@name="May be an image of nature and tree"]');

   const PHOTO_BTN = '~Photo';
   const ADD_BTN = '~Add';
   const PHOTO_LIBRARY = '~Photo Library';
   //const PHOTO = '~Photo, March 30, 2018, 12:14 PM';
   const PHOTO2 = '~Photo, August 08, 2012, 2:55 PM';
   const PHOTO3 = '~Photo, October 09, 2009, 2:09 PM';

   await client.$(TEXT_FIELD).click();
   await client.$(PHOTO_BTN).click();
   await client.$(PHOTO_LIBRARY).click();
   await client.$(PHOTO2).click();
   await client.$(PHOTO3).click();
   await client.$(ADD_BTN).click();
   await client.$(POST_BTN).click();

   //refresh page to look for uploaded picture
   await(client.pause(10000));
   await client.$(URL_BAR).click();
   await client.$(URL_BAR).setValue('facebook.com' + "\n");
   await(client.pause(3000));
   const confirmed = await client.$(PICS_CONFIRM).isDisplayed();
   await(client.pause(5000));
   expect(confirmed).toBe(true);
});


//LIKE TEST ATTEMPT to also use the like button and its state itself instead of just the text
//This tests if your like on a post went through
test('Successfully Liked', async() =>{
   const LIKE_BUTTON = '//XCUIElementTypeSwitch[@name="Like"]';
   //const LIKE_CONFIRM = ('~You, Critter Goth and Lizzie Na', '(//XCUIElementTypeImage[@name="May be an image of nature and tree"]][1]');
   const BLUE_LIKE = "~You, Critter Goth and Lizzie Na";
   const LISTED_LIKES = 'label == "Like" AND name == "Like" AND value == "1"'; //"type == XCUIElementTypeSwitch"
   //'label == "Like" AND name == "Like" AND value == "1"';

   //driver.findElementByIosNsPredicate('type == "XCUIElementTypeSwitch" AND label == "Like" AND name == "Like" AND value == "1"');
   
   await(client.pause(200));
   //await client.$(URL_BAR).click();
   //await client.$(URL_BAR).setValue('https://m.facebook.com/story.php?story_fbid=108437268327202&id=100074827865447&m_entstream_source=timeline' + "\n");
   
   
   //const PROFILE = '~Profile';
   //await client.$(PROFILE).click();
   
   // if (type == "XCUIElementTypeSwitch" && value == "1"){
   //    const confirmed = await client.$(BLUE_LIKE).isDisplayed();
   //    expect(confirmed).toBe(true);
   // } else {
   //    expect(confirmed).toBe(false);
   // }


   await client.$(LIKE_BUTTON).click();
   await(client.pause(500));
   //just checking that the like button is blue
   const confirmed = await client.$(BLUE_LIKE).isDisplayed();
   //const confirmed = await client.$(LISTED_LIKES).isDisplayed();
   expect(confirmed).toBe(true);

   //NOT liked
   //-ios predicate string (docs): //label == "Like" AND name == "Like" AND value == "0"
   //xpath : //XCUIElementTypeSwitch[@name="Like"]

//    await client.$(URL_BAR).click();
//    await client.$(URL_BAR).setValue('https://m.facebook.com/story.php?story_fbid=108437268327202&id=100074827865447&m_entstream_source=timeline' + "\n");
   
//    if (await client.$(NOT_NOW_BTN).isDisplayed()){
//       await client.$(NOT_NOW_BTN).click();
//   }
});
*/
