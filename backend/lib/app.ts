import * as createError from "http-errors";
import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as mongoose from "mongoose";
import * as config from "config";
import { Routes } from "./routes/baseRoutes";

class App {
    public app: express.Application;
    public routeBase: Routes = new Routes();
    public mongoUrl: string = config.dbConfig.host + config.dbConfig.dbName;
    
    constructor(){
        this.app = express();
        this.config();

        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", config.get('allowOrigin'));
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });

        this.mongoSetup();
        this.routeBase.routes(this.app);
        
        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            next(createError(404));
        });
        
        // error handler
        this.app.use((err, req, res, next) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
        
            // render the error page
            res.status(err.status || 500);
            res.send('error');
        });
    }

    private config(): void {
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cookieParser());
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;