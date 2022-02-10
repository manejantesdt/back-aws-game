const expect = require("chai").expect;

describe("get player by Id", () => {
  var response1 = {};
  it("obtiene un jugador específico de la base de datos - GET", async () => {
    await cy
      .request("GET", "/player/3000")
      .then((response) => {
        response1 = response;
      });
  });

  it("Trae la información correctamente", () => {
    expect(response1.body.body.Id).to.eq(3000);
    expect(response1.status).to.eq(200);
  });
});