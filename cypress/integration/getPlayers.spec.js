const expect = require("chai").expect;

describe("get players testing", () => {
  var players = [];
  var player = [];

  it("obtiene todos los jugadores - GET", async () => {
    cy.request("/player").as("getPlayersRequest");
    await cy.get("@getPlayersRequest").then((response) => {
      players = response.body.body.getPlayers;
      for (var n = 0; n < 1; n++) {
        player.push(players[Math.floor(Math.random() * players.length)]);
      }
      player = player[0];

      expect(response.status).to.eq(200);
      expect(
        response.body.body.players[0].to.have.property("Id"),
        "Id se encuentra en la respuesta"
      );
      assert.isArray(response.body.body.players, "Players es un array");
    });
  });

  it("obtiene un jugador por nickname - GET", async () => {
    await cy
      .request(`/player?nick_name=${player.nickname}`)
      .then((response) => {
        players = response.body;
      });
  });

  it("Trae la información correctamente", () => {
    expect(players.body.players.Id).to.eq(players.body.players.Id);
    expect(players.body.players.nickname).to.eq(players.body.players.nickname);
    expect(players.body.players.avatar).to.eq(players.body.players.avatar);
    expect(players.body.players.status).to.eq(players.body.players.status);
    expect(players.body.players.ranking).to.eq(players.body.players.ranking);
    expect(players.body.players.score).to.eq(players.body.players.score);
    expect(players.status).to.eq(200);
  });
});
