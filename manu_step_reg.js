import input from '../fixtures/inputs.json';
import sharedConstants from "../fixtures/assertions.json";
import regressionInput from '../fixtures/inputsRegression.json';
import inputCheckHelpers from './shared_block_helpers/inputFieldCheckHelpers';
import inputChecker from '../utils/shared_block_helpers/inputFieldCheckHelpers';
import actionButtonsHelper from './shared_block_helpers/actionButtonHelpers';
import inputHelpers from './shared_block_helpers/inputFieldHelpers';
import orderingSteps from '../utils/ordering_steps';
import signatureHelpers from './shared_block_helpers/signatureHelpers';
import m_steps from "../utils/manufacturing_steps.js";
import common from '../support/index.js';

export default {
    manufacturingAliases: () => {
        cy.server();
        cy.route("DELETE", "/auth/sign_out").as("logout");
        cy.route("GET", "/physicians*").as("getStepPhysicians");
        cy.route("POST", "/signatures").as("postSignature");
        cy.route("POST", "/graphql").as("patients");
        cy.route("GET", "/therapies").as("products");
        cy.route("POST", "/procedures").as("postProcedures");
        cy.route("PATCH", "/procedure_steps/*").as("patchProcedureSteps");
        cy.route("GET", "/procedures/*").as("getProcedures");
        cy.route("GET", "/scheduling/schedules/*").as("schedulingServiceSchedule");
        cy.route("POST", "/scheduling/schedules").as("schedulingServiceCreate");
        cy.route(
            "POST",
            new RegExp("/scheduling/schedules/US:waterhood:clinical-auto:1931/draft")
        ).as("schedulingServiceDraft");
        cy.route(
            "POST",
            new RegExp(
                "/scheduling/schedules/US:waterhood:clinical-auto:1931/availability"
            )
        ).as("schedulingServiceAvailability");
        cy.route("GET", "/procedures?procedure_type=ordering").as(
            "getProcedureTypeOrdering"
        );
        cy.route("POST", "/print").as("postPrint");
        cy.route("POST", "/label_scans/verifications").as("labelVerifications");
        cy.route("POST", "/label_scans/values").as("createLabelScanValue");
        cy.route("GET", "v1/institution_types").as("getInstitutions");
    },

    labelShippingSummary:{
        happyPath: (scope) => {
            cy.log('Label Shipping Summary');
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi")
            .contains("div", scope.coi)
            .click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
        }
    },

    lotNumber:{
        happyPath: (scope) => {
            cy.log('Lot Number');
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi")
            .contains("div", scope.coi)
            .click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
        },
    
        // C24504
        recordButtonNegative: () => {
            cy.log('[NEG] Verify the "Record" Button.');
            inputChecker.enterAndConfirmNegativeCheck('lot_number',123,456,'not.be.disabled','be.disabled');
        }
    },

    SummaryDocuments: {
        happyPath: (scope) => {
            cy.log('Summary Documents');
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi")
            .contains("div", scope.coi)
            .click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber,scope);
        },

        // C24508
        viewSummaryforCollectionSummary: () => {
            cy.log('[NEG] Verify the "View Summary" button  against Collection Summary.');

            inputChecker.checkStateWithIndex('[data-test-id="view-document-block"]',0,'button',0,'not.be.disabled');
        },

        // C24510
        viewButtonforSummaryAndPdf: () => {
            cy.log('[POS] Verify the "View Summary" against Cryopreservation Summary & "View Document" button  against Valid PDF.');

            inputChecker.checkStateWithIndex('[data-test-id="view-document-block"]',1,'button',0,'not.be.disabled');
            inputChecker.checkState('[data-testid="download-validpdf.pdf"]','not.be.disabled');
        }
    },

    shipmentReceiptChecklist:{
        happyPath: (scope) => {
            cy.log('Shipment Receipt Checklist');
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi")
            .contains("div", scope.coi)
            .click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber,scope);
            m_steps.shipmentReceiptChecklist(scope);
        },

        // C24514
        confirmButtonShipperLabel: () => {
            cy.log('[NEG] Verify the "Confirm" button for shipper label.');
            inputChecker.checkState('[data-testid="coi-action-trigger-button"]','be.disabled');
            inputChecker.identifierCoiLabelCheck('coi','abcd','be.disabled');
            inputChecker.identifierCoiLabelCheck('coi','bnsk723','be.disabled');
            inputChecker.identifierCoiLabelCheck('coi','WTH.VFOZBH.F62.','be.disabled');
        },

        // C24513
        confirmButtonShippersSeal: (coi) => {
            cy.log("[NEG] Verify the 'Confirm' button for shipper's seal.");
            inputChecker.inputSingleFieldCheck('[data-testid="coi-input-field"]',coi,'be.disabled');
            inputHelpers.clicker('[data-testid="coi-action-trigger-button"]');
            inputChecker.identifierCoiLabelCheck('shipper-serial-number',3421231,'be.disabled');
            inputChecker.identifierCoiLabelCheck('shipper-serial-number','sjancd','be.disabled');
        },

        // C24519
        noToggleSelected: () => {
            cy.log('[NEG] Verify the "Next" button when none of the toggle is selected.');
            inputChecker.inputSingleFieldCheck('[data-testid="shipper-serial-number-input-field"]',input.enterShipperSrNumber,'be.disabled');
            inputHelpers.clicker('[data-testid="shipper-serial-number-action-trigger-button"]');
            inputChecker.nextButtonCheck('be.disabled');
        },

        // C24518
        nextButtonWithoutComments: () => {
            cy.log('[NEG] Verify the "Next" button when "NO" is selected without additional comments in one of the toggle.');
            inputChecker.clickOnCheck('[data-testid="pass-button-seal_on_shipper_intact"]','be.disabled');
            inputChecker.clickOnCheck('[data-testid="fail-button-shipping_container_intact"]','be.disabled');
            inputChecker.inputClearCheck('[data-testid="#/properties/shipping_receipt_checklist/properties/shipping_container_intact_reason-input"]','be.disabled');
        },

        // C24517
        nextButtonWithComments: () => {
            cy.log('[POS] Verify the "Next" button when "NO" is selected with some additional comments in one of the toggle.');
            inputChecker.inputSingleFieldCheck('[data-testid="#/properties/shipping_receipt_checklist/properties/shipping_container_intact_reason-input"]','Reason one','not.be.disabled');
        },

        // C24521
        nextButtonNoComments: () => {
            cy.log('[NEG] Verify the "Next" button when NO is selected in both the toggles without additional comments.');
            inputChecker.clickOnCheck('[data-testid="fail-button-seal_on_shipper_intact"]','be.disabled');
            inputChecker.inputClearCheck('[data-testid="#/properties/shipping_receipt_checklist/properties/shipping_container_intact_reason-input"]','be.disabled');
            inputChecker.inputClearCheck('[data-testid="#/properties/shipping_receipt_checklist/properties/seal_on_shipper_intact_reason-input"]','be.disabled');
        },

        // C24511
        nextButtonNoToggles: () => {
            cy.log('[POS] Verify the "Next" button when NO is selected in both the toggles with some additional comments.');
            inputChecker.inputSingleFieldCheck('[data-testid="#/properties/shipping_receipt_checklist/properties/shipping_container_intact_reason-input"]','Reason one','be.disabled');
            inputChecker.inputSingleFieldCheck('[data-testid="#/properties/shipping_receipt_checklist/properties/seal_on_shipper_intact_reason-input"]','Reason two','not.be.disabled');
        },
    },

    shipmentReceiptSummary: {
        happyPath: (scope) => {
            cy.log('Shipment Receipt Summary')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi")
            .contains("div", scope.coi)
            .click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber,scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
        },

        // C24525
        stepNotSigned: () => {
            cy.log('[NEG] Verify the "Next" Button is disabled when the step is not signed.');
            inputChecker.checkState('[data-testid="approver-sign-button"]','not.be.disabled');
            inputChecker.checkState('[data-testid="verifier-sign-button"]','be.disabled');
            inputChecker.nextButtonCheck('be.disabled');
        },

        // C24526
        signatureNotConfirmed: () => {
            cy.log('[NEG] Verify the "Print Summary" Button is disabled when "Your Signature" and "Verifier Signature" is not confirmed.');
            inputChecker.checkState('[data-testid="approver-sign-button"]','not.be.disabled');
            inputChecker.checkState('[data-testid="verifier-sign-button"]','be.disabled');
            inputChecker.checkState("[data-test-id='view-document-block'] >>>", 'be.disabled');
        },

        // C24530
        signatureConfirmed: () => {
            cy.log('[POS] Verify the "Print Summary" Button is enabled when "Your Signature" and "Verifier Signature" is confirmed.');
            signatureHelpers.clickSignDocumentButton('approver',['@postSignature']);
            signatureHelpers.clickSignDocumentButton('verifier',['@postSignature'],"steph3@vineti.com");
            inputChecker.checkState("[data-test-id='view-document-block'] >>>", 'not.be.disabled');
        }
    },

    productReceipt: {
        happyPath: (scope) => {
            cy.log('Product Receipt')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
        },

        bag1CoiNegative: (scope) => {
            cy.log('Product Receipt')
            inputHelpers.scanAndVerifyBags('bag-1-identifier-3', `${scope.coi}-PRC-03`)
            inputHelpers.clicker('[data-testid="pass-button-temp_conform_standards"]');
            inputHelpers.clicker('[data-testid="pass-button-bag_in_good_condition"]');
            inputHelpers.inputSingleField('[data-testid="#/properties/product_receipt_checklist/properties/product_receipt_additional_comments-input"]', input.comment);
            inputCheckHelpers.nextButtonCheck('be.disabled')
            inputCheckHelpers.bagIdentifierClearCoi('bag-1-identifier-1', 'abcd', 'be.disabled');
            inputCheckHelpers.bagIdentifierClearCoi('bag-1-identifier-1', '1234', 'be.disabled');
            inputCheckHelpers.bagIdentifierClearCoi('bag-1-identifier-1', `${scope.coi}-PRC-03`, 'be.disabled');
            inputCheckHelpers.bagIdentifierClearCoi('bag-1-identifier-1', `${scope.coi}-PRC-03-APH-01`, 'be.disabled');
        },

        tempNoClick: (scope) => {
            cy.log('Product Receipt')
            inputHelpers.scanAndVerifyBags('bag-1-identifier-1', `${scope.coi}-PRC-01`)
            inputCheckHelpers.clickOnCheck('[data-testid="pass-button-temp_conform_standards"]', 'be.disabled');
        },

        bagConditionNoClick: () => {
            cy.log('Product Receipt')
            inputCheckHelpers.clickOnCheck('[data-testid="pass-button-bag_in_good_condition"]', 'be.disabled');
        },

        tempNoComment: () => {
            cy.log('Product Receipt')
            inputCheckHelpers.clickOnCheck('[data-testid="fail-button-temp_conform_standards"]', 'be.disabled');
        },

        bagConditionNoComment: () => {
            cy.log('Product Receipt')
            inputHelpers.clicker('[data-testid="pass-button-temp_conform_standards"]');
            inputCheckHelpers.clickOnCheck('[data-testid="fail-button-bag_in_good_condition"]', 'be.disabled');
        },

        tempWithComment: () => {
            cy.log('Product Receipt')
            inputHelpers.clicker('[data-testid="pass-button-bag_in_good_condition"]');
            inputHelpers.clicker('[data-testid="fail-button-temp_conform_standards"]');
            inputCheckHelpers.inputSingleFieldCheck('[data-testid="#/properties/product_receipt_checklist/properties/temp_conform_standards_reason-input"]', "Additional Comments", "be.enabled")
        },

        bagConditionWithComment: () => {
            cy.log('Product Receipt')
            inputHelpers.clicker('[data-testid="pass-button-temp_conform_standards"]');
            inputHelpers.clicker('[data-testid="fail-button-bag_in_good_condition"]');
            inputCheckHelpers.inputSingleFieldCheck('[data-testid="#/properties/product_receipt_checklist/properties/bag_in_good_condition_reason-input"]', "Additional Comments", "be.enabled")
        }
    },

    transferToStorage: {
        happyPath: (scope) => {
            cy.log('Transfer to storage')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
        },

        bag1CoiNeg: (scope) => {
            cy.log('Transfer to storage')
            inputHelpers.scanAndVerifyCoi('coi', `${scope.coi}`)
            inputHelpers.scanAndVerifyBags('bag-1-identifier-3', `${scope.coi}-PRC-03`)
            inputHelpers.inputEnterAndConfirm('ln2_storage_id', input.ln2Id)
            inputCheckHelpers.nextButtonCheck('be.disabled')
            inputCheckHelpers.bagIdentifierClearCoi('bag-1-identifier-1', 'abcd', 'be.disabled');
            inputCheckHelpers.bagIdentifierClearCoi('bag-1-identifier-1', '1234', 'be.disabled');
            inputCheckHelpers.bagIdentifierClearCoi('bag-1-identifier-1', `${scope.coi}-PRC-03`, 'be.disabled');
            inputCheckHelpers.bagIdentifierClearCoi('bag-1-identifier-1', `${scope.coi}-PRC-03-APH-01`, 'be.disabled');
        }
    },

    productReceiptSummary: {
        happyPath: (scope) => {
            cy.log('Product Receipt Summary')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
        },

        noSignatureCheck: () => {
            cy.log('Product Receipt Summary')
            inputCheckHelpers.nextButtonCheck('be.disabled')
        },

        noSignaturePrintSummary: () => {
            cy.log('Product Receipt Summary')
            inputCheckHelpers.checkState('[name="viewDocumentPrintSummary"]', 'be.disabled')
        },

        signaturePrintSummaryPos: () => {
            cy.log('Product Receipt Summary')
            signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
            signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], 'steph3@vineti.com');
            inputCheckHelpers.checkState('[name="viewDocumentPrintSummary"]', 'be.enabled')
        }
    },

    bagSelection: {
        happyPath: (scope) => {
            cy.log('Bag Selection')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
        },

        // C24288
        noSelectionNegative: () => {
            inputCheckHelpers.nextButtonCheck('be.disabled');
        },

        // C24289
        onlyBag1SelectionNegative: () => {
            inputHelpers.clicker('[data-testid="pass-button-0"]');
            inputCheckHelpers.nextButtonCheck('be.disabled');
        },

        // C24290
        onlyBag2SelectionNegative: () => {
            cy.reload();
            inputHelpers.clicker('[data-testid="fail-button-1"]');
            inputCheckHelpers.nextButtonCheck('be.disabled');
        },

        // C24292
        reasonforChangePositive: () => {
            cy.reload();
            inputHelpers.clicker('[data-testid="pass-button-0"]');
            inputHelpers.clicker('[data-testid="fail-button-1"]');
            actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
              apiAliases: ['@patchProcedureSteps', '@getProcedures']
            });
            cy.wait(2000);
            inputHelpers.clicker('[data-testid="back-nav-link"]');
            cy.wait(['@getProcedures']);
            inputHelpers.clicker('[data-testid="pass-button-1"]');
            inputHelpers.clicker('[data-testid="primary-button-action"]');
            cy.get('[data-testid="reason-for-change-textarea"]').clear().type('Reason');
            inputHelpers.clicker('[data-testid="reason-for-change-save"]');
            cy.wait(['@patchProcedureSteps', '@getProcedures']);
          }
    },

    startManufacturing: {
        happyPath: (scope) => {
            cy.log('Start Manufacturing')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
        },

        // C24293
        invalidCoiNegative: (coi) =>{
            inputChecker.confirmCoiLabelBlock('coi','abdefgsf','be.disabled');
            inputChecker.confirmCoiLabelBlock('coi','12345','be.disabled');
            inputChecker.confirmCoiLabelBlock('coi',`${coi}${"-FP-01"}`,'be.disabled');
            inputChecker.confirmCoiLabelBlock('coi',`${coi}${"-PRC-FP-01"}`,'be.disabled');
        },
    },

    finishedProductLabel: {
        happyPath: (scope) => {
            cy.log('Finished Product Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
        },

        invalidInputNegative: () => {
            inputCheckHelpers.inputSingleFieldCheck('[id="#/properties/item_count-input"]', 0, 'be.disabled');
            inputCheckHelpers.inputInvalidData('[id="#/properties/item_count-input"]', "@#$%")
            inputCheckHelpers.inputInvalidData('[id="#/properties/item_count-input"]', "asas")
        }
    },

    fpLabel: {
        happyPath: (scope) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
        },

        // C24295
        noSignatureNegative: () => {
            inputCheckHelpers.nextButtonCheck('be.disabled');
        },

    },

    harvest: {
        happyPath: (scope, coi) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
            m_steps.harvest(coi);
        },

        // C24397 	[NEG] Verify "Scan Bag 1" Confirm button when no/invalid data is filled 
        negativeConfirmShip: (coi) => {
            cy.log('Verify "Scan Bag 1" Confirm button when no/invalid data is filled ');
            inputChecker.checkState(`[data-testid="bag-identifier-1-button"]`, 'be.disabled');
            let bagNumber = 1
            let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
                inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
                inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-FP-0${bagNumber}`, 'be.disabled');
                cy.wait(1000); // yahan pe confirm button ka data test id replace karo
        },

        // C24453 [NEG] Verify "Next" button when label is not applied 
        negativeNextLabel: (coi) => {
            cy.log('[NEG] Verify the "Next" Button when label is not applied');
            inputChecker.clearField('[data-testid="bag-identifier-1-input"]'); // yahan upar wale test id daal ke coi aph-01 check karke value bharo phir ho jaega
            inputChecker.inputCoiWithPlaceholder('[data-testid="bag-identifier-1-input"]',`${coi}`,'FP-01');
            inputHelpers.clicker('[data-testid="bag-identifier-1-button"]');
            inputChecker.nextButtonCheck('be.disabled');
        }

    },

    transferToCrf: {
        happyPath: (scope, coi) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
            m_steps.harvest(coi);
            m_steps.transferToCrf(coi);
        },

        //C24821	[NEG] Verify the "Scan bag 1" confirm button when invalid/no data is entered 
        noScanBagConfirm: (coi) => {
            cy.log('Verify "Scan Bag 1" Confirm button when no/invalid data is filled ');
            inputChecker.checkState(`[data-testid="bag-identifier-1-button"]`, 'be.disabled');
            let bagNumber = 1
            let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
                inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
                inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-FP-0${bagNumber}`, 'be.disabled');
                cy.wait(1000); // yahan pe confirm button ka data test id replace karo
         // yahan pe confirm button ka data test id replace karo
        },

        //C24823	[NEG] Verify the "Next" Button when only scan bag 1 values are filled 
        singleValueScanBag: (coi) => {
            cy.log('[NEG] Verify the "Next" Button when Signature is not confirmed.');
            inputChecker.clearField('[data-testid="bag-identifier-1-input"]'); // yahan upar wale test id daal ke coi aph-01 check karke value bharo phir ho jaega
            inputChecker.inputCoiWithPlaceholder('[data-testid="bag-identifier-1-input"]',coi,'FP-01');
            inputHelpers.clicker('[data-testid="bag-identifier-1-button"]');
            inputChecker.nextButtonCheck('be.disabled');
        
        },

         // C24825	[NEG] Verify the "Check into CRF" record button when invalid/no data is filled 
         noCheckCrf: () => {
            cy.log('[[NEG] Verify the "Check into CRF" record Button when no data is filled.');
            inputChecker.checkState(`[data-testid="recordButton-crf_freezer_id"]`, 'be.disabled'); // yahan check intto crf ki test id daalo
            inputChecker.enterConfirmCheckNegative('crf_freezer_id', '123', '321', 'be.disabled');
        }

    },

    CrfToStorage: {
        happyPath: (scope, coi) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
            m_steps.harvest(coi);
            m_steps.transferToCrf(coi);
            m_steps.crfToStorage(coi);
        },

        //C24432	[NEG] Verify the "Check out of CRF" Confirm Button when invalid/empty data is entered 
        negativeCheckOutCrf: () => {
            inputChecker.checkState(`[data-testid="crf-freezer-id-action-trigger-button"]`, 'be.disabled'); // yahan pe confirm button ka data test id replace karo
        
        },

        //C24436	[NEG] Verify the "Scan Bag" Button when no/incorrect data is filled.  
        negativeScanButton: () => {
            inputChecker.checkState(`[data-testid="bag-identifier-1-button"]`, 'be.disabled');
            let bagNumber = 1
            let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
                inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
                inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-FP-0${bagNumber}`, 'be.disabled');
                cy.wait(1000); // yahan pe confirm button ka data test id replace karo
          // yahan pe confirm button ka data test id replace karo
        
        },

         //C24447	[NEG] Verify "" Check into LN2 storage" block when no/invalid data is filled
         noLn2Storage: () => {
            cy.log('[[NEG] Verify the "Check into CRF" record Button when no data is filled.');
            inputChecker.checkState(`[data-testid="recordButton-product_ln2_storage_unit"]`, 'be.disabled'); // yahan check intto crf ki test id daalo
            inputChecker.enterConfirmCheckNegative('product_ln2_storage_unit', '123', '321', 'be.disabled');
        
        },

         // C24440	[NEG] Verify the "Record Button when no data is filled 
        // negativeRecord: () => {
        //     cy.log('[[NEG] Verify the "Check into CRF" record Button when no data is filled.');
        //     inputChecker.checkState(`[data-testid="recordButton-shipper_serial_number"]`, 'be.disabled'); // yahan check intto crf ki test id daalo
        //     inputChecker.enterConfirmCheckNegative('shipper_serial_number', '123', '321', 'be.disabled');
        
        // },

         //C24441	[NEG] Verify the "Next" Button when only Scan values are filled 
        noScanNegative: () => {
            cy.log('Verify the "Next" Button when only COI Values not added.');// 
            inputHelpers.inputSingleField('[data-testid="crf-freezer-id-input-field"]', input.enterMfgCrfFreezerId);// idhar scan crf aur ln2 storage ki value daalo
            inputHelpers.clicker('[data-testid="crf-freezer-id-action-trigger-button"]');

            inputChecker.checkState(`[data-testid="recordButton-product_ln2_storage_unit"]`, 'be.disabled'); // yahan check intto crf ki test id daalo
            inputChecker.enterConfirmCheckNegative('product_ln2_storage_unit', '121', '121', 'be.enabled');
            inputHelpers.clicker('[data-testid="recordButton-product_ln2_storage_unit"]');
            inputChecker.nextButtonCheck('be.disabled');
            cy.wait(1000);
          
        }

    },

    quality: {
        happyPath: (scope) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
            m_steps.harvest(coi);
            m_steps.transferToCrf(coi);
            m_steps.crfToStorage(coi);
            m_steps.qualityDocuments();
        },

        //C24449	[NEG] Verify the "Upload Document" input field with no data file 
        negativeConfirmShip: () => {
            cy.log('Quality Documents')
            inputCheckHelpers.nextButtonCheck('be.disabled')
      
        },

        // //C24451	[NEG] Verify the "Next" Button when the step is not signed  
        // noSignNext: () => {
        //     inputCheckHelpers.nextButtonCheck('be.disabled');
        // }
    },
    qualityReview: {
        happyPath: (scope) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
            m_steps.harvest(coi);
            m_steps.transferToCrf(coi);
            m_steps.crfToStorage(coi);
            m_steps.qualityDocuments();
            m_steps.qualityReview()
        },

        // //C24449	[NEG] Verify the "Upload Document" input field with no data file 
        // negativeConfirmShip: () => {
        //     cy.log('idmTestResults')
        //     inputCheckHelpers.nextButtonCheck('be.disabled')
      
        // },

        //C24451	[NEG] Verify the "Next" Button when the step is not signed  
        noSignNext: () => {
            inputCheckHelpers.nextButtonCheck('be.disabled');
        }
    }



}
