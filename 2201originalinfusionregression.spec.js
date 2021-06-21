import common from '../../support/index.js';
import regressionOrderingSteps from '../../utils/ordering_steps_regression.js';
import regressionCommonHappyPath from '../../utils/commonHappyPath.js';
import regressionInfusionSteps from '../../utils/infusion_steps_regression.js';

describe('Vineti-Express Regression Path', () => {
  let scope = {};
  Cypress.env('runWithHelpers', false);

  describe('Infusion Flow', () => {
    beforeEach(() => {
        regressionOrderingSteps.orderingData(scope);
        regressionCommonHappyPath.commonOrderingSteps(scope);
        
    });
      
      it('Shipment Receipt Checklist', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        regressionCommonHappyPath.commonManufacturingSteps(scope);
        common.loginAs("phil");
        cy.visit("/infusion");
        cy.get(".patient-id").contains(scope.patientInformation.subjectId).click();
        // C24545	[NEG] Verify the Serial Number "Confirm" button .
        regressionInfusionSteps.shipmentReceiptChecklist.verifySerialConfirmBtn();

        // C24546	[NEG] Verify the "Next" button when only COI is not filled . 
        regressionInfusionSteps.shipmentReceiptChecklist.nextButtonNegativeNoCoi();

        // C24544	[NEG] Verify the COI "Confirm" button . 
        regressionInfusionSteps.shipmentReceiptChecklist.verifyCoiConfirmBtn();
        // C24550	[NEG] Verify the "Next" button when only the first toggle is not set .
        regressionInfusionSteps.shipmentReceiptChecklist.nextButtonNegativeNoToggleOne();
        //C24551	[NEG] Verify the "Next" button when only the second toggle is not set . 
        regressionInfusionSteps.shipmentReceiptChecklist.nextButtonNegativeNoToggleTwo();
        // C24552	[POS] Verify the "Next" button when the toggles are set to "NO". 
        regressionInfusionSteps.shipmentReceiptChecklist.nextButtonPosToggleNo();
    }),


    it('Shipment Receipt Summary', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        regressionCommonHappyPath.commonManufacturingSteps(scope);
        common.loginAs("phil");
        cy.visit("/infusion");
        cy.get(".patient-id").contains(scope.patientInformation.subjectId).click();
        regressionInfusionSteps.shipmentReceiptChecklist.happyPath();

        // C24485 [NEG] Verify the "Next" Button is disabled when the step is not signed.
        regressionInfusionSteps.shipmentReceiptSummary.noSignatureCheck();

        // C24486 [NEG] Verify the "Print Summary" Button is disabled when "Your Signature" and "Verifier Signature" is not confirmed.
        regressionInfusionSteps.shipmentReceiptSummary.noSignaturePrintSummary();

        // C24487 [POS] Verify the "Print Summary" Button works when "Your Signature" and "Verifier Signature" is confirmed.
        regressionInfusionSteps.shipmentReceiptSummary.signaturePrintSummaryPos();
    }),

    it('Product Receipt Checklist', ()=> {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        regressionCommonHappyPath.commonManufacturingSteps(scope);
        common.loginAs("phil");
        cy.visit("/infusion");
        cy.get(".patient-id").contains(scope.patientInformation.subjectId).click();
        regressionInfusionSteps.shipmentReceiptSummary.happyPath();

        // C24539 [NEG] Verify the "Next" button when no data is entered in any field.
        regressionInfusionSteps.productReceiptChecklist.nextNoData();

        // C24534 [NEG] Verify the "Confirm" button.
        regressionInfusionSteps.productReceiptChecklist.verifyConfirmBtn();

        // C24535 [NEG] Verify the "Next" button when 'NO' is selected without additional comments in one of the toggle.
        regressionInfusionSteps.productReceiptChecklist.noWithoutComments();

        // C24536 [POS] Verify the "Next" button when 'NO' is selected with some additional comments in one of the toggle.
        regressionInfusionSteps.productReceiptChecklist.noWithComments();

        // C24538 [POS] Verify the "Next" button when NO is selected in both the toggles with some additional comments.
        regressionInfusionSteps.productReceiptChecklist.noWithBothAdditionalComment();
    }),

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

    it('Product Reciept Summary', () => {
        regressionCommonHappyPath.commonCollectionSteps(scope, scope.patientInformation);
        regressionCommonHappyPath.commonManufacturingSteps(scope);
        common.loginAs("phil");
        cy.visit("/infusion");
        cy.get(".patient-id").contains(scope.patientInformation.subjectId).click();
        regressionInfusionSteps.transferToStorage.happyPath();

        // C24488 [NEG] Verify the "Next" Button is disabled when the step is not signed.
        regressionInfusionSteps.productRecieptSummary.noSignatureCheck();

        // C24489 [NEG] Verify the "Print Summary" Button is disabled when "Your Signature" and "Verifier Signature" is not confirmed.
        regressionInfusionSteps.productRecieptSummary.noSignaturePrintSummary();

        // C24490 [POS] Verify the "Print Summary" Button works when "Your Signature" and "Verifier Signature" is confirmed.
        regressionInfusionSteps.productRecieptSummary.signaturePrintSummaryPos();
    
    })
})
})
