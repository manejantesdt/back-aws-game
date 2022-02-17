const expect = require("chai").expect;

describe("edit playern information", () => {
  var responsePostId = "";
  var responseDelete = "";

  it("añade un jugador a la base de datos - POST", async () => {
    await cy
      .request("POST", "/player", {
        avatar: "/static/media/avatar3.d4e8a4523a85d77f222f.png",
        nickname: "gustavo",
      })
      .then((response) => {
        responsePostId = response.body.Id;
        console.log(responsePostId);
      });
  });

  it("Delete player - Delete", async () => {
    await cy
      .request("DELETE", `/player/${responsePostId}`)
      .then((response) => {
        responseDelete = response;
      });
  });
  it("edita los campos correctamente", () => {
    expect(responseDelete.body.message).to.eq("Player deleted successfully");
    expect(responseDelete.status).to.eq(200);
  });

   it("validacion - DELETE", async () => {
    cy.request("DELETE", `/player/hola`).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body.message).to.eq("no pasa validacion");
    });
  });

   it("validacion ID - DELETE", async () => {
    cy.request("DELETE", `/player/${null}`).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body.message).to.eq("no pasa validacion");
    });
  });


});
