harvest: {
        happyPath: (scope, coi) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
            m_steps.harvest(coi);
        },

        // C24397 	[NEG] Verify "Scan Bag 1" Confirm button when no/invalid data is filled 
        negativeConfirmShip: (coi) => {
            cy.log('Verify "Scan Bag 1" Confirm button when no/invalid data is filled ');
            inputChecker.checkState(`[data-testid="bag-identifier-1-button"]`, 'be.disabled');
            let bagNumber = 1
            let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
                inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
                inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-FP-0${bagNumber}`, 'be.disabled');
                cy.wait(1000); // yahan pe confirm button ka data test id replace karo
        },

        // C24453 [NEG] Verify "Next" button when label is not applied 
        negativeNextLabel: (coi) => {
            cy.log('[NEG] Verify the "Next" Button when label is not applied');
            inputChecker.clearField('[data-testid="bag-identifier-1-input"]'); // yahan upar wale test id daal ke coi aph-01 check karke value bharo phir ho jaega
            inputChecker.inputCoiWithPlaceholder('[data-testid="bag-identifier-1-input"]',`${coi}`,'FP-01');
            inputHelpers.clicker('[data-testid="bag-identifier-1-button"]');
            inputChecker.nextButtonCheck('be.disabled');
        }

    },

    transferToCrf: {
        happyPath: (scope, coi) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
            m_steps.harvest(coi);
            m_steps.transferToCrf(coi);
        },

        //C24821	[NEG] Verify the "Scan bag 1" confirm button when invalid/no data is entered 
        noScanBagConfirm: (scope) => {
            cy.log('Verify "Scan Bag 1" Confirm button when no/invalid data is filled ');
            inputChecker.checkState(`[data-testid="bag-identifier-1-button"]`, 'be.disabled');
            let bagNumber = 1
            let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
                inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
                inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${scope.coi}-FP-3${bagNumber}`, 'be.disabled');
                cy.wait(1000); // yahan pe confirm button ka data test id replace karo
         // yahan pe confirm button ka data test id replace karo
        },

        //C24823	[NEG] Verify the "Next" Button when only scan bag 1 values are filled 
        singleValueScanBag: (scope) => {
            cy.log('[NEG] Verify the "Next" Button when Signature is not confirmed.');
            inputChecker.clearField('[data-testid="bag-identifier-1-input"]'); // yahan upar wale test id daal ke coi aph-01 check karke value bharo phir ho jaega
            inputChecker.inputCoiWithPlaceholder('[data-testid="bag-identifier-1-input"]',scope.coi,'FP-01');
            inputHelpers.clicker('[data-testid="bag-identifier-1-button"]');
            //inputHelpers.scanAndVerifyBags('bag-identifier-1',`${scope.coi}-FP-01`);
            cy.wait(2000);
            inputChecker.nextButtonCheck('be.disabled');
        
        },

         // C24825	[NEG] Verify the "Check into CRF" record button when invalid/no data is filled 
         noCheckCrf: () => {
            cy.log('[[NEG] Verify the "Check into CRF" record Button when no data is filled.');
            inputChecker.checkState(`[data-testid="recordButton-crf_freezer_id"]`, 'be.disabled'); // yahan check intto crf ki test id daalo
            inputChecker.enterConfirmCheckNegative('crf_freezer_id', '123', '321', 'be.disabled');
        }

    },

    CrfToStorage: {
        happyPath: (scope, coi) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
            m_steps.harvest(coi);
            m_steps.transferToCrf(coi);
            m_steps.crfToStorage(coi);
        },

        //C24432	[NEG] Verify the "Check out of CRF" Confirm Button when invalid/empty data is entered 
        negativeCheckOutCrf: () => {
            inputChecker.checkState(`[data-testid="crf-freezer-id-action-trigger-button"]`, 'be.disabled'); // yahan pe confirm button ka data test id replace karo
        
        },

        //C24436	[NEG] Verify the "Scan Bag" Button when no/incorrect data is filled.  
        negativeScanButton: (scope) => {
            inputChecker.checkState(`[data-testid="bag-identifier-1-button"]`, 'be.disabled');
            let bagNumber = 1
            let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
                inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
                inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${scope.coi}-FP-4${bagNumber}`, 'be.disabled');
                cy.wait(1000); // yahan pe confirm button ka data test id replace karo
          // yahan pe confirm button ka data test id replace karo
        
        },

         //C24447	[NEG] Verify "" Check into LN2 storage" block when no/invalid data is filled
         noLn2Storage: () => {
            cy.log('[[NEG] Verify the "Check into CRF" record Button when no data is filled.');
            inputChecker.checkState(`[data-testid="recordButton-product_ln2_storage_unit"]`, 'be.disabled'); // yahan check intto crf ki test id daalo
            inputChecker.enterConfirmCheckNegative('product_ln2_storage_unit', '123', '321', 'be.disabled');
        
        },

         // C24440	[NEG] Verify the "Record Button when no data is filled 
        // negativeRecord: () => {
        //     cy.log('[[NEG] Verify the "Check into CRF" record Button when no data is filled.');
        //     inputChecker.checkState(`[data-testid="recordButton-shipper_serial_number"]`, 'be.disabled'); // yahan check intto crf ki test id daalo
        //     inputChecker.enterConfirmCheckNegative('shipper_serial_number', '123', '321', 'be.disabled');
        
        // },

         //C24441	[NEG] Verify the "Next" Button when only Scan values are filled 
        noScanNegative: (scope) => {
            cy.log('Verify the "Next" Button when only Scan Values are added.');// 
            inputHelpers.inputSingleField('[data-testid="crf-freezer-id-input-field"]', input.enterMfgCrfFreezerId);// idhar scan crf aur ln2 storage ki value daalo
            inputHelpers.clicker('[data-testid="crf-freezer-id-action-trigger-button"]');
            inputHelpers.scanAndVerifyBags('bag-identifier-1', `${scope.coi}-FP-01`);
    

            // inputChecker.checkState(`[data-testid="recordButton-product_ln2_storage_unit"]`, 'be.disabled'); // yahan check intto crf ki test id daalo
            // inputChecker.enterConfirmCheckNegative('product_ln2_storage_unit', '121', '121', 'be.enabled');
            // inputHelpers.clicker('[data-testid="recordButton-product_ln2_storage_unit"]');
            inputChecker.nextButtonCheck('be.disabled');
            cy.wait(1000);
          
        }

    },

    quality: {
        happyPath: (scope, coi) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
            m_steps.harvest(coi);
            m_steps.transferToCrf(coi);
            m_steps.crfToStorage(coi);
            m_steps.qualityDocuments();
        },

        //C24449	[NEG] Verify the "Upload Document" input field with no data file 
        negativeConfirmShip: () => {
            cy.log('Quality Documents')
            inputCheckHelpers.nextButtonCheck('be.disabled')
      
        },

        // //C24451	[NEG] Verify the "Next" Button when the step is not signed  
        // noSignNext: () => {
        //     inputCheckHelpers.nextButtonCheck('be.disabled');
        // }
    },

    qualityReview: {
        happyPath: (scope) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get(".manufacturing-row_coi").contains("div", scope.coi).click();
            m_steps.collectionSiteLabels();
            m_steps.shipLabelsToCollectionSite(scope.coi);
            m_steps.labelShippingSummary();
            m_steps.lotNumber(input.lotNumber);
            m_steps.summaryDocuments(input.lotNumber, scope);
            m_steps.shipmentReceiptChecklist(scope);
            m_steps.shipmentReceiptSummary(scope.coi);
            m_steps.productReceipt(scope.coi);
            m_steps.transferToStorage(scope.coi);
            m_steps.productReceiptSummary(scope.coi);
            m_steps.bagSelection();
            m_steps.startManufacturing(scope.coi);
            m_steps.finishedProductLabels();
            m_steps.fpLabel();
            m_steps.harvest(coi);
            m_steps.transferToCrf(coi);
            m_steps.crfToStorage(coi);
            m_steps.qualityDocuments();
            m_steps.qualityReview()
        },

        // //C24449	[NEG] Verify the "Upload Document" input field with no data file 
        // negativeConfirmShip: () => {
        //     cy.log('idmTestResults')
        //     inputCheckHelpers.nextButtonCheck('be.disabled')
      
        // },

        //C24451	[NEG] Verify the "Next" Button when the step is not signed 
        
             
        noSignNext: () => {
            inputHelpers.clicker('[data-testid="primary-button-action"]');

            inputCheckHelpers.nextButtonCheck('be.disabled');
        }
    }
