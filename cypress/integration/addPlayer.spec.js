const expect = require("chai").expect;

describe("add player testing", () => {
  var response1 = {};
  it("añade un jugador a la base de datos - POST", async () => {
    await cy
      .request("POST", "/player", {
        avatar: "/static/media/avatar3.d4e8a4523a85d77f222f.png",
        nickname: "gustavo",
      })
      .then((response) => {
        response1 = response;
      });
  });

  it("crea correctamente los campos", () => {
    expect(response1.body).to.have.property("nickname", "gustavo");
    expect(response1.status).to.eq(200);
  });
});
