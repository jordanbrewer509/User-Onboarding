describe("Login App", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000");
    })

    // GET
    const usernameInput = () => cy.get("input[name=username]");
    const emailInput    = () => cy.get("input[name=email]");
    const passwordInput = () => cy.get("input[name=password]");
    const checkboxBtn   = () => cy.get(`input[name="tos"]`);
    const submitBtn     = () => cy.get(`button[id="submit"]`);
    const cancelBtn     = () => cy.get(`button[id="clear"]`);

    it("sanity test, make sure tests work", () => {
        expect(1 + 1).to.equal(2);
        expect(1 + 2).not.equal(4);
    })

    it("proper elements exist", () => {
        usernameInput().should("exist");
        emailInput()   .should("exist");
        passwordInput().should("exist");
        checkboxBtn()  .should("exist");
        submitBtn()    .should("exist");
        cancelBtn()    .should("exist");
    })

    describe("Filling out inputs then clearing", () => {

        it("can navigate to site", () => {
            cy.url().should("include", "localhost");
        })

        it("submit button starts out disabled", () => {
            submitBtn().should("be.disabled");
        })

        it("can type in the inputs", () => {
            usernameInput()
                .should("have.value", "")
                .type("hello")
                .should("have.value", "hello");
            emailInput()
                .should("have.value", "")
                .type("hello@world.com")
                .should("have.value", "hello@world.com");
            passwordInput()
                .should("have.value", "")
                .type("butter&beans")
                .should("have.value", "butter&beans");
            
            cancelBtn().click();
        })
            
        it("terms of service button works", () => {
            checkboxBtn().check();
            checkboxBtn().uncheck();

        })

        it("form data can be submitted", () => {
            usernameInput().type("hello");
            emailInput()   .type("hello@world.com");
            passwordInput().type("butter&beans");
            checkboxBtn()  .check();
            submitBtn()    .click();

            cy.contains("hello");
            cy.contains("hello@world.com");
            cy.contains("butter&beans");
        })
        it("is invalid when invalid inputs are entered", () => {
            usernameInput().type("h");
            cy.contains("Username must be 3 characters long");
            usernameInput().type("ello");

            emailInput().type("hello");
            cy.contains("Must be a valid e-mail address");
            emailInput().type("@world.com");

            passwordInput().type("butte");
            cy.contains("Password must be 6 characters long");
            passwordInput().type("&beans");

            cancelBtn().click();
        })
    })



})