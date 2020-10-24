const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
  signup,
  signout,
} = require("../controllers/userController");

// const {
//   getUserById,
//   isSignedIn,
//   isAuthenticated,
// } = require("../middlewares/userAuth");

router.post(
  "/",
  [
    check(
      "u_name",
      "You must provide a username with atleast 4 char"
    )
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
    check("u_email", "Email is required with proper format")
      .not()
      .isEmpty()
      .isEmail(),
    check(
      "password",
      "Password should be atleast 6 char"
    ).isLength({ min: 6 }),
  ],
  signup
);

// router.post(
//   "/signin",
//   [
//     check("username", "You must provide a username")
//       .not()
//       .isEmpty(),
//     check(
//       "username",
//       "Username should be atleast 4 char"
//     ).isLength({ min: 4 }),
//     check(
//       "password",
//       "Password should be atleast 8 char"
//     ).isLength({ min: 8 }),
//   ],
//   control.signin
// );

// router.param("userId", getUserById);

router.get("/signout", signout);

// router.get(
//   "/user/me/:userId",
//   isSignedIn,
//   isAuthenticated,
//   control.userProfile
// );

// router.patch(
//   "/user/me/:userId",
//   isSignedIn,
//   isAuthenticated,
//   control.updateUserProfile
// );

// router.delete(
//   "/user/deleteUser/:userId",
//   isSignedIn,
//   isAuthenticated,
//   control.deleteUser
// );

module.exports = router;
