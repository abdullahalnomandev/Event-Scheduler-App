"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const event_const_1 = require("./event.const");
const event_service_1 = require("./event.service");
const createEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventData = req.body;
    const result = yield event_service_1.EventService.createEvent(eventData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        message: 'Event created successfully!',
        data: result,
    });
}));
const getAllEvents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, event_const_1.eventFilterableFields);
    const patinationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield event_service_1.EventService.getAllEvents(filters, patinationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        message: 'Events retrieved successfully!',
        meta: result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
const updateEventArchivedStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { archived } = req.body; // receive `archived` status from body
    const result = yield event_service_1.EventService.updateEventArchivedStatus(id, archived);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        message: 'Event archived status updated successfully!',
        data: result,
    });
}));
const deleteEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedEvent = yield event_service_1.EventService.deleteEvent(id); // returns event
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: 'success',
        message: 'Event deleted successfully!',
        data: deletedEvent,
    });
}));
exports.EventController = {
    createEvent,
    getAllEvents,
    updateEventArchivedStatus,
    deleteEvent,
};
