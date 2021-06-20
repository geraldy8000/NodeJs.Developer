let server = require("../server");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe('Testing API', () => {
	describe('Get /search routes', () => {
		it('Testing', (done) => {
			chai.request(server)
				.get("/search")
				.query({
                    query: "batman",
                    page: 1
                 })
				.end((err, response) => {
					response.should.have.status(200);
				done();
				});
		});

	});

	describe('Get /details routes', () => {
		it('Testing', (done) => {
			chai.request(server)
				.get("/detail")
				.query({
                    title: "superman"
                 })
				.end((err, response) => {
					response.should.have.status(200);
				done();
				});
		});

	});


});