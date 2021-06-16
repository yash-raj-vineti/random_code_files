it('Harvest', () => {
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

    it('Transfer To CRF', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Transfer To CRF')
        regressionManufacturingSteps.harvest.happyPath(scope, scope.coi);

        //C24821	[NEG] Verify the "Scan bag 1" confirm button when invalid/no data is entered 
        regressionManufacturingSteps.transferToCrf.noScanBagConfirm(scope)

        //C24823	[NEG] Verify the "Next" Button when only scan bag 1 values are filled 
        regressionManufacturingSteps.transferToCrf.singleValueScanBag(scope)

        // C24825	[NEG] Verify the "Check into CRF" when invalid/no data is filled 
        regressionManufacturingSteps.transferToCrf.noCheckCrf()

        //C24826	[NEG] Verify the "Record Button when no data is filled 
        //regressionManufacturingSteps.transferToCrf.noRecord()

    }),

    it('CRF To Storage', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('CRF To Storage')
        regressionManufacturingSteps.transferToCrf.happyPath(scope, scope.coi);

        //C24432	[NEG] Verify the "Check out of CRF" Confirm Button when invalid/empty data is entered 
        regressionManufacturingSteps.CrfToStorage.negativeCheckOutCrf()

        //C24436	[NEG] Verify the "Scan Bag" Button when no/incorrect data is filled. 
        regressionManufacturingSteps.CrfToStorage.negativeScanButton(scope)

        // C24440	[NEG] Verify the "Record Button when no data is filled 
        //regressionManufacturingSteps.CrfToStorage.negativeRecord()

         //C24447	[NEG] Verify "" Check into LN2 storage" block when no/invalid data is filled 
         regressionManufacturingSteps.CrfToStorage.noLn2Storage()


        //C24441	[NEG] Verify the "Next" Button when only Scan values are filled 
        regressionManufacturingSteps.CrfToStorage.noScanNegative(scope)

       
    }),

    it('Quality', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation)
        common.loginAs("steph");
        cy.visit("/manufacturing");
        cy.log('Quality')
        regressionManufacturingSteps.CrfToStorage.happyPath(scope, scope.coi);

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
        regressionManufacturingSteps.quality.happyPath(scope, scope.coi);

        //C24449	[NEG] Verify the "Upload Document" input field with no data file 
        //regressionManufacturingSteps.qualityReview.negativeConfirmShip()

        //C24451	[NEG] Verify the "Next" Button when the step is not signed 
        regressionManufacturingSteps.qualityReview.noSignNext()

    })
