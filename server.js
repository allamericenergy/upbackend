const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { connectDB } = require('./db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions={
  methods:"GET,POST",
  allowedHeaders:["Content-Type","Authorization"],
}

app.use(cors({
  origin:"*",
}));

const PORT =  process.env.PORT || 5000;


app.use('/api/auth', authRoutes);

/* Health Route */
app.get('/', (req, res) => {
  res.send(
    'CRM Backend Running'
  );
});

connectDB();



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



/* app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
}); */