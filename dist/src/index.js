"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("../config.json");
const ofetch_1 = require("ofetch");
const checkIn = async () => {
    const response = await (0, ofetch_1.ofetch)(' https://sg-hk4e-api.hoyolab.com/event/sol/sign', {
        method: 'POST',
        query: {
            act_id: config_json_1.act_id
        },
        headers: {
            cookie: config_json_1.cookie
        }
    }).catch(reason => {
        throw new Error(reason);
    });
    if (response.message === 'OK') {
        console.info(response);
        return true;
    }
    console.error(response);
    return false;
};
const reCheckIn = async () => {
    const response = await (0, ofetch_1.ofetch)(' https://sg-hk4e-api.hoyolab.com/event/sol/resign', {
        method: 'POST',
        query: {
            act_id: config_json_1.act_id
        },
        headers: {
            cookie: config_json_1.cookie
        }
    }).catch(reason => {
        throw new Error(reason);
    });
    if (response.message === 'OK') {
        console.info(response);
        return true;
    }
    console.error(response);
    return false;
};
const init = () => {
    void checkIn();
    setTimeout(() => {
        void reCheckIn();
    }, 3 * 1000);
};
init();
setInterval(init, 24 * 60 * 60 * 1000);
