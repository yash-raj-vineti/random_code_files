import inputs from '../fixtures/inputs.json';
import translationHelpers from "../utils/shared_block_helpers/translationHelpers";
import infusion from "../fixtures/infusionAssertions.json";
import assertions from "../fixtures/assertions.json";
import actionButtonsHelper from './shared_block_helpers/actionButtonHelpers';
import signatureHelpers from './shared_block_helpers/signatureHelpers';
import inputHelpers from './shared_block_helpers/inputFieldHelpers';

export default {
  testInfusionHeaders: (infusionHeaders, patientInformation) => {
    if (Cypress.env("runWithHelpers")) {
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.name"]', infusionHeaders.nameLabel);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.name-value"]',
        `${patientInformation.lastName}${", "}${
          patientInformation.firstName
        }${" "}${patientInformation.middleName}`);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.dob"]', infusionHeaders.dateOfBirthLabel);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.dob-value"]', patientInformation.dataOfBirthFormat);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.subject_id"]', infusionHeaders.subjectNumberLabel);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.subject_id-value"]', patientInformation.subjectId);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.therapy"]', infusionHeaders.therapyLabel);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.therapy-value"]', assertions.therapyValue);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.physician_name"]', infusionHeaders.physicianLabel);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.physician_name-value"]', assertions.physicianNameValue);
    }
  },

  infusionSideBar: () =>{
    if (Cypress.env('runWithHelpers')) {
    translationHelpers.assertSingleField('[data-testid="progress-shipment_receipt-name"]', infusion.infusionSideBars.shipmentReceipt);
    translationHelpers.assertSingleField('[data-testid="progress-product_receipt-name"]', infusion.infusionSideBars.productReceipt);
    translationHelpers.assertSingleField('[data-testid="progress-storage-name"]', infusion.infusionSideBars.storage);}
  },

  infusionShipmentReceiptChecklist: (coi) => {
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="infusion_shipment_receipt_checklist"]','h1', infusion.infusionShipmentReceiptChecklist.shipmentReceiptChecklist)
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 0, label: infusion.infusionShipmentReceiptChecklist.shipperScan } );
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 1, label: infusion.infusionShipmentReceiptChecklist.outerShipper } );
      translationHelpers.assertBlockLabel('[data-test-id="label-step-row-description"]', { index: 0, label: infusion.infusionShipmentReceiptChecklist.coi } );
      translationHelpers.assertChildElement('[data-testid="coi-action-trigger-button"]', "span", infusion.infusionShipmentReceiptChecklist.coiActionTriggerButton, 0);
      translationHelpers.assertBlockLabel('[data-test-id="label-step-row-description"]', { index: 1, label: infusion.infusionShipmentReceiptChecklist.serialNo } );
      translationHelpers.assertChildElement('[data-testid="infusion-shipper-serial-number-action-trigger-button"]', "span", infusion.infusionShipmentReceiptChecklist.coiActionTriggerButton, 0 );
      translationHelpers.assertSingleField('[data-testid="question-text-infusion_shipping_container_intact"]', infusion.infusionShipmentReceiptChecklist.question1 );
      translationHelpers.assertSingleField('[data-testid="question-text-infusion_seal_on_shipper_intact"]', infusion.infusionShipmentReceiptChecklist.question2 );
      translationHelpers.assertChildElement('[id="#/properties/shipping_receipt_checklist/properties/infusion_additional_comments"]', "label", infusion.infusionShipmentReceiptChecklist.additionalComments, 0 );
      translationHelpers.assertChildElement('[data-testid="pass-button-infusion_shipping_container_intact"]', "span", infusion.infusionShipmentReceiptChecklist.passButton, 0 );
      translationHelpers.assertChildElement('[data-testid="fail-button-infusion_shipping_container_intact"]', "span", infusion.infusionShipmentReceiptChecklist.failButton, 0 );
      translationHelpers.assertChildElement('[data-testid="pass-button-infusion_seal_on_shipper_intact"]', "span", infusion.infusionShipmentReceiptChecklist.passButton, 0 );
      translationHelpers.assertChildElement('[data-testid="fail-button-infusion_seal_on_shipper_intact"]', "span", infusion.infusionShipmentReceiptChecklist.failButton, 0 );
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', infusion.infusionShipmentReceiptChecklist.backNavLink );
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', "span", infusion.infusionShipmentReceiptChecklist.primaryButtonAction, 0 );
      translationHelpers.assertChildElement('[data-testid="secondary-button-action"]', "span", infusion.infusionShipmentReceiptChecklist.secondaryButtonAction, 0 );
    }
    inputHelpers.scanAndVerifyCoi('coi', coi);
    inputHelpers.scanAndVerifyCoi('infusion-shipper-serial-number', inputs.mfgShippingChecklistInfusionShipperSerialNumber)
    inputHelpers.clicker('[data-testid="pass-button-infusion_shipping_container_intact"]')
    inputHelpers.clicker('[data-testid="pass-button-infusion_seal_on_shipper_intact"]')
    inputHelpers.inputSingleField('[data-testid="#/properties/shipping_receipt_checklist/properties/infusion_additional_comments-input"]', inputs.comment)
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {});
    cy.wait(3000)
  },

    infusionShipmentReceiptSummary: (coi) => {
        if (Cypress.env('runWithHelpers')) {
        translationHelpers.assertChildElement('[data-test-id="page-title-block-block"]', 'h1', infusion.shipmentReceiptSummary.shipmentSummary, 0)
        translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', infusion.shipmentReceiptSummary.shipperScan, 0)
        translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>',{index: 0, label: infusion.shipmentReceiptSummary.shipperLabel})
        translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>',{index: 1, label: infusion.shipmentReceiptSummary.imageConfirmed})
        translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>',{index: 2, label: `${coi}`})
        translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>',{index: 4, label: infusion.shipmentReceiptSummary.shipperSeal})
        translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>',{index: 5, label: infusion.shipmentReceiptSummary.imageConfirmed})
        translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>',{index: 6, label: inputs.mfgShippingChecklistInfusionShipperSerialNumber})
        translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', infusion.shipmentReceiptSummary.outerShipper, 1)
        translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"]>>>>',{index: 0, label: infusion.shipmentReceiptSummary.productSummaryLabel1})
        translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"]>>>>',{index: 2, label: infusion.shipmentReceiptSummary.productSummaryLabel2})
        translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"]>>>>',{index: 4, label: infusion.shipmentReceiptSummary.commentAdditional})
        translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', infusion.shipmentReceiptSummary.review, 2)
        translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 1, label: infusion.shipmentReceiptSummary.yourSignature})
        translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 2, label: infusion.shipmentReceiptSummary.enterToConfirm})
        translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 3, label: infusion.shipmentReceiptSummary.confirmer})
        translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 4, label: infusion.shipmentReceiptSummary.approverPrompt})
        translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 5, label: infusion.shipmentReceiptSummary.verifierSignature})
        translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 6, label: infusion.shipmentReceiptSummary.enterToConfirm})
        translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 7, label: infusion.shipmentReceiptSummary.verifier})
        translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 8, label: infusion.shipmentReceiptSummary.verifierPrompt})
        translationHelpers.assertChildElement('[data-test-id="view-document-block"]', 'span', infusion.shipmentReceiptSummary.printSummary, 0)
        translationHelpers.assertSingleField('[data-testid="back-nav-link"]', infusion.shipmentReceiptSummary.backLabel)
        translationHelpers.assertSingleField('[data-testid="primary-button-action"]', infusion.shipmentReceiptSummary.next)
        }
        signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
        signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], 'phil3@vineti.com');
        actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {});
        cy.wait(3000)
    },

    infusionProductReceiptChecklist: coi => {
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="infusion_product_receipt_checklist"]','h1', infusion.productReceiptChecklist.productReceiptTitle, 0)
      translationHelpers.assertPageTitles('[data-test-id="infusion_product_receipt_checklist"]','h3', infusion.productReceiptChecklist.bag1Scan, 0)
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index:0 , label: infusion.productReceiptChecklist.shipmentDetails });
      translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"] >>>>', { index:0 , label: infusion.productReceiptChecklist.scanFinishedProduct });
      translationHelpers.assertSingleField('[data-testid="question-text-investigational_product"]', infusion.productReceiptChecklist.tempratureStandards);
      translationHelpers.assertSingleField('[data-testid="question-text-temperature_out_of_range"]', infusion.productReceiptChecklist.collectionBagCondition);
      translationHelpers.assertChildElement('[id="#/properties/product_receipt_checklist/properties/product_additional_comments"]', "label", infusion.productReceiptChecklist.additionalComments, 0);
      translationHelpers.assertChildElement('[data-testid="pass-button-investigational_product"]', "span", infusion.productReceiptChecklist.yesButton, 0);
      translationHelpers.assertChildElement('[data-testid="fail-button-investigational_product"]', "span", infusion.productReceiptChecklist.noButton, 0);
      translationHelpers.assertChildElement('[data-testid="pass-button-temperature_out_of_range"]', "span", infusion.productReceiptChecklist.passButton, 0);
      translationHelpers.assertChildElement('[data-testid="fail-button-temperature_out_of_range"]', "span", infusion.productReceiptChecklist.failButton, 0);
      translationHelpers.assertChildElement('[data-testid="bag-identifier-1-button"]', "span", infusion.productReceiptChecklist.confirm, 0);
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', infusion.productReceiptChecklist.back);
      translationHelpers.assertChildElement('[data-testid="secondary-button-action"]', "span", infusion.productReceiptChecklist.saveAndClose);
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', "span", infusion.productReceiptChecklist.next);
    }
      inputHelpers.scanAndVerifyBags('bag-identifier-1', `${coi}-FP-01`)
      inputHelpers.clicker('[data-testid="pass-button-investigational_product"]')
      inputHelpers.clicker('[data-testid="pass-button-temperature_out_of_range"]')
      inputHelpers.inputSingleField('[data-testid="#/properties/product_receipt_checklist/properties/product_additional_comments-input"]', inputs.comment)
      cy.get('[data-testid="primary-button-action"]').should('be.enabled');
      actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']});
      cy.wait(3000)
    },

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

      infusionProductReceiptSummary: (coi) => {
        const verifier = "phil3@vineti.com";
        if (Cypress.env("runWithHelpers")) {
          translationHelpers.assertPageTitles('[data-test-id="infusion_product_receipt_summary"]','h1', infusion.product_receipt_summary.productReceiptSummary)
          translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 0, label: infusion.product_receipt_summary.bagScan});
          translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 1, label: infusion.product_receipt_summary.conditionAndDetail});
          translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 2, label: infusion.product_receipt_summary.shipperScan});
          translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 3, label: infusion.product_receipt_summary.scanBags});
          translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 4, label: infusion.product_receipt_summary.ln2Storage});
          translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 5, label: infusion.product_receipt_summary.review});
          translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>', { index: 0, label: `${" "}${infusion.product_receipt_summary.bagICoiScan}${" "}`});
          translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>', { index: 1, label: infusion.product_receipt_summary.confirmed});
          translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>', { index: 2, label: `${coi}${"-FP-01"}` });
          translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>', { index: 4, label: `${" "}${infusion.product_receipt_summary.storeBagI}${" "}`});
          translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>', { index: 5, label: infusion.product_receipt_summary.confirmed});
          translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>', { index: 6, label: `${coi}${"-FP-01"}` });
          translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${infusion.product_receipt_summary.infusionConditonAndDetails1}"]`, infusion.product_receipt_summary.infusionConditonAndDetails1);
          translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${infusion.product_receipt_summary.infusionConditonAndDetails1}-answer"]`, infusion.product_receipt_summary.yes);
          translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${infusion.product_receipt_summary.infusionConditonAndDetails2}"]`, infusion.product_receipt_summary.infusionConditonAndDetails2);
          translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${infusion.product_receipt_summary.infusionConditonAndDetails2}-answer"]`, infusion.product_receipt_summary.yes);
          translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"]>>>>', { index: 4, label: infusion.product_receipt_summary.additionalNotes});
          translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"]>>>>', { index: 5, label: infusion.product_receipt_summary.comment });
          translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>', { index: 0, label: `${" "}${infusion.product_receipt_summary.shipperScan}${" "}` });
          translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>', { index: 1, label: infusion.product_receipt_summary.confirmed });
          translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>', { index: 2, label: inputs.mfgShippingChecklistInfusionShipperSerialNumber });
          translationHelpers.assertBlockLabel('[data-test-id="label-values-block"]>>>>', { index: 0, label: infusion.product_receipt_summary.equipmentIdentifier });
          translationHelpers.assertChildElement('[data-test-id="label-values-block"]', "span", inputs.confirmCrfStorage, 0);
          translationHelpers.assertSingleField('[data-testid="approver-role-title"]', infusion.product_receipt_summary.yourSignature );
          translationHelpers.assertSingleField('[data-testid="approver-sign-button"]', infusion.product_receipt_summary.signConfirmation );
          translationHelpers.assertSingleField('[data-testid="approver-role-text"]', infusion.product_receipt_summary.confirmerRole );
          translationHelpers.assertSingleField('[data-testid="approver-prompt"]', infusion.product_receipt_summary.confirmerPrompt );
          translationHelpers.assertSingleField('[data-testid="verifier-role-title"]', infusion.product_receipt_summary.verifierSignature );
          translationHelpers.assertSingleField('[data-testid="verifier-sign-button"]', infusion.product_receipt_summary.signConfirmation );
          translationHelpers.assertSingleField('[data-testid="verifier-prompt"]', infusion.product_receipt_summary.verifierPrompt );
          translationHelpers.assertSingleField('[data-testid="verifier-role-text"]', infusion.product_receipt_summary.verifierRole );
          translationHelpers.assertChildElement('[data-test-id="view-document-block"]', "span", infusion.product_receipt_summary.printSummary, 0);
          translationHelpers.assertSingleField('[data-testid="back-nav-link"]', infusion.product_receipt_summary.backLabel);
          translationHelpers.assertSingleField('[data-testid="primary-button-action"]', infusion.product_receipt_summary.next);
        }
        signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
        signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], 'phil3@vineti.com');
        actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']});
        cy.wait(3000)
      },
}
