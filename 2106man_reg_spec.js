import common from '../../support/index.js';
import regressionOrderingSteps from '../../utils/ordering_steps_regression.js';
import regressionCommonHappyPath from '../../utils/commonHappyPath.js';
import regressionManufacturingSteps from '../../utils/manufacturing_steps_regression.js';

describe('Vineti-Express Regression Path', () => {
  let scope = {};
  Cypress.env('runWithHelpers', false);

  describe('Manufacturing Flow', () => {
    beforeEach(() => {
        regressionOrderingSteps.orderingData(scope);        
    });
    it('Collection Site Labels', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.get('@coi').then(coi =>{
            cy.get(".manufacturing-row_coi")
                .contains("div", coi)
                .click();
          })
        cy.log('Collection Site Labels');
        // C24383   [NEG] Verify the "Next" Button when the step is not signed. 
        regressionManufacturingSteps.collectionSiteLabels.nextButtonNegativeAll();
        // C24384   [POS] Verify the "Print Labels" buttons. 
        regressionManufacturingSteps.collectionSiteLabels.printLabelsPositive();
    }),
    it('Ship Labels to Collection Site', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Ship Labels to Collection Site')
        regressionManufacturingSteps.collectionSiteLabels.happyPath();

        // C24393 [NEG] Verify the next button when COI is not filled and "Pack the Shipper" toggle is set.
        regressionManufacturingSteps.shipLabelsToCollectionSite.nextButtonNoCoi();

        // C24390   [NEG] Verify functionality of COI block.
        regressionManufacturingSteps.shipLabelsToCollectionSite.invalidCoiNegative();

        //C24398    [NEG] Verify the next button when "Pack the Shipper" toggle is not set and COI is filled.
        regressionManufacturingSteps.shipLabelsToCollectionSite.nextButtonNoToggleClick();

        //C24454    [POS] Verify the next button when the "Pack the Shipper" toggle is set to "NO" 
        regressionManufacturingSteps.shipLabelsToCollectionSite.nextButtonNoToggle();
    }),
    it('Label Shipping Summary', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Label Shipping Summary');
        regressionManufacturingSteps.shipLabelsToCollectionSite.happyPath();

        // C24401 [NEG] Verify the "Next" Button when the step is not signed.
        regressionManufacturingSteps.labelShippingSummary.nextButtonNegativeAll();
        // C24407 [NEG] Verify the "Print Summary" Button when the step is not signed.
        regressionManufacturingSteps.labelShippingSummary.signatureNotConfirmed();
        // C24407 [POS] Verify the "Print Summary" Button when the step is signed.
        regressionManufacturingSteps.labelShippingSummary.signatureConfirmed();
    }),

    it('Lot Number', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Lot Number');
        regressionManufacturingSteps.labelShippingSummary.happyPath();

        // C24504 [NEG] Verify the "Record" Button.
        regressionManufacturingSteps.lotNumber.recordButtonNegative();
    }),

    it('Summary Documents', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Summary Documents')
        regressionManufacturingSteps.lotNumber.happyPath();

        // C24508 [NEG] Verify the "View Summary" button  against Collection Summary.
        regressionManufacturingSteps.SummaryDocuments.viewSummaryforCollectionSummary();

        // C24510 [POS] Verify the "View Summary" against Cryopreservation Summary & "View Document" button  against Valid PDF.
        regressionManufacturingSteps.SummaryDocuments.viewButtonforSummaryAndPdf();
    }),

    it('Shipment Receipt Checklist', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Shipment Receipt Checklist')
        regressionManufacturingSteps.SummaryDocuments.happyPath(scope);

        // C24514 [NEG] Verify the "Confirm" button for shipper label.
        regressionManufacturingSteps.shipmentReceiptChecklist.confirmButtonShipperLabel();

        // C24513 [NEG] Verify the "Confirm" button for shipper's seal.
        regressionManufacturingSteps.shipmentReceiptChecklist.confirmButtonShippersSeal();

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
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
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
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Product Receipt')
        regressionManufacturingSteps.shipmentReceiptSummary.happyPath(scope);

        // C24409 [NEG] Verify the "Next" Button is disabled when "Scan or enter the COI number from the label on the cell collection bag 1." has no input or "Input does not match"
        regressionManufacturingSteps.productReceipt.bag1CoiNegative();

        // C24413 [NEG] Verify the "Next" Button is disabled when "Does the temperature data conform to standards?" is not selected.
        regressionManufacturingSteps.productReceipt.tempNoClick();

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
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Transfer To Storage')
        regressionManufacturingSteps.productReceipt.happyPath(scope);

        // C24421 [NEG] Verify the "Next" Button is disabled when "Scan or enter the COI number from Bag 1" has no input or "Input does not match"
        regressionManufacturingSteps.transferToStorage.bag1CoiNeg();
    }),

    it('Product Receipt Summary', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
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
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
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
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Product Receipt Summary')
        regressionManufacturingSteps.bagSelection.happyPath(scope);

        // C24293 [NEG] Verify functionality of COI block. 
        regressionManufacturingSteps.startManufacturing.invalidCoiNegative();
    }),

    it('Finished Product Labels', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Product Receipt Summary')
        regressionManufacturingSteps.startManufacturing.happyPath(scope);

        // C24294 [NEG] Verify that "Next" button is disabled when invalid inputs are entered. 
        regressionManufacturingSteps.finishedProductLabel.invalidInputNegative();
    }),

    it('FP Labels', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Product Receipt Summary')
        regressionManufacturingSteps.finishedProductLabel.happyPath(scope);

        // C24295 [NEG] Verify that "View Summary" and "Next" button is disabled when no signature is done. 
        regressionManufacturingSteps.fpLabel.noSignatureNegative();

    }),
    it('Harvest', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        cy.log('Harvest')
        regressionManufacturingSteps.fpLabel.happyPath(scope);

        //C24397    [NEG] Verify "Scan Bag 1" Confirm button when no/invalid data is filled 
        regressionManufacturingSteps.harvest.negativeConfirmShip()

        //C24453    [NEG] Verify "Next" button when label is not applied 
        regressionManufacturingSteps.harvest.negativeNextLabel()
    }),

    it('Transfer To CRF', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        cy.log('Transfer To CRF')
        regressionManufacturingSteps.harvest.happyPath(scope);

        //C24821    [NEG] Verify the "Scan bag 1" confirm button when invalid/no data is entered 
        regressionManufacturingSteps.transferToCrf.noScanBagConfirm()

        //C24823    [NEG] Verify the "Next" Button when only scan bag 1 values are filled 
        regressionManufacturingSteps.transferToCrf.singleValueScanBag()

        // C24825   [NEG] Verify the "Check into CRF" when invalid/no data is filled 
        regressionManufacturingSteps.transferToCrf.noCheckCrf()


    }),

    it('CRF To Storage', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        cy.log('CRF To Storage')
        regressionManufacturingSteps.transferToCrf.happyPath(scope);

        //C24432    [NEG] Verify the "Check out of CRF" Confirm Button when invalid/empty data is entered 
        regressionManufacturingSteps.CrfToStorage.negativeCheckOutCrf()

        //C24436    [NEG] Verify the "Scan Bag" Button when no/incorrect data is filled. 
        regressionManufacturingSteps.CrfToStorage.negativeScanButton()

        //C24447    [NEG] Verify "" Check into LN2 storage" block when no/invalid data is filled 
         regressionManufacturingSteps.CrfToStorage.noLn2Storage()

        //C24441    [NEG] Verify the "Next" Button when only Scan values are filled 
        regressionManufacturingSteps.CrfToStorage.noScanNegative()
       
    }),

    it('Quality', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        cy.log('Quality');
        regressionManufacturingSteps.CrfToStorage.happyPath(scope);

        //C24449    [NEG] Verify the "Upload Document" input field with no data file 
        regressionManufacturingSteps.quality.negativeConfirmShip()

    }),

    it('Quality Review', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        cy.log('Quality Review');
        regressionManufacturingSteps.quality.happyPath(scope);

        //C24451    [NEG] Verify the "Next" Button when the step is not signed 
        regressionManufacturingSteps.qualityReview.noSignNext()

    }),
    
    it('Shipping Bag Selection', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Shipping Bag Selection');
        regressionManufacturingSteps.qualityReview.happyPath(scope);

         //C24458 [NEG] Verify the next button is disabled when "Bag 1" toggle is not clicked. 
         regressionManufacturingSteps.shippingBagSelection.nextButtonNegative();

         //C24461 [POS]Verify the next button when "Bag 1" toggle is set to "Do not select".
         regressionManufacturingSteps.shippingBagSelection.nextButtonPositive();

    }),

    it('Shipping Checklist', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Shipping Checklist');
        regressionManufacturingSteps.shippingBagSelection.happyPath(scope);

        //C24347 [NEG] Verify the "Scan or enter the AirWaybill number on the shipping labels." confirm button when no data/invalid data is filled. 
        regressionManufacturingSteps.shippingChecklist.confirmButtonNegative();
        //C24509 [NEG] Verify the record button of "Scan or enter the serial number on the shipper's seal" 
        regressionManufacturingSteps.shippingChecklist.enterAndConfirmNegative();
        regressionManufacturingSteps.airwayBill.getManufacturingAirWayBill(scope);
        //C24484 [NEG] Verify Additional text area for "Attach shipping labels to shipper label". 
        regressionManufacturingSteps.shippingChecklist.attachShippingLabelNegative(scope);
        //C24491 [NEG] Verify Additional text area for "Place the materials into the shipper according to the SOP"
        regressionManufacturingSteps.shippingChecklist.placeTheMaterialNegative();
        //C24492 [NEG] Verify Additional text area for "Activate the temperature monitor and place it into the shipper".
        regressionManufacturingSteps.shippingChecklist.activateTheTemperatureNegative();
        //C24494 [NEG] Verify Additional text area for "Place summary documents in the shipper"
        regressionManufacturingSteps.shippingChecklist.placeSummaryDocumentNegative();
   
    }),

    it('Shipping Summary', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        cy.log('Shipping Checklist');
        regressionManufacturingSteps.shippingChecklist.happyPath(scope);
        regressionManufacturingSteps.manufacturingAirwayBill.getManufacturingAirWayBillAndCompleteShipping(scope);

        //C24426 [NEG] Verify "next" ,"verifier signature" and "print summary" button is disabled when no signature is done.
        regressionManufacturingSteps.shippingSummary.defaultNegative();
        //C24430 [POS] Verify "print summary" button is enabled when both signature are done.
        regressionManufacturingSteps.shippingSummary.printSummaryPositive();

    })
  })
})
