"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instagramResourceFields = exports.instagramResourceOptions = exports.instagramResourceHandlers = void 0;
const image_1 = require("./image");
const reels_1 = require("./reels");
const stories_1 = require("./stories");
const handlers = {
    image: image_1.imageResource,
    reels: reels_1.reelsResource,
    stories: stories_1.storiesResource,
};
exports.instagramResourceHandlers = handlers;
const baseResourceOptions = Object.values(handlers).map((handler) => handler.option);
const commentResourceOption = {
    name: 'Comments',
    value: 'comments',
    description: 'Moderate comments on Instagram media',
};
exports.instagramResourceOptions = [...baseResourceOptions, commentResourceOption];
const fieldMap = new Map();
for (const handler of Object.values(handlers)) {
    for (const field of handler.fields) {
        fieldMap.set(field.name, field);
    }
}
exports.instagramResourceFields = Array.from(fieldMap.values());
//# sourceMappingURL=index.js.map