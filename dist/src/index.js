"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("../config.json");
const ofetch_1 = require("ofetch");
const discord_js_1 = require("discord.js");
const webhookClient = config_json_1.discord_webhook_url.length !== 0 ? new discord_js_1.WebhookClient({ url: config_json_1.discord_webhook_url }) : null;
const sendWebHookMessage = async (message) => {
    return await webhookClient?.send({
        content: `> **${message}**`
    });
};
const checkIn = async () => {
    return await (0, ofetch_1.ofetch)(' https://sg-hk4e-api.hoyolab.com/event/sol/sign', {
        method: 'POST',
        query: {
            act_id: config_json_1.act_id
        },
        headers: {
            cookie: config_json_1.cookie
        }
    });
};
const reCheckIn = async () => {
    return await (0, ofetch_1.ofetch)(' https://sg-hk4e-api.hoyolab.com/event/sol/resign', {
        method: 'POST',
        query: {
            act_id: config_json_1.act_id
        },
        headers: {
            cookie: config_json_1.cookie
        }
    });
};
const init = () => {
    void checkIn().then(async (response) => {
        console.info(response.message);
        await sendWebHookMessage(response.message);
    }).catch(reason => {
        throw new Error(reason);
    });
    void reCheckIn().then(async (response) => {
        console.info(response.message);
        await sendWebHookMessage(response.message);
    }).catch(reason => {
        throw new Error(reason);
    });
};
init();
setInterval(init, 24 * 60 * 60 * 1000);
