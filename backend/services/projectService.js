const Project = require("../models/Project");

const createProject = async (data) => {
  return await Project.create(data);
};

const getAllProjects = async () => {
  return await Project.findAll();
};

const getProjectById = async (id) => {
  return await Project.findByPk(id);
};

const updateProject = async (id, data) => {
  const project = await Project.findByPk(id);

  if (!project) return null;

  await project.update(data);

  return project;
};

const deleteProject = async (id) => {
  const project = await Project.findByPk(id);

  if (!project) return null;

  await project.destroy();

  return true;
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};