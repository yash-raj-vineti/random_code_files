import common from "../support/index.js";
import assertions from "../fixtures/assertions.json";
import translationHelpers from "../utils/shared_block_helpers/translationHelpers";
import actionButtonsHelper from '../utils/shared_block_helpers/actionButtonHelpers';
import signatureHelpers from '../utils/shared_block_helpers/signatureHelpers';
import inputHelpers from '../utils/shared_block_helpers/inputFieldHelpers'
import inputs from '../fixtures/inputs.json';
import dayjs from 'dayjs';
import manufacturing from "../fixtures/manufacturingAssertions.json";


const verifier = 'quela@vineti.com';
const date = dayjs()
  .add(1, "month")
  .add(0, "days")
  .format("DD-MMM-YYYY");

export const shippingChecklist = ({ coi, manufacturingAirWayBill }) => {
  cy.wait(3000);
  if (Cypress.env("runWithHelpers")) {
    translationHelpers.assertPageTitles('[data-test-id="manufacturing_shipping_checklist"]','h1', manufacturing.shippingCheckList.mfgShippingChecklistTitle)
    translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 0, label: manufacturing.shippingCheckList.mfgShippingChecklistFirstSectionTitle, });
    translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 1, label: manufacturing.shippingCheckList.mfgShippingChecklistSecondSectionTitle, });
    translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 2, label: manufacturing.shippingCheckList.mfgShippingChecklistThirdSectionTitle, });
    translationHelpers.assertSingleField('[data-testid="question-text-ship_to_infusion_attach_shipping_label"]', manufacturing.shippingCheckList.mfgShippingChecklistAttachShippingLabel);
    translationHelpers.assertSingleField('[data-testid="question-text-ship_to_infusion_place_summary_document"]', manufacturing.shippingCheckList.mfgShippingChecklistPlaceSummaryDocument);
    translationHelpers.assertSingleField('[data-test-id="label-step-row-description"]', manufacturing.shippingCheckList.scanAirwayBillNumberDescription);
    translationHelpers.assertSingleField('[data-testid="question-text-ship_to_infusion_place_material_into_shipper"]', manufacturing.shippingCheckList.mfgShippingChecklistPlaceMaterialIntoShipper);
    translationHelpers.assertSingleField('[data-testid="question-text-ship_to_infusion_activate_temperature_monitor"]', manufacturing.shippingCheckList.mfgShippingChecklistActivateTemperatureMonitor);
    translationHelpers.assertChildElement('[data-test-id="enter-and-confirm-block"] >', "div", manufacturing.shippingCheckList.mfgShippingChecklistScanSerialNumber);
    translationHelpers.assertChildElement('[data-test-id="enter-and-confirm-block"] >', "div", manufacturing.shippingCheckList.enter, 3);
    translationHelpers.assertChildElement('[data-test-id="enter-and-confirm-block"] >', "div", manufacturing.shippingCheckList.confirm, 5);
    translationHelpers.assertChildElement('[data-testid="pass-button-ship_to_infusion_attach_shipping_label"]', "span", manufacturing.shippingCheckList.attached);
    translationHelpers.assertChildElement('[data-testid="fail-button-ship_to_infusion_attach_shipping_label"]', "span", manufacturing.shippingCheckList.no);
    translationHelpers.assertChildElement('[data-testid="pass-button-ship_to_infusion_place_material_into_shipper"]', "span", manufacturing.shippingCheckList.placed);
    translationHelpers.assertChildElement('[data-testid="fail-button-ship_to_infusion_place_material_into_shipper"]', "span", manufacturing.shippingCheckList.notPlaced);
    translationHelpers.assertChildElement('[data-testid="pass-button-ship_to_infusion_activate_temperature_monitor"]', "span", manufacturing.shippingCheckList.activated);
    translationHelpers.assertChildElement('[data-testid="fail-button-ship_to_infusion_activate_temperature_monitor"]', "span", manufacturing.shippingCheckList.notActivated);
    translationHelpers.assertChildElement('[data-testid="pass-button-ship_to_infusion_place_summary_document"]', "span", manufacturing.shippingCheckList.placed);
    translationHelpers.assertChildElement('[data-testid="fail-button-ship_to_infusion_place_summary_document"]', "span", manufacturing.shippingCheckList.notPlaced);
  }
  inputHelpers.inputEnterAndConfirm('infusion_shipper_serial_number',inputs.mfgShippingChecklistInfusionShipperSerialNumber)
  inputHelpers.clicker('[data-testid="pass-button-ship_to_infusion_attach_shipping_label"]');
  inputHelpers.clicker('[data-testid="pass-button-ship_to_infusion_place_material_into_shipper"]');
  inputHelpers.clicker('[data-testid="pass-button-ship_to_infusion_activate_temperature_monitor"]');
  inputHelpers.clicker('[data-testid="pass-button-ship_to_infusion_place_summary_document"]');
  inputHelpers.inputSingleField('[id="#/properties/shipping_checklist/properties/ship_to_infusion_additional_comments-input"]', inputs.mfgShippingChecklistInfusionAdditionalComments);
  inputHelpers.scanAndVerifyCoi('manufacturing-airway-bill', manufacturingAirWayBill);
  actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']});
};

export const shippingSummary = ({ coi, manufacturingAirWayBill }) => {
  cy.wait(3000);

  if (Cypress.env("runWithHelpers")) {
    translationHelpers.assertPageTitles('[data-test-id="manufacturing_shipping_summary"]','h1', manufacturing.shippingSummary.mfgShippingSummaryTitle)
    translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 0, label: manufacturing.shippingSummary.mfgShippingSummaryFirstSectionTitle, });
    translationHelpers.assertSectionChildElement('[data-test-id="label-verification-step-row-block"] >>', 0, "div",
      `${" "}${
        manufacturing.shippingSummary.mfgShippingSummaryEquipmentIdentifierLn2StorageLabel
      }${" "}`
    );
    translationHelpers.assertSectionChildElement('[data-test-id="label-verification-step-row-block"] >>', 0, "div", manufacturing.shippingSummary.mfgShippingSummaryConfirmedLabel, 1);
    translationHelpers.assertBlockLabel('[data-testid="input-value"]', { index: 0, label: inputs.confirmMfgCrfFreezerId,});
    translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 1, label: assertions.mfgShippingSummarySecondSectionTitle, });
    translationHelpers.assertSectionChildElement('[data-test-id="multiple-scan-block-block"] >>>', 0, "div",
      `${" "}${
        manufacturing.shippingSummary.mfgShippingSummaryStoreBagOneIdentifier
      }${" "}`
    );
    translationHelpers.assertSectionChildElement('[data-test-id="multiple-scan-block-block"] >>>', 0, "div", manufacturing.shippingSummary.mfgShippingSummaryConfirmedLabel, 1);
    translationHelpers.assertBlockLabel('[data-testid="bag-identifier-1-value"]', { index: 0, label: `${coi}${"-FP-01"}`, });
    translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 2, label: assertions.mfgShippingSummaryThirdSectionTitle, });
    translationHelpers.assertChildElement('[data-testid="display-only"]', "div", manufacturing.shippingSummary.mfgShippingSummaryCoiIdentifierShipperLabel);
    translationHelpers.assertChildElement('[data-testid="display-only"]', "div", `${coi}${" "}`, 1);
    translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 3, label: assertions.mfgShippingSummaryFourthSectionTitle, });
    translationHelpers.assertSectionChildElement('[data-test-id="multiple-scan-block-block"] >>>', 2, "div",
      `${" "}${
        manufacturing.shippingSummary.mfgShippingSummaryBagOneCoiIdentifier
      }${" "}`
    );
    translationHelpers.assertSectionChildElement('[data-test-id="multiple-scan-block-block"] >>>', 2, "div", manufacturing.shippingSummary.mfgShippingSummaryConfirmedLabel, 1);
    translationHelpers.assertBlockLabel('[data-testid="bag-identifier-1-value"]', { index: 1, label: `${coi}${"-FP-01"}`, });
    translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${assertions.mfgShippingSummaryAttachLabelsToShipper}"]`, assertions.mfgShippingSummaryAttachLabelsToShipper);
    translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${assertions.mfgShippingSummaryAttachLabelsToShipper}-answer"]`, assertions.mfgShippingSummaryAttachedLabel);
    translationHelpers.assertSectionChildElement('[data-test-id="label-verification-step-row-block"] >>', 2, "div",
      `${" "}${
        manufacturing.shippingSummary.mfgShippingSummaryScanAirwayBillLabel
      }${" "}`
    );
    translationHelpers.assertSectionChildElement('[data-test-id="label-verification-step-row-block"] >>', 2, "div", manufacturing.shippingSummary.mfgShippingSummaryConfirmedLabel, 1);
    translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 4, label: manufacturing.shippingSummary.mfgShippingSummaryFifthSectionTitle, });
    translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${assertions.mfgShippingSummaryPlaceMaterialsIntoShipper}"]`, manufacturing.shippingSummary.mfgShippingSummaryPlaceMaterialsIntoShipper);
    translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${manufacturing.shippingSummary.mfgShippingSummaryPlaceMaterialsIntoShipper}-answer"]`, manufacturing.shippingSummary.mfgShippingSummaryPlacedLabel);
    translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${manufacturing.shippingSummary.mfgShippingSummaryActivateTemperatureMonitor}"]`, manufacturing.shippingSummary.mfgShippingSummaryActivateTemperatureMonitor);
    translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${manufacturing.shippingSummary.mfgShippingSummaryActivateTemperatureMonitor}-answer"]`, manufacturing.shippingSummary.mfgShippingSummaryActivatedLabel);
    translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${manufacturing.shippingSummary.mfgShippingSummaryPlaceSummaryDocumentsIntoShipper}"]`, manufacturing.shippingSummary.mfgShippingSummaryPlaceSummaryDocumentsIntoShipper);
    translationHelpers.assertSingleField(`[data-testid="txt-field-layout-${manufacturing.shippingSummary.mfgShippingSummaryPlaceSummaryDocumentsIntoShipper}-answer"]`, manufacturing.shippingSummary.mfgShippingSummaryPlacedLabel);
    translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 5, label: manufacturing.shippingSummary.mfgShippingSummarySixthSectionTitle, });
    translationHelpers.assertChildElement('[data-test-id="label-values-block"] >>>', "div", manufacturing.shippingSummary.equipmentIdentifier);
    translationHelpers.assertChildElement('[data-test-id="label-values-block"] >>>', "div", `${inputs.mfgShippingChecklistProductLn2StorageUnit}${" "}`, 1);
    translationHelpers.assertSectionChildElement('[data-test-id="shipping-checklist-summary-block"] >>>', 4, "div", manufacturing.shippingSummary.additionalComments);
    translationHelpers.assertSectionChildElement('[data-test-id="shipping-checklist-summary-block"] >>>', 4, "div", `${inputs.mfgShippingChecklistInfusionAdditionalComments}${" "}`, 1);
    translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 6, label: manufacturing.shippingSummary.mfgShippingSummarySeventhSectionTitle, });
    translationHelpers.assertSingleField('[data-testid="approver-role-title"]', manufacturing.shippingSummary.yourSignature);
    translationHelpers.assertSingleField('[data-testid="approver-sign-button"]', manufacturing.shippingSummary.signConfirmation);
    translationHelpers.assertSingleField('[data-testid="approver-role-text"]', manufacturing.shippingSummary.confirmerRole);
    translationHelpers.assertSingleField('[data-testid="approver-prompt"]', manufacturing.shippingSummary.confirmerPrompt);
    translationHelpers.assertSingleField('[data-testid="verifier-role-title"]', manufacturing.shippingSummary.verifierSignature);
    translationHelpers.assertSingleField('[data-testid="verifier-sign-button"]', manufacturing.shippingSummary.signConfirmation);
    translationHelpers.assertSingleField('[data-testid="verifier-prompt"]', manufacturing.shippingSummary.verifierPrompt);
    translationHelpers.assertSingleField('[data-testid="verifier-role-text"]', manufacturing.shippingSummary.verifierRole);
    translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.shippingSummary.backLabel);
    translationHelpers.assertChildElement('[data-testid="primary-button-action"]', "span", manufacturing.shippingSummary.next);
  }
  cy.wait(3000);
  signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
  signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], 'quela@vineti.com'); 
  actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
    apiAliases: ['@patchProcedureSteps', '@getProcedures']
  });
};

export default {
  collectionSiteLabels: () => {
    cy.wait(3000);
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertSingleField('[data-testid="progress-collection_labels-name"]', manufacturing.collectionSiteLabels.collectionLabels);
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_collection_site_labels"]','h1', manufacturing.collectionSiteLabels.collectionSiteLabels)
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 0, label: manufacturing.collectionSiteLabels.collectionLabels});
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 1, label: manufacturing.collectionSiteLabels.cryopreservationLabels});
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 2, label: manufacturing.collectionSiteLabels.signature});
      translationHelpers.assertChildElement('[data-testid="print-block-container"]', "p", manufacturing.collectionSiteLabels.printBlockContainer1, 0);
      translationHelpers.assertChildElement('[data-testid="print-block-container"]', "p", manufacturing.collectionSiteLabels.printBlockContainer2, 1);
      translationHelpers.assertSingleField('[data-testid="section-heading-description"]', manufacturing.collectionSiteLabels.sectionHeadingDescription);
      translationHelpers.assertChildElement('[data-testid="btn-print"]', "span", manufacturing.collectionSiteLabels.btnPrint, 0);
      translationHelpers.assertChildElement('[data-testid="btn-print"]', "span", manufacturing.collectionSiteLabels.btnPrint, 1);
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.collectionSiteLabels.backNavLink);
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', "span", manufacturing.collectionSiteLabels.primaryButtonAction, 0);
    }
      signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
      signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], 'quela@vineti.com');
      actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']});
      cy.wait(3000)
  },

  shipLabelsToCollectionSite: (coi) => {
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertChildElement('[data-testid="coi-action-trigger-button"]', "span", manufacturing.shipLabelsToCollectionSite.coiActionTriggerButton, 0);
    }
    inputHelpers.scanAndVerifyCoi('coi', coi)
    inputHelpers.clicker('[data-testid="pass-button-mfg_materials_into_shipper"]')
    inputHelpers.inputSingleField('[data-testid="#/properties/shipping_checklist/properties/issues-input"]', inputs.comment)
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_ship_labels_to_collection_site"]','h1', manufacturing.shipLabelsToCollectionSite.shipLabelsToCollectionSite)
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 0, label: manufacturing.shipLabelsToCollectionSite.conftirmLabels });
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]', { index: 1, label: manufacturing.shipLabelsToCollectionSite.packTheShipper });
      translationHelpers.assertSingleField('[data-test-id="label-step-row-description"]', manufacturing.shipLabelsToCollectionSite.labelStepRowDescription);
      translationHelpers.assertSingleField('[data-testid="question-text-mfg_materials_into_shipper"]', manufacturing.shipLabelsToCollectionSite.materialsIntoShipper);
      translationHelpers.assertChildElement('[id="#/properties/shipping_checklist/properties/issues"]', "label", manufacturing.shipLabelsToCollectionSite.additionalComments, 0);
      translationHelpers.assertChildElement('[data-testid="pass-button-mfg_materials_into_shipper"]', "span", manufacturing.shipLabelsToCollectionSite.passButton, 0);
      translationHelpers.assertChildElement('[data-testid="fail-button-mfg_materials_into_shipper"]', "span", manufacturing.shipLabelsToCollectionSite.failButton, 0);
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.collectionSiteLabels.backNavLink);
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', "span", manufacturing.collectionSiteLabels.primaryButtonAction, 0);
    }
      actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']});
      cy.wait(3000)
  },

  labelShippingSummary: () => {
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertSingleField('[data-testid="progress-collection_labels-name"]', manufacturing.labelShippingSummary.labelShippingSummaryPhaseName);
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_label_shipping_summary"]','h1', manufacturing.labelShippingSummary.labelShippingSummaryTitle)
      translationHelpers.assertChildElement('[data-test-id="manufacturing_label_shipping_summary"]', 'h3', manufacturing.labelShippingSummary.labelShippingSummarySectionHeading0, 0);
      translationHelpers.assertChildElement('[data-test-id="manufacturing_label_shipping_summary"]', 'h3', manufacturing.labelShippingSummary.labelShippingSummarySectionHeading1, 1);
      translationHelpers.assertChildElement('[data-test-id="manufacturing_label_shipping_summary"]', 'p', manufacturing.labelShippingSummary.labelShippingSummaryLabel0, 0);
      translationHelpers.assertChildElement('[data-test-id="manufacturing_label_shipping_summary"]', 'h3', manufacturing.labelShippingSummary.labelShippingSummarySectionHeading2, 2);
      translationHelpers.assertChildElement('[data-test-id="label-verification-step-row-block"]>>', "div", manufacturing.labelShippingSummary.labelCoi, 0);
      translationHelpers.assertChildElement('[data-test-id="label-verification-step-row-block"]>>', "div", manufacturing.labelShippingSummary.confirmed, 1);
      translationHelpers.assertSingleField('[data-testid="display-only"]', manufacturing.labelShippingSummary.placed);
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.collectionSiteLabels.backNavLink);
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', "span", manufacturing.collectionSiteLabels.primaryButtonAction, 0);
      translationHelpers.assertSingleField('[name="viewDocumentPrintSummary"]', manufacturing.labelShippingSummary.printSummary);
    }
      signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
      actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']});
      cy.wait(3000)
  },

  lotNumber: (lotNumber) => {
    cy.wait(5000);
    if (Cypress.env('runWithHelpers')) {
    translationHelpers.assertPageTitles('[data-test-id="manufacturing_lot_number"]','h1', manufacturing.lotNumber.lotNumberTitle)
    translationHelpers.assertSingleField('[data-testid="section-heading-title"]', manufacturing.lotNumber.lotNumberSectionHeading);
    translationHelpers.assertSingleField('[data-testid="section-heading-description"]', manufacturing.lotNumber.lotNumberDescription);
    translationHelpers.assertSingleField('[data-test-id="enter-and-confirm-block"] >> :nth-child(1)', manufacturing.lotNumber.enterConfirmLotNumber);
    translationHelpers.assertBlockLabel('[data-test-id="enter-and-confirm-block"] >>>>', { index: 0, label: manufacturing.lotNumber.enter});
    translationHelpers.assertBlockLabel('[data-test-id="enter-and-confirm-block"] >>>>', { index: 1, label: manufacturing.lotNumber.confirm});
    translationHelpers.assertChildElement('[data-testid="recordButton-lot_number"]',"span", manufacturing.lotNumber.record);
    translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.commonLabels.back);
    translationHelpers.assertChildElement('[data-testid="primary-button-action"]', "span", manufacturing.commonLabels.Next, 0);
  }
    inputHelpers.inputEnterAndConfirm('lot_number', lotNumber)
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']});
    cy.wait(3000)
  },

  summaryDocuments: (lotNumber,scope) => {
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.coi"]',scope.headerLabels.coiLabel);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.coi-value"]',scope.coi);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.lot_number"]',manufacturing.manufacturingHeadersAndSidebar.mfgLotNumber);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.lot_number-value"]',lotNumber);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.therapy"]',scope.headerLabels.therapyLabel);
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.therapy-value"]',manufacturing.manufacturingHeadersAndSidebar.therapyValue);
      translationHelpers.assertSingleField('[data-testid="progress-collection_labels-name"]',manufacturing.manufacturingHeadersAndSidebar.collectionLabels);
      translationHelpers.assertSingleField('[data-testid="progress-lot_number-name"]',manufacturing.manufacturingHeadersAndSidebar.lotNumber);
      translationHelpers.assertSingleField('[data-testid="progress-summary_docs-name"]',manufacturing.manufacturingHeadersAndSidebar.summaryDocs);
      translationHelpers.assertSingleField('[data-testid="progress-shipment_receipt-name"]',manufacturing.manufacturingHeadersAndSidebar.shipmentReceipt);
      translationHelpers.assertSingleField('[data-testid="progress-materials_receipt-name"]',manufacturing.manufacturingHeadersAndSidebar.materialsReceipt);
      translationHelpers.assertSingleField('[data-testid="progress-manufacturing_start-name"]',manufacturing.manufacturingHeadersAndSidebar.manufacturingStart);
      translationHelpers.assertSingleField('[data-testid="progress-fp_labels-name"]',manufacturing.manufacturingHeadersAndSidebar.fpLabels);
      translationHelpers.assertSingleField('[data-testid="progress-harvest-name"]',manufacturing.manufacturingHeadersAndSidebar.harvest);
      translationHelpers.assertSingleField('[data-testid="progress-storage-name"]',manufacturing.manufacturingHeadersAndSidebar.storage);
      translationHelpers.assertSingleField('[data-testid="progress-quality_release-name"]',manufacturing.manufacturingHeadersAndSidebar.qualityRelease);
      translationHelpers.assertSingleField('[data-testid="progress-mfg_shipping-name"]',manufacturing.manufacturingHeadersAndSidebar.shipping);
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_summary_documents"]','h1', manufacturing.summaryDocuments.summaryDocumentTitle)
      translationHelpers.assertBlockLabel('[data-testid=section-heading-title]', { index:0 , label: manufacturing.summaryDocuments.collectionSession});
      translationHelpers.assertBlockLabel('[data-testid=section-heading-title]', { index:1 , label: manufacturing.summaryDocuments.cryopreservationSession});
      translationHelpers.assertBlockLabel('[data-testid="display-only"] >', { index: 0, label: manufacturing.summaryDocuments.collectionDate});
      translationHelpers.assertBlockLabel('[data-testid="display-only"] >', { index: 4, label: manufacturing.summaryDocuments.collectionDate});
      translationHelpers.assertBlockLabel('[data-testid="display-only"] > ', { index: 2, label: manufacturing.summaryDocuments.idmResult});
      translationHelpers.assertSectionChildElement('[data-testid="block-itemIdentifiers"]', 0, 'div > span', manufacturing.summaryDocuments.bag1Identifier, 0);
      translationHelpers.assertBlockLabelContains('[data-testid="block-itemIdentifiers"]>',{index:0,label:`${scope.coi}-APH-01`});
      translationHelpers.assertSectionChildElement('[data-testid="block-itemIdentifiers"]', 1, 'div > span', manufacturing.summaryDocuments.bag1Identifier, 0);
      translationHelpers.assertBlockLabelContains('[data-testid="block-itemIdentifiers"]>',{index:1,label:`${scope.coi}-PRC-01`});
      translationHelpers.assertSectionChildElement('[data-testid="block-itemIdentifiers"]', 1, 'div > span', manufacturing.summaryDocuments.bag3Identifier, 1);
      translationHelpers.assertBlockLabelContains('[data-testid="block-itemIdentifiers"]>',{index:2,label:`${scope.coi}-PRC-03`});
      translationHelpers.assertSectionChildElement('[data-test-id="specimen-status-block"]', 0, 'div> div> div> span', manufacturing.summaryDocuments.apheresisDate, 0);
      translationHelpers.assertSectionChildElement('[data-test-id="specimen-status-block"]', 0, 'div> div> span', manufacturing.summaryDocuments.totalBags, 2);
      translationHelpers.assertBlockLabel('[data-testid="total-number-of-bags"]',{index:0, label:manufacturing.summaryDocuments.bagCount});
      translationHelpers.assertSectionChildElement('[data-test-id="specimen-status-block"]', 1, 'div> div> div> span', manufacturing.summaryDocuments.cryopreservationDate, 0);
      translationHelpers.assertSectionChildElement('[data-test-id="specimen-status-block"]', 1, 'div> div> span', manufacturing.summaryDocuments.totalBags, 2);
      translationHelpers.assertBlockLabel('[data-testid="total-number-of-bags"]',{index:1, label:manufacturing.summaryDocuments.otherBagCount});
      translationHelpers.assertBlockLabel('[data-test-id="view-document-block"] >>>>', { index:0 , label: manufacturing.summaryDocuments.collectionSummary});
      translationHelpers.assertBlockLabel('[data-test-id="view-document-block"] >>>>', { index:2 , label: manufacturing.summaryDocuments.cryopreservationSummary});
      translationHelpers.assertChildElement('[data-testid="download-validpdf.pdf"]', "span",manufacturing.summaryDocuments.viewDocument);
      translationHelpers.assertChildElement('[data-test-id="view-document-block"] >>>', "div> button> span", manufacturing.summaryDocuments.viewSummary, 1)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.commonLabels.back);
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', "span", manufacturing.commonLabels.Next, 0);
      }
      actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']});
      cy.wait(3000)
  },

  shipmentReceiptChecklist: (scope) => {
    if (Cypress.env('runWithHelpers')) {
    translationHelpers.assertPageTitles('[data-test-id="manufacturing_shipment_receipt_checklist"]','h1', manufacturing.shipmentReceiptChecklist.shipmentReceiptChecklistTitle)
    translationHelpers.assertBlockLabel('[data-testid=section-heading-title]', { index:0 , label: manufacturing.shipmentReceiptChecklist.shipperScan});
    translationHelpers.assertBlockLabel('[data-testid=section-heading-title]', { index:1 , label: manufacturing.shipmentReceiptChecklist.shipperDetails});
    translationHelpers.assertBlockLabel('[data-test-id="label-step-row-description"]', { index: 0, label: manufacturing.shipmentReceiptChecklist.shipperLabel});
    translationHelpers.assertBlockLabel('[data-test-id="label-step-row-description"]', { index: 1, label: manufacturing.shipmentReceiptChecklist.shipperSeal});
    translationHelpers.assertSingleField('[data-testid="question-text-shipping_container_intact"]', manufacturing.shipmentReceiptChecklist.containerCondition);
    translationHelpers.assertSingleField('[data-testid="question-text-seal_on_shipper_intact"]', manufacturing.shipmentReceiptChecklist.sealIntact);
    translationHelpers.assertChildElement('[id="#/properties/shipping_receipt_checklist/properties/additional_comments"]', "label", manufacturing.shipmentReceiptChecklist.additionalComments, 0);
    translationHelpers.assertChildElement('[data-testid="pass-button-shipping_container_intact"]', "span", manufacturing.shipmentReceiptChecklist.yesButton, 0);
    translationHelpers.assertChildElement('[data-testid="fail-button-shipping_container_intact"]', "span", manufacturing.shipmentReceiptChecklist.noButton, 0);
    translationHelpers.assertChildElement('[data-testid="pass-button-seal_on_shipper_intact"]', "span", manufacturing.shipmentReceiptChecklist.yesButton, 0);
    translationHelpers.assertChildElement('[data-testid="fail-button-seal_on_shipper_intact"]', "span", manufacturing.shipmentReceiptChecklist.noButton, 0);
    translationHelpers.assertChildElement('[data-testid="coi-action-trigger-button"]', "span", manufacturing.shipmentReceiptChecklist.confirm, 0);
    translationHelpers.assertChildElement('[data-testid="shipper-serial-number-action-trigger-button"]', "span", manufacturing.shipmentReceiptChecklist.confirm, 0);
    translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.commonLabels.back);
    translationHelpers.assertChildElement('[data-testid="primary-button-action"]', "span", manufacturing.commonLabels.Next, 0);
    }
  
    inputHelpers.scanAndVerifyCoi('coi', `${scope.coi}`)
    inputHelpers.scanAndVerifyCoi('shipper-serial-number', inputs.enterShipperSrNumber)
    inputHelpers.clicker('[data-testid="pass-button-shipping_container_intact"]');
    inputHelpers.clicker('[data-testid="pass-button-seal_on_shipper_intact"]');
    inputHelpers.inputSingleField('[data-testid="#/properties/shipping_receipt_checklist/properties/additional_comments-input"]', inputs.comment);
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  shipmentReceiptSummary: (coi) => {
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_shipment_receipt_summary"]','h1', manufacturing.shipmentReceiptSummary.shipmentReceiptSummaryTitle)
      translationHelpers.assertBlockLabel('[data-testid=section-heading-title]', { index:0 , label: manufacturing.shipmentReceiptSummary.shipperScan});
      translationHelpers.assertBlockLabel('[data-testid=section-heading-title]', { index:1 , label: manufacturing.shipmentReceiptSummary.shipperCondition});
      translationHelpers.assertBlockLabel('[data-testid=section-heading-title]', { index:2 , label: manufacturing.shipmentReceiptSummary.review});
      translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"] >>>', { index:0 , label: manufacturing.shipmentReceiptSummary.shipperLabel});
      translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"] >>>', { index:1 , label: manufacturing.shipmentReceiptSummary.confirmed});
      translationHelpers.assertBlockLabel('[data-testid="input-value"]',{index:0,label:`${coi}`});
      translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"] >>>', { index:4, label: manufacturing.shipmentReceiptSummary.shipperSeal});
      translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"] >>>', { index:5 , label: manufacturing.shipmentReceiptSummary.confirmed});
      translationHelpers.assertBlockLabel('[data-testid="input-value"]',{index:1,label:inputs.enterShipperSrNumber});
      translationHelpers.assertSingleField('[data-testid="txt-field-layout-Is the shipping container in good intact condition?"]', manufacturing.shipmentReceiptSummary.shippingCondition);
      translationHelpers.assertSingleField('[data-testid="txt-field-layout-Is the seal on the shipper intact?"]', manufacturing.shipmentReceiptSummary.shipperIntact);
      translationHelpers.assertBlockLabel('[data-testid="display-only"]', { index: 0, label: manufacturing.shipmentReceiptSummary.yes});
      translationHelpers.assertBlockLabel('[data-testid="display-only"]', { index: 1, label: manufacturing.shipmentReceiptSummary.yes});
      translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"] >>>>', { index: 4, label: manufacturing.shipmentReceiptSummary.additionalComments});
      translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"] >>>>', { index: 5, label: manufacturing.shipmentReceiptSummary.comment});
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.commonLabels.back);
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', "span", manufacturing.commonLabels.Next, 0);
      }
    signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
    signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], 'steph3@vineti.com');
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  productReceipt: coi => {
    cy.wait(3000);
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_product_receipt"]','h1', manufacturing.product_reciept.productReceiptTitle)
      translationHelpers.assertChildElement('[data-test-id="multiple-scan-block-block"]', 'h3', manufacturing.product_reciept.productReceiptSectionHeading0, 0)
      translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 0, label: manufacturing.product_reciept.productReceiptLabel0})
      translationHelpers.assertChildElement('[data-test-id="multiple-scan-block-block"]', 'h3', manufacturing.product_reciept.productReceiptSectionHeading3, 1)
      translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 2, label: manufacturing.product_reciept.productReceiptLabel3})
      translationHelpers.assertChildElement('[data-test-id="manufacturing_product_receipt"]', 'h3', manufacturing.product_reciept.productReceiptSectionHeading1, 2)
      translationHelpers.assertSingleField('[data-testid="question-text-temp_conform_standards"]', manufacturing.product_reciept.productReceiptLabel1)
      translationHelpers.assertChildElement('[data-testid="pass-button-temp_conform_standards"]', "span", manufacturing.product_reciept.yesButton, 0);
      translationHelpers.assertChildElement('[data-testid="fail-button-temp_conform_standards"]', "span", manufacturing.product_reciept.noButton, 0);
      translationHelpers.assertSingleField('[data-testid="question-text-bag_in_good_condition"]', manufacturing.product_reciept.productReceiptLabel2)
      translationHelpers.assertChildElement('[data-testid="pass-button-bag_in_good_condition"]', "span", manufacturing.product_reciept.yesButton, 0);
      translationHelpers.assertChildElement('[data-testid="fail-button-bag_in_good_condition"]', "span", manufacturing.product_reciept.noButton, 0);
      translationHelpers.assertSingleField('[for="#/properties/product_receipt_checklist/properties/product_receipt_additional_comments-input"]', manufacturing.product_reciept.mfgShippingChecklistAdditionalComments)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.product_reciept.backLabel)
      translationHelpers.assertSingleField('[data-testid="primary-button-action"]', manufacturing.product_reciept.next)
      }
    
    cy.get('[data-testid="primary-button-action"]').should("be.disabled");
    inputHelpers.scanAndVerifyBags('bag-1-identifier-1',`${coi}-PRC-01`)
    inputHelpers.scanAndVerifyBags('bag-1-identifier-3',`${coi}-PRC-03`)
    inputHelpers.clicker('[data-testid="pass-button-temp_conform_standards"]');
    inputHelpers.clicker('[data-testid="pass-button-bag_in_good_condition"]');
    inputHelpers.inputSingleField('[data-testid="#/properties/product_receipt_checklist/properties/product_receipt_additional_comments-input"]', inputs.comment);
    cy.get('[data-testid="primary-button-action"]').should("be.enabled");
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  transferToStorage: (coi) => {
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_transfer_to_storage"]','h1', manufacturing.transfer_to_Storage.transferToStorage)
      translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', manufacturing.transfer_to_Storage.shipperScan, 0)
      translationHelpers.assertSingleField('[data-test-id="label-step-row-description"]', manufacturing.transfer_to_Storage.shipperLabel)
      translationHelpers.assertChildElement('[data-test-id="multiple-scan-block-block"]', 'h3', manufacturing.transfer_to_Storage.storageHeading1, 0)
      translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 0, label: manufacturing.transfer_to_Storage.storageLabel1})
      translationHelpers.assertChildElement('[data-test-id="multiple-scan-block-block"]', 'h3', manufacturing.transfer_to_Storage.storageHeading3, 1)
      translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 2, label: manufacturing.transfer_to_Storage.storageLabel3})
      translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', manufacturing.transfer_to_Storage.checkStorage, 1)
      translationHelpers.assertBlockLabel('[data-test-id="enter-and-confirm-block"]>>', {index:0, label: manufacturing.transfer_to_Storage.storageConfirm})
      translationHelpers.assertChildElement('[data-test-id="enter-and-confirm-block"]', 'label', manufacturing.transfer_to_Storage.enterConfirm, 0)
      translationHelpers.assertChildElement('[data-test-id="enter-and-confirm-block"]', 'label', manufacturing.transfer_to_Storage.confirm, 1)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.transfer_to_Storage.backLabel)
      translationHelpers.assertSingleField('[data-testid="primary-button-action"]', manufacturing.transfer_to_Storage.next)
      }
  
    cy.wait(2000);
    inputHelpers.scanAndVerifyCoi('coi', `${coi}`)
    cy.wait(2000);
    cy.get('[data-testid="coi-check-mark"]').should("be.visible");
    inputHelpers.scanAndVerifyBags('bag-1-identifier-1',`${coi}-PRC-01`)
    cy.wait(2000);
    cy.get('[data-testid="coi-check-mark"]').should("be.visible");
    inputHelpers.scanAndVerifyBags('bag-1-identifier-3',`${coi}-PRC-03`)
    cy.wait(2000);
    cy.get('[data-testid="coi-check-mark"]').should("be.visible");
    inputHelpers.inputEnterAndConfirm('ln2_storage_id',inputs.ln2Id)
    cy.wait(1000);
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
    
  },

  productReceiptSummary: (coi) => {
    if (Cypress.env('runWithHelpers')) {
    translationHelpers.assertPageTitles('[data-test-id="manufacturing_product_receipt_summary"]','h1', manufacturing.product_receipt_summary.productReceiptSummary)
    translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', manufacturing.product_receipt_summary.productScanSummary, 0)
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 0, label: manufacturing.product_receipt_summary.bag1ScanSummary})
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 1, label: manufacturing.product_receipt_summary.imageConfirmed})
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 2, label: `${coi}-PRC-01`})
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 4, label: manufacturing.product_receipt_summary.bag3ScanSummary})
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 5, label: manufacturing.product_receipt_summary.imageConfirmed})
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 6, label: `${coi}-PRC-03`})
    translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', manufacturing.product_receipt_summary.conditionDetail, 1)
    translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"]>>>>',{index: 0, label: manufacturing.product_receipt_summary.productSummaryLabel1})
    translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"]>>>>',{index: 2, label: manufacturing.product_receipt_summary.productSummaryLabel2})
    translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"]>>>>',{index: 4, label: manufacturing.product_receipt_summary.commentAdditional})
    translationHelpers.assertBlockLabel('[data-test-id="shipping-checklist-summary-block-block"]>>>>',{index: 5, label: manufacturing.product_receipt_summary.comment})
    translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', manufacturing.product_receipt_summary.scanShipper1, 2)
    translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>',{index: 0, label: manufacturing.product_receipt_summary.scanShipper})
    translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>',{index: 1, label: manufacturing.product_receipt_summary.imageConfirmed})
    translationHelpers.assertBlockLabel('[data-test-id="label-verification-step-row-block"]>>>',{index: 2, label: inputs.enterShipperSrNumber})
    translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', manufacturing.product_receipt_summary.scanProductSummary, 3)
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 8, label: manufacturing.product_receipt_summary.storeBag1})
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 9, label: manufacturing.product_receipt_summary.imageConfirmed})
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 10, label: `${coi}-PRC-01`})
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 12, label: manufacturing.product_receipt_summary.storeBag3})
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 13, label: manufacturing.product_receipt_summary.imageConfirmed})
    translationHelpers.assertBlockLabel('[data-test-id="multiple-scan-block-block"]>>>>',{index: 14, label: `${coi}-PRC-03`})
    translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', manufacturing.product_receipt_summary.checkStorageSummary, 4)
    translationHelpers.assertBlockLabel('[data-test-id="label-values-block"]>>>>',{index: 0, label: manufacturing.product_receipt_summary.equipmentStorage})
    translationHelpers.assertChildElement('[data-test-id="label-values-block"]', 'span', inputs.ln2Id, 0)
    translationHelpers.assertChildElement('[data-test-id="section-heading-block-block"]', 'h3', manufacturing.product_receipt_summary.review, 5)
    translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 1, label: manufacturing.product_receipt_summary.yourSignature})
    translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 2, label: manufacturing.product_receipt_summary.enterToConfirm})
    translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 3, label: manufacturing.product_receipt_summary.confirmer})
    translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 4, label: manufacturing.product_receipt_summary.approverPrompt})
    translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 5, label: manufacturing.product_receipt_summary.verifierSignature})
    translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 6, label: manufacturing.product_receipt_summary.enterToConfirm})
    translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 7, label: manufacturing.product_receipt_summary.verifier})
    translationHelpers.assertBlockLabel('[data-test-id="signature-block-block"]>>>>>',{index: 8, label: manufacturing.product_receipt_summary.verifierPrompt})
    translationHelpers.assertChildElement('[data-test-id="view-document-block"]', 'span', manufacturing.product_receipt_summary.printSummary, 0)
    translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.product_receipt_summary.backLabel)
    translationHelpers.assertSingleField('[data-testid="primary-button-action"]', manufacturing.product_receipt_summary.next)
    }
    signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
    signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], 'steph3@vineti.com');
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  bagSelection: () => {
    cy.wait(3000);
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_bag_selection"]','h1', manufacturing.bag_selection.bagSelection)
      translationHelpers.assertSingleField('[data-testid="section-heading-title"]', manufacturing.bag_selection.mfgStartSectionHeading)
      translationHelpers.assertSingleField('[data-testid="section-heading-description"]', manufacturing.bag_selection.mfgStartDescription)
      translationHelpers.assertBlockLabel('[data-testid="text-and-toggle-0"] >>>',{index: 0, label:manufacturing.bag_selection.bag1})
      translationHelpers.assertChildElement('[data-testid="pass-button-0"]', 'span', manufacturing.bag_selection.select)
      translationHelpers.assertChildElement('[data-testid="fail-button-0"]', 'span', manufacturing.bag_selection.doNotSelect)
      translationHelpers.assertBlockLabel('[data-testid="text-and-toggle-1"] >>>',{index: 0, label:manufacturing.bag_selection.bag3})
      translationHelpers.assertChildElement('[data-testid="pass-button-1"]', 'span', manufacturing.bag_selection.select)
      translationHelpers.assertChildElement('[data-testid="fail-button-1"]', 'span', manufacturing.bag_selection.doNotSelect)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.bag_selection.backLabel)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', manufacturing.bag_selection.next)
    }
    cy.wait(4000)
    inputHelpers.clicker('[data-testid="pass-button-0"]');
    inputHelpers.clicker('[data-testid="fail-button-1"]');
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  startManufacturing: (coi) => {
    cy.wait(5000);
    if (Cypress.env("runWithHelpers")) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_start_manufacturing"]','h1', manufacturing.start_manufacturing.startManufacturingTitle)
      translationHelpers.assertSingleField('[data-testid="section-heading-title"]', manufacturing.start_manufacturing.startManufacturingSectionHeader)
      translationHelpers.assertSingleField('[data-testid="section-heading-description"]', manufacturing.start_manufacturing.describe_coi)
      translationHelpers.assertSingleField('[data-test-id="label-step-row-description"]', manufacturing.start_manufacturing.scanEnterCoiNumber)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.start_manufacturing.backLabel)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', manufacturing.start_manufacturing.next)
    }
  
    inputHelpers.scanAndVerifyCoi('coi', `${coi}`)
    cy.wait(2000);
    cy.get('[data-testid="coi-check-mark"]').should("be.visible");
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  finishedProductLabels: () => {
    cy.wait(5000);
    if (Cypress.env("runWithHelpers")) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_finished_product_labels"]','h1', manufacturing.finished_product_label.finishedProductLabelsTitle)
      translationHelpers.assertSingleField('[data-testid="section-heading-title"]', manufacturing.finished_product_label.finishedProductLabelsSectionHeader)
      translationHelpers.assertSingleField('[data-testid="txt-field-layout-How many bags resulted from today\'s manufacturing process?"]', manufacturing.finished_product_label.finishedProductLabelsBagResult)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.fp_label.backLabel)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', manufacturing.fp_label.next)
    }
    inputHelpers.inputSingleField('[id="#/properties/item_count-input"]', inputs.finishedProductLabelsTitlebagResult);
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

  fpLabel: () => {
    cy.wait(2000);
    if (Cypress.env("runWithHelpers")) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_fp_label"]','h1', manufacturing.fp_label.fpLabel)
      translationHelpers.assertBlockLabel('[data-test-id="view-document-block"] >>>',{index: 0, label:manufacturing.fp_label.view_summary})
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]',{ index: 0, label: manufacturing.fp_label.printLabelSectionHeader })
      translationHelpers.assertBlockLabel('[data-testid="section-heading-description"]',{ index: 0, label: manufacturing.fp_label.print_label_desc })
      translationHelpers.assertChildElement('[data-testid="print-block-container"]', 'p', manufacturing.fp_label.print_label)
      translationHelpers.assertSingleField('[data-testid="print-counter-block"]', manufacturing.fp_label.configured_to_print);
      translationHelpers.assertBlockLabel('[data-testid="section-heading-title"]',{ index: 2, label: manufacturing.fp_label.signatureSectionHeading })
      translationHelpers.assertBlockLabel('[data-testid="section-heading-description"]',{ index: 1, label: manufacturing.fp_label.signature_description })
      translationHelpers.assertSingleField('[data-testid="approver-role-title"]', manufacturing.fp_label.yourSignature);
      translationHelpers.assertSingleField('[data-testid="approver-sign-button"]', manufacturing.fp_label.signConfirm);
      translationHelpers.assertSingleField('[data-testid="approver-role-text"]', manufacturing.fp_label.confirmerRole);
      translationHelpers.assertSingleField('[data-testid="approver-prompt"]', manufacturing.fp_label.approverPrompt);
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.fp_label.backLabel)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', manufacturing.fp_label.next)
    }
    
    inputHelpers.clicker('[data-testid="btn-print"]');
    cy.wait(1000);
    signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
    cy.wait(3000)
  },

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

  shippingBagSelection: () => {
    cy.wait(3000);
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="manufacturing_shipping_bag_selection"]','h1', manufacturing.shipping_bag_selection.mfgShippingStartTitle)
      translationHelpers.assertSingleField('[data-testid="section-heading-title"]', manufacturing.shipping_bag_selection.mfgShippingStartSectionHeading)
      translationHelpers.assertSingleField('[data-testid="section-heading-description"]', manufacturing.shipping_bag_selection.mfgShippingStartDescription)
      translationHelpers.assertBlockLabel('[data-testid="text-and-toggle-0"] >>>',{index: 0, label:manufacturing.shipping_bag_selection.bag1})
      translationHelpers.assertChildElement('[data-testid="pass-button-0"]', 'span', manufacturing.shipping_bag_selection.select)
      translationHelpers.assertChildElement('[data-testid="fail-button-0"]', 'span', manufacturing.shipping_bag_selection.doNotSelect)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', manufacturing.shipping_bag_selection.backLabel)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', manufacturing.shipping_bag_selection.next)
    }
    inputHelpers.clicker('[data-testid="pass-button-0"]');
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']});
    cy.wait(3000);
  },

  getManufacturingAirWayBillAndCompleteShipping: (scope) => {
    common.loginAs("oliver");
    cy.visit("/ordering");
    cy.get('td[data-testid="patient-identifier"]')
      .contains(scope.patientInformation.subjectId)
      .click();
    cy.get('[data-testid="td-stage-plane-icon"]')
      .eq(1)
      .parent()
      .parent()
      .parent()
      .find('[data-testid="td-stage-site-details"]')
      .invoke("text")
      .then((text) => {
        scope.manufacturingAirWayBill = text.substring(9, text.length);
        cy.log("manufacturingAirWayBill", scope.manufacturingAirWayBill);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.get(".manufacturing-row_coi")
          .contains("div", scope.coi)
          .click();

        shippingChecklist(scope);
        shippingSummary(scope);
      });
  },
};
