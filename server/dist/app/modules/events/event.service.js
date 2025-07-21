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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const event_utils_1 = require("./event.utils");
const events = [];
let nextId = 1;
const createEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const category = (0, event_utils_1.categorizeEvent)(eventData.title, eventData.notes);
    const newEventData = Object.assign({ id: String(nextId++), archived: false, category }, eventData);
    events.push(newEventData);
    return newEventData;
});
const getAllEvents = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy, sortOrder, page, limit, skip } = (0, paginationHelper_1.paginationHelper)(paginationOptions);
    const filteredEvents = events.filter(event => {
        for (const key in filters) {
            if (Object.prototype.hasOwnProperty.call(filters, key)) {
                if (event[key] !== filters[key]) {
                    return false;
                }
            }
        }
        return true;
    });
    if (sortBy && sortOrder) {
        filteredEvents.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOrder === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
            else if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }
            return 0;
        });
    }
    const paginatedEvents = filteredEvents.slice(skip, skip + limit);
    const total = filteredEvents.length;
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: paginatedEvents,
    };
});
const updateEventArchivedStatus = (id, archived) => __awaiter(void 0, void 0, void 0, function* () {
    const index = events.findIndex(event => event.id === id);
    if (index === -1) {
        return null;
    }
    events[index].archived = archived;
    return events[index];
});
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const index = events.findIndex(event => event.id === id);
    if (index === -1) {
        return null;
    }
    const [deletedEvent] = events.splice(index, 1);
    return deletedEvent;
});
exports.EventService = {
    createEvent,
    getAllEvents,
    updateEventArchivedStatus,
    deleteEvent,
};
