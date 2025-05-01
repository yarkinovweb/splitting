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
  const { ownerId } = req.body;

  const project = projectService.getProjectById(id, ownerId);
  if (project) {
    return res.status(200).json({ project });
  }
  return res.status(500).json({ message: "Project not found!" });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  const { ownerId } = req.body;
  if (projectService.deleteProjectById(id, ownerId)) {
    return res.status(200).json({ message: "Project successfully deleted" });
  }
  return res.status(500).json({ message: "Project not found" });
};

exports.getProjects = (req, res) => {
  const { ownerId } = req.body;

  try {
    const projects = projectService.getAllprojects(ownerId);
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateProject = (req, res) => {
  const { title, description, status, deadline, members, ownerId } = req.body;
  const projectId = req.params.id;
  try {
    const updated = projectService.updateProject(
      projectId,
      title,
      description,
      status,
      deadline,
      members,
      ownerId
    );
    return res.status(201).json({ message: "Project updated", updated });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.addMemberToProject = (req, res) => {
  const { ownerId } = req.body;
  const { projectId, memberID } = req.params;

  try {
    const isAdded = projectService.addMember(ownerId, projectId, memberID);
    if (isAdded) {
      return res.status(200).json({ message: "Member successfully added" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
