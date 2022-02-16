const expect = require("chai").expect;

describe("Validaciones put player", () => {
  it("Validation putplayer - PUT", async () => {
    cy.request("PUT", `/player/raul`, {
      avatar: "/static/media/avatar3.d4e8a4523a85d77f22.png",
      nickname: "mari",
      status: "hierro",
      ranking: 3004,
      score: 0,
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body.message).to.eq("no pasa validacion");
    });
  });

  it("Validation putplayer sin ID - PUT", async () => {
    cy.request("PUT", `/player/`, {
      avatar: "/static/media/avatar3.d4e8a4523a85d77f22.png",
      nickname: "mari",
      status: "hierro",
      ranking: 3004,
      score: 0,
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body.message).to.eq("no pasa validacion");
    });
  });
});
