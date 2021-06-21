harvest: {
        happyPath: (scope) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get('@coi').then(coi =>{
                cy.get(".manufacturing-row_coi").contains("div", coi).click();
                m_steps.collectionSiteLabels();
                m_steps.shipLabelsToCollectionSite(coi);
                m_steps.labelShippingSummary();
                m_steps.lotNumber(input.lotNumber);
                m_steps.summaryDocuments(input.lotNumber, scope);
                m_steps.shipmentReceiptChecklist(scope);
                m_steps.shipmentReceiptSummary(coi);
                m_steps.productReceipt(coi);
                m_steps.transferToStorage(coi);
                m_steps.productReceiptSummary(coi);
                m_steps.bagSelection();
                m_steps.startManufacturing(coi);
                m_steps.finishedProductLabels();
                m_steps.fpLabel();
                m_steps.harvest(coi);
            });
        },

        // C24397   [NEG] Verify "Scan Bag 1" Confirm button when no/invalid data is filled 
        negativeConfirmShip: () => {
            cy.log('Verify "Scan Bag 1" Confirm button when no/invalid data is filled ');
            inputChecker.checkState(`[data-testid="bag-identifier-1-button"]`, 'be.disabled');
            cy.get('@coi').then(coi =>{
                let bagNumber = 1
                let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`;
                inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
                inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-FP-02${bagNumber}`, 'be.disabled');
                cy.wait(1000); 
            });
        },

        // C24453 [NEG] Verify "Next" button when label is not applied 
        negativeNextLabel: () => {
            cy.log('[NEG] Verify the "Next" Button when label is not applied');
            inputChecker.clearField('[data-testid="bag-identifier-1-input"]');
            cy.get('@coi').then(coi =>{
                inputChecker.inputCoiWithPlaceholder('[data-testid="bag-identifier-1-input"]',`${coi}`,'FP-01');
            });
            inputHelpers.clicker('[data-testid="bag-identifier-1-button"]');
            inputChecker.nextButtonCheck('be.disabled');
        }
    },

    transferToCrf: {
        happyPath: (scope) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get('@coi').then(coi =>{
                cy.get(".manufacturing-row_coi").contains("div", coi).click();
                m_steps.collectionSiteLabels();
                m_steps.shipLabelsToCollectionSite(coi);
                m_steps.labelShippingSummary();
                m_steps.lotNumber(input.lotNumber);
                m_steps.summaryDocuments(input.lotNumber, scope);
                m_steps.shipmentReceiptChecklist(scope);
                m_steps.shipmentReceiptSummary(coi);
                m_steps.productReceipt(coi);
                m_steps.transferToStorage(coi);
                m_steps.productReceiptSummary(coi);
                m_steps.bagSelection();
                m_steps.startManufacturing(coi);
                m_steps.finishedProductLabels();
                m_steps.fpLabel();
                m_steps.harvest(coi);
                m_steps.transferToCrf(coi);
            });
        },

        //C24821    [NEG] Verify the "Scan bag 1" confirm button when invalid/no data is entered 
        noScanBagConfirm: () => {
            cy.log('Verify "Scan Bag 1" Confirm button when no/invalid data is filled ');
            inputChecker.checkState(`[data-testid="bag-identifier-1-button"]`, 'be.disabled');
            cy.get('@coi').then(coi =>{
                let bagNumber = 1
                let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`;
                inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
                inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-FP-3${bagNumber}`, 'be.disabled');
                cy.wait(1000);
            });    
        },

        //C24823    [NEG] Verify the "Next" Button when only scan bag 1 values are filled 
        singleValueScanBag: () => {
            cy.log('[NEG] Verify the "Next" Button when Signature is not confirmed.');
            inputChecker.clearField('[data-testid="bag-identifier-1-input"]');
            cy.get('@coi').then(coi =>{
                inputChecker.inputCoiWithPlaceholder('[data-testid="bag-identifier-1-input"]',coi,'FP-01');
            });
            inputHelpers.clicker('[data-testid="bag-identifier-1-button"]');
            cy.wait(2000);
            inputChecker.nextButtonCheck('be.disabled');
        
        },

         // C24825  [NEG] Verify the "Check into CRF" record button when invalid/no data is filled 
         noCheckCrf: () => {
            cy.log('[[NEG] Verify the "Check into CRF" record Button when no data is filled.');
            inputChecker.checkState(`[data-testid="recordButton-crf_freezer_id"]`, 'be.disabled'); 
            inputChecker.enterConfirmCheckNegative('crf_freezer_id', '123', '321', 'be.disabled');
        }
    },

    CrfToStorage: {
        happyPath: (scope) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get('@coi').then(coi =>{
                cy.get(".manufacturing-row_coi").contains("div", coi).click();
                m_steps.collectionSiteLabels();
                m_steps.shipLabelsToCollectionSite(coi);
                m_steps.labelShippingSummary();
                m_steps.lotNumber(input.lotNumber);
                m_steps.summaryDocuments(input.lotNumber, scope);
                m_steps.shipmentReceiptChecklist(scope);
                m_steps.shipmentReceiptSummary(coi);
                m_steps.productReceipt(coi);
                m_steps.transferToStorage(coi);
                m_steps.productReceiptSummary(coi);
                m_steps.bagSelection();
                m_steps.startManufacturing(coi);
                m_steps.finishedProductLabels();
                m_steps.fpLabel();
                m_steps.harvest(coi);
                m_steps.transferToCrf(coi);
                m_steps.crfToStorage(coi);
            });
        },

        //C24432    [NEG] Verify the "Check out of CRF" Confirm Button when invalid/empty data is entered 
        negativeCheckOutCrf: () => {
            inputChecker.checkState(`[data-testid="crf-freezer-id-action-trigger-button"]`, 'be.disabled'); 
        
        },

        //C24436    [NEG] Verify the "Scan Bag" Button when no/incorrect data is filled.  
        negativeScanButton: () => {
            inputChecker.checkState(`[data-testid="bag-identifier-1-button"]`, 'be.disabled');
            cy.get('@coi').then(coi =>{
                let bagNumber = 1
                let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`;
                inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
                inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-FP-4${bagNumber}`, 'be.disabled');
                cy.wait(1000); 
            });
        
        },

         //C24447   [NEG] Verify "" Check into LN2 storage" block when no/invalid data is filled
         noLn2Storage: () => {
            cy.log('[[NEG] Verify the "Check into CRF" record Button when no data is filled.');
            inputChecker.checkState(`[data-testid="recordButton-product_ln2_storage_unit"]`, 'be.disabled'); 
            inputChecker.enterConfirmCheckNegative('product_ln2_storage_unit', '123', '321', 'be.disabled');
        
        },

         //C24441   [NEG] Verify the "Next" Button when only Scan values are filled 
        noScanNegative: () => {
            cy.log('Verify the "Next" Button when only Scan Values are added.');// 
            inputHelpers.inputSingleField('[data-testid="crf-freezer-id-input-field"]', input.enterMfgCrfFreezerId);
            inputHelpers.clicker('[data-testid="crf-freezer-id-action-trigger-button"]');
            cy.get('@coi').then(coi =>{
                inputHelpers.scanAndVerifyBags('bag-identifier-1', `${coi}-FP-01`);
            });
            inputChecker.nextButtonCheck('be.disabled');
            cy.wait(1000);
          
        }

    },

    quality: {
        happyPath: (scope) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get('@coi').then(coi =>{
                cy.get(".manufacturing-row_coi").contains("div", coi).click();
                m_steps.collectionSiteLabels();
                m_steps.shipLabelsToCollectionSite(coi);
                m_steps.labelShippingSummary();
                m_steps.lotNumber(input.lotNumber);
                m_steps.summaryDocuments(input.lotNumber, scope);
                m_steps.shipmentReceiptChecklist(scope);
                m_steps.shipmentReceiptSummary(coi);
                m_steps.productReceipt(coi);
                m_steps.transferToStorage(coi);
                m_steps.productReceiptSummary(coi);
                m_steps.bagSelection();
                m_steps.startManufacturing(coi);
                m_steps.finishedProductLabels();
                m_steps.fpLabel();
                m_steps.harvest(coi);
                m_steps.transferToCrf(coi);
                m_steps.crfToStorage(coi);
                m_steps.qualityDocuments();
            });
        },

        //C24449    [NEG] Verify the "Upload Document" input field with no data file 
        negativeConfirmShip: () => {
            cy.log('Quality Documents')
            inputCheckHelpers.nextButtonCheck('be.disabled')
      
        }
    },

    qualityReview: {
        happyPath: (scope) => {
            cy.log('fp Label')
            common.loginAs("steph");
            cy.visit("/manufacturing");
            cy.get('@coi').then(coi =>{
                cy.get(".manufacturing-row_coi").contains("div", coi).click();
                m_steps.collectionSiteLabels();
                m_steps.shipLabelsToCollectionSite(coi);
                m_steps.labelShippingSummary();
                m_steps.lotNumber(input.lotNumber);
                m_steps.summaryDocuments(input.lotNumber, scope);
                m_steps.shipmentReceiptChecklist(scope);
                m_steps.shipmentReceiptSummary(coi);
                m_steps.productReceipt(coi);
                m_steps.transferToStorage(coi);
                m_steps.productReceiptSummary(coi);
                m_steps.bagSelection();
                m_steps.startManufacturing(coi);
                m_steps.finishedProductLabels();
                m_steps.fpLabel();
                m_steps.harvest(coi);
                m_steps.transferToCrf(coi);
                m_steps.crfToStorage(coi);
                m_steps.qualityDocuments();
                m_steps.qualityReview()
            });
        },
        
        noSignNext: () => {
            inputHelpers.clicker('[data-testid="primary-button-action"]');

            inputCheckHelpers.nextButtonCheck('be.disabled');
        },
    },
