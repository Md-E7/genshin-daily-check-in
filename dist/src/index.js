"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("../config.json");
const ofetch_1 = require("ofetch");
const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));
const checkIn = async (act_id, cookie) => {
    return await (0, ofetch_1.ofetch)(' https://sg-hk4e-api.hoyolab.com/event/sol/sign', {
        method: 'POST',
        query: {
            act_id
        },
        headers: {
            cookie
        }
    });
};
const completeTask = async (id, act_id, cookie) => {
    return await (0, ofetch_1.ofetch)('https://sg-hk4e-api.hoyolab.com/event/sol/task/complete', {
        method: 'POST',
        query: {
            act_id,
            id
        },
        headers: {
            cookie
        }
    });
};
const claimAward = async (id, act_id, cookie) => {
    return await (0, ofetch_1.ofetch)('https://sg-hk4e-api.hoyolab.com/event/sol/task/award', {
        method: 'POST',
        query: {
            act_id,
            id
        },
        headers: {
            cookie
        }
    });
};
const reCheckIn = async (act_id, cookie) => {
    return await (0, ofetch_1.ofetch)(' https://sg-hk4e-api.hoyolab.com/event/sol/resign', {
        method: 'POST',
        query: {
            act_id
        },
        headers: {
            cookie
        }
    });
};
const init = async () => {
    for (const account of config_json_1.accounts) {
        const checkInResponse = await checkIn(account.act_id, account.cookie).catch(reason => {
            throw new Error(reason);
        });
        console.info(`[${account.name}] Check-in: ${JSON.stringify(checkInResponse)}`);
        await delay(500);
        for (let i = 1; i <= 3; i++) {
            await delay(500);
            const completeTaskResponse = await completeTask(i, account.act_id, account.cookie).catch(reason => {
                throw new Error(reason);
            });
            console.info(`[${account.name}] Complete Task: ${JSON.stringify(completeTaskResponse)}`);
            const claimAwardResponse = await claimAward(i, account.act_id, account.cookie).catch(reason => {
                throw new Error(reason);
            });
            console.info(`[${account.name}] Claim Award: ${JSON.stringify(claimAwardResponse)}`);
        }
        await delay(500);
        const reCheckInResponse = await reCheckIn(account.act_id, account.cookie).catch(reason => {
            throw new Error(reason);
        });
        console.info(`[${account.name}] Re-check-in: ${JSON.stringify(reCheckInResponse)}`);
        await delay(500);
        console.info(`[${account.name}] Genshin impact auto daily check in will be repeat in 24 hours`);
    }
};
void init();
setInterval(() => {
    void init();
}, 24 * 60 * 60 * 1000);
