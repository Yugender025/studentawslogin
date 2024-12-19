require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const pg = require("pg");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// // Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

const db = new pg.Client({
  user: process.env.DB_USER, // User from .env
  host: process.env.DB_HOST, // Host from .env
  database: process.env.DB_NAME, // Database name from .env
  password: process.env.DB_PASSWORD, // Password from .env
  port: process.env.DB_PORT, // Port from .env
});
db.connect()
  .then(() => console.log("Connected to the database!"))
  .catch((err) => console.error("Database connection error:", err.stack));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/coursevideos", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "coursevideos.html"));
});

app.get("/t4w2SYb9CcQd3YW", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "t4w2SYb9CcQd3YW.html"));
});
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const result = await db.query(
      "SELECT * FROM studentslogs WHERE username = $1",
      [username]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPwd = user.password;
      if (password === storedPwd) {
        res.sendFile(path.join(__dirname, "public", "coursevideos.html"));
      } else {
        res.send("Incorrect password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const checkResult = await db.query(
      "SELECT * FROM studentslogs WHERE username = $1",
      [username]
    );
    if (checkResult.rows.length > 0) {
      res.redirect("/?message=Email already exists. Please login.");
    } else {
      const result = await db.query(
        "INSERT INTO studentslogs (username, password) VALUES ($1,$2)",
        [username, password]
      );
      console.log(result);
      res.sendFile(path.join(__dirname, "public", "coursevideos.html"));
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
