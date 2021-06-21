import common from '../../support/index.js';
import regressionOrderingSteps from '../../utils/ordering_steps_regression.js';
import regressionCommonHappyPath from '../../utils/commonHappyPath.js';
import regressionCollectionSteps from '../../utils/collection_steps_regression.js';
import actionButtonsHelper from '../../utils/shared_block_helpers/actionButtonHelpers';

describe('Vineti-Express Regression Path', () => {
  let scope = {};
  Cypress.env('runWithHelpers', false);

  describe('Collection Flow', () => {
    beforeEach(() => {
      regressionOrderingSteps.orderingData(scope);
    });

    it('IDM Test Results', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      // C21665 [NEG] Verify the "Upload Document" input field with no data.
      regressionCollectionSteps.idmTestResults.docUploadNegative();
    }),

    it('Patient Verification', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      regressionCollectionSteps.idmTestResults.happyPath(scope.treatmentInformation)

      // C21667 [NEG] Verify the "Next" Button is disabled when the step is not signed.
      regressionCollectionSteps.patientVerification.nextButtonNegative();

      // C22050 [NEG] Verify the "Print Summary" Button is disabled when "Your Signature" and "Verifier Signature" is not confirmed.
      regressionCollectionSteps.patientVerification.printSummaryNegative();

      // C21670 [POS] Verify the "Print Summary" Button works when "Your Signature" and "Verifier Signature" is confirmed.
      regressionCollectionSteps.patientVerification.printSummaryPositive();
    })

    it('Collection Session', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.log('Collection Session')
      // 
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      regressionCollectionSteps.patientVerification.happyPath(scope.treatmentInformation)

      //C21675 [NEG] Verify the "Next" Button is disabled when no data is filled.  
      regressionCollectionSteps.collectionSession.noDataFilledNegative();
      
      // C24107 [NEG] Verify that "Next" Button is disabled when only "Patient Weight" is filled and "Was CBC collected prior to apheresis?" is empty. 
      regressionCollectionSteps.collectionSession.patientWeightInputOnlyNegative();

      // C24108 [NEG] Verify that "Next" Button is disabled when only "Was CBC collected prior to apheresis?" is filled and "Patient Data" is empty. 
      regressionCollectionSteps.collectionSession.apheresisSelectedOnlyNegative();

      // C21684 [POS] Verify that a reason for change is asked upon changing values 
      regressionCollectionSteps.collectionSession.reasonforChangePositive();
    }),

    it('Collection Bag Identification', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.log('Collection Bag Identification')
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      regressionCollectionSteps.collectionSession.happyPath(scope.treatmentInformation);

      // C21680 [NEG] Verify the "Next" Button is disabled when no data is filled. 
      regressionCollectionSteps.collectionBagIdentification.noDataFilledNegative();

      // C24113 [NEG] Verify the "Next" Button is disabled when "UDN" value is filled and others are empty. 
      regressionCollectionSteps.collectionBagIdentification.onlyUDNNegative();

      // C24114 [NEG] Verify the "Next" Button is disabled when "COI" value is not filled and others are filled. 
      regressionCollectionSteps.collectionBagIdentification.coiEmptyNegative();

      // C22076 [NEG] Verify functionality of label_verification_step_row block.
      regressionCollectionSteps.collectionBagIdentification.invalidCoiNegative();

      // C21681 [NEG] Verify the "Next" Button is disabled when first checkbox is unchecked. 
      regressionCollectionSteps.collectionBagIdentification.firstCheckBoxUncheckedNegative();
      
      // C22161 [NEG] Verify the "Next" Button is disabled when second checkbox is unchecked. 
      regressionCollectionSteps.collectionBagIdentification.secondCheckBoxUnCheckedNegative();
      
    }),
    it('Collection Bag Data', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.log('Collection Bag Data')
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      regressionCollectionSteps.collectionBagIdentification.happyPath(scope.treatmentInformation);

      // C21683 [NEG] Verify the "Next" Button is disabled when no data is filled. 
      regressionCollectionSteps.collectionBagData.nextButtonDefaultNegative();

      // C22162 [NEG] Verify functionality of confirm_bag_label block. 
      regressionCollectionSteps.collectionBagData.confirmBagLabelNegative();

      // C24119 [NEG] Verify the "Next" Button is disabled when "COI" value is filled and rest are empty. 
      regressionCollectionSteps.collectionBagData.nextButtonCoiNegative();

      // C21685[NEG] Verify the "Next" Button is disabled when "End" time is less than "Start" time. 
      regressionCollectionSteps.collectionBagData.startEndTimeNegative();

      // C21686 [NEG] Verify the "Next" Button is disabled when "End" time is equal to "Start" time. 
      regressionCollectionSteps.collectionBagData.startEndTimeEqualNegative();

      // C24121 [NEG] Verify the "Next" Button is disabled when "COI" value and time is filled and rest are empty. 
      regressionCollectionSteps.collectionBagData.nextButtonCoiAndTimeNegative();

      // C22163 [NEG] Verify only valid input(numeric value) is accepted in "Collected Product Volume in mL" block. 
      regressionCollectionSteps.collectionBagData.collectedProductVolumeNegative();

      // C22164 [NEG] Verify only valid input(numeric value) is accepted in "Anticoagulant Volume in mL" block. 
      regressionCollectionSteps.collectionBagData.anticoagulantVolumeNegative(); 

      //C26574 [NEG] Verify the "Next" button when all fields are filled and no item is selected in dropdown.
      regressionCollectionSteps.collectionBagData.dropdownNegative();

      // C24125 [NEG] Verify the "Next" Button is disabled when "COI","Dropdown" and Bag details are filled and time value is empty. 
      regressionCollectionSteps.collectionBagData.timeFieldEmptyNegative();

      // C22166 [POS] Verify that a reason for change is asked upon changing values 
      regressionCollectionSteps.collectionBagData.reasonForChange();

    }),
    it('Collection Bag Summary', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.log('Collection Bag Summary')
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      regressionCollectionSteps.collectionBagData.happyPath(scope.treatmentInformation);

      //C21699 [NEG] Verify "Next" button is disabled when no signature is done.
      regressionCollectionSteps.collectionBagSummary.defaultNegative();

      //C21701  [NEG] Verify "Print Summary" is disabled when no signature is done.
      regressionCollectionSteps.collectionBagSummary.printSummaryNegative();

      //C21702 [POS] Verify 'Print Summary' is enabled when signature is done.
      regressionCollectionSteps.collectionBagSummary.printSummaryPositive();

      //C21703 [POS] Verify the "Edit" buttons.
      regressionCollectionSteps.collectionBagSummary.editButtonPositive();

    }),

    it('Collection Handoff', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.log('Collection Handoff')
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      regressionCollectionSteps.collectionBagSummary.happyPath(scope.treatmentInformation);

      //C21695  [NEG] Verify the "Next" Button is disabled when no data is filled.
      regressionCollectionSteps.collectionHandOff.defaultNegative();

      //C22167 [NEG] Verify functionality of confirm_bag_label block.
      regressionCollectionSteps.collectionHandOff.confirmBagLabelNegative();

      //C21696 [NEG] Verify the "Next" Button is disabled when "Your Signature" is not confirmed.
      regressionCollectionSteps.collectionHandOff.nextButtonNegative();

      //C21698 [POS] Verify the "Print Summary" Button works when "Your Signature" is confirmed.
      regressionCollectionSteps.collectionHandOff.printSummaryPositive();
    }),

    it('Collection Handoff Receipt', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.log('Collection Handoff Receipt');
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      regressionCollectionSteps.collectionHandOff.happyPath(scope.treatmentInformation);

      // C21715 [NEG] Verify the "Next" Button when no data is filled.
      regressionCollectionSteps.collectionHandoffReceipt.noValuefilled();

      // C21791 [NEG] Verify the "Confirm" Button when no data is filled.
      regressionCollectionSteps.collectionHandoffReceipt.verifyConfirmButton();

      // C21720 [NEG] Verify the "Next" Button when Signature is not confirmed.
      regressionCollectionSteps.collectionHandoffReceipt.signatureNotConfirmed();

      // C21718 [POS] Verify the "Print Summary" Button when "Your Signature" is confirmed
      regressionCollectionSteps.collectionHandoffReceipt.signatureConfirmed();

    }),

    it('Cryopreservation Collection Summary', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      cy.log('Cryopreservation Collection Summary');
      regressionCollectionSteps.collectionHandoffReceipt.happyPath(scope.treatmentInformation);

      // C21722 [POS] Verify the "Next" Button
      regressionCollectionSteps.cryopreservationCollectionSummary.verifyNextButton();

    }),

    it('Cryopreservation Bags', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      cy.log('Cryopreservation Bags');
      regressionCollectionSteps.cryopreservationCollectionSummary.happyPath(scope.treatmentInformation);


      // C21723 [NEG] Verify the "Next" Button when no data/invalid is filled.
      regressionCollectionSteps.cryopreservationBags.noDataFilled();      

    }),

    it('Apply Label Bags', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      cy.log('Apply Label Bags');
      regressionCollectionSteps.cryopreservationBags.happyPath(scope.treatmentInformation);

      // C22080 [NEG] Verify the "Next" Button when no data is filled.
      regressionCollectionSteps.applyLabelBags.verifyNextButtonNoData();

      // C22079 [NEG] Verify the "Confirm" Button (s) when no data is filled.
      regressionCollectionSteps.applyLabelBags.verifyConfirmButtons();
      
    }),

    it('Apply Label Cassettes', () => {
      regressionCommonHappyPath.commonOrderingSteps(scope);
      cy.wait(3000)
      common.loginAs("arlene");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get('@coi').then(coi =>{
        cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
      })
      cy.log('Apply Label Cassettes');
      regressionCollectionSteps.applyLabelBags.happyPath(scope.treatmentInformation);

      // C24106 [NEG] Verify the "Next" Button when no data is filled.
      regressionCollectionSteps.applyLabelCassettes.nextButtonNoData();

      // C22081 [NEG] Verify the "Confirm" Button (s) when no data is filled.
      regressionCollectionSteps.applyLabelCassettes.confirmButtonNoData();

      // C24231 [NEG] Verify the "Next" Button when only COI is not filled.
      regressionCollectionSteps.applyLabelCassettes.nextButtonNotCoi();

      // C24111 [NEG] Verify the "Next" Button when only second checkbox is unchecked.
      regressionCollectionSteps.applyLabelCassettes.secondUnchecked();

      // C24110 [NEG] Verify the "Next" Button when only first checkbox is unchecked.
      regressionCollectionSteps.applyLabelCassettes.firstUnchecked();

    }),
      it('Enter Bag Data', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        cy.wait(3000)
        common.loginAs("arlene");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.get('@coi').then(coi =>{
          cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
        })
        cy.log('Enter Bag Data')
        regressionCollectionSteps.applyLabelCassettes.happyPath(scope.treatmentInformation);
        // C24118 [NEG] Verify the "Next" Button is disabled when no data is filled. 
        regressionCollectionSteps.enterBagData.nextButtonNegativeAll();
        // C24181 [NEG] Verify the "Next" Button when only COI data is not filled.  
        regressionCollectionSteps.enterBagData.nextButtonNegativeCoi();
        //C22082 [NEG] Verify the "Confirm" Button (s) when no data is filled.  
        regressionCollectionSteps.enterBagData.coiNegative();
        //C24082 [NEG] Verify the "Cell Count" label.  
        regressionCollectionSteps.enterBagData.cellCountNegative();
        // C24123 [NEG] Verify the "Product Volume" label. 
        regressionCollectionSteps.enterBagData.productVolumeNegative();
        // C21730 [NEG] Verify the "Next" Button when only "Cell Count" label is not filled.  
        regressionCollectionSteps.enterBagData.nextButtonNegativeCellCount();
        // C24127 [NEG] Verify the "Next" Button when only "Product Volume" label is not filled.  
        regressionCollectionSteps.enterBagData.nextButtonNegativeProductVolume();
      }),
      it('Controlled Rate Freezer', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        cy.wait(3000)
        common.loginAs("arlene");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.get('@coi').then(coi =>{
          cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
        })
        cy.log('Controlled Rate Freezer')
        regressionCollectionSteps.enterBagData.happyPath(scope.treatmentInformation);
        // C24115 [NEG] Verify the "Next" Button is disabled when no data is filled. 
        regressionCollectionSteps.controlledRateFreezer.nextButtonNegativeAll();
        //C22084	[NEG] Verify the "Confirm" Button (s) when no data is filled.  
        regressionCollectionSteps.controlledRateFreezer.coiNegative();
        //C21738	[NEG] Verify the "Record" Button when no data is filled.  
        regressionCollectionSteps.controlledRateFreezer.recordNegative();
        // C24117	[NEG] Verify the "Next" Button when only COI number is not added.   
        regressionCollectionSteps.controlledRateFreezer.nextButtonNegativeCoi();
      }),
      it('Collection Bag Storage', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        cy.wait(3000)
        common.loginAs("arlene");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.get('@coi').then(coi =>{
          cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
        })
        cy.log('Collection Bag Storage')
        regressionCollectionSteps.controlledRateFreezer.happyPath(scope.treatmentInformation);
        // C21766 [NEG] Verify the "Next" Button is disabled when no data is filled. 
        regressionCollectionSteps.collectionBagStorage.nextButtonNegativeAll();
        //C22085	[NEG] Verify the "Confirm" Button (s) when no data is filled.  
        regressionCollectionSteps.collectionBagStorage.coiNegative();
        //C21771	[NEG] Verify the "Record" Button when no data is filled.  
        regressionCollectionSteps.collectionBagStorage.recordNegative();
        // C24184	[NEG] Verify the "Next" Button when only Scan bag values are not added.   
        regressionCollectionSteps.collectionBagStorage.nextButtonNegativeCoi();
      }),
      it('Cryopreservation Summary', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        cy.wait(3000)
        common.loginAs("arlene");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.get('@coi').then(coi =>{
          cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
        })
        cy.log('Cryopreservation Summary')
        regressionCollectionSteps.collectionBagStorage.happyPath(scope.treatmentInformation);
        // C21794 [NEG] Verify the "Next" Button when the Signatures are not confirmed . 
        regressionCollectionSteps.cryopreservationSummary.nextButtonNegativeAll();
        //C21796	[NEG] Verify 'Print Summary' when the signatures are not confirmed.  
        regressionCollectionSteps.cryopreservationSummary.printSummaryButtonNegative();
        //C21797	[POS] Verify the "Edit" buttons   
        regressionCollectionSteps.cryopreservationSummary.verifyEditButtonsPositive();
        // C21802	[POS] Verify 'Print Summary' when the signatures are confirmed.    
        regressionCollectionSteps.cryopreservationSummary.printSummaryButtonPositive();
      }),

      it('Bag Selection', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        cy.wait(3000)
        common.loginAs("arlene");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.log('Bag Selection')
        cy.get('@coi').then(coi =>{
          cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
        })
        regressionCollectionSteps.cryopreservationSummary.happyPath(scope.treatmentInformation)
  
        // C21732	[NEG] Verify the "Next" Button when no selector is selected.
        regressionCollectionSteps.collectionBagSelection.noSelectorNegative();
  
        // C21736	[NEG] Verify the "Next" Button when selector is on 'Do not Ship'. 
        regressionCollectionSteps.collectionBagSelection.shipperNegative();
      }),

      it('Transfer Bags to Shipper', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        cy.wait(3000)
        common.loginAs("arlene");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.log('Transfer Bags to Shipper')
        cy.get('@coi').then(coi =>{
          cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
        })
        regressionCollectionSteps.collectionBagSelection.happyPath(scope.treatmentInformation)
  
        // C21741	[NEG] Verify the "Next" Button when no data is filled. 
        regressionCollectionSteps.collectionBagTransfer.noDataFilledNegative()
  
        // C22047	[NEG] Verify the "Confirm" Button is disabled when no data is filled. 
        regressionCollectionSteps.collectionBagTransfer.noDataFilledConfirmButtonNegative()
  
        // C30472	[NEG] Verify the "Next" Button when only COI values are not added.
        regressionCollectionSteps.collectionBagTransfer.coiMissingValue(scope)

      }),

      it('Shipping Checklist', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        cy.wait(3000)
        common.loginAs("arlene");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.log('Shipping Checklist')
        cy.get('@coi').then(coi =>{
          cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
        })
        
        regressionCollectionSteps.collectionBagTransfer.happyPath(scope.treatmentInformation)
  
        // 	C21746	[NEG] Verify the "Next" Button when no data is filled. 
        regressionCollectionSteps.collectionShippingChecklist.noDataFilledNegative();
        
        //30414	[NEG] Verify the "Record" Button when no data is filled.  
        regressionCollectionSteps.collectionShippingChecklist.noRecordNegative();
  
        
        // 	C22171	[NEG] Verify Additional text area for Attach shipping labels to shipper label 
        regressionCollectionSteps.airWayBillGet.getCollAirWayBill(scope)
        regressionCollectionSteps.collectionShippingChecklist.noDataFilledShippingLabelAdditionalTextAreaNegative()
  
        // C22334	[NEG] Verify the Additional information text area for placing the materials into shipper according to the SOP label
        regressionCollectionSteps.collectionShippingChecklist.noDataFilledSopLabelAdditionalTextAreaNegative()
  
        // 	C22335	[NEG] Verify Additional information text area for Activating the Temperature monitor label
        regressionCollectionSteps.collectionShippingChecklist.noDataFilledTemperatureLabelAdditionalTextAreaNegative()
  
        // C22496	[NEG] Verify the Additional information text area for Placing the summary documents in Shipper
        regressionCollectionSteps.collectionShippingChecklist.noSummaryDocumentsAdditionalTextAreaNegative()

        
      }),

      it('Shipping Summary', () => {
        regressionCommonHappyPath.commonOrderingSteps(scope);
        cy.wait(3000)
        common.loginAs("arlene");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.log('Shipping Summary')
        cy.get('@coi').then(coi =>{
          cy.waitForElementAndClick(`tr[data-testid="treatment-${coi}"]`);
        })
        regressionCollectionSteps.collectionShippingChecklist.happyPath(scope.treatmentInformation,scope, scope.patientInformation)
        regressionCollectionSteps.airWayBillGet.getCollAirWayBill(scope);
        regressionCollectionSteps.collectionShippingChecklist.happyPath2();
        actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {})
  
        // 	C21751	[NEG] Verify "Done" button when no signature is done.
        regressionCollectionSteps.collectionShippingSummary.noSignatureDoneNegative()

        // C21756	[NEG] Verify 'Print Summary' is disabled when no signature is done. 
        regressionCollectionSteps.collectionShippingSummary.noSignaturePrintNegative()
  
        // 	C21755	[POS] Verify "Done" button after signature is done. 
        regressionCollectionSteps.collectionShippingSummary.signatureDonePositive()
  
        // C21757	[POS] Verify 'Print Summary' is enabled when signature is done.
        regressionCollectionSteps.collectionShippingSummary.signaturePrintPositive()
      })
  })
})
