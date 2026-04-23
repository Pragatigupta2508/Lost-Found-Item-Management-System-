require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Item = require('./models/Item');
const auth = require('./middleware/auth');

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

app.use(cors({
  origin: "*"
}));

// ================= DB CONNECT =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================= AUTH =================

// REGISTER
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  const userExist = await User.findOne({ email });
  if (userExist) return res.send("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashed });
  await user.save();

  res.send("Registered");
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid credentials");

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

// ================= ITEMS =================

// ADD ITEM
app.post('/api/items', auth, async (req, res) => {
  const item = new Item({
    ...req.body,
    userId: req.user.id
  });

  await item.save();
  res.send("Item added");
});

// GET ALL ITEMS
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// SEARCH ITEMS (IMPORTANT ORDER)
app.get('/api/items/search', async (req, res) => {
  const items = await Item.find({
    itemName: { $regex: req.query.name, $options: "i" }
  });

  res.json(items);
});

// GET ITEM BY ID
app.get('/api/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// UPDATE ITEM
app.put('/api/items/:id', auth, async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// DELETE ITEM
app.delete('/api/items/:id', auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));