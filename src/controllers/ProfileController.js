const ProfileModel = require("../models/ProfileModel");

exports.CreateProfile = (req, res) => {
  let reqBody = req.body;
  ProfileModel.create(reqBody)
    .then((createdProfile) => {
      res.status(201).json({ status: "success", data: createdProfile });
    })

    .catch((err) => {
      res.status(400).json({ status: "failed", data: err });
    });
};
