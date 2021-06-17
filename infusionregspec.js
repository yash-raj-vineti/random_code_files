it.only('Transfer To Storage', ()=> {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        regressionCommonHappyPath.commonManufacturingSteps(scope);
        common.loginAs("phil");
        cy.visit("/infusion");
        cy.get(".patient-id").contains(scope.patientInformation.subjectId).click();
        regressionInfusionSteps.productReceiptChecklist.happyPath(scope);
        // C21766 [NEG] Verify the "Next" Button is disabled when no data is filled. 
       // regressionInfusionSteps.transferToStorage.nextButtonNegativeAll();
        //C22085	[NEG] Verify the "Confirm" Button (s) when no data is filled.  
        regressionInfusionSteps.transferToStorage.coiNegative(scope.coi);
        //C21771	[NEG] Verify the "Record" Button when no data is filled.  
        regressionInfusionSteps.transferToStorage.recordNegative();
        // C24184	[NEG] Verify the "Next" Button when only Scan bag values are not added.   
        regressionInfusionSteps.transferToStorage.nextButtonNegativeCoi();
      }),
