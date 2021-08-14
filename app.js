const routes = require('./routers/route');
const handlebars = require('express-handlebars');
const express = require('express');
// const unirest = require('unirest');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares/middlewares');
const path = require('path');

const app = express();

app.use(cookieParser());
app.use(session({secret:'textosecreto',saveUninitialized: true,cookie:{maxAge:30*60*1000}}))
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars ({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewares.logRegister,middlewares.sessionControl)
app.use(routes);


app.use(
    express.urlencoded({
      extended: true
    })
)

/*var get = unirest.get('http://localhost:8081/api/livros').then((res) => {
    var aux = res.body.data.livros;
    for (var i =0; i < aux.length;i++)
        console.log(aux[i]._id +'   '+aux[i].nome)
    }
);*/

/*var get_id = unirest.get('http://localhost:8081/api/livro/60f76224ba46c52b18bdf284').then((res) => {
    console.log(res.body.data)
});*/

/*var post = unirest.post('http://localhost:8081/api/livro/')
        .send({
            "nome": "Livro qualquer",
            "autor": "Quem escreveu",
            "editor": "Alguma que quis publicar",
            "genero": "Terror",
            "numpag": 1231
        })
        .then((res) => {
                    console.log(res.body.data)
        }
);*/


/*var put = unirest.put('http://localhost:8081/api/livro/6101f5b9325b5e376c53d00a')
        .send({
            "nome": "Livro qualquer",
            "autor": "Quem escreveu",
            "editor": "Alguma que quis publicar",
            "genero": "Suspense",
            "numpag": 133333
        })
        .then((res) => {
                    console.log(res.body.data)
        }
);*/

/*var del = unirest.delete('http://localhost:8081/api/livro/6101f0d1b6c75152c4046841').then((res) => {
    console.log(res.body.data)
});*/

app.listen(8081, function(){
        console.log("Servidor no http://localhost:8081")
});
