const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const z = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const { User } = require("./database");
const axios = require("axios");
const authMiddleware = require("./authMiddleware");
// const { authMiddleware } = require("./middleware"); // Ensure authMiddleware is properly defined and imported

app.use(cors());
app.use(express.json());

const signupBody = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

app.post("/signup", async (req, res) => {
  console.log("Entered into backend");
  console.log(req.body);

  const result = signupBody.safeParse(req.body);
  if (!result.success) {
    return res.status(411).json({ message: "Invalid input" });
  }

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already exists",
      email: req.body.email,
    });
  }

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  const userId = user._id;

  try {
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.status(200).json({
      message: "User created successfully",
      token,
      userid: userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating token" });
  }
});

const signinbody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

app.post("/signin", async (req, res) => {
  console.log("hello");
  const { success } = signinbody.safeParse(req.body);
  console.log("Booooooodyyyyyyyy", req.body);
  if (!success) {
    return res.status(411).json({
      message: "invalid inputs",
    });
  }
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log("userrrrrrrrrrr",user)
  console.log("before ifffff", req.body.email);
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    console.log("hellooo")
    const userId = user._id;
    console.log("inside express", userId);
    return res.status(200).json({
      message: "user signed in",
      token: token,
      userid: req.body.email,
    });
  }
  return res.status(411).json({
    message: "error while log in",
  });
});

app.post("/saveplan", (req, res) => {
  const body = req.body;
  console.log("Plan saved:", body);
  res.status(200).json({ message: "Plan saved successfully" });
});

/////////Destination
app.get("/Destination", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "good to go",
  });
});

app.get("/Explore", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "good to go",
  });
});

// Error handling for 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => { // Added 'next' argument
  console.error("Server error:", err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
