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
