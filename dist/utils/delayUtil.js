"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));
exports.delay = delay;
