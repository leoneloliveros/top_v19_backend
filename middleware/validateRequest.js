const validateSchema = (schema, property) => (req, res, next) => {
  const { value, error } = schema.validate({ [property]: req[property] });

  if (error) {
    return res.status(400).json(error);
  }

  req[property] = value[property];

  next();
};

module.exports = validateSchema;
