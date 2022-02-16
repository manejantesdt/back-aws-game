const expect = require("chai").expect;

describe("get player by Id", () => {
  var response1 = {};
  var players = [];
  var player = [];
  it("obtiene todos los jugadores - GET", async () => {
    await cy
    .request(`/player?nick_name`)
    .then((response) => {
      console.log(response.body);
      players = response.body.body.getPlayers;
      for (var n = 0; n < 1; n++) {
        player.push(players[Math.floor(Math.random() * players.length)]);
      }
      player = player[0];
    });
  });

  it("obtiene un jugador específico de la base de datos - GET", async () => {
    await cy.request("GET", `/player/1`).then((response) => {
      console.log(response);
      response1 = response;
    });
  });
  
  it("Trae la información correctamente", () => {
    expect(response1.body.body[0].Id).to.eq(1);
    expect(response1.status).to.eq(200);
  });

});

