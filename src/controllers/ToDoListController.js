const ToDoListModel = require("../models/ToDoListModel");

exports.CreateToDo = async (req, res) => {
  try {
    let reqBody = req.body;
    let TodoSubject = reqBody["TodoSubject"];
    let TodoDescription = reqBody["TodoDescription"];
    let UserName = req.headers["username"];
    let TodoStatus = "New";
    let TodoDate = Date.now();
    let TodoUpdateDate = Date.now();
    let PostBody = {
      UserName: UserName,
      TodoSubject: TodoSubject,
      TodoDescription: TodoDescription,
      TodoStatus: TodoStatus,
      TodoDate: TodoDate,
      TodoUpdateDate: TodoUpdateDate,
    };

    const createdToDo = await ToDoListModel.create(PostBody);
    res.status(201).json({ status: "success", data: createdToDo });
  } catch (err) {
    res.status(400).json({ status: "failed", data: err });
  }
};

exports.SelectToDo = async (req, res) => {
  try {
    let UserName = req.headers["username"];
    const selectedToDo = await ToDoListModel.find({ UserName: UserName });
    res.status(201).json({ status: "success", data: selectedToDo });
  } catch (err) {
    res.status(400).json({ status: "Failed", data: err });
  }
};

exports.UpdateToDo = async (req, res) => {
  try {
    let TodoSubject = req.body["TodoSubject"];
    let TodoDescription = req.body["TodoDescription"];
    let _id = req.body["_id"];
    let TodoUpdateDate = Date.now();
    let PostBody = {
      TodoSubject: TodoSubject,
      TodoDescription: TodoDescription,
      TodoUpdateDate: TodoUpdateDate,
    };
    const updatedToDo = await ToDoListModel.updateOne(
      { _id: _id },
      { $set: PostBody },
      { upsert: true }
    );

    res.status(201).json({ status: "success", data: updatedToDo });
  } catch (err) {
    res.status(400).json({ status: "Failed", data: err });
  }
};

exports.UpdateStatusToDo = async (req, res) => {
  try {
    let TodoStatus = req.body["TodoStatus"];
    let _id = req.body["_id"];
    let TodoUpdateDate = Date.now();
    let PostBody = {
      TodoStatus: TodoStatus,
      TodoUpdateDate: TodoUpdateDate,
    };
    const updatedStatusToDo = await ToDoListModel.updateOne(
      { _id: _id },
      { $set: PostBody },
      { upsert: true }
    );
    res.status(201).json({ status: "success", data: updatedStatusToDo });
  } catch (err) {
    res.status(400).json({ status: "Failed", data: err });
  }
};

exports.RemoveToDo = async (req, res) => {
  try {
    let _id = req.body["_id"];
    const deleted = await ToDoListModel.deleteOne({ _id: _id });
    res.status(201).json({ status: "success", data: deleted });
  } catch (err) {
    res.status(400).json({ status: "Failed", data: err });
  }
};
