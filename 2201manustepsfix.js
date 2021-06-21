harvest: (coi) => {
    cy.wait(3000);
    if (Cypress.env("runWithHelpers")) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_harvest"]','h1', manufacturing.harvest.harvestTitle)
      translationHelpers.assertBlockLabel('[data-testid="h1-header"]', {index: 1, label: manufacturing.harvest.harvestScanBagSection})
      translationHelpers.assertSingleField(".row-label-with-description-description", assertions.harvestScanCoi)
      translationHelpers.assertChildElement(".bag-volume-block", "p", assertions.harvestDescription, 0)
      translationHelpers.assertChildElement(".bag-volume-block", "p", assertions.harvestBagApplyLabel, 1)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.harvest.newBack)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', manufacturing.harvest.newNext)
    }
    inputHelpers.scanAndVerifyBags('bag-identifier-1',`${coi}-FP-01`)
    cy.get("body").then(($body) => {
      if (
        $body.find(
          '[id="#/properties/custom_fields/properties/applied_label_to_bag_harvest"]'
        ).length > 0
      ) {
        //evaluates as true if button exists at all
        cy.get(
          '[id="#/properties/custom_fields/properties/applied_label_to_bag_harvest"]'
        ).then(($header) => {
          if ($header.is(":visible")) {
            cy.get(
              '[id="#/properties/custom_fields/properties/applied_label_to_bag_harvest"]'
            ).click();
          }
        });
      }
    });
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  transferToCrf: (coi) => {
    cy.wait(5000);
    if (Cypress.env("runWithHelpers")) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_transfer_to_crf"]','h1', manufacturing.transferToCrf.mfgTransferToCrfTitle)
      translationHelpers.assertBlockLabel('[data-testid="h1-header"]', {index: 2, label: manufacturing.transferToCrf.mfgTransferToCrfFirstSectionTitle})
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', {index: 0, label: manufacturing.transferToCrf.mfgTransferToCrfSecondSectionTitle})
      translationHelpers.assertSingleField('[data-test-id="enter-and-confirm-block"] >> :nth-child(1)', manufacturing.transferToCrf.mfgTransferToCrfSecondSectionDescription)
      translationHelpers.assertSingleField('[data-testid="recordButton-crf_freezer_id"]', manufacturing.transferToCrf.mfgTransferToCrfRecord)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.harvest.newBack)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', manufacturing.harvest.newNext)
    }

    inputHelpers.scanAndVerifyBags('bag-identifier-1',`${coi}-FP-01`);
    cy.wait(2000);
    cy.get('[data-testid="bag-identifier-1-check-mark"]').should("be.visible");
    inputHelpers.inputEnterAndConfirm('crf_freezer_id',inputs.enterMfgCrfFreezerId);
    cy.wait(2000);
    cy.get('[data-testid="green-checkmark-crf_freezer_id"]').should("be.visible");
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  crfToStorage: (coi) => {
    cy.wait(5000);
    if (Cypress.env("runWithHelpers")) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_crf_to_storage"]','h1', manufacturing.crfToStorage.mfgCrfToStorageTitle)
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', {index: 0, label: manufacturing.crfToStorage.mfgCrfToStorageFirstSectionTitle})
      translationHelpers.assertSingleField('[data-test-id="label-step-row-description"]', manufacturing.crfToStorage.mfgCrfToStorageFirstSectionDescription)
      translationHelpers.assertBlockLabel('[data-testid="h1-header"]', {index: 1, label: manufacturing.crfToStorage.mfgCrfToStorageNewdata})
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', {index: 1, label: manufacturing.crfToStorage.mfgCrfToStorageSecondSectionTitle})
      translationHelpers.assertSingleField('[data-test-id="enter-and-confirm-block"] >> :nth-child(1)', manufacturing.crfToStorage.mfgCrfToStorageSecondSectionDescription)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.harvest.newBack)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', manufacturing.harvest.newNext)
    }

    inputHelpers.scanAndVerifyCoi('crf-freezer-id', inputs.enterMfgCrfFreezerId);
    cy.wait(2000);
    cy.get('[data-testid="crf-freezer-id-check-mark"]').should("be.visible");
    inputHelpers.inputEnterAndConfirm('product_ln2_storage_unit',inputs.mfgShippingChecklistProductLn2StorageUnit);
    cy.wait(2000);
    cy.get('[data-testid="green-checkmark-product_ln2_storage_unit"]').should("be.visible");
    inputHelpers.scanAndVerifyBags('bag-identifier-1', `${coi}-FP-01`);
    cy.wait(2000);
    cy.get('[data-testid="bag-identifier-1-check-mark"]').should("be.visible");
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  qualityDocuments: () => {
    cy.wait(2000);
    if (Cypress.env("runWithHelpers")) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_quality_documents"]','h1', manufacturing.qualityDocuments.qualityDocumentsTitle)
      translationHelpers.assertSingleField('[data-testid="section-heading-title"]', manufacturing.qualityDocuments.qualityDocumentsFirstSectionTitle)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.harvest.newBack)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', manufacturing.harvest.newNext)
    }

    cy.get('[data-testid="section-heading-title"]').should(
      "contain",
      assertions.qualityDocumentsFirstSectionTitle
    );
    cy.get('[data-test-id="upload-files-block"]')
      .find("p")
      .should("contain", assertions.qualityDocumentUploadDescription);
    cy.get('[data-test-id="upload-files-block"]')
      .find("h5")
      .should("contain", assertions.qualityDocumentUploadDocument);

    cy.uploadAnyFile("validpdf.pdf","base64",'[type="file"]',"application/pdf","input",0);
    cy.wait(2000);
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  qualityReview: () => {
    cy.wait(2000);
    if (Cypress.env("runWithHelpers")) {
      translationHelpers.assertSingleField('[data-testid="h1-header"]',manufacturing.qualityReview.qualityReviewTitle )
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]',{ index: 0, label: manufacturing.qualityReview.qualityReviewFirstSectionTitle })
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 1, label: manufacturing.qualityReview.qualityReviewSecondSectionTitle })
      translationHelpers.assertSingleField('[data-testid="section-heading-description"]', manufacturing.qualityReview.qualityReviewDescription)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.harvest.newBack)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', manufacturing.harvest.newNext)
    }
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(2000);
    if (Cypress.env("runWithHelpers")) {
      translationHelpers.assertSingleField('[data-testid="approver-role-title"]', manufacturing.signature.myourSignature)
      translationHelpers.assertSingleField('[data-testid="approver-sign-button"]', manufacturing.signature.msignConfirmation)
      translationHelpers.assertSingleField('[data-testid="approver-role-text"]', manufacturing.signature.mconfirmerRole)
      translationHelpers.assertSingleField('[data-testid="approver-prompt"]', manufacturing.signature.mconfirmerPrompt)
      translationHelpers.assertSingleField('[data-testid="verifier-role-title"]', manufacturing.signature.mverifierSignature)
      translationHelpers.assertSingleField('[data-testid="verifier-sign-button"]', manufacturing.signature.msignConfirmation)
      translationHelpers.assertSingleField('[data-testid="verifier-prompt"]', manufacturing.signature.mverifierPrompt)
      translationHelpers.assertSingleField('[data-testid="verifier-role-text"]', manufacturing.signature.mverifierRole)
    }
    signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
    signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], 'quela@vineti.com');
    cy.wait(2000);
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
},
