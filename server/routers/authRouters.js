const Router = require('express');
const router = new Router();
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
router.use(cookieParser());

router.use(session(
    {
        secret: 'secretKEY',
        saveUninitialized: false,
        resave: false
    }
));

const isAuth = (req,res,next) => 
{
    if(req.session.isAuth)
    {
        next();
    }else
    {   
        res.redirect('/');
    }
};

/*----------------------------GET-------------------------------------*/
router.get('/',(req,res) => 
{
    res.render("pages/index", {title: 'Patients'});
});
/*----------------------------/GET-------------------------------------*/


module.exports = router;