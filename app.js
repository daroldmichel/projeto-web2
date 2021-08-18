const routes = require('./routers/route');
const handlebars = require('express-handlebars');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares/middlewares');
const path = require('path');

const app = express();

app.use(cookieParser());
app.use(session({secret:'textosecreto',saveUninitialized: true,cookie:{maxAge:30*60*1000}}))
app.use(express.static(path.join(__dirname, 'public')));

const helpers = {
    select: function( value, options ){
        return options.fn(this)
            .split('\n')
            .map(function(v) {
                var t = 'value=' + value + ''.replace(' ', '')
                return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
            })
            .join('\n')
    },
    compare:function (lvalue, operator, rvalue, options) {

        var operators, result;

        if (arguments.length < 3) {
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        }

        if (options === undefined) {
            options = rvalue;
            rvalue = operator;
            operator = "===";
        }

        operators = {
            '==': function (l, r) { return l == r; },
            '===': function (l, r) { return l === r; },
            '!=': function (l, r) { return l != r; },
            '!==': function (l, r) { return l !== r; },
            '<': function (l, r) { return l < r; },
            '>': function (l, r) { return l > r; },
            '<=': function (l, r) { return l <= r; },
            '>=': function (l, r) { return l >= r; },
            'typeof': function (l, r) { return typeof l == r; }
        };

        if (!operators[operator]) {
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        }

        result = operators[operator](lvalue, rvalue);

        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    }
};

app.engine('handlebars', handlebars ({defaultLayout:'main', helpers: helpers}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewares.logRegister,middlewares.sessionControl, middlewares.sessionHandlebars)
app.use(routes);


app.use(
    express.urlencoded({
      extended: true
    })
)

app.listen(8081, function(){
        console.log("Servidor no http://localhost:8081")
});
