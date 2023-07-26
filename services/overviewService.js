const Event = require('../models/Event');
const TaskReminder = require('../models/TaskReminder');
const TeamMember = require('../models/TeamMember')

class OverviewService {

    async getUpcomingEventsCount() {
        const eventsCount = await Event.countDocuments();
        return eventsCount;
    }

    async getPendingTasksCountById(id) {
        const tasksCount = await TaskReminder.find({ createdBy: id });
        return tasksCount.length;
    }

    async getTasksById(id) {
        const tasks = await TaskReminder.find({ createdBy: id }).sort({ dueDateTime: 1 }).limit(5);
        return tasks;
    }

    async addTask(taskBody) {
        const task = await TaskReminder.create(taskBody);
        return task;
    }

    async getEvents() {
        const events = await Event.find().sort({ startDate: 1 }).limit(5);
        return events;
    }

    // for testing only
    async addEvent(eventBody) {
        const event = new Event(eventBody);
        event.createdDate = new Date(); // Set the createdDate property to the current date

        // Generate the next eventId
        const count = await Event.find().sort({ "eventId": 1 });
        event.eventId = count[count.length - 1].eventId + 1;

        await event.save();
        return event;
    }

    async getTeamMemberInfoById(id) {
        const teamMember = await TeamMember.where('workdayId', id);
        return teamMember;
    }
}

module.exports = new OverviewService();
