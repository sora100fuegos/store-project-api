const request = require("supertest");
const app = require("../../../app").app;
const Item = require("../../models/item");

const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.url);
});

afterAll(async () => {
  await mongoose.disconnect();
});

const ItemOne = {
    name: "milk ",
    description: "This is an example item",
    price : 20.90,
    imageUrl: "projectone.com/image.png",
  };

  const ItemTwo = {
    name: "pencils",
    description: "This is an example item",
    price : 20.90,
    imageUrl: "projectone.com/image.png",
  };


describe("GET / items", () => {
  

  it("should return all projects in database", async () => {
    
    await Item.deleteMany();
    await Item.create(ItemOne);
    await Item.create(ItemTwo);

    const response = await request(app).get("/items");
    expect(response.status).toBe(200);

    const items = response.body.items;

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toEqual(2);
    expect(items).toEqual(
      expect.arrayContaining([expect.objectContaining(ItemOne)]),
      expect.arrayContaining([expect.objectContaining(ItemTwo)])
    );
    await Item.deleteMany();
  });
});

describe("POST /items", () => {
    it("should create a new projects and return a created status code", async () => {
      const response = await request(app).post("/items").send(ItemOne);
  
      expect(response.statusCode).toBe(201);
      expect(response.body.itemSaved).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          name: ItemOne.name,
          description: ItemOne.description,
          price: ItemOne.price,
          imageUrl: ItemOne.imageUrl,
    
        })
      );
  
      await Item.findByIdAndDelete(response.body.itemSaved._id);
    });
  
    it("should return a 400 code and an error message when required fields are missing", async () => {
      const { price, ...incompleteProject } = ItemOne;
      console.log(incompleteProject);
  
      const response = await request(app)
        .post("/items")
        .send(incompleteProject);
  
      expect(response.statusCode).toBe(400);
      expect(response.error.text).toContain("Was not able to create the project");
    });
});