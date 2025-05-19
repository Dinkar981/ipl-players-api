const Joi = require("joi");

// Full schema – used for POST and PUT (all fields required)
const fullPlayerSchema = Joi.object({
  name: Joi.string().required(),
  team: Joi.string().required(),
  country: Joi.string().required(),
  runs: Joi.number().integer().required(),
  image: Joi.string().uri().required(),
  role: Joi.string().valid("Batsman", "Bowler", "All-rounder").required(),
  salary: Joi.number().positive().required(),
});

// Partial schema – used for PATCH (fields optional)
const partialPlayerSchema = Joi.object({
  name: Joi.string(),
  team: Joi.string(),
  country: Joi.string(),
  runs: Joi.number().integer(),
  image: Joi.string().uri(),
  role: Joi.string().valid("Batsman", "Bowler", "All-rounder"),
  salary: Joi.number().positive(),
});

module.exports = {
  fullPlayerSchema,
  partialPlayerSchema,
};
