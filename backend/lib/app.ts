import * as createError from "http-errors";
import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as mongoose from "mongoose";
import { Routes } from "./routes/baseRoutes";

class App {
    public app: express.Application;
    public routeBase: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost:27017/db_articles';
    
    constructor(){
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routeBase.routes(this.app);
        
        // catch 404 and forward to error handler
        this.app.use(function(req, res, next) {
            next(createError(404));
        });
        
        // error handler
        this.app.use(function(err, req, res, next) {
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
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;