const expect = require("chai").expect;

describe('get players testing', () => {
    it('fetches Todo items - GET', async () => {
        cy.request('/player').as('getPlayersRequest');
        await cy.get('@getPlayersRequest').then(response => {
            expect(response.status).to.eq(200);
            console.log(response)
            expect(response.body.body.players[0]).to.have.property('Id');
            assert.isArray(response.body.body.players, 'Todos Response is an array')
            
        });
    });
 });