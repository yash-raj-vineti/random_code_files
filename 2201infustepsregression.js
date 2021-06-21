transferToStorage: {
      happyPath: () => {
        cy.get('@coi').then(coi =>{
          inf_steps.infusionShipmentReceiptChecklist(coi);
          inf_steps.infusionShipmentReceiptSummary(coi);
          inf_steps.infusionProductReceiptChecklist(coi);
          inf_steps.infusionTransferProductToStorage(coi);
        });
      },
      
      //C24648 && C24650	[NEG] Verify the "Confirm" Button (s) when no data is filled. 
      coiNegative: () => {
        cy.log('[[NEG] Verify the "Confirm" Button (s) when no data is filled.');
        inputChecker.checkState(`[data-testid="coi-action-trigger-button"]`, 'be.disabled');
        inputChecker.identifierCoiLabelCheck('coi', '123', 'be.disabled');
        let bagNumber = 1
        let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
        inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
        cy.get('@coi').then(coi =>{
          inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-APH-2${bagNumber}`, 'be.disabled');
        });
      },
      //C24653	[NEG] Verify the "Check into LN2 storage" when invalid/no data is filled 
      recordNegative: () => {
        cy.log('[[NEG] Verify the "Check into LN2 storage" when invalid/no data is filled ');
        inputChecker.checkState(`[data-testid="recordButton-ln2_storage_unit"]`, 'be.disabled');
        inputChecker.enterAndConfirmNegativeCheck('ln2_storage_unit', '123', '321', 'not.be.disabled','be.disabled');
      },
      // C24652	[NEG] Verify the "Next" Button when only scan values are not filled 
      nextButtonNegativeCoi: () => {
      cy.log('Verify the "Next" Button when only Scan Values are not added.');
      inputHelpers.inputEnterAndConfirm('ln2_storage_unit', inputs.enterLn2Number);
      inputChecker.nextButtonCheck('be.disabled');
      }  
    },
