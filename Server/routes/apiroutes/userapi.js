const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/", async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/", async function (req, res, next) {
    try {
        const user = await User.findUser(req.body.email);
        if (user !== null) {
            res.status(400).json({ msg: `id already exists` });
        } else {
          User.addUser(req.body.firstname, req.body.lastname, req.body.email);
          res.json({ msg: `user ${req.body.email} created succesfully` });
        }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

module.exports = router;


// router.get("/:courseid", async function (req, res, next) {
//     const course = await Course.findCourse(req.params.courseid);
//     if (course) {
//       res.json(course);
//     } else {
//       res.status(404).json({ msg: "course with that id does not exist" });
//     }
//   });


  
//   router.delete("/:courseid", async function (req, res, next) {
//     const course = await Course.findCourse(req.params.courseid);
//     if (course) {
//       await course.destroy();
//       res.json({ msg: `course ${req.params.courseid} deleted succesfully` });
//     } else {
//       res.status(404).json({ msg: "course with that id does not exist" });
//     }
//   });
  
//   router.post("/", async function (req, res, next) {
//     try {
//       await Course.create({
//         courseid: req.body.courseid,
//         coursename: req.body.coursename,
//         semester: req.body.semester,
//         coursedesc: req.body.coursedesc,
//         enrollnum: req.body.enrollnum,
//       });
//       res.json({ msg: `course ${req.body.courseid} created succesfully` });
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });
  