const express = require('express');
const handlebars  = require('express-handlebars');
const app = express();
const bodyparser = require('body-parser');
const Post = require('./models/Post');
const { get } = require('http');
// Config
    // Template Engine
    app.engine('handlebars', handlebars({defaultLayout:'main'}));
    app.set('view engine', 'handlebars');
     
    // Body-Parser
       app.use(bodyparser.urlencoded({extended: false}))
       app.use(bodyparser.json())

    //Rotas

        //rota de redirecionamento
        app.get('/', (req, res) => {
            Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
                res.render('home', {posts: posts})
            })
          //res.render('home')  
        })
    //rota de carregamento da pagina de cadastro
    app.get('/cad', function (req, res) {
        res.render('form');
    });
    // envia via POST na rota '/add' o titulo e o conteudo
    app.post('/add', function(req,res){
        // cria um registro no banco de dados
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        // tratamento de erro
        }).then(() => {
            //res.send("Post Criado com sucesso")
            res.redirect('/')
        }).catch((err) => {
            res.send("Falha na criação do Post, erro: " + err)
        });
    })
    // deleta um registro enviando o parametro id ao pressionar o botão para a rota /deletar 
    app.get('/deletar/:id', (req,res) => {
        Post.destroy({
            where:{'id': req.params.id}
        }).then(()=>{
            res.redirect('/')
        }).catch((err)=>{
            res.send('Ops, esse post não existe')
        })
    })

    //abre a pagina de edição da postagem e recupera envia junto o id
    
    app.get('/editar/:id', (req, res) => {
        id = req.params.id;
        res.render('editar')
    })
    
    /**
     * Atualiza a postagem pelo id
     */
    
    app.post('/edit', (req, res) => {
        Post.update({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }, {
            where: { id: id },
        }).then(() => {
            res.redirect('/')
        }).catch((err) => {
            res.send('Ops, não foi possivel mudar esse post. ERRO: '+err)
        })
    })

app.listen(8000, function(){
    console.log('Server is Running in URL http://localhost:8000');
});

