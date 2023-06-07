const Chance = require("chance");

const ItemService = require("../items");

const Item = require("../../models/item");

const chance = new Chance();

jest.mock("../../models/item");

describe("when calling the project service method", () => {
  let id, itemData, updatedItem;

  beforeEach(() => {
    id = chance.guid();
    itemData = {
      name: chance.name(),
      describe: chance.string(),
    };
    updatedItem = itemData;

    Item.findByIdAndUpdate = jest.fn().mockReturnThis();
    Item.lean = jest.fn().mockReturnThis();
    Item.exec = jest.fn().mockResolvedValue(updatedItem);
  });

  it("should call Project.findByIdAndUpdate with the id, project data and return document new property", async () => {
    await ItemService.updateItem(id, itemData);

    expect(Item.findByIdAndUpdate).toBeCalledWith(id, itemData, {
      new: true,
    });
  });

  it("should call Project.lean", async () => {
    await ItemService.updateItem(id, itemData);

    expect(Item.lean).toBeCalled();
  });

  it("should call Project.exec", async () => {
    await ItemService.updateItem(id, itemData);

    expect(Item.exec).toBeCalled();
  });

  it("should return the updated project data", async () => {
    const result = await ItemService.updateItem(id, itemData);

    expect(result).toEqual(updatedItem);
  });
});

describe("when calling the project delete method", () => {
  let id;

  beforeEach(() => {
    id = chance.string();

    Item.findByIdAndDelete = jest.fn().mockReturnThis();
    Item.exec = jest.fn().mockResolvedValue();
  });

  it("should call deleteProject with an ID property", async () => {
    await ItemService.deleteItem(id);
    expect(Item.findByIdAndDelete).toBeCalledWith(id);
  });
});