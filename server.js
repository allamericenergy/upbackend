console.log("STEP 1 - server.js started");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
console.log("STEP 2 - dotenv loaded");
const { connectDB } = require('./db');
console.log("STEP 3 - db imported");
const authRoutes = require('./routes/authRoutes');

console.log("STEP 4 - routes imported");

const app = express();
app.use(express.json());

const corsOptions={
  methods:"GET,POST",
  allowedHeaders:["Content-Type","Authorization"],
}

app.use(cors({
  origin:"*",
}));

console.log("STEP 5 - before connectDB");

const PORT =  process.env.PORT || 5000;


app.use('/api/auth', authRoutes);

/* Health Route */
app.get('/', (req, res) => {
  res.send(
    `CRM Backend Running......... Port: ${PORT}`
  );
});
//console.log("STEP 6 - after connectDB");


connectDB();
console.log("STEP 6 - after connectDB");



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



/* app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
}); */