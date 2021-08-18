const bloqueados = ['pessoaCreate', 'pessoaList', 'pessoaEdit', 'pessoaDelete', 'veiculoCreate', 'veiculoList', 'veiculoEdit', 'veiculoDelete', 'estacionamentoCreate', 'estacionamentoList', 'estacionamentoEdit', 'estacionamentoDelete'];

module.exports = {
    logRegister(req, res, next) {
        console.log('URL: ' + req.url +  ' | METHOD: ' + req.method + ' | DATE: '+ new Date() )
        next();
    },
    sessionControl(req, res, next) {
        if(req.session.email != undefined) {
            if (req.session.tipo != 2 && bloqueados.includes(req.url.split('/')[1])) {
                res.redirect('/home');
            } else {
                next();
            }
        }
        else if ((req.url == '/') && (req.method == 'GET'))
            next();
        else if ((req.url == '/login') && (req.method == 'POST'))
            next();
        else if(req.url.split('/')[1] == 'api'){
            next()
        }else
            res.redirect('/');
    },
    sessionHandlebars(req, res, next) {
        res.locals.session = req.session;
        next();
    }
};
