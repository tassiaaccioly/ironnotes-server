const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const Page = require("../models/PageModel");

module.exports = router;
