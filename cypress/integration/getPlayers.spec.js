const expect = require("chai").expect;

describe('get players testing', () => {
    it('obtiene todos los jugadores - GET', async () => {
        cy.request('/player').as('getPlayersRequest');
        await cy.get('@getPlayersRequest').then(response => {
            expect(response.status).to.eq(200);
            expect((response.body.body.players[0]).to.have.property('Id'), 'Id se encuentra en la respuesta');
            assert.isArray(response.body.body.players, 'Players es un array')
            
        });
    });
 });