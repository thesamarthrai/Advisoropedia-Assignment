const express = require("express");
const Router = express.Router();
const homeSchema = require("../models/homeSchema");


Router.get('/', (err, res) => {
    res.render('main', { title: "Fill The Form", password:" ", email:" "})
})

Router.get('/login', (req, res) => {
  // Render your login page here
  res.render('login');
});

Router.get('/register', (req, res) => {
  // Render the register page with the necessary variables
  res.render('register', { title: "Registration Page", password: "", email: "" });
});


Router.post('/register', async (req, res) => {
  try {
      const {
          fname,
          lname,
          number,
          email,
          password,
          cpassword,
          img
      } = req.body;

      if (password === cpassword) {

          const userData = new homeSchema({
              fname,
              lname,
              number,
              email,
              password,
              img
          });

          userData.save(err => {
              if (err) {
                  res.render('register', {
                      title: "Already Registered",
                      password: "",
                      email: ""
                  });
              } else {
                  // Redirect to login page after successful registration
                  res.redirect('/login');
              }
          });
      } else {
          res.render('register', {
              title: " ",
              password: "Password not matching",
              email: " "
          });
      }

  } catch (error) {
      res.render('register', {
          title: "Error in code",
          password: "",
          email: ""
      });
  }
});


// signin

Router.post('/login', (req, res) => {
  const { email, password } = req.body;

  homeSchema.findOne({ email: email, password: password }, (err, result) => {
      if (err) {
          // Handle error
          res.render('register', { title: "Error", password: "", email: "" });
      } else {
          if (result) {

              // If login successful, redirect to dashboard with user's id
              res.redirect(`/login/${result._id}`);
          } else {
              // If email or password is incorrect, render login page with error message
              res.render('register', { title: "Invalid email or password", password: "", email: "" });
          }
      }
  });
});



//for getting id from fontend

Router.get('/login/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await homeSchema.findById(userId);

  if (!user) {
    // Handle user not found
    return res.render('error', { message: "User not found" });
  }

  try {
    res.render('dashbord', { title: "Dashbord", user: user, userId: userId});
  } catch (error) {
    // Handle error fetching matching users
    console.error("Error fetching matching users:", error);
    res.render('error', { message: "An error occurred", error: error });
  }
});


module.exports = Router;