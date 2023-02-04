const CronJob = require("node-cron");

const initScheduledJobs = (db) => {
    let running = false;
    const scheduledJobFunction = CronJob.schedule("*/5 * * * * *", () => {
        console.log(`I'm executed on a schedule! ${db}`);
        // Add your custom logic here
    }, {
        scheduled: false
    });

    const start = () => {
        scheduledJobFunction.start();
        running = true;
    }

    const stop = () => {
        scheduledJobFunction.stop();
        running = false;
    }

    const getStatus = () => {
        return running;
    }

    return {
        start,
        stop,
        getStatus
    }
}

module.exports = {
    initScheduledJobs
}