const express = require("express"); //import express
const fs = require("fs");
const { request } = require("http");
const path = require("path");
const uniqid = require("uniqid");
const router = express.Router(); //use router method

const readFile = (filename) => {
  const buffer = fs.readFileSync(path.join(__dirname, filename));
  const content = buffer.toString();
  return JSON.parse(content);
};

router.get("/", (req, res) => {
  const projects = readFile("projects.json");

  if (req.query && req.query.name) {
    const filteredProjects = projects.filter((project) => {
      project.hasOwnProperty("name") && project.name === req.params.name;
      res.send(filteredProjects);
    });
  } else {
    res.send(projects);
  }
});
router.get("/:id", (req, res) => {
  const projects = readFile("projects.json");
  const selectedProject = projects.filter(
    (project) => project.ID === req.params.id
  );
  res.send(selectedProject);
});

router.post("/", (req, res) => {
  const projects = readFile("projects.json");
  const newProject = {
    ...req.body,
    ID: uniqid(),
    modifiedAt: new Date(),
  };
  projects.push(newProject);
  fs.writeFileSync(
    path.join(__dirname, "projects.json"),
    JSON.stringify(projects)
  );

  res.status(201).send({ id: newProject.ID });
});

router.put("/:id", (req, res) => {
  const projects = readFile("projects.json");
  const newProject = projects.filter((project) => project.ID !== req.params.id);
  const modifiedProject = {
    ...req.body,
    ID: req.params.id,
    modifiedAt: new Date(),
  };
  newProject.push(modifiedProject);
  fs.writeFileSync(
    path.join(__dirname, "projects.json"),
    JSON.stringify(newProject)
  );
  res.send({ id: modifiedProject.ID });
});

router.delete("/:id", (req, res) => {
  const projects = readFile("projects.json");
  const newProject = projects.filter((project) => project.ID !== req.params.id);
  fs.writeFileSync(
    path.join(__dirname, "projects.json"),
    JSON.stringify(newProject)
  );
  res.status(204).send();
});

// the req has properties like body, query, params etc.

module.exports = router; // this exports router
