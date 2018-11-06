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

describe("POST /article", () => {
    it('should return status code 200', (done: any) => {
        chai.request(app)
            .post("/article")
            .type("form")
            .send(dummyArticle)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should add exactly one article to the DB', (done: any) => {
        let countBefore: number;
        let countAfter: number;
        const requester = chai.request(app).keepOpen();
        //Get Count Before
        requester
            .get("/article")
            .end((err, res) => {
                countBefore = res.body.articles.length;

                //Add another article
                requester
                    .post("/article")
                    .type("form")
                    .send(dummyArticle)
                .end((err, res) => {
                    //Get Count After
                    requester
                        .get("/article")
                        .end((err, res) => {
                            countAfter = res.body.articles.length;
                            expect(err).to.be.null;
                            expect(countAfter).to.eql(countBefore+1);
                            requester.close();
                            done();  
                        });
                });

            });
    });

    it('should NOT return failed: true for correct article data', (done: any) => {
        chai.request(app)
            .post("/article")
            .type("form")
            .send(dummyArticle)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body.failed).to.not.be.true;
                done();
            });
    });

    it('should return failed: true for incorrect article data', (done: any) => {
        chai.request(app)
            .post("/article")
            .type("form")
            .send({
                title: "Demo Title",
                content: []
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body.failed).to.be.true;
                done();
            });
    });
});