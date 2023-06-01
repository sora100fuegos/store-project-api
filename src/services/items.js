const Item = require("../models/item");


exports.getItems = async () => {
  let items = await Item.find().lean().exec();
  return items;
};

exports.getItemById = async (id) => {
  let item = await Item.findById(id).lean().exec();
  return item;
};

exports.createItem = async (requestBody) => {
  const item = new Item ({
    name: requestBody.name,
    description: requestBody.description,
    price: requestBody.price,
    imageUrl: requestBody.imageUrl,
  });
  return await item.save();
};

exports.updateItem = async (id, itemData) => {
  return await  Item.findByIdAndUpdate(id, itemData, {
    new: true,
  })
    .lean()
    .exec();
};

exports.deleteItem = async (id) => {
  return await Item.findByIdAndDelete(id)
    .lean()
    .exec();
};