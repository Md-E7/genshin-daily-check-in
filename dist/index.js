#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const configUtil_1 = require("./utils/configUtil");
const fetchUtil_1 = require("./utils/fetchUtil");
const delayUtil_1 = require("./utils/delayUtil");
const node_schedule_1 = require("node-schedule");
const program = new commander_1.Command();
(0, configUtil_1.createConfigIfNotExist)();
const { accounts } = (0, configUtil_1.getConfig)();
const init = async (message) => {
    if (accounts == null) {
        throw new Error('Invalid config.json structure');
    }
    for (const account of accounts) {
        if (account.name == null || account.act_id == null || account.cookie == null) {
            throw new Error('Invalid config.json structure');
        }
        const checkInResponse = await (0, fetchUtil_1.checkIn)(account.act_id, account.cookie).catch(reason => {
            throw new Error(reason);
        });
        console.info(`[${account.name}] Check-in: ${JSON.stringify(checkInResponse)}`);
        await (0, delayUtil_1.delay)(500);
        for (let i = 1; i <= 3; i++) {
            await (0, delayUtil_1.delay)(500);
            const completeTaskResponse = await (0, fetchUtil_1.completeTask)(i, account.act_id, account.cookie).catch(reason => {
                throw new Error(reason);
            });
            console.info(`[${account.name}] Complete Task: ${JSON.stringify(completeTaskResponse)}`);
            const claimAwardResponse = await (0, fetchUtil_1.claimAward)(i, account.act_id, account.cookie).catch(reason => {
                throw new Error(reason);
            });
            console.info(`[${account.name}] Claim Award: ${JSON.stringify(claimAwardResponse)}`);
        }
        await (0, delayUtil_1.delay)(500);
        const reCheckInResponse = await (0, fetchUtil_1.reCheckIn)(account.act_id, account.cookie).catch(reason => {
            throw new Error(reason);
        });
        console.info(`[${account.name}] Re-check-in: ${JSON.stringify(reCheckInResponse)}`);
    }
    if (message != null) {
        await (0, delayUtil_1.delay)(500);
        console.info(message);
    }
};
program.name('genshin-daily-check-in').version('0.7.0');
program.command('start')
    .description('Run genshin daily check-in once')
    .action(() => {
    void init(null);
});
program.command('start-forever')
    .description('Run genshin daily check-in forever')
    .action(() => {
    void init('genshin-daily-check-in will be repeated tomorrow at 12:00');
    (0, node_schedule_1.scheduleJob)('0 12 * * *', () => {
        void init('genshin-daily-check-in will be repeated tomorrow at 12:00');
    });
});
const accountsCommand = program.command('account')
    .description('Add or remove account');
accountsCommand.command('add')
    .argument('<name>', 'Account name')
    .argument('<act_id>', 'Account act_id')
    .argument('<cookie>', 'Account cookie')
    .action((name, act_id, cookie) => {
    (0, configUtil_1.addAccount)(name, act_id, cookie);
});
accountsCommand.command('remove')
    .argument('<name>', 'Account name')
    .action((name) => {
    (0, configUtil_1.removeAccount)(name);
});
accountsCommand.command('list').action(() => {
    console.info(accounts);
});
program.parse();
