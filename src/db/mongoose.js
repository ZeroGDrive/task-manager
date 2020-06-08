const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
});

const me = new User({
  name: "   Ayoub   ",
  email: "  ayoubyf@gmail.com  ",
});

me.save()
  .then(() => console.log(me))
  .catch((error) => console.log(error));

// const Tasks = mongoose.model("Tasks", {
//   description: {
//     type: String,
//   },
//   completed: {
//     type: Boolean,
//   },
// });

// const carWash = new Tasks({
//   description: "Washing the car",
//   completed: false,
// });

// carWash
//   .save()
//   .then(() => console.log("Saving the database"))
//   .catch((error) => console.log(error));
