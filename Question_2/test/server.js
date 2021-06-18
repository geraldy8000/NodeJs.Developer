let server = require("../server");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe('Task APIs', () => {
	describe('Task Get / routes', () => {
		it('It should return all task', (done) => {
			chai.request(server)
				.get("/")
				.end((err, response) => {
					response.should.have.status(200);
				done();
				});
		});

	});

});