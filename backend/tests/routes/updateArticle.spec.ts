import app from "../../lib/app";
import * as chai from "chai";
import chaiHttp = require("chai-http");

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
const new_title: String = "Test Article Dummy New";

let articleId: String;

describe("PUT /article/:articleId", () => {
    it("should return failed: true for incorrect article ID", (done: any) => {
        chai.request(app)
            .put("/article/001234")
            .type("form")
            .send({...dummyArticle, title: new_title})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body.failed).to.be.true;
                done();
            });
    });

    it("should update the article in DB", (done: any) => {
        const requester = chai.request(app).keepOpen();

        //Add an article to get ID
        requester
            .post("/article")
            .type("form")
            .send(dummyArticle)
            .end((err, res) => {
                articleId = res.body._id;
                //Update article by ID
                requester
                    .put("/article/" +articleId)
                    .type("form")
                    .send({...dummyArticle, title: new_title})
                    .end((err, res) => {
                        //Fetch the same article from DB and compare values
                        requester
                            .get("/article/" +articleId)
                            .end((err, res) => {
                                expect(err).to.be.null;
                                expect(res.body.title).to.equal(new_title);
                                expect(res.body.author).to.equal(dummyArticle.author);
                                expect(res.body.content[0].body).to.equal(dummyArticle.content[0].body);
                                expect(res.body.content[1].body).to.equal(dummyArticle.content[1].body);
                                expect(res.body.content[2].body).to.equal(dummyArticle.content[2].body);
                                requester.close();
                                done();
                            });

                    });
            });
    });

    it("should return status code 200", (done: any) => {
        chai.request(app)
            .put("/article/" +articleId)
            .type("form")
            .send({...dummyArticle, title: new_title})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it("should NOT return failed: true for correct ID", (done: any) => {
        chai.request(app)
            .put("/article/" +articleId)
            .type("form")
            .send({...dummyArticle, title: new_title})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body.failed).to.not.be.true;
                done();
            });
    });
});