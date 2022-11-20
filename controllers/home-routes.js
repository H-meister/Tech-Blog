const router = require('express').Router();
const sequelize = require('../config/connection');
const { Sauce, User } = require('../models');
const withAuth = require('../utils/auth');
//home page!
router.get('/', (req, res) => {
 res.render('homepage');
});
//login if not logged in redirect
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});
//sign up session authentication
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});
//redirect if tried to access without loggin in
router.get('/addsauce', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        res.status(401);
    }
    res.render('addsauce');
});
//same here
router.get('/dashboard', withAuth, (req, res) => {
    Sauce.findAll({
        where:{
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'name',
            'description',
            'location',
            'sco_score',
            'created_at'
        ],
        include: [
            {
            model: User,
            attributes: ['username']
            }
        ]
    })
    .then(dbSauceData => {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            res.status(401);
        }
        const sauce = dbSauceData.map(post => post.get({ plain:true }))
        res.render('dashboard',{ sauce, loggedIn:true });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;