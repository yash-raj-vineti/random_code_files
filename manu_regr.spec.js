import common from '../../support/index.js';
import regressionOrderingSteps from '../../utils/ordering_steps_regression.js';
import regressionCommonHappyPath from '../../utils/commonHappyPath.js';
import regressionCollectionSteps from '../../utils/collection_steps_regression.js';
import col_steps from "../../utils/collection_steps";
import regressionManufacturingSteps from '../../utils/manufacturing_steps_regression.js';

describe('Vineti-Express Regression Path', () => {
  let scope = {};
  Cypress.env('runWithHelpers', false);

  describe('Collection Flow', () => {
    beforeEach(() => {
        regressionOrderingSteps.orderingData(scope);
        regressionCommonHappyPath.commonOrderingSteps(scope);
        
    });

    it('Lot Number', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Lot Number');
        regressionManufacturingSteps.labelShippingSummary.happyPath(scope);

        // C24504 [NEG] Verify the "Record" Button.
        regressionManufacturingSteps.lotNumber.recordButtonNegative();
    }),

    it('Summary Documents', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Summary Documents')
        regressionManufacturingSteps.lotNumber.happyPath(scope);

        // C24508 [NEG] Verify the "View Summary" button  against Collection Summary.
        regressionManufacturingSteps.SummaryDocuments.viewSummaryforCollectionSummary();

        // C24510 [POS] Verify the "View Summary" against Cryopreservation Summary & "View Document" button  against Valid PDF.
        regressionManufacturingSteps.SummaryDocuments.viewButtonforSummaryAndPdf();
    }),

    it('Shipment Receipt Checklist', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Shipment Receipt Checklist')
        regressionManufacturingSteps.SummaryDocuments.happyPath(scope);

        // C24514 [NEG] Verify the "Confirm" button for shipper label.
        regressionManufacturingSteps.shipmentReceiptChecklist.confirmButtonShipperLabel();

        // C24513 [NEG] Verify the "Confirm" button for shipper's seal.
        regressionManufacturingSteps.shipmentReceiptChecklist.confirmButtonShippersSeal(scope.coi);

        // C24519 [NEG] Verify the "Next" button when none of the toggle is selected.
        regressionManufacturingSteps.shipmentReceiptChecklist.noToggleSelected();

        // C24518 [NEG] Verify the "Next" button when 'NO' is selected without additional comments in one of the toggle.
        regressionManufacturingSteps.shipmentReceiptChecklist.nextButtonWithoutComments();

        // C24517 [POS] Verify the "Next" button when 'NO' is selected with some additional comments in one of the toggle.
        regressionManufacturingSteps.shipmentReceiptChecklist.nextButtonWithComments();

        // C24521 [NEG] Verify the "Next" button when NO is selected in both the toggles without additional comments.
        regressionManufacturingSteps.shipmentReceiptChecklist.nextButtonNoComments();

        // C24511 [POS] Verify the "Next" button when NO is selected in both the toggles with some additional comments.
        regressionManufacturingSteps.shipmentReceiptChecklist.nextButtonNoToggles();
    }),

    it('Shipment Receipt Summary', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Shipment Receipt Summary')
        regressionManufacturingSteps.shipmentReceiptChecklist.happyPath(scope);

        // C24525 [NEG] Verify the "Next" Button is disabled when the step is not signed.
        regressionManufacturingSteps.shipmentReceiptSummary.stepNotSigned();

        // C24526 [NEG] Verify the "Print Summary" Button is disabled when "Your Signature" and "Verifier Signature" is not confirmed.
        regressionManufacturingSteps.shipmentReceiptSummary.signatureNotConfirmed();

        // C24530 [POS] Verify the "Print Summary" Button is enabled when "Your Signature" and "Verifier Signature" is confirmed.
        regressionManufacturingSteps.shipmentReceiptSummary.signatureConfirmed();   
    }),

    it('Product Receipt', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Product Receipt')
        regressionManufacturingSteps.shipmentReceiptSummary.happyPath(scope);

        // C24409 [NEG] Verify the "Next" Button is disabled when "Scan or enter the COI number from the label on the cell collection bag 1." has no input or "Input does not match"
        regressionManufacturingSteps.productReceipt.bag1CoiNegative(scope);

        // C24413 [NEG] Verify the "Next" Button is disabled when "Does the temperature data conform to standards?" is not selected.
        regressionManufacturingSteps.productReceipt.tempNoClick(scope);

        // C24416 [NEG] Verify the "Next" Button is disabled when "Is the collection bag in expected good condition?" is not selected.
        regressionManufacturingSteps.productReceipt.bagConditionNoClick();

        // C24414 [NEG] Verify the "Next" Button is disabled when "Does the temperature data conform to standards?" when "No"  is selected with no "Additional Comments".
        regressionManufacturingSteps.productReceipt.tempNoComment();

        // C24418 [NEG] Verify the "Next" Button is disabled when "Is the collection bag in expected good condition?" when "No"  is selected with no "Additional Comments".
        regressionManufacturingSteps.productReceipt.bagConditionNoComment();

        // C24415 [POS] Verify the "Next" Button is enabled when "Does the temperature data conform to standards?" when "No" is selected with some "Additional comment"
        regressionManufacturingSteps.productReceipt.tempWithComment();

        // C24419 [POS] Verify the "Next" Button is enabled when "Is the collection bag in expected good condition?" when "No" is selected with some "Additional comment"
        regressionManufacturingSteps.productReceipt.bagConditionWithComment();
    }),

    it('Transfer To Storage', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Transfer To Storage')
        regressionManufacturingSteps.productReceipt.happyPath(scope);

        // C24421 [NEG] Verify the "Next" Button is disabled when "Scan or enter the COI number from Bag 1" has no input or "Input does not match"
        regressionManufacturingSteps.transferToStorage.bag1CoiNeg(scope);
    }),

    it('Product Receipt Summary', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Product Receipt Summary')
        regressionManufacturingSteps.transferToStorage.happyPath(scope);

        // C24365 [NEG] Verify the "Next" Button is disabled when the step is not signed.
        regressionManufacturingSteps.productReceiptSummary.noSignatureCheck();

        // C24366 [NEG] Verify the "Print Summary" Button is disabled when "Your Signature" and "Verifier Signature" is not confirmed.
        regressionManufacturingSteps.productReceiptSummary.noSignaturePrintSummary();

        // C24367 [POS] Verify the "Print Summary" Button works when "Your Signature" and "Verifier Signature" is confirmed.
        regressionManufacturingSteps.productReceiptSummary.signaturePrintSummaryPos();
    }),

    it('Bag Selection', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Product Receipt Summary')
        regressionManufacturingSteps.productReceiptSummary.happyPath(scope);

        // C24288 [NEG] Verify the "Next" Button is disabled when no selection is made for both bags. 
        regressionManufacturingSteps.bagSelection.noSelectionNegative();

        // C24289 [NEG] Verify the "Next" Button is disabled when selection is made for Bag 1 only. 
        regressionManufacturingSteps.bagSelection.onlyBag1SelectionNegative();

        // C24290 [NEG] Verify the "Next" Button is disabled when selection is made for Bag 3 only. 
        regressionManufacturingSteps.bagSelection.onlyBag2SelectionNegative();

        // C24292 [POS] Verify that a reason for change is asked upon changing values 
        regressionManufacturingSteps.bagSelection.reasonforChangePositive();

    }),

    it('Start Manufacturing', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Product Receipt Summary')
        regressionManufacturingSteps.bagSelection.happyPath(scope);

        // C24293 [NEG] Verify functionality of COI block. 
        regressionManufacturingSteps.startManufacturing.invalidCoiNegative(scope.coi);
    }),

    it('Finished Product Labels', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Product Receipt Summary')
        regressionManufacturingSteps.startManufacturing.happyPath(scope);

        // C24294 [NEG] Verify that "Next" button is disabled when invalid inputs are entered. 
        regressionManufacturingSteps.finishedProductLabel.invalidInputNegative();
    }),

    it('FP Labels', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Product Receipt Summary')
        regressionManufacturingSteps.finishedProductLabel.happyPath(scope);

        // C24295 [NEG] Verify that "View Summary" and "Next" button is disabled when no signature is done. 
        regressionManufacturingSteps.fpLabel.noSignatureNegative();

    }),
    it.only('Harvest', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Harvest')
        regressionManufacturingSteps.fpLabel.happyPath(scope);

        //C24397	[NEG] Verify "Scan Bag 1" Confirm button when no/invalid data is filled 
        regressionManufacturingSteps.harvest.negativeConfirmShip()

        //C24453	[NEG] Verify "Next" button when label is not applied 
        regressionManufacturingSteps.harvest.negativeNextLabel()
    }),

    it.only('Transfer To CRF', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Transfer To CRF')
        regressionManufacturingSteps.harvest.happyPath(scope);

        //C24821	[NEG] Verify the "Scan bag 1" confirm button when invalid/no data is entered 
        regressionManufacturingSteps.transferToCrf.noScanBagConfirm()

        //C24823	[NEG] Verify the "Next" Button when only scan bag 1 values are filled 
        regressionManufacturingSteps.transferToCrf.singleValueScanBag()

        // C24825	[NEG] Verify the "Check into CRF" when invalid/no data is filled 
        regressionManufacturingSteps.transferToCrf.noCheckCrf()

        //C24826	[NEG] Verify the "Record Button when no data is filled 
        //regressionManufacturingSteps.transferToCrf.noRecord()

    }),

    it.only('CRF To Storage', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('CRF To Storage')
        regressionManufacturingSteps.transferToCrf.happyPath(scope);

        //C24432	[NEG] Verify the "Check out of CRF" Confirm Button when invalid/empty data is entered 
        regressionManufacturingSteps.CrfToStorage.negativeCheckOutCrf()

        //C24436	[NEG] Verify the "Scan Bag" Button when no/incorrect data is filled. 
        regressionManufacturingSteps.CrfToStorage.negativeScanButton()

        // C24440	[NEG] Verify the "Record Button when no data is filled 
        regressionManufacturingSteps.CrfToStorage.negativeRecord()

         //C24447	[NEG] Verify "" Check into LN2 storage" block when no/invalid data is filled 
         regressionManufacturingSteps.CrfToStorage.noLn2Storage()


        //C24441	[NEG] Verify the "Next" Button when only Scan values are filled 
        regressionManufacturingSteps.CrfToStorage.noScanNegative()

       
    }),

    it.only('Quality', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Quality')
        regressionManufacturingSteps.CrfToStorage.happyPath(scope);

        //C24449	[NEG] Verify the "Upload Document" input field with no data file 
        regressionManufacturingSteps.quality.negativeConfirmShip()

        // //C24451	[NEG] Verify the "Next" Button when the step is not signed 
        // regressionManufacturingSteps.quality.noSignNext()

    }),

    it.only('Quality Review', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Quality')
        regressionManufacturingSteps.quality.happyPath(scope);

        //C24449	[NEG] Verify the "Upload Document" input field with no data file 
        regressionManufacturingSteps.qualityReview.negativeConfirmShip()

        //C24451	[NEG] Verify the "Next" Button when the step is not signed 
        regressionManufacturingSteps.qualityReview.negativeScanButton()

    })

  })
})
