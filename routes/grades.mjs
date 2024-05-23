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

//add score

router.patch('/:id/scores/add', async (req, res) => {
  // find the grade to update
  const grade = await Grades.findOne({_id: req.params.id});
 
  if (!grade) return res.send('Grade not found!')
  // add the new score (req.body) to the scores array
  grade.scores.push(req.body);
  // save doc
  await grade.save();
  res.send(grade);

});
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


//? put
router.put('/class/:id', async (req, res) => {
  const updatedGrade = await Grades.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(updatedGrade);
});

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
