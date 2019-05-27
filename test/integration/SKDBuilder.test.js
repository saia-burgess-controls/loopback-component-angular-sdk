const { expect } = require('chai');
const { describe, it } = require('mocha');

describe('SDK Builder Integration Test', () => {
    const endPointUrl = 'http://localhost:22299/sdk/';
    const sdkApiUrl = 'http://my-super-api.com/api';

    it('returns a valid response form the sdk endpoint', async function() {
        const response = await this.service.api.request
            .get(`${endPointUrl}`)
            .set('Accept', 'application/javascript')
            .responseType('blob');

        const content = Buffer.from(response.body).toString();

        expect(response.status).to.equals(200);
        expect(response.headers).to.have.a.property('x-loopback-sdk-cache-hit', 'false');
        expect(content).to.not.contain(sdkApiUrl);
    });

    it('returns the sdk with the given url', async function() {
        const response = await this.service.api.request
            .get(`${endPointUrl}?options={ "apiUrl": "${sdkApiUrl}" }`)
            .set('Accept', 'application/javascript')
            .responseType('blob');

        const content = Buffer.from(response.body).toString();

        expect(response.status).to.equals(200);
        expect(response.headers).to.have.a.property('x-loopback-sdk-cache-hit', 'false');
        expect(content).to.contain(sdkApiUrl);
    });

    it('returns the sdk form cache when requested with the same options multiple times', async function() {
        const response = await this.service.api.request
            .get(`${endPointUrl}?options={ "apiUrl": "${sdkApiUrl}" }`)
            .set('Accept', 'application/javascript')
            .responseType('blob');

        const content = Buffer.from(response.body).toString();

        expect(response.status).to.equals(200);
        expect(response.headers).to.have.a.property('x-loopback-sdk-cache-hit', 'true');
        expect(content).to.contain(sdkApiUrl);
    });
});
