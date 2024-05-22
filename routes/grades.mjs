import express from "express";
import Grades from "../models/Grades1.js";

const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  try {
    const user = await Grades.create(req.body);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  try {
    const user = await Grades.findById(req.params.id);
    if (!user) {
      return res.send("Grade entry not found");
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send({ error: "Error, invalid data" });
  }

});

// // Add a score to a grade entry
// router.patch("/:id/add", async (req, res) => {
//   // let collection = await db.collection("grades");
//   let query = { _id: new ObjectId(req.params.id) };

//   let result = await collection.updateOne(query, {
//     $push: { scores: req.body },
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Remove a score from a grade entry
// router.patch("/:id/remove", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: new ObjectId(req.params.id) };

//   let result = await collection.updateOne(query, {
//     $pull: { scores: req.body },
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Grades.findByIdAndDelete(req.params.id);
    res.send({
      deletedUser: deletedUser,
      message: "grade deleted",
    });
  } catch (error) {
    console.log(error);
    res.send({ error: "deleted" });
  }
});

// Get route for backwards compatibility
router.get("/student/:id", async (req, res) => {
  res.redirect(`learner/${req.params.id}`);
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  try {
    const user = await Grades.findOne(req.params.id);
    if (!user) {
      return res.send("Grade entry not found");
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send({ error: "Error, invalid data" });
  }

});

// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {
  try {
    const deletedUser = await Grades.findByIdAndDelete({learner_id:req.params.id});
    res.send({
      deletedUser: deletedUser,
      message: "user deleted",
    });
  } catch (error) {
    console.log(error);
    res.send({ error: "deleted" });
  }

 
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  try {
    const user = await Grades.findOne({class_id: String(req.params.id)});
    if (!user) {
      return res.send("Grade entry not found");
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send({ error: "Error, invalid data" });
  }
});

// // Update a class id
// router.patch("/class/:id", async (req, res) => {
//   // let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   let result = await collection.updateMany(query, {
//     $set: { class_id: req.body.class_id },
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Delete a class
router.delete("/class/:id", async (req, res) => {
  try {
    const deletedUser = await Grades.findByIdAndDelete({class_id:req.params.id});
    res.send({
      deletedUser: deletedUser,
      message: "user deleted",
    });
  } catch (error) {
    console.log(error);
    res.send({ error: "deleted" });
  }
});

export default router;
