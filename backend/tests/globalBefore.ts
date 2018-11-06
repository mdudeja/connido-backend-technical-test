import * as mocha from "mocha";
import { ArticleController } from "../lib/controllers/articleController";

before((done: any) => {
    console.log("Clearing the collection for a fresh round of tests");
    const ac = new ArticleController();
    ac.removeAll();
    done();
});