require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const mysql = require("mysql2/promise"); // Using mysql2 for better async/await support
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
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

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
db.getConnection()
  .then((connection) => {
    console.log("Connected to the database!");
    connection.release();
  })
  .catch((err) => console.error("Database connection error:", err.stack));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/coursevideos", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "coursevideos.html"));
});

app.get("/t4w2SYb9CcQd3YW", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "t4w2SYb9CcQd3YW.html"));
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM studentslogs WHERE username = ?",
      [username]
    );

    if (rows.length > 0) {
      const user = rows[0];
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
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Register route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username already exists
    const [checkRows] = await db.execute(
      "SELECT * FROM studentslogs WHERE username = ?",
      [username]
    );

    if (checkRows.length > 0) {
      res.redirect("/?message=Email already exists. Please login.");
    } else {
      // Insert the new user into the database
      const [result] = await db.execute(
        "INSERT INTO studentslogs (username, password) VALUES (?, ?)",
        [username, password]
      );

      // Fetch the newly inserted user for verification
      const [newUser] = await db.execute(
        "SELECT * FROM studentslogs WHERE id = ?",
        [result.insertId]
      );

      console.log("New user created:", newUser[0]);
      res.sendFile(path.join(__dirname, "public", "coursevideos.html"));
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Logout route
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
