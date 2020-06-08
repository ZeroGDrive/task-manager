const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// const me = new User({
//   name: "Ayoub",
//   age: 21,
// });

// me.save()
//   .then(() => console.log(me))
//   .catch((error) => console.log(error));

const Tasks = mongoose.model("Tasks", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const carWash = new Tasks({
  description: "Washing the car",
  completed: false,
});

carWash
  .save()
  .then(() => console.log("Saving the database"))
  .catch((error) => console.log(error));
