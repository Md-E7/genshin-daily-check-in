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
const completeTask = async (id) => {
    return await (0, ofetch_1.ofetch)('https://sg-hk4e-api.hoyolab.com/event/sol/task/complete', {
        method: 'POST',
        query: {
            act_id: config_json_1.act_id,
            id
        },
        headers: {
            cookie: config_json_1.cookie
        }
    });
};
const claimAward = async (id) => {
    return await (0, ofetch_1.ofetch)('https://sg-hk4e-api.hoyolab.com/event/sol/task/award', {
        method: 'POST',
        query: {
            act_id: config_json_1.act_id,
            id
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
    checkIn().then(response => {
        console.info(`[Check In]: ${JSON.stringify(response)}`);
        void sendWebHookMessage(response.message);
    }).catch(reason => {
        throw new Error(reason);
    });
    for (let i = 1; i <= 3; i++) {
        setTimeout(() => {
            completeTask(i).then(response => {
                console.info(`[Complete Task]: ${JSON.stringify(response)}`);
            }).catch(reason => {
                throw new Error(reason);
            });
            claimAward(i).then(response => {
                console.info(`[Claim Award]: ${JSON.stringify(response)}`);
            }).catch(reason => {
                throw new Error(reason);
            });
        }, i * 3 * 1000);
    }
    setTimeout(() => {
        reCheckIn().then(response => {
            console.info(`[Re Check In]: ${JSON.stringify(response)}`);
            void sendWebHookMessage(response.message);
        }).catch(reason => {
            throw new Error(reason);
        });
    }, 12 * 1000);
};
init();
setInterval(init, 24 * 60 * 60 * 1000);
