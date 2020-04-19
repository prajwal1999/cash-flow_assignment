/* global require describe it*/
// const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.should();
chai.use(chaiHttp);

describe('POST /login', () => {
    it('Login route with empty username', (done)=>{
        const data = {
            username: "",
            password: "qw67%87GH"
        }
        chai.request(server).post("/login").send(data).end((err, result)=>{
            result.should.have.status(403);
            result.body.should.be.a("object");
            result.body.should.have.property("msg").eq("Invalid Credentials");
            done();
        });
    });

    it('Login route with empty password', (done)=>{
        const data = {
            username: "testingname",
            password: ""
        }
        chai.request(server).post("/login").send(data).end((err, result)=>{
            result.should.have.status(403);
            result.body.should.be.a("object");
            result.body.should.have.property("msg").eq("Invalid Credentials");
            done();
        });
    });

    it('Login route with valid credentials', (done)=>{
        const data = {
            username: "testingname",
            password: "qw67%87GH"
        }
        chai.request(server).post("/login").send(data).end((err, result)=>{
            result.should.have.status(200);
            result.body.should.be.a("object");
            result.body.should.have.property("msg").eq("Logged In Successfully");
            result.body.should.have.property("accessToken");
            done();
        });
    });

});


describe('POST /compress protected route', () => {
    it('compress route without authourization token', (done) => {
        const data = { imageUrl: "https://www.google.com/images/srpr/logo3w.png" };
        chai.request(server).get("/compress").send(data).end((err, result) => {
            result.should.have.status(401);
            done();
        });
    });

    it('compress route with wrong authourization token ', (done) => {
        const data = { imageUrl: "https://www.google.com/images/srpr/logo3w.png" };
        chai.request(server).get("/compress")
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWp3YWwxOTk5IiwiaWF0IjoxNTg3Mjc0OTAyfR.3odcZwZbnVgBM4uRg5qpqWyVi5ESh_5k9gps-lvA6_E')
        .send(data).end((err, result) => {
            result.should.have.status(403);
            done();
        });
    });

    it('compress route wrong url ', (done) => {
        const data = { imageUrl: "httpsa://www.google.com/images/srpr/logo3w.png" };
        chai.request(server).get("/compress")
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWp3YWwxOTk5IiwiaWF0IjoxNTg3Mjc0OTAyfQ.3odcZwZbnVgBM4uRg5qpqWyVi5ESh_5k9gps-lvA6_E')
        .send(data).end((err, result) => {
            result.should.have.status(404);
            done();
        });
    });

    it('compress route with url not having image ', (done) => {
        const data = { imageUrl: "http://www.tec-it.com/download/PDF/Barcode_Reference_EN.pdf" };
        chai.request(server).get("/compress")
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWp3YWwxOTk5IiwiaWF0IjoxNTg3Mjc0OTAyfQ.3odcZwZbnVgBM4uRg5qpqWyVi5ESh_5k9gps-lvA6_E')
        .send(data).end((err, result) => {
            result.should.have.status(400);
            done();
        });
    });

    it('compress route with authourization token', (done) => {
        const data = { imageUrl: "https://www.google.com/images/srpr/logo3w.png" };
        chai.request(server).get("/compress")
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWp3YWwxOTk5IiwiaWF0IjoxNTg3Mjc0OTAyfQ.3odcZwZbnVgBM4uRg5qpqWyVi5ESh_5k9gps-lvA6_E')
        .send(data).end((err, result) => {
            result.should.have.status(200);
            done();
        });
    });
});



// {
//     "imageUrl": "http://www.tec-it.com/download/PDF/Barcode_Reference_EN.pdf"
// }