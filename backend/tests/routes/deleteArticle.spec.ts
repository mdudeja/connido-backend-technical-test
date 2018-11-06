import app from "../../lib/app";
import * as chai from "chai";
import chaiHttp = require("chai-http");
require("../globalBefore");
require("../globalAfter");

chai.use(chaiHttp);
const expect = chai.expect;

const dummyArticle = {
    title: "Test Article Dummy",
    author: "Test Author Dummy",
    content: [
        {body: "Article Dummy Paragraph 1"}, 
        {body: "Article Dummy Paragraph 2"}, 
        {body: "Article Dummy Paragraph 3"}
    ]
};

let articleId: String;

describe("DELETE /article/:articleId", () => {
    it("should return failed: true for incorrect ID", (done: any) => {
        chai.request(app)
            .del("/article/001234")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body.failed).to.be.true;
                done();
            });
    });

    it("should delete the article in DB", (done: any) => {
        const requester = chai.request(app).keepOpen();

        //Add an article to get ID
        requester
            .post("/article")
            .type("form")
            .send(dummyArticle)
            .end((err, res) => {
                articleId = res.body._id;
                //Delete article by ID
                requester
                    .del("/article/" +articleId)
                    .end((err, res) => {
                        //Fetch the same article from DB and it should return null
                        requester
                            .get("/article/" +articleId)
                            .end((err, res) => {
                                expect(err).to.be.null;
                                expect(res).to.have.status(200);
                                expect(res.body).to.be.null;
                                requester.close();
                                done();
                            });

                    });
            });
    });
});