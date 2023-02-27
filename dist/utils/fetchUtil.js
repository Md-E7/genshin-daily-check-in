"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reCheckIn = exports.claimAward = exports.completeTask = exports.checkIn = void 0;
const ofetch_1 = require("ofetch");
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
exports.checkIn = checkIn;
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
exports.completeTask = completeTask;
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
exports.claimAward = claimAward;
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
exports.reCheckIn = reCheckIn;
