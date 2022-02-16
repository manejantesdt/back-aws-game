const expect = require("chai").expect;

describe("Validaciones add player", () => {
    it("Prueba de validaciones - POST", async () => {
        cy.request("POST", "/player", {
          avatar: "/static/media/avatar3.d4e8a4523a85d77f222f.png",
          nickname: null,
        }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body.message).to.eq("El nickname o avatar es incorrecto");
        });
      });
    
      it("Prueba de validaciones sin nickname - POST", async () => {
        cy.request("POST", "/player", {
          avatar: "/static/media/avatar3.d4e8a4523a85d77f222f.png",
        }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body.message).to.eq("El nickname o avatar es incorrecto");
        });
      });
    
      it("Prueba de validaciones nickname no string - POST", async () => {
        cy.request("POST", "/player", {
          avatar: "/static/media/avatar3.d4e8a4523a85d77f222f.png",
          nickname: 123,
        }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body.message).to.eq("El nickname o avatar es incorrecto");
        });
      });
    
    
    it("Prueba de validaciones avantar no string - POST", async () => {
      cy.request("POST", "/player", {
        avatar: 123,
        nickname: "gustavo",
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body.message).to.eq("El nickname o avatar es incorrecto");
      });
    });
    
    it("Prueba de validaciones avatar - POST", async () => {
      cy.request("POST", "/player", {
        avatar: null,
        nickname: "gustavo",
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body.message).to.eq("El nickname o avatar es incorrecto");
      });
    });
})