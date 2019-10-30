let webPush = require('web-push');

let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/enFHHdng5Wg:APA91bEaGEIRbyZwU3ex-IMxV6_DxH975pZEy594JJu74I-W2voeJ6xkURjLQfVUEjRmqRX0xJCk3_2rrlYj_aSe7B8DSodRIG1_4G0MdGM1RRYyCE8vAVRRj7U3HF2_HcBXNfwvA5RK",
    "keys": {
        "p256dh": "BHKtwtvUcYJE+yU4XANZJHIlID46gZbiJIn6AiaTIrnG/pENMQPFni3lC496MCbHQI2pLH39El42N1Co6LRgGKY=", 
        "auth": "Aqv2m1L7FhNMAYXRyhHiQQ=="
    }
};
let payload = 'Here is a payload!';
let options = {
    gcmAPIKey: 'GCM_KEY',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);