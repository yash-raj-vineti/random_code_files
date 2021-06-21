infusionTransferProductToStorage: (coi) => {
      if (Cypress.env('runWithHelpers')) {
        translationHelpers.assertPageTitles('[data-test-id="infusion_transfer_product_to_storage"]','h1', infusion.transferToStorage.transferToStorageTitle, 0)
        translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index:0 , label: infusion.transferToStorage.transferToStorageSectionHeading})
        translationHelpers.assertSingleField('[data-test-id="label-step-row-description"]', infusion.transferToStorage.transferToStorageSectionDescription)
        translationHelpers.assertPageTitles('[data-test-id="infusion_transfer_product_to_storage"]','h3', infusion.transferToStorage.scanBag1, 1)
        translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', {index:1 , label: infusion.transferToStorage.secondHeading})
        translationHelpers.assertSingleField('[data-test-id="enter-and-confirm-block"] >> :nth-child(1)', infusion.transferToStorage.secondDescription);
        translationHelpers.assertBlockLabel('[data-test-id="enter-and-confirm-block"] >>>>',{index: 0, label: infusion.transferToStorage.enter});
        translationHelpers.assertBlockLabel('[data-test-id="enter-and-confirm-block"] >>>>',{index: 1, label: infusion.transferToStorage.confirm});
        translationHelpers.assertSingleField('[data-testid="back-nav-link"]',infusion.transferToStorage.back);
        translationHelpers.assertChildElement('[data-testid="secondary-button-action"]',"span",infusion.transferToStorage.saveAndClose);
        translationHelpers.assertChildElement('[data-testid="primary-button-action"]',"span",infusion.transferToStorage.next);
      }
        inputHelpers.scanAndVerifyCoi('coi', coi)
        inputHelpers.scanAndVerifyBags('bag-identifier-1', `${coi}-FP-01`)
        inputHelpers.inputSingleField('[data-testid="input-enter-ln2_storage_unit"]', inputs.enterCrfStorage)
        inputHelpers.inputSingleField('[data-testid="input-confirm-ln2_storage_unit"]', inputs.confirmCrfStorage)
        inputHelpers.clicker('[data-testid="recordButton-ln2_storage_unit"]')
        cy.get('[data-testid="primary-button-action"]').should('be.enabled');
        actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']})
        cy.wait(3000)
      },
