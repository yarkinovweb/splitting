const { v4: uuidv4 } = require("uuid");
const { users } = require("../config/database");

exports.create = (title, description, status, ownerId, deadline, members) => {
  const project = {
    id: uuidv4(),
    title,
    description,
    status,
    ownerId,
    deadline,
    members: [],
    createdAt: Date.now(),
    updateAt: Date.now(),
  };
  const user = users.find((user) => user.id === ownerId);
  if (!user) {
    throw new Error("User not found!");
  }
  user.ownedProjects.push(project);
  return project;
};

exports.getProjectById = (id, ownerId) => {
  const user = users.find((user) => user.id === ownerId);
  if (!user) {
    throw new Error("User not found!");
  }
  const foundProject = user.ownedProjects.find((project) => project.id === id);

  if (!foundProject) {
    return null;
  }

  return foundProject;
};

exports.deleteProjectById = (id, ownerId) => {
  const user = users.find((user) => user.id === ownerId);
  if (!user) {
    throw new Error("User not found!");
  }
  const projectIndex = user.ownedProjects.findIndex(
    (project) => project.id === id
  );
  if (projectIndex === -1) {
    return null;
  }
  user.ownedProjects.splice(projectIndex, 1);
  return true;
};

exports.getAllprojects = (ownerId) => {
  const user = users.find((user) => user.id === ownerId);
  if (!user) {
    throw new Error("User not found!");
  }
  return user.ownedProjects;
};

exports.updateProject = (
  projectId,
  title,
  description,
  status,
  deadline,
  members,
  ownerId
) => {
  const user = users.find((user) => user.id === ownerId);
  if (!user) {
    throw new Error("User not found!");
  }

  const projectIndex = user.ownedProjects.findIndex(
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
  Object.assign(user.ownedProjects[projectIndex], updated);
  user.ownedProjects[projectIndex] = updated;
  return updated;
};

exports.addMember = (ownerId, projectId, memberID) => {
  const user = users.find((user) => user.id === ownerId);
  if (!user) {
    throw new Error("User not found!");
  }

  const project = user.ownedProjects.find(
    (project) => project.id === projectId
  );
  if (!project) {
    throw new Error("Project not found!");
  }

  const member = users.find((user) => user.id === memberID);
  if (!member) {
    throw new Error("Member not found!");
  }

  member.participatedProjects.push(project);
  project.members.push({ id: memberID });
  return true;
};
