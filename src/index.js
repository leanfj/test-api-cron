const express = require("express");
const { initScheduledJobs } = require("./scheduledFunctions/job");
const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.json());

const scheduledJobFunctionPROD = initScheduledJobs("PROD");
const scheduledJobFunctionPROD2 = initScheduledJobs("PROD2");
const scheduledJobFunctionPROD3 = initScheduledJobs("PROD3");

app.get("/:db/start", (req, res) => {
    const db = req.params.db;
    if (db === "PROD") {
        if (scheduledJobFunctionPROD.getStatus()) {
            res.json({ message: "PROD already started" })
            return;
        }
        scheduledJobFunctionPROD.start();
        res.json({ message: "PROD started" })
    }
    if (db === "PROD2") {
        if (scheduledJobFunctionPROD2.getStatus()) {
            res.json({ message: "PROD2 already started" })
            return;
        }
        scheduledJobFunctionPROD2.start();
        res.json({ message: "PROD2 started" })
    }
    if (db === "PROD3") {
        if (scheduledJobFunctionPROD3.getStatus()) {
            res.json({ message: "PROD3 already started" })
            return;
        }
        scheduledJobFunctionPROD3.start();
        res.json({ message: "PROD3 started" })
    }
})

app.get("/:db/stop", (req, res) => {
    const db = req.params.db;
    if (db === "PROD") {
        if (!scheduledJobFunctionPROD.getStatus()) {
            res.json({ message: "PROD already stoped" })
            return;
        }
        scheduledJobFunctionPROD.stop();
        res.json({ message: "PROD stoped" })
    }
    if (db === "PROD2") {
        if (!scheduledJobFunctionPROD2.getStatus()) {
            res.json({ message: "PROD2 already stoped" })
            return;
        }
        scheduledJobFunctionPROD2.stop();
        res.json({ message: "PROD2 stoped" })
    }
    if (db === "PROD3") {
        if (!scheduledJobFunctionPROD3.getStatus()) {
            res.json({ message: "PROD3 already stoped" })
            return;
        }
        scheduledJobFunctionPROD3.stop();
        res.json({ message: "PROD3 stoped" })
    }
})

app.get("/:db/status", (req, res) => {
    const db = req.params.db;
    if (db === "PROD") {
        const status = scheduledJobFunctionPROD.getStatus()
        res.json({ message: `PROD status: ${status ? "running" : "stopped"}` })
    }
    if (db === "PROD2") {
        const status = scheduledJobFunctionPROD2.getStatus()
        res.json({ message: `PROD2 status: ${status ? "running" : "stopped"}` })
    }
    if (db === "PROD3") {
        const status = scheduledJobFunctionPROD3.getStatus()
        res.json({ message: `PROD3 status: ${status ? "running" : "stopped"}` })
    }
})

app.get("/startAll", (req, res) => {
    if (scheduledJobFunctionPROD.getStatus() || scheduledJobFunctionPROD2.getStatus() || scheduledJobFunctionPROD3.getStatus()) {
        res.json({ message: "All already started" })
        return;
    }
    scheduledJobFunctionPROD.start();
    scheduledJobFunctionPROD2.start();
    scheduledJobFunctionPROD3.start();
    res.json({ message: "All started" })
})

app.get("/stopAll", (req, res) => {
    if (!scheduledJobFunctionPROD.getStatus() && !scheduledJobFunctionPROD2.getStatus() && !scheduledJobFunctionPROD3.getStatus()) {
        res.json({ message: "All already stoped" })
        return;
    }
    scheduledJobFunctionPROD.stop();
    scheduledJobFunctionPROD2.stop();
    scheduledJobFunctionPROD3.stop();
    res.json({ message: "All stoped" })
})

app.get("/statusAll", (req, res) => {
    res.json({
        message: {
            PROD: scheduledJobFunctionPROD.getStatus() ? "running" : "stopped",
            PROD2: scheduledJobFunctionPROD2.getStatus() ? "running" : "stopped",
            PROD3: scheduledJobFunctionPROD3.getStatus() ? "running" : "stopped"
        }
    })
})

app.listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});