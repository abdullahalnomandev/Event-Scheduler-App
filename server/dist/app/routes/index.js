"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_route_1 = require("../modules/events/event.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/events',
        route: event_route_1.EventRoutes,
    },
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
