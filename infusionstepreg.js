transferToStorage: {
      happyPath: (scope) => {
        inf_steps.infusionShipmentReceiptChecklist(scope.coi);
        inf_steps.infusionShipmentReceiptSummary(scope.coi);
        inf_steps.infusionProductReceiptChecklist(scope.coi);
        inf_steps.infusionTransferProductToStorage(scope.coi);
      },
      
    //   nextButtonNegativeAll: () => {
    //     cy.log('[NEG] Verify the "Next" Button when no data is filled.');
    //     inputChecker.nextButtonCheck('be.disabled');
    // },
      // C22085
      coiNegative: (scope) => {
        cy.log('[[NEG] Verify the "Confirm" Button (s) when no data is filled.');
        inputChecker.checkState(`[data-testid="coi-action-trigger-button"]`, 'be.disabled');
        inputChecker.identifierCoiLabelCheck('coi', '123', 'be.disabled');
        let bagNumber = 1
        let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
        inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
        inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${scope.coi}-APH-2${bagNumber}`, 'be.disabled');
    },
      // C21771
    recordNegative: () => {
      cy.log('[[NEG] Verify the "Record" Button when no data is filled.');
      inputChecker.checkState(`[data-testid="recordButton-ln2_storage_unit"]`, 'be.disabled');
      inputChecker.enterAndConfirmNegativeCheck('ln2_storage_unit', '123', '321', 'not.be.disabled','be.disabled');
    },
    // C24184
    nextButtonNegativeCoi: () => {
      cy.log('Verify the "Next" Button when only Scan Bag Values not added.');
      inputHelpers.inputEnterAndConfirm('ln2_storage_unit', inputs.enterLn2Number);
      inputChecker.nextButtonCheck('be.disabled');
    }
      
    },
