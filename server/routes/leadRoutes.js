// const express = require("express");
// const router = express.Router();
// const Lead = require("../models/lead");

// // Create Lead
// router.post("/", async (req, res) => {
//   try {
//     const newLead = new Lead(req.body);
//     const savedLead = await newLead.save();
//     res.status(201).json(savedLead);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get All Leads
// router.get("/", async (req, res) => {
//   try {
//     const leads = await Lead.find();
//     res.json(leads);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

// // UPDATE lead
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedLead = await Lead.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true } // updated data return karega
//     );

//     if (!updatedLead) {
//       return res.status(404).json({ message: "Lead not found" });
//     }

//     res.json(updatedLead);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const express = require("express");
const router = express.Router();
const Lead = require("../models/lead");

// Create Lead
router.post("/", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE lead
router.put("/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE lead
router.delete("/:id", async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;