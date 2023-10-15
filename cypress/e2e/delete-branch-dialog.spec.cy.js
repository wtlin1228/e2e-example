const RESTAURANT = {
  storeID: "hq_member",
  account: "hq_member",
};

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:8026/hq/branch/branches/all");

    // Do login if not logged in
    cy.url().then(($url) => {
      if ($url.includes("login")) {
        cy.get("#store_id").type(RESTAURANT.storeID);
        cy.get("#account").type(RESTAURANT.account);
        cy.get("#submit").click();

        // Close the invitation dialog if it is opened
        cy.get(
          '[data-test-id="branchReplyInvitationResultsDialog-confirmButton"]'
        ).then(($btn) => {
          if ($btn.length) {
            $btn.click();
          }
        });
      }
    });

    cy
      // query
      .contains("li", "aaa (aaa)")
      .find("button")
      .eq(1)
      // action
      .click()
      // assertion
      .get('[data-label-for="Dialog"]')
      .then(($dialog) => {
        expect($dialog).to.contain("無法移除分店");
        expect($dialog).to.contain(
          "分店會員合併至總部時發生錯誤，請聯繫 iCHEF 客服。"
        );
      });
  });
});
