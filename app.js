
// Requires : es una importacion de librerias de terceros

var express= require('express');
var MySQLEvents = require('mysql-events');
var mysql = require('mysql');


//inicializar variables

var app=express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tienda_db',
    port: 3306
 });
 connection.connect(function(error){
    if(error){
       throw error;
    }else{
       console.log('Conexion correcta.');
    }
 });
 connection.end();



var dsn = {
    host:     'localhost',
    user:     'root',
    password: 'root',
};
  

var mysqlEventWatcher =  MySQLEvents(dsn);


var watcher = mysqlEventWatcher.add(
    //se mantiene pendiente de los cambios en toda la tabla
    `tienda_db.lineas` ,
   function ( oldRow , newRow , event ) {
      
    if (oldRow ===  null ) {
        // fila insertada 
        //console.log('oldRow insert:', oldRow);
        //console.log('newRow insert:', newRow);
        //console.log ('oldRow insert:',oldRow.fields);
        console.log ('newRow insert:',newRow.fields);
    }

     
    if (newRow ===  null ) {
       // row deleted 
       console.log('newRow delete:', newRow);
       console.log('oldRow delete:', oldRow.fields);
    }

      
    if (oldRow !==  null  && newRow !==  null ) {
       // fila update
       console.log('oldRow update:', oldRow.fields);
       console.log('newRow update:', newRow.fields);
    }

    // información detallada del evento 
    //console.log (event);
  }, 
  'bici'//debe hacer match con el valor del campo de la tabla en la base de datos 
);


//rutas

//1: se define el path
//2: funcion callback con tres parametros: request,response,next
//

app.get('/',(request,response,next)=>{

    response.status(200).json({
        ok:true,
        mensaje: 'peticion realizada correctamente'
    });
});

//escuchar peticiones por el puerto

app.listen(3000,()=>{
    console.log('express server puerto 3000: \x1b[32m%s\x1b[0m',' online');
});


//C:\ProgramData\MySQL

//https://stackoverflow.com/questions/47882640/listen-mysql-change-event-using-zongji-module-not-working


