const { v4: uuidv4 } = require("uuid");
const { projects } = require("../config/database");

exports.create = (title, description, status, ownerId, deadline, members) => {
  const project = {
    id: uuidv4(),
    title,
    description,
    status,
    ownerId,
    deadline,
    members,
    createdAt: Date.now(),
    updateAt: Date.now(),
  };
  projects.push(project);
  return project;
};

exports.getProjectById = (id) => {
  const foundProject = projects.find((project) => project.id === id);
  if (!foundProject) {
    return null;
  }
  return foundProject;
};

exports.deleteProjectById = (id) => {
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex === -1) {
    return null;
  }
  projects.splice(projectIndex, 1);
  return true;
};

exports.getAllprojects = () => {
  return projects;
};

exports.updateProject = (
  projectId,
  title,
  description,
  status,
  deadline,
  members
) => {
  const projectIndex = projects.findIndex(
    (project) => project.id === projectId
  );
  if (projectIndex === -1) {
    throw new Error("project not found");
  }
  const updated = {
    title,
    description,
    status,
    deadline,
    members,
    updateAt: Date.now(),
  };
  Object.assign(projects[projectIndex], updated);
  projects[projectIndex] = updated;
  return updated;
};
