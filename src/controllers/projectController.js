const projectService = require("../services/projectService");

exports.createProject = (req, res) => {
  const { title, description, status, ownerId, deadline, members } = req.body;
  try {
    const project = projectService.create(
      title,
      description,
      status,
      ownerId,
      deadline,
      members
    );
    return res.status(201).json({ message: "Project created!", project });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getProject = (req, res) => {
  const { id } = req.params;
  const project = projectService.getProjectById(id);
  if (project) {
    return res.status(200).json({ project });
  }
  return res.status(500).json({ message: "Project not found!" });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  if (projectService.deleteProjectById(id)) {
    return res.status(200).json({ message: "Project successfully deleted" });
  }
  return res.status(500).json({ message: "Project not found" });
};

exports.getProjects = (req, res) => {
  try {
    const projects = projectService.getAllprojects();
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateProject = (req, res) => {
  const { title, description, status, deadline, members } = req.body;
  const projectId = req.params.id;
  try {
    const updated = projectService.updateProject(
      projectId,
      title,
      description,
      status,
      deadline,
      members
    );
    return res.status(201).json({ message: "Project updated", updated });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
