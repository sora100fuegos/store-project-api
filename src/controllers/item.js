const ItemService = require("../services/items");

exports.getItems = async (req , res) => {
  try {
    const items = await ItemService.getItems();
    res.json({
      items: items,
    });
  } catch (err) {
    console.error("err", err);
    res.status(500).json({
      message: "Project were not retrieved",
    });
  }
};

exports.getItemById = async (req, res) => {
  try {
    let item = await ProjectService.getItemById(req.params.id);
    res.json({
      item: item,
    });
  } catch (err) {
    console.error("err", err);
    res.status(404).json({
      message: "Project was not found",
    });
  }
};


exports.createItem = async (req, res) => {
  try {
    let itemSaved = await ItemService.createItem(req.body);
    res.status(201).json({
      message: "Item created",
      itemSaved: itemSaved,
    });
  } catch (err) {
    console.error("err", err);
    res.status(400).json({
      message: "Was not able to create the project",
    });
  }
};


exports.updateItem = async (req, res) => {
    try {
    const  { id } = req.params;

      const  updateditem  = await ItemService.updateItem(id,req.body);
      res.status(200).json(updateditem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  };


  exports.deleteItem = async (req, res) => {
    try {
    const  { id } = req.params;

     await ItemService.deleteItem(id,req.body);
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  };