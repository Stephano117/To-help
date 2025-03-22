const { body } = require('express-validator');

const validateEmail = body('email').custom((value) => {
  if (!value.includes('@')) {
    throw new Error('Email invalide.');
  }
  return true;
});

const validateName = body('firstName').custom((value) => {
  if (/\d/.test(value)) {
    throw new Error('Le prénom ne doit pas contenir de chiffres.');
  }
  return true;
});

module.exports = { validateEmail, validateName };