const webPush = require('web-push');

const vapidKeys = {
    'publicKey' : "BIwFGq9rha5D8PXxSXNLaqQlz6uIQXrGQHgybdz-5Mms2Ol_lwkRTOXXs-ZKjbhK719oLZEf6AW3Guue5n09jZ8",
    'privateKey': "_pG9ZyJV-rQqlsSpXoBOW2CKKcUyMb9zl-CgnybyhL0"
}

webPush.setGCMAPIKey("AAAAhZPWl5s:APA91bH2-4c67ON3zho6bUmO-BOXyUX72U7JskFD9cBScdxbdet_kj_fatJLbua0KAgC9sJ69-atW7ivNt8v8ODCfqBwGHoYT-FVMUv7LisPr7AthQjQsGtobrfLnsFDB3kwdqHWjYfE");
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/ftX87U2f7NA:APA91bGLzMu8cxy-JO05PG5VeqfIywQD2176dPRintLbQ9SdFXCWEzyDjitkqwM5T2jlvWp-oi4ltlvivvOOKTTMGXRd7fBo0eyiRRCvLPzQ13zZ1znQ3D7Ti6GkLlXBt5ujS3X3PdTc",
    keys: {
        auth : "GUK8A8rMDEn8WEYMoFnEbw==",
        p256dh : "BMI/wDpZ8E1jY3n5d0USiEndFSkg6Z0GaLee6q3NEXrrgqNMt9StmcrpqHtoonXUCbvnZZCbiy+Sk6B+1PvfMx8="
    }
};

let payload = 'Notification with payload, is works!';
let options = {
    gcmAPIKey: '573710964635',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription, payload, options
);