const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { connectDB } = require('./db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

/* Health Route */
app.get('/', (req, res) => {

  res.send(
    'CRM Backend Running'
  );

});

connectDB();

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});

/* app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
}); */