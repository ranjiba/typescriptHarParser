import {expect} from 'chai';
import superTest from "supertest"
import app from '../index';
//import {agent as request} from 'supertest';
describe("Index Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });
    it('should POST /ProcessHar/upload ', async function () {

        /* const res = await request(app)
            .post('/ProcessHar/upload')
            //.field('extra_info', '{"in":"case you want to send json along with your file"}')
              .attach('harFile', '../uploads/test.har');
             
        expect(res.status).to.equal(200);
        console.log(res) */
        /* expect(res.body).not.to.be.empty;
        expect(res.body.data).not.to.be.empty;
        expect(res.body.data).to.be.an("object");
        expect(res.body.error).to.be.empty; */
    });
    const testUrl = 'http://localhost';
    const testAPI = superTest(testUrl);

    it('Verify Response',  async () => {
        let response = await testAPI
            .post('/ProcessHar/upload')
            .attach('harFile', 'uploads/test.har')
            .then(response => {
                return response;
            });
        expect(response.status, 'Status Successful').to.equal(200);     
        
    }); 
});     
