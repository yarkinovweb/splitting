const express = require("express");

const router = express.Router();
const projectController = require("../controllers/projectController");

// Create project
router.post("/", projectController.createProject);
// Get project by id
router.get("/:id", projectController.getProject);
// Delete project by id
router.delete("/:id", projectController.deleteProject);
// // Update project by id
router.post("/:id", projectController.updateProject);
// // Get all projects
router.get("/", projectController.getProjects);

router.post("/:projectId/:memberID", projectController.addMemberToProject);

module.exports = router;
