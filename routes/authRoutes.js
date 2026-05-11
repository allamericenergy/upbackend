const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { sql } = require('../db');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await sql.query`
      SELECT * FROM Users WHERE Email = ${email}
    `;

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql.query`
      INSERT INTO Users (Name, Email, Password, Role)
      VALUES (${name}, ${email}, ${hashedPassword}, 'user')
    `;

    res.status(201).json({
      message: 'User Registered Successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log('Login Attempt:', req.body); // Debugging log
    const result = await sql.query`
      SELECT * FROM Users WHERE Email = ${email}
    `;

    const user = result.recordset[0];
    //console.log('User from DB:', result.recordset[0]); // Debugging log
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials ' });
    }

    bcrypt.hash(password, 10).then(console.log);
    const isMatch = await bcrypt.compare(password, user.Password);
    //console.log('Password Match:', isMatch); // Debugging log
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials password' });
    }

    const token = jwt.sign(
      {
        id: user.Id,
        role: user.Role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    res.json({
      token,
      user: {
        id: user.Id,
        name: user.Name,
        email: user.Email,
        role: user.Role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Dashboard
router.get('/user-dashboard', protect, (req, res) => {
  res.json({
    message: 'Welcome User',
    user: req.user,
  });
});

// Admin Dashboard
router.get('/admin-dashboard', protect, adminOnly, (req, res) => {
  res.json({
    message: 'Welcome Admin',
  });
});

// Total Companies Count
router.get(
  '/total-companies',
  protect,
  adminOnly,
  async (req, res) => {
    try {

      const result = await sql.query`
        SELECT COUNT(*) AS total
        FROM tblCompany
      `;

      res.json({
        total: result.recordset[0].total,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

// Total Meters Count
router.get(
  '/total-meters',
  protect,
  adminOnly,
  async (req, res) => {
    try {

      const result = await sql.query`
        SELECT COUNT(*) AS total
        FROM tbl_MeterList
      `;

      res.json({
        total: result.recordset[0].total,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

// Total people Count
router.get(
  '/total-people',
  protect,
  adminOnly,
  async (req, res) => {
    try {

      const result = await sql.query`
        SELECT COUNT(*) AS total
        FROM tbl_Person
      `;

      res.json({
        total: result.recordset[0].total,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

// Total Contracts Count
router.get(
  '/total-contracts',
  protect,
  adminOnly,
  async (req, res) => {
    try {

      const result = await sql.query`
        SELECT COUNT(*) AS total
        FROM tbl_Contract
              `;

      res.json({
        total: result.recordset[0].total,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

// Get Companies
router.get(
  '/companies',
  protect,
  adminOnly,
  async (req, res) => {

    try {

      const result = await sql.query`
        SELECT *
        FROM tblCompany
        ORDER BY Id DESC
      `;

      res.json(result.recordset);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

// Get logins
router.get(
  '/logins',
  protect,
  adminOnly,
  async (req, res) => {

    try {

      const result = await sql.query`
        SELECT *
        FROM Users      
      `;

      res.json(result.recordset);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

// Add Company
router.post(
  '/add-company',
  protect,
  adminOnly,
  async (req, res) => {

    try {

      const {

        CompanyName,
        LegalEntityName,
        MailingAddress,
        PhoneNumber,
        TaxID,
        URL,
        contractsFolderId,
        UtilityBillsfolderId

      } = req.body;

     // console.log('Add Company Data:',req.body);

      const pool =
        await sql.connect();

      await pool.request()

        .input(
          'CompanyName',
          sql.NVarChar,
          CompanyName
        )

        .input(
          'LegalEntityName',
          sql.NVarChar,
          LegalEntityName
        )

        .input(
          'MailingAddress',
          sql.NVarChar,
          MailingAddress
        )

        .input(
          'PhoneNumber',
          sql.NVarChar,
          PhoneNumber
        )

        .input(
          'TaxID',
          sql.NVarChar,
          TaxID
        )

        .input(
          'URL',
          sql.NVarChar,
          URL
        )

        .input(
          'contractsFolderId',
          sql.NVarChar,
          contractsFolderId
        )

        .input(
          'UtilityBillsfolderId',
          sql.NVarChar,
          UtilityBillsfolderId
        )

        .execute(
          'sp_InsertCompany'
        );

      res.status(201).json({

        success: true,

        message:
          'Company Added Successfully',

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }
);

module.exports = router;