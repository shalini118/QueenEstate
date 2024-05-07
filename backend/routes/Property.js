const express = require("express");
const { Property } = require("../models/Property");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let property = await Property.find({});
    let length = property.length;
    if (length > 0) {
      return res.status(200).json({
        message: "Property retrive successfully",
        property,
      });
    } else {
      res.status(404).send({
        message: "No data found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let property = await Property.findById(id);
    if (property) {
      res.status(200).send({
        message: "Data found",
        property,
      });
    } else {
      res.status(404).send({
        message: "Data not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});


router.post("/", async (req, res) => {
  console.log(req.body)
  const {
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    bathRoom,
    bedRoom,
    furnished,
    parking,
    type,
    offer,
    imageUrl,
  } = req.body;
  
  const fields = {
    name: "Name is missing",
    description: "Description is missing",
    address: "Address is missing",
    type: "Type is missing",
    parking: "Parking status is missing",
    furnished: "Furnished status is missing",
    offer: "Offer is missing",
    bedRoom: "Bedroom count is missing",
    bathRoom: "Bathroom count is missing",
    regularPrice: "Regular price is missing",
    discountPrice: "Discount price is missing",
    imageUrl: "Image URL is missing",
  };

  let error = false;
  for (let field in fields) {
    if (req.body[field] === undefined || req.body[field] === "") {
      error = true;
      console.log("error on field", fields[field])
      res.status(400).send({
        message: "error on field"+fields[field],
      });
      break;
    }
  }

  const propertyObj = {
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    bathRoom,
    bedRoom,
    furnished,
    parking,
    type,
    offer,
    imageUrl,
  };
  const property = new Property(propertyObj);
  try {
    if (!error) {
      await property.save();

      res.status(200).send({
        mesage: "Data saved successfully",
        property,
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong in adding the data",
      error: err.mesage,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathRoom,
      bedRoom,
      furnished,
      parking,
      type,
      offer,
      imageUrl,
    } = req.body;

    let id = req.params.id;
    await Property.findByIdAndUpdate(id, {
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathRoom,
      bedRoom,
      furnished,
      parking,
      type,
      offer,
      imageUrl,
    });
    let property = await Property.findById(id);

    res.status(200).send({
      message: "Data updated successfully",
      result: property,
    });
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong in updating the data",
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let property = await Property.findByIdAndDelete(id);
    res.status(200).send({
      message: "Data deleted",
      data: property,
    });
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong in deleting the data",
      error: err.message,
    });
  }
});

module.exports = router;
