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
