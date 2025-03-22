const { body, validationResult } = require('express-validator');

const validateUser = [
  body('nom').notEmpty().withMessage('Le nom est requis.').isAlpha().withMessage('Le nom ne doit contenir que des lettres.'),

  body('prenom').notEmpty().withMessage('Le prenom est requis.').isAlpha().withMessage('Le prenom ne doit contenir que des lettres.'),

  body('typehandicap').notEmpty().withMessage('Le type de votre handicap est requis.').isAlpha().withMessage('Entrer un type valide.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


module.exports = { validateUser };