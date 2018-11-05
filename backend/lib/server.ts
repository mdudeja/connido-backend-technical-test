import app from "./app";
import * as config from "config";
import * as debug from "debug";
import * as https from "https";
import * as fs from "fs";

const PORT = config.get('port');
const debugLog = debug('backend:server');

if(config.get('usesHttps')){
    const httpsOptions = {
        key: fs.readFileSync('./config/key.pem'),
        cert: fs.readFileSync('./config/cert.pem')
    };

    https.createServer(httpsOptions, app).listen(PORT, () => {
        debugLog('(https) Express server listening on port ' + PORT);
    });
}else{
    app.listen(PORT, () => {
        debugLog('Express server listening on port ' + PORT);
    });
}