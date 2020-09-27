const Sequelize = require('sequelize'); 

   //Conexão com o DB MySql
    const sequelize = new Sequelize('postapp', 'root','377473',{
        host:'localhost',
        dialect:'mysql'
    })

    module.exports ={
        Sequelize: Sequelize,
        sequelize: sequelize
    }