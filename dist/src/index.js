"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("../config.json");
const ofetch_1 = require("ofetch");
const discord_js_1 = require("discord.js");
const webhookClient = config_json_1.discord_webhook_url.length !== 0 ? new discord_js_1.WebhookClient({ url: config_json_1.discord_webhook_url }) : null;
const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));
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
const init = async () => {
    const checkInResponse = await checkIn().catch(reason => {
        throw new Error(reason);
    });
    console.info(`[Check In]: ${JSON.stringify(checkInResponse)}`);
    void sendWebHookMessage(checkInResponse.message);
    await delay(3 * 1000);
    for (let i = 1; i <= 3; i++) {
        await delay(3 * 1000);
        const completeTaskResponse = await completeTask(i).catch(reason => {
            throw new Error(reason);
        });
        console.info(`[Complete Task]: ${JSON.stringify(completeTaskResponse)}`);
        const claimAwardResponse = await claimAward(i).catch(reason => {
            throw new Error(reason);
        });
        console.info(`[Claim Award]: ${JSON.stringify(claimAwardResponse)}`);
    }
    await delay(3 * 1000);
    const reCheckInResponse = await reCheckIn().catch(reason => {
        throw new Error(reason);
    });
    console.info(`[Re Check In]: ${JSON.stringify(reCheckInResponse)}`);
    void sendWebHookMessage(reCheckInResponse.message);
    await delay(3 * 1000);
    console.log('Auto daily check in will be repeat in 24 hours');
    void sendWebHookMessage('Genshin impact auto daily check in will be repeat in 24 hours');
};
void init();
setInterval(() => {
    void init();
}, 24 * 60 * 60 * 1000);
