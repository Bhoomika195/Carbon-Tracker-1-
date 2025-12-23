const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");
const auth = require("../middleware/authMiddleware");

// Apply auth middleware to all routes
router.use(auth);

// ✅ CREATE ENTRY
router.post("/", async (req, res) => {
    try {
        console.log('ENTRIES POST received');
        const entryData = {
            ...req.body,
            userId: req.user.id
        };
        const entry = await Entry.create(entryData);
        res.status(201).json(entry);
    } catch (err) {
        console.error("Create entry error:", err);
        res.status(400).json({ msg: err.message });
    }
});

// ✅ GET ENTRIES BY USER
router.get("/", async (req, res) => {
    try {
        const entries = await Entry.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(entries);
    } catch (err) {
        console.error("Fetch entries error:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

// ✅ UPDATE ENTRY
router.put("/:id", async (req, res) => {
    try {
        const entry = await Entry.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { $set: req.body },
            { new: true }
        );
        if (!entry) {
            return res.status(404).json({ msg: "Entry not found or unauthorized" });
        }
        res.json(entry);
    } catch (err) {
        console.error("Update entry error:", err);
        res.status(400).json({ msg: err.message });
    }
});

// ✅ DELETE ENTRY
router.delete("/:id", async (req, res) => {
    try {
        const entry = await Entry.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!entry) {
            return res.status(404).json({ msg: "Entry not found or unauthorized" });
        }
        res.json({ msg: "Entry deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Delete failed" });
    }
});

module.exports = router;
