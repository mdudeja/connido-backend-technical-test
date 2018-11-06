import * as mocha from "mocha";
import * as mongoose from "mongoose";

after((done: any) => {
    console.log("Closing All DB Connections");
    mongoose.disconnect();
    done();
});