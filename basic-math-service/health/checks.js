// const expect = require('chai').expect
const { expect } = require("chai");
const { check, call, ensure } = require("../../heckle/heckle.js");

const difference = require("../difference/difference.check.js");
const product = require("../product/product.check.js");
const sum = require("../sum/sum.check.js");
const quotient = require("../quotient/quotient.check.js");

module.exports = {
  root: process.env.root,
  checks: { product, sum, difference, quotient },
};
