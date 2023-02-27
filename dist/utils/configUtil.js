"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAccount = exports.addAccount = exports.getConfig = exports.createConfigIfNotExist = void 0;
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const configFilePath = path_1.default.join((0, os_1.homedir)(), '.genshin-daily-check-in.json');
const createConfigIfNotExist = () => {
    if (!(0, fs_1.existsSync)(configFilePath)) {
        (0, fs_1.writeFileSync)(configFilePath, JSON.stringify({
            accounts: []
        }));
    }
};
exports.createConfigIfNotExist = createConfigIfNotExist;
const getConfig = () => {
    const data = (0, fs_1.readFileSync)(configFilePath, 'utf-8');
    return JSON.parse(data);
};
exports.getConfig = getConfig;
const addAccount = (name, act_id, cookie) => {
    const config = getConfig();
    config.accounts?.push({
        name,
        act_id,
        cookie
    });
    (0, fs_1.writeFileSync)(configFilePath, JSON.stringify(config));
};
exports.addAccount = addAccount;
const removeAccount = (name) => {
    const config = getConfig();
    const filteredAccount = config.accounts?.filter(object => object.name !== name);
    if (filteredAccount == null || filteredAccount.length === config.accounts?.length) {
        throw new Error(`Account ${name} not found`);
    }
    config.accounts = filteredAccount;
    (0, fs_1.writeFileSync)(configFilePath, JSON.stringify(config));
};
exports.removeAccount = removeAccount;
