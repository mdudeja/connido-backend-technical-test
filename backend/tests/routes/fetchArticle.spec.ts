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

describe("GET /article/:articleId", () => {
    it("should return failed: true for incorrect ID", () => {
        return chai.request(app).get("/article/001234")
            .then((res) => {
                expect(res.body.failed).to.be.true;
            });
    });

    it("should return the correct article by ID", (done: any) => {
        const requester = chai.request(app).keepOpen();

        //Add an article to get the ID
        requester
            .post("/article")
            .type("form")
            .send(dummyArticle)
            .end((err, res) => {
                articleId = res.body._id;
                //Fetch the article that was added, by ID
                requester
                    .get("/article/" +articleId)
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res.body.title).to.equal(dummyArticle.title);
                        expect(res.body.author).to.equal(dummyArticle.author);
                        expect(res.body.content[0].body).to.equal(dummyArticle.content[0].body);
                        expect(res.body.content[1].body).to.equal(dummyArticle.content[1].body);
                        expect(res.body.content[2].body).to.equal(dummyArticle.content[2].body);
                        requester.close();
                        done();
                    });
            });
    });

    it("should return status code 200", () => {
        return chai.request(app).get("/article/" +articleId)
            .then((res) => {
                expect(res).to.have.status(200);
            });
    });

    it("should return exactly one article by ID", () => {
        return chai.request(app).get("/article/" +articleId)
            .then(res => {
                expect(res.body).to.be.an('object');
                expect(res.body._id).to.not.be.null;
                expect(res.body._id).to.not.be.undefined;
            });
    });

    it("should NOT return failed: true for correct ID", () => {
        return chai.request(app).get("/article/" +articleId)
            .then(res => {
                expect(res.body.failed).to.not.be.true;
            });
    });

});