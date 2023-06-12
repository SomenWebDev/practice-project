const ProfileModel = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");

// exports.CreateProfile = (req, res) => {
//   let reqBody = req.body;
//   ProfileModel.create(reqBody)
//     .then((createdProfile) => {
//       res.status(201).json({ status: "success", data: createdProfile });
//     })

//     .catch((err) => {
//       res.status(400).json({ status: "failed", data: err });
//     });
// };

// exports.UserLogin = (req, res) => {
//   let UserName = req.body["UserName"];
//   let Password = req.body["Password"];

//   ProfileModel.find({ UserName: UserName, Password: Password })
//     .then((loggedIn) => {
//       if (loggedIn.length > 0) {
//         let Payload = {
//           exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
//           data: loggedIn[0],
//         };
//         let token = jwt.sign(Payload, "SecretKey123456789");

//         res
//           .status(200)
//           .json({ status: "success", token: token, data: loggedIn[0] });
//       } else {
//         res
//           .status(401)
//           .json({ status: "error", message: "Invalid username or password" });
//       }

//       // res.status(201).json({ status: "success", data: loggedIn });
//     })

//     .catch((err) => {
//       res.status(400).json({ status: "Fail", data: err });
//     });
// };

// exports.SelectProfile = (req, res) => {
//   let UserName = "Admin";
//   ProfileModel.find({ UserName: UserName })
//     .then((selectedProfile) => {
//       res.status(201).json({ status: "success", data: selectedProfile });
//     })
//     .catch((err) => {
//       res.status(400).json({ status: "Failed", data: err });
//     });
// };

exports.CreateProfile = async (req, res) => {
  try {
    let reqBody = req.body;
    const createdProfile = await ProfileModel.create(reqBody);
    res.status(201).json({ status: "success", data: createdProfile });
  } catch (err) {
    res.status(400).json({ status: "failed", data: err });
  }
};

exports.UserLogin = async (req, res) => {
  try {
    let UserName = req.body["UserName"];
    let Password = req.body["Password"];

    const loggedIn = await ProfileModel.find({
      UserName: UserName,
      Password: Password,
    });

    if (loggedIn.length > 0) {
      let Payload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: loggedIn[0],
      };
      let token = jwt.sign(Payload, "SecretKey123456789");

      res
        .status(200)
        .json({ status: "success", token: token, data: loggedIn[0] });
    } else {
      res
        .status(401)
        .json({ status: "error", message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(400).json({ status: "Fail", data: err });
  }
};

exports.SelectProfile = async (req, res) => {
  try {
    let UserName = req.headers["username"];
    const selectedProfile = await ProfileModel.find({ UserName: UserName });
    res.status(201).json({ status: "success", data: selectedProfile });
  } catch (err) {
    res.status(400).json({ status: "Failed", data: err });
  }
};
