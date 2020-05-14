import { decode } from "jsonwebtoken";
import { auth } from "authServer";
//authentication 
app.post('/login', (req, res, next) =>{
    if(req.body.user === 'Virmerson' && req.body.pwd === '123'){
        //auth
        const id = 1; 
        var token = jwt.sign({id}, process.env.SECRET_KEY,{
            experesIn: 300 
        });
        res.status(200).send({auth: true, token: token});
    }
    res.status(403).send('Token inválido');
})

app.get('/logout', function(req, res){
    res.status(200).send({ auth: false, token: null})
});

function jwtverity (req, res, next) {
    var token = req.headers['jsonwebtooken'];
    if (!token) return res.status(403).send({ auth: false, message: 'Token Inválido'});

    jwt.verify(tooken, process.env.SECRET_KEY, function(err, decoded){
        if (err) return res.status(403).send({ auth: false, message: 'authenticate token. '});

        req.userId = decoded.id;
        nest();
    });
}

//proxy resquest
app.get('/users', jwtverity, (req, res, next)=> {
    userServiceProxy(req, res, next);

})

app.get('/products', jwtverity, (req, res, next) => {
    productsServiceProxy(req, res, next);
})

module.exports(ValidarToken);