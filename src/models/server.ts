
// import packages
import https from 'https';
import fs from 'fs';

import express, { Application } from 'express';
import cors from 'cors';

import dbConenction from '../db/mongo.config';
import fileUpload from 'express-fileupload';

import userRoutes from '../routes/usuarios.routes';
import rolRoutes from '../routes/rol.routes';
import authRoutes from '../routes/auth.routes';


import tipoPlacaRoutes from '../routes/tipoPlaca.routes';
import agenteRoutes from '../routes/agente.routes';
import articuloRoutes from '../routes/articulo.routes';

class Server {
    
    private app: Application;
    private PORT : string;
    private paths = {
        auth:           '/api/auth',


        uploads:        '/api/uploads',

        usuarios:       '/api/usuarios',
        rols:           '/api/rols',

        // LO DEMAS
        tipoPlaca:      '/api/tipoplaca',
        agente:         '/api/agente',
        articulo:       '/api/articulo',
    
    };

    constructor(){
        this.app = express();
        this.PORT = process.env.PORT || '3000';

        // Conectar con mi base de datos de mongo
        this.connectDB();

        // Establecer los middlewares globales
        this.middlewares();

        // Cargar las rutas
        this.routes();
    }

    async connectDB(){
        await dbConenction();
    }

    routes() {

        this.app.use( this.paths.usuarios       , userRoutes );
        this.app.use( this.paths.rols           , rolRoutes );
        this.app.use( this.paths.auth           , authRoutes );

        this.app.use ( this.paths.tipoPlaca               , tipoPlacaRoutes )
        this.app.use ( this.paths.agente                  , agenteRoutes )
        this.app.use ( this.paths.articulo                , articuloRoutes )
    }

    middlewares() {

        // CORS
        this.app.use( cors( { allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'X-Content-Type',
            'Accept',
            'X-Access-Token',
            'Authorization',
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Origin',
            'Pragma'
        ],
        //allowedHeaders: ["Access-Control-Allow-Headers", "Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers"],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        //origin: API_URL,
        preflightContinue: false,
        origin: '*' } ) );

        // Lectura del Body
        this.app.use( express.json() );

        // Configurar la carpeta publica
        this.app.use( express.static('public') );

        // Para manejar carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true //para que cree la carpeta si no esta creada
        }));
    }

    start() {
        this.app.listen(this.PORT, () => {
            console.log(`Servidor corriendo en puerto ${this.PORT}`)
        });
    }

    startHttps(){

        // serve the API with signed certificate on 443 (SSL/HTTPS) port
        const httpsServer = https.createServer({
            key:    fs.readFileSync(process.env.CERTIFICATE_KEY || ''),
            cert:   fs.readFileSync(process.env.CERTIFICATE || ''),
            ca:     fs.readFileSync(process.env.CERTIFICATE_CA || ''),
        }, this.app);

        httpsServer.listen(this.PORT, () => {
            console.log(`HTTPS Server corriendo en puerto ${this.PORT}`);
        });
    }

}

export default Server;
