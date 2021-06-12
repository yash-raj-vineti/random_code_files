import common from '../../support/index.js';
import regressionOrderingSteps from '../../utils/ordering_steps_regression.js';
import regressionCommonHappyPath from '../../utils/commonHappyPath.js';
import regressionCollectionSteps from '../../utils/collection_steps_regression.js';
import col_steps from "../../utils/collection_steps";

describe('Vineti-Express Regression Path', () => {
  let scope = {};
  Cypress.env('runWithHelpers', false);

  describe('Collection Flow', () => {
    beforeEach(() => {
      regressionOrderingSteps.orderingData(scope);
      regressionCommonHappyPath.commonOrderingSteps(scope);
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
    });

    it('IDM Test Results', () => {
      cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
      // C21665 [NEG] Verify the "Upload Document" input field with no data.
      regressionCollectionSteps.idmTestResults.docUploadNegative();
    }),

    it('Patient Verification', () => {
      cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
      regressionCollectionSteps.idmTestResults.happyPath(scope.treatmentInformation)

      // C21667 [NEG] Verify the "Next" Button is disabled when the step is not signed.
      regressionCollectionSteps.patientVerification.nextButtonNegative();

      // C22050 [NEG] Verify the "Print Summary" Button is disabled when "Your Signature" and "Verifier Signature" is not confirmed.
      regressionCollectionSteps.patientVerification.printSummaryNegative();

      // C21670 [POS] Verify the "Print Summary" Button works when "Your Signature" and "Verifier Signature" is confirmed.
      regressionCollectionSteps.patientVerification.printSummaryPositive();
    })

    it('Collection Session', () => {
      cy.log('Collection Session')
      cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
      regressionCollectionSteps.idmTestResults.happyPath(scope.treatmentInformation)
      regressionCollectionSteps.patientVerification.happyPath()

      //C21675 [NEG] Verify the "Next" Button is disabled when no data is filled.  
      regressionCollectionSteps.collectionSession.noDataFilledNegative();
      
      // C24107 [NEG] Verify that "Next" Button is disabled when only "Patient Weight" is filled and "Was CBC collected prior to apheresis?" is empty. 
      regressionCollectionSteps.collectionSession.patientWeightInputOnlyNegative();

      // C24108 [NEG] Verify that "Next" Button is disabled when only "Was CBC collected prior to apheresis?" is filled and "Patient Data" is empty. 
      regressionCollectionSteps.collectionSession.apheresisSelectedOnlyNegative();

      // C21684 [POS] Verify that a reason for change is asked upon changing values 
      regressionCollectionSteps.collectionSession.reasonforChangePositive();
    }),

    it.only('Collection Bag Identification', () => {
      cy.log('Collection Bag Identification')
      cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
      regressionCollectionSteps.idmTestResults.happyPath(scope.treatmentInformation)
      regressionCollectionSteps.patientVerification.happyPath()
      regressionCollectionSteps.collectionSession.happyPath()

      // C21680 [NEG] Verify the "Next" Button is disabled when no data is filled. 
      regressionCollectionSteps.collectionBagIdentification.noDataFilledNegative();

      // C22076 [NEG] Verify functionality of label_verification_step_row block.
      regressionCollectionSteps.collectionBagIdentification.invalidCoiNegative(scope.coi);

      // C21681 [NEG] Verify the "Next" Button is disabled when first checkbox is unchecked. 
      regressionCollectionSteps.collectionBagIdentification.firstCheckBoxUncheckedNegative(scope.coi);
      
      // C22161 [NEG] Verify the "Next" Button is disabled when second checkbox is unchecked. 
      // regressionCollectionSteps.collectionBagIdentification.secondCheckBoxUnCheckedNegative(scope.coi);
      
      // C24113 [NEG] Verify the "Next" Button is disabled when "UDN" value is filled and others are empty. 
      // regressionCollectionSteps.collectionBagIdentification.onlyUDNrecordedNegative();
      
      // C24114 [NEG] Verify the "Next" Button is disabled when "COI" value is not filled and others are filled. 
      // regressionCollectionSteps.collectionBagIdentification.coiEmptyNegative();
      
    }),

    it('Bag Selection', () => {
      cy.log('Bag Selection')
      cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
      regressionCollectionSteps.idmTestResults.happyPath(scope.treatmentInformation)
      regressionCollectionSteps.patientVerification.happyPath()
      regressionCollectionSteps.collectionSession.happyPath()
      regressionCollectionSteps.collectionBagIdentification.happyPath()

      // C21732	[NEG] Verify the "Next" Button when no selector is selected.
      regressionCollectionSteps.collectionBagSelection.noSelectorNegative();

      // C21736	[NEG] Verify the "Next" Button when selector is on 'Do not Ship'. 
      regressionCollectionSteps.collectionBagSelection.shipperNegative(scope.coi);

      // C21740	[POS] Verify the "Next" Button when required selector is on "Ship" 
      regressionCollectionSteps.collectionBagSelection.firstNextPositive(scope.coi);
      
    }),

    it('Transfer Bags to Shipper', () => {
      cy.log('Transfer Bags to Shipper')
      cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
      regressionCollectionSteps.idmTestResults.happyPath(scope.treatmentInformation)
      regressionCollectionSteps.patientVerification.happyPath()
      regressionCollectionSteps.collectionSession.happyPath()
      regressionCollectionSteps.collectionBagIdentification.happyPath()
      regressionCollectionSteps.collectionBagSelection.happyPath()

      // C21741	[NEG] Verify the "Next" Button when no data is filled. 
      regressionCollectionSteps.collectionBagTransfer.noDataFilledNegative()

      // C21742	[P0S] Verify the "Next" Button when all data is filled. 
      regressionCollectionSteps.collectionBagTransfer.allDataFilledPositive()

      // C22047	[NEG] Verify the "Confirm" Button is disabled when no data is filled. 
      regressionCollectionSteps.collectionBagTransfer.noDataFilledConfirmButtonNegative()

      // C22048	[POS] Verify the "Confirm" Button advances to green check when data is filled. 
      regressionCollectionSteps.collectionBagTransfer.DataFilledConfirmButtonPositive()
    }),


    it('Shipping Checklist', () => {
      cy.log('Shipping Checklist')
      cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
      regressionCollectionSteps.idmTestResults.happyPath(scope.treatmentInformation)
      regressionCollectionSteps.patientVerification.happyPath()
      regressionCollectionSteps.collectionSession.happyPath()
      regressionCollectionSteps.collectionBagIdentification.happyPath()
      regressionCollectionSteps.collectionBagSelection.happyPath()
      regressionCollectionSteps.collectionBagTransfer.happyPath()

      // 	C21746	[NEG] Verify the "Next" Button when no data is filled. 
      regressionCollectionSteps.collectionShippingChecklist.noDataFilledNegative()

      // 	C22171	[NEG] Verify Additional text area for Attach shipping labels to shipper label 
      regressionCollectionSteps.collectionShippingChecklist.noDataFilledShippingLabelAdditionalTextAreaNegative()

      // C22334	[NEG] Verify the Additional information text area for placing the materials into shipper according to the SOP label
      regressionCollectionSteps.collectionShippingChecklist.noDataFilledSopLabelAdditionalTextAreaNegative()

      // 	C22335	[NEG] Verify Additional information text area for Activating the Temperature monitor label
      regressionCollectionSteps.collectionShippingChecklist.noDataFilledTemperatureLabelAdditionalTextAreaNegative()

      // C22496	[NEG] Verify the Additional information text area for Placing the summary documents in Shipper
      regressionCollectionSteps.collectionShippingChecklist.noSummaryDocumentsAdditionalTextAreaNegative()

    }),

    it('Shipping Summary', () => {
      cy.log('Shipping Summary')
      cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
      regressionCollectionSteps.idmTestResults.happyPath(scope.treatmentInformation)
      regressionCollectionSteps.patientVerification.happyPath()
      regressionCollectionSteps.collectionSession.happyPath()
      regressionCollectionSteps.collectionBagIdentification.happyPath()
      regressionCollectionSteps.collectionBagSelection.happyPath()
      regressionCollectionSteps.collectionBagTransfer.happyPath()
      regressionCollectionSteps.collectionShippingChecklist.happyPath()

      // 	C21751	[NEG] Verify "Done" button when no signature is done.
      regressionCollectionSteps.collectionShippingSummary.noSignatureDoneNegative()

      // 	C21755	[POS] Verify "Done" button after signature is done. 
      regressionCollectionSteps.collectionShippingSummary.signatureDonePositive()

      // C21756	[NEG] Verify 'Print Summary' is disabled when no signature is done. 
      regressionCollectionSteps.collectionShippingSummary.noSignaturePrintNegative()

      // C21757	[POS] Verify 'Print Summary' is enabled when signature is done.
      regressionCollectionSteps.collectionShippingSummary.noSignaturePrintPositive()

    })

  })
})
