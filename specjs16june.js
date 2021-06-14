
      it('Bag Selection', () => {
        cy.log('Bag Selection')
        cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
        regressionCollectionSteps.cryopreservationSummary.happyPath(scope.coi,scope.treatmentInformation)
  
        // C21732	[NEG] Verify the "Next" Button when no selector is selected.
        regressionCollectionSteps.collectionBagSelection.noSelectorNegative();
  
        // C21736	[NEG] Verify the "Next" Button when selector is on 'Do not Ship'. 
        regressionCollectionSteps.collectionBagSelection.shipperNegative(scope.coi);
  
        // C21740	[POS] Verify the "Next" Button when required selector is on "Ship" 
        //regressionCollectionSteps.collectionBagSelection.firstNextPositive(scope.coi);
        
      }),

      it('Transfer Bags to Shipper', () => {
        cy.log('Transfer Bags to Shipper')
        cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
        regressionCollectionSteps.collectionBagSelection.happyPath(scope.coi,scope.treatmentInformation)
  
        // C21741	[NEG] Verify the "Next" Button when no data is filled. 
        regressionCollectionSteps.collectionBagTransfer.noDataFilledNegative()
  
        // C21742	[P0S] Verify the "Next" Button when all data is filled. 
        //regressionCollectionSteps.collectionBagTransfer.allDataFilledPositive()
  
        // C22047	[NEG] Verify the "Confirm" Button is disabled when no data is filled. 
        regressionCollectionSteps.collectionBagTransfer.noDataFilledConfirmButtonNegative()
  
        // C22048	[POS] Verify the "Confirm" Button advances to green check when data is filled. 
      //  regressionCollectionSteps.collectionBagTransfer.DataFilledConfirmButtonPositive()
      }),

      it.only('Shipping Checklist', () => {
        cy.log('Shipping Checklist')
        cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
        regressionCollectionSteps.collectionBagTransfer.happyPath(scope.coi,scope.treatmentInformation)
  
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

         //30414	[NEG] Verify the "Record" Button when no data is filled.  
         regressionCollectionSteps.collectionShippingChecklist.noRecordNegative();
  
      }),

      it.only('Shipping Summary', () => {
        cy.log('Shipping Summary')
        cy.waitForElementAndClick(`tr[data-testid="treatment-${scope.coi}"]`);
        regressionCollectionSteps.collectionShippingChecklist.happyPath(scope.coi,scope.treatmentInformation)
  
        // 	C21751	[NEG] Verify "Done" button when no signature is done.
        regressionCollectionSteps.collectionShippingSummary.noSignatureDoneNegative()
  
        // 	C21755	[POS] Verify "Done" button after signature is done. 
        regressionCollectionSteps.collectionShippingSummary.signatureDonePositive()
  
        // C21756	[NEG] Verify 'Print Summary' is disabled when no signature is done. 
        regressionCollectionSteps.collectionShippingSummary.noSignaturePrintNegative()
  
        // C21757	[POS] Verify 'Print Summary' is enabled when signature is done.
        regressionCollectionSteps.collectionShippingSummary.signaturePrintPositive()
      })
  })
