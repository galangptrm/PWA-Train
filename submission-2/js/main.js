var webPush = require('web-push');

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eK1lUVi42nQ:APA91bGed5lYqVWCeAUF9QTwfFulzzaJteP_dknm0at1pU4SUfyI9o5cf5qgIf1uRX2zDFkNATK2E4ZOdMCFFOE6K1KolvMFLmcTxnkPi7xNOzI-7f_gEhAhuSBnNzbg4e0UFcqVrxPI",
    "keys": {
        "p256dh": "BCKTwZKCxcvttmGw/TkCsdr63vIqG/lu8jfhDnTbomErW/k6Mfqw64k6thluxMccwlSuLZmJFFyOpB+xSggL8mU=", 
        "auth": "ZNY98jroLb2nfRAKth2yXw=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AIzaSyB8ix1rsc9v3bRqMt_7hmz2W9gzmCwjuwQ',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);