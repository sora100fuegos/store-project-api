const ProjectService = require("../services/projects");

exports.getProjects = async (req, res) => {
  try {
    const projects = await ProjectService.getProjects();
    res.json({
      projects: projects,
    });
  } catch (err) {
    console.error("err", err);
    res.status(500).json({
      message: "Project were not retrieved",
    });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    let project = await ProjectService.getProjectById(req.params.id);
    res.json({
      project: project,
    });
  } catch (err) {
    console.error("err", err);
    res.status(404).json({
      message: "Project was not found",
    });
  }
};


exports.createProject = async (req, res) => {
  try {
    let projectSaved = await ProjectService.createProject(req.body);
    res.status(201).json({
      message: "Project created",
      projectSaved: projectSaved,
    });
  } catch (err) {
    console.error("err", err);
    res.status(400).json({
      message: "Was not able to create the project",
    });
  }
};


exports.updateProject = async (req, res) => {
    try {
    const  { id } = req.params;

      const  updatedproject  = await ProjectService.updateProject(id,req.body);
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  };


  exports.deleteProject = async (req, res) => {
    try {
    const  { id } = req.params;

     await ProjectService.updateProject(id,req.body);
      res.status(200).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  };