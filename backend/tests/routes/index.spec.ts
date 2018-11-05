import app from "../../lib/app";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import { doesNotReject } from "assert";

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
                expect(res.body).to.be.an('array');
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
});