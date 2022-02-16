const expect = require("chai").expect;

describe("Validaciones Get Id", () => {
    var response1 = {};
 it("Validacion sin ID - GET", async () => {
    await cy.request("GET", `/player/juan`).then((response) => {
      response1 = response;
    });
  });

  it("Validacion", () => {
    expect(response1.body.message).to.eq("Id not found");
    expect(response1.body.status).to.eq(500);
  });
});
