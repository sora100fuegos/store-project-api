const express = require("express");

const ProjectController  = require("../controllers/item");
const router  = express.Router();

router.get("/",ProjectController.getItems);
router.get("/:id",ProjectController.getItemById);
router.post("/",ProjectController.createItem);
router.put("/:id", ProjectController.updateItem);
router.delete("/:id", ProjectController.deleteItem);

module.exports = router;
