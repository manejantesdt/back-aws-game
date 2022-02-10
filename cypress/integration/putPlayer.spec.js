const expect = require("chai").expect;

describe("edit playern information", () => {
  var responsePostId = "";
  var responsePUT = "";

  it("añade un jugador a la base de datos - POST", async () => {
    await cy
      .request("POST", "/player", {
        avatar: "/static/media/avatar3.d4e8a4523a85d77f222f.png",
        nickname: "gustavo",
      })
      .then((response) => {
        responsePostId = response.body.Id.toString();
      });
  });

  it("edit playern information - PUT", async () => {
    await cy
      .request("PUT", `/player/${responsePostId}`, {
        avatar: "/static/media/avatar3.d4e8a4523a85d77f22.png",
        nickname: "mari",
        status: "hierro",
        ranking: 3004,
        score: 0,
      })
      .then((response) => {
        responsePUT = response;
      });
  });

  it("edita los campos correctamente", () => {
    expect(responsePUT.body.message).to.eq("task updated");
    expect(responsePUT.status).to.eq(200);
  });
});
