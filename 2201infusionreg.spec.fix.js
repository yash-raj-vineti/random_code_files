it('Transfer To Storage', ()=> {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        regressionCommonHappyPath.commonManufacturingSteps(scope);
        common.loginAs("phil");
        cy.visit("/infusion");
        cy.get(".patient-id").contains(scope.patientInformation.subjectId).click();
        regressionInfusionSteps.productReceiptChecklist.happyPath();

        //C24648 && C24650	[NEG] Verify the "Confirm" Button (s) when no data is filled. 
        regressionInfusionSteps.transferToStorage.coiNegative();
        //C24653	[NEG] Verify the "Check into LN2 storage" when invalid/no data is filled  
        regressionInfusionSteps.transferToStorage.recordNegative();
        // C24652	[NEG] Verify the "Next" Button when only scan values are not filled   
        regressionInfusionSteps.transferToStorage.nextButtonNegativeCoi();
      }),
