const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const path = require("path");
const os = require("os");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const multer = require("multer");
// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

// cloudinary configurations
const cloud_name = process.env.cloudinaryName;
const api_key = process.env.cloudinaryApiKey;
const api_secret = process.env.cloudinaryApiSecret;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

// Serve static files from the 'files' directory
app.use("/files", express.static(path.join(__dirname, "files")));

//connect to DB
const mongoUrl = process.env.mongodbLive;
mongoose.connect(mongoUrl);

const secretKey = process.env.SECRET;
const port = process.env.port;

// jwt token
const createToken = (_id) => {
  return jwt.sign({ _id }, secretKey, { expiresIn: "7d" });
};

// fetch models
const User = require("./Models/Users");
const requireAuth = require("./Models/requireAuth");
const ResearchModel = require("./Models/Research");
const PolicyModel = require("./Models/Policy");
const RecycleModel = require("./Models/RecycleItem");
const Notifications = require("./Models/Notifications");
const Feedback = require("./Models/Feedback");

// Define a default route handler for the root URL ("/")
app.get("/", (req, res) => {
  res.send("Hello, World! This is the root route.");
});

// server sign up handle signUp
app.post("/register", async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Register a new user
    const user = await User.signup(name, email, password);

    // Create a token for the user
    const token = createToken(user._id);

    // Generate sign up messages and save to db
    const adminMessage = `${name} just signed up`;

    // Save notification to the database
    await Notifications.create({
      messageOwner: "Admin",
      adminMessage: {
        message: adminMessage,
        status: "unread", // Set default status to unread
      },
    });

    // Send the token as a response
    res.status(200).send(token);
  } catch (error) {
    // Handle registration errors
    res.status(400).send(error?.message);
  }
});

// server login handle
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error?.message);
  }
});

// after login and signup routes, apply middleware to protect main app routes
app.use("/user", requireAuth);

// Server route to fetch user and details
app.get("/user", async (req, res) => {
  try {
    const userId = req.userId;
    // Retrieve the user's role from the database using the decoded user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).send("User not found.");
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// Server route to fetch all users and details
app.get("/users", async (req, res) => {
  try {
    // Retrieve the user's role from the database using the decoded user ID
    const users = await User.find().sort({ createdAt: -1 });

    if (!users) {
      return res.status(403).send("Users not found.");
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// server route to delete || disapprove user
app.delete("/deleteUser/:deletedUserId", async (req, res) => {
  try {
    const { deletedUserId } = req.params;

    // Find and delete user
    const user = await User.findByIdAndDelete(deletedUserId);

    // Check if user exists
    if (!user) {
      return res.status(404).send("User not found.");
    }

    //  get user name
    const name = user.name;

    // Delete user's transactions
    await ResearchModel.deleteMany({ authorName: name });
    await RecycleModel.deleteMany({ userName: name });
    await PolicyModel.deleteMany({ authorName: name });
    await Notifications.deleteMany({ messageOwner: name });
    await Feedback.deleteMany({ feedbackBy: name });

    // Generate notification messages and save to db
    const adminMessage = `You deleted the user ${name}`;

    // Save notification to the database
    await Notifications.create({
      messageOwner: "Admin",
      adminMessage: {
        message: adminMessage,
        status: "unread", // Set default status to unread
      },
    });

    res.status(200).send("Success");
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// server route to update role for new users
app.put("/updateRole/:userId", async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.userId; // Correctly extract userId from request params

    // validate if position is present
    if (!role) {
      return res.status(400).send({ error: "Role is required" });
    }

    // Find user by id and update user role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// server route to update profile
app.put("/update-profile/:userId", async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.userId;

    // find user in db first
    const findUser = await User.findById(userId);

    // get user details
    const userName = findUser.name;
    const userEmail = findUser.email;

    // compare user details and return error if no changes made

    if (userName === name) {
      return res.status(400).send("Use a different name");
    }

    if (userEmail === email) {
      return res.status(400).send("Use a different email");
    }

    // Find user by id and update user details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    // Generate notification messages and save to db
    const adminMessage = `${name} updated their profile`;

    // Save notification to the database
    await Notifications.create({
      messageOwner: name,
      adminMessage: {
        message: adminMessage,
        status: "unread", // Set default status to unread
      },
    });

    res.status(200).send("Profile updated successfully");
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// Initialize multer upload with PDF file filter and memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Only PDF files are allowed!");
  },
});

// apply middleware to protect main app routes
app.use("/upload-files", requireAuth);

// route for researches to upload their research pdf with multer
app.post("/upload-files", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const { researchName, description } = req.body;
  const userId = req.userId;

  try {
    // find user
    const user = await User.findById(userId);

    // Create a temporary file path
    const tempFilePath = path.join(os.tmpdir(), req.file.originalname);

    // Write the file buffer to the temporary file
    fs.writeFileSync(tempFilePath, req.file.buffer);

    // Upload file from temporary file to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: "raw", // Specify resource type as raw for binary files like PDF
      use_filename: true, // Use original filename
      unique_filename: false, // Don't generate a unique filename
      folder: "research_pdfs", // Optional: specify a folder in your Cloudinary account
    });

    // Remove the temporary file
    fs.unlinkSync(tempFilePath);

    await ResearchModel.create({
      authorName: user.name,
      researchName,
      description,
      filename: result.secure_url,
    });

    // Generate notification messages and save to db
    const adminMessage = `${user.name} uploaded a new pdf research`;

    // Save notification to the database
    await Notifications.create({
      messageOwner: "Admin",
      adminMessage: {
        message: adminMessage,
        status: "unread", // Set default status to unread
      },
    });

    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

// apply middleware to protect main app routes
app.use("/viewResearch", requireAuth);

// route for researchers to fetch and view their pdf
app.get("/viewResearch", async (req, res) => {
  const userId = req.userId;
  try {
    // find user
    const user = await User.findById(userId);

    const authorName = user.name;

    const research = await ResearchModel.find({ authorName });

    res.status(200).send(research);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// delete Research
app.delete(`/deleteResearch/:researchId`, async (req, res) => {
  const researchId = req.params.researchId;
  try {
    // Find the research document
    const research = await ResearchModel.findById(researchId);
    if (!research) {
      return res.status(404).send("Research not found.");
    }

    // Delete the PDF file from the backend folder
    const filePath = path.join(__dirname, "files", research.filename);
    fs.unlinkSync(filePath);

    // Delete the research document from the database
    await ResearchModel.findByIdAndDelete(researchId);

    res
      .status(200)
      .send("Research and associated PDF file deleted successfully.");
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// policy makers endpoint

// apply middleware to protect main app routes
app.use("/deploy-policy", requireAuth);

// POST endpoint to deploy a policy
app.post("/deploy-policy", async (req, res) => {
  try {
    // Extract data from the request body
    const { policyName, description } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);

    // Create a new instance of the Policy model
    const newPolicy = new PolicyModel({
      authorName: user.name,
      policyName,
      description,
    });

    // Generate notification messages and save to db
    const adminMessage = `${user.name} posted a new policy`;

    // Save notification to the database
    await Notifications.create({
      messageOwner: "Admin",
      adminMessage: {
        message: adminMessage,
        status: "unread", // Set default status to unread
      },
    });

    // Save the new policy to the database
    await newPolicy.save();

    // Return a success response
    res
      .status(201)
      .send({ message: "Policy deployed successfully", policy: newPolicy });
  } catch (error) {
    // Return an error response if something goes wrong
    res.status(500).send({ error: "Internal server error" });
  }
});

// route to fetch and view all policy
app.get("/viewPolicy", async (req, res) => {
  try {
    const policy = await PolicyModel.find().sort({ createdAt: -1 });

    res.status(200).send(policy);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// route to delete a policy
app.delete("/delete-policy/:policyId", async (req, res) => {
  const policyId = req.params.policyId;
  try {
    await PolicyModel.findByIdAndDelete(policyId);

    // Generate notification messages and save to db
    const adminMessage = `A policy was deleted`;

    // Save notification to the database
    await Notifications.create({
      messageOwner: "Admin",
      adminMessage: {
        message: adminMessage,
        status: "unread", // Set default status to unread
      },
    });

    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// USER endpoint

// apply middleware to protect main app routes
app.use("/newRecycleItem", requireAuth);

// Route to handle new recycling item submission
app.post("/newRecycleItem", async (req, res) => {
  const { selectedItem, weight, pointsEarned, role } = req.body;
  const userId = req.userId;

  try {
    // Find user document
    const user = await User.findById(userId);

    // Find the most recent recycled item for the user
    const mostRecentRecycledItem = await RecycleModel.findOne({
      userName: user.name,
    }).sort({ createdAt: -1 });

    // Calculate cool down period
    let coolDownPeriod;
    if (mostRecentRecycledItem) {
      // Found a previous recycled item, add 5 minutes to its timestamp
      const lastRecycleTime = mostRecentRecycledItem.createdAt;
      coolDownPeriod = new Date(lastRecycleTime.getTime() + 5 * 60 * 1000);
    } else {
      // No previous recycled items, cool down period starts from now
      coolDownPeriod = new Date();
    }

    // Check if cool down period has elapsed
    const currentTime = new Date();
    if (coolDownPeriod > currentTime) {
      // Calculate remaining time in minutes
      const remainingTime = Math.ceil(
        (coolDownPeriod - currentTime) / (60 * 1000)
      );
      return res.status(400).send({
        message: `You can recycle again in ${remainingTime} minute(s)`,
      });
    }

    let recycleItem;
    if (role === "general-public" || role === "business") {
      // Create a new recycle item instance
      recycleItem = new RecycleModel({
        userName: user.name,
        itemName: selectedItem,
        weight,
        pointsEarned,
      });

      // Save the recycle item to the database
      await recycleItem.save();
    }

    if (role === "general-public") {
      // Generate notification messages and save to db
      const adminMessage = `${user.name} recycled a new item ${selectedItem} and earned ${pointsEarned} points`;
      const userMessage = `You recycled ${weight}g of ${selectedItem} and earned ${pointsEarned} points`;

      let impact;
      if (weight < 215) {
        impact = `By recycling ${weight}g of ${selectedItem}, you are contributing towards an eco-friendly future. WELL-DONE!`;
      } else {
        const miles = weight / 215;
        impact = `By recycling ${weight}g of ${selectedItem}, you have contributed in removing one petrol vehicle from traveling ${miles} mile(s). WELL-DONE!`;
      }

      // Save notification to the database
      await Notifications.create({
        messageOwner: user.name,
        adminMessage: {
          message: adminMessage,
          status: "unread", // Set default status to unread
        },
        userMessage: {
          message: userMessage,
          status: "unread", // Set default status to unread
        },
        impactMessage: {
          message: impact,
        },
      });
    } else if (role === "business") {
      let emission = 3 * weight; // Calculate emission based on weight
      let trees = 30 * weight; // Calculate trees based on weight

      // Round emission value to one decimal place
      emission = parseFloat(emission.toFixed(1));

      // Generate notification messages and save to db
      const adminMessage = `${user.name} recycled a new item ${selectedItem} and earned ${pointsEarned} points`;
      const userMessage = `You recycled ${weight}ton of ${selectedItem} and earned ${pointsEarned} points`;
      const impact = `By recycling ${weight}ton of ${selectedItem} waste, you have avoided ${emission} tons of CO2 emissions which is equivalent to planting ${trees} trees`;

      // Save notification to the database
      await Notifications.create({
        messageOwner: user.name,
        adminMessage: {
          message: adminMessage,
          status: "unread", // Set default status to unread
        },
        userMessage: {
          message: userMessage,
          status: "unread", // Set default status to unread
        },
        impactMessage: {
          message: impact,
        },
      });
    }

    // Send success response
    res.status(201).json({ message: "Recycle item submitted successfully" });
  } catch (error) {
    // Send error response
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch all recycled items
app.get("/recycledItems", async (req, res) => {
  try {
    // Retrieve all recycled items from the database
    const recycledItems = await RecycleModel.find().sort({ createdAt: -1 });

    // Send the recycled items as a JSON response
    res.status(200).json(recycledItems);
  } catch (error) {
    // Send an error response if there's an internal server error
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch all recycled items
app.get("/notifications", async (req, res) => {
  try {
    // Retrieve all recycled items from the database
    const notifications = await Notifications.find().sort({ createdAt: -1 });

    // Send the recycled items as a JSON response
    res.status(200).json(notifications);
  } catch (error) {
    // Send an error response if there's an internal server error
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to handle submitting feedback
app.post("/submit-feedback", requireAuth, async (req, res) => {
  const { feedback } = req.body;
  const userId = req.userId; // Assuming userId is included in the request

  try {
    // find user and get name
    const user = await User.findById(userId);
    const feedbackBy = user.name;

    // Create a new feedback instance
    const newFeedback = await Feedback.create({ feedbackBy, feedback });

    // Generate notification messages and save to db
    const adminMessage = `${user.name} submitted a feedback`;

    // Save notification to the database
    await Notifications.create({
      messageOwner: "Admin",
      adminMessage: {
        message: adminMessage,
        status: "unread", // Set default status to unread
      },
    });

    // Save the feedback to the database
    await newFeedback.save();

    // Send success response
    res.status(201).send({ message: "Feedback submitted successfully" });
  } catch (error) {
    // Send error response
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch all feedbacks
app.get("/feedbacks", async (req, res) => {
  try {
    // Retrieve all feedbacks from the database
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    // Send the feedbacks as a JSON response
    res.status(200).send(feedbacks);
  } catch (error) {
    // Send an error response if there's an internal server error
    res.status(500).send("Internal server error");
  }
});

// Backend Endpoint to mark notifications as read
app.put("/markUnread/:role", async (req, res) => {
  const { role } = req.params;
  const { name } = req.body;

  try {
    if (role === "admin") {
      // Mark all admin messages as read
      await Notifications.updateMany(
        { "adminMessage.status": "unread" },
        { $set: { "adminMessage.status": "read" } }
      );
    } else if (role === "general-public" || role === "business") {
      // Mark all user messages as read for the specified user
      await Notifications.updateMany(
        { messageOwner: name, "userMessage.status": "unread" },
        { $set: { "userMessage.status": "read" } }
      );
    } else {
      // Invalid role
      return res.status(400).send("Invalid role");
    }

    res.status(200).send("Notifications marked as read");
  } catch (error) {
    res.status(500).send("Error marking notifications as read");
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
