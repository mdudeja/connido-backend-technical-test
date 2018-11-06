import app from "../../lib/app";
import * as chai from "chai";
import chaiHttp = require("chai-http");
require("../globalBefore");
require("../globalAfter");

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET /", () => {
    it('should return response on call', () => {
        return chai.request(app).get("/")
            .then(res => {
                expect(res.body.message).to.eql("GET request successful");
            });
    });
});

describe("GET /article", () => {
    it('should return an array of existing articles', (done: any) => {
        chai.request(app)
            .get("/article")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.articles).to.be.an('array');
                done();
            });
    });

    it('should NOT return failed: true', () => {
        return chai.request(app)
            .get("/article")
            .then(res => {
                expect(res.body.failed).to.not.be.true;
            });
    });

    it("should return undefined when page number sent is more than total pages possible", (done: any) => {
        let requester = chai.request(app).keepOpen();

        //send first request to get total number of pages
        requester
            .get("/article")
            .end((err, res) => {
                //send second request with page number higher than total
                requester
                    .get("/articles/" +(res.body.pages+1))
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res.body.articles).to.be.undefined;
                        done();
                    });
            });
    });
});