describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const newUser = {
      userName: "Singham",
      password: "ISuck123",
    };
    cy.request("POST", "http://localhost:3003/api/users", newUser);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Login");
  });

  describe("Login", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000");
    });
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("Singham");
      cy.get("input:last").type("ISuck123");
      cy.get(".loginBTN").click();
      cy.get(".logoutBTN");
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("Singham");
      cy.get("input:last").type("ISuck13");
      cy.get(".loginBTN").click();
      cy.get(".logout").should("not.exist");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      const user = {
        userName: "Singham",
        password: "ISuck123",
      };
      cy.request("POST", "http://localhost:3003/api/login", user).then(
        (response) => {
          localStorage.setItem("user", JSON.stringify(response.body));
        }
      );

      cy.visit("http://localhost:3000");
    });

    it("A blog can be created", function () {
      cy.contains("Submit Blog").click();
      cy.get(".titleBox").type("How to suck penis.");
      cy.get(".authorBox").type("Money D");
      cy.get(".urlBox").type("penis.com");
      cy.get(".blogSubmitButton").click();
      cy.contains("How to suck penis");
    });

    describe("maniuplating the blogs successfully", function () {
      beforeEach(() => {
        cy.contains("Submit Blog").click();
        cy.get(".titleBox").type("How to suck penis.");
        cy.get(".authorBox").type("Money D");
        cy.get(".urlBox").type("penis.com");
        cy.get(".blogSubmitButton").click();
        cy.contains("How to suck penis");
      });

      it("User can like a blog", function () {
        cy.contains("show").click();
        cy.contains("like").click();
      });

      it("User can delete the blog", function () {
        cy.contains("show").click();
        cy.contains("delete").click();
        cy.contains("How to suck penis").should("not.exist");
      });

      /*
      it("Different user cannot delete the blog", function () {
        // making the request
        const newUser = {
          userName: "Raj",
          password: "IAmBestGamer",
        };
        cy.request("POST", "http://localhost:3003/api/users", newUser);

        cy.request("POST", "http://localhost:3003/api/login", newUser).then(
          (response) => {
            localStorage.setItem("user", JSON.stringify(response.body));
            cy.visit("http://localhost:3000");
            // not being able to delete the post
            cy.contains("show").click();
            cy.contains("delete").click();
            cy.contains("How to suck penis");
          }
        );
      });
      */

      // checking if blogs are ordered
      it("checking how blogs are ordered", function () {
        cy.get(".titleBox").clear();
        cy.get(".authorBox").clear();
        cy.get(".urlBox").clear();
        cy.get(".titleBox").type("How to be a legend at shit.");
        cy.get(".authorBox").type("Manpreet D");
        cy.get(".urlBox").type("legendaryStatus.com");
        cy.get(".blogSubmitButton").click();

        // finding the button and assigning the parent
        cy.contains("How to suck penis")
          .contains("show")
          .click()
          .parent()
          .parent()
          .contains("like")
          .as("penisLike");

        // finding the legend button and assigning its parent
        cy.contains("How to be a legend at shit.")
          .contains("show")
          .click()
          .parent()
          .parent()
          .contains("like")
          .as("legendLike");

        // clicking the appropriate likes
        cy.get("@legendLike").click().click().click().click().click().click();
        cy.get("@penisLike").click().click().click();

        cy.reload();

        // checking to see if they are in order of likes
        cy.get(".likeSpan").then(($val) => {
          let numArray = [];
          for (let i = 0; i < $val.length; i++) {
            numArray.push($val.get(i).innerText);
          }

          console.log(numArray);
          expect(
            numArray.every((element, index) => {
              if (index === numArray.length - 1) {
                return true;
              } else {
                return element > numArray[index + 1];
              }
            })
          ).to.eq(true);
        });
      });
    });
  });
});
