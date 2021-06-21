import inputCheckHelpers from './shared_block_helpers/inputFieldCheckHelpers';
import signatureHelpers from './shared_block_helpers/signatureHelpers';
import inf_steps from '../utils/infusion_steps';
import inputs from '../fixtures/inputs.json';
import inputChecker from '../utils/shared_block_helpers/inputFieldCheckHelpers';
import inputHelpers from './shared_block_helpers/inputFieldHelpers';


export default { 
  infusionAliases: () => {
    cy.server();
    cy.route("DELETE", "/auth/sign_out").as("logout");
    cy.route("GET", "/physicians*").as("getStepPhysicians");
    cy.route("POST", "/signatures").as("postSignature");
    cy.route("POST", "/graphql").as("patients");
    cy.route("GET", "/therapies").as("products");
    cy.route("POST", "/procedures").as("postProcedures");
    cy.route("PATCH", "/procedure_steps/*").as("patchProcedureSteps");
    cy.route("GET", "/procedures/*").as("getProcedures");
    cy.route("GET", "/scheduling/schedules/*").as("schedulingServiceSchedule");
    cy.route("POST", "/scheduling/schedules").as("schedulingServiceCreate");
    cy.route(
      "POST",
      new RegExp("/scheduling/schedules/US:waterhood:clinical-auto:1931/draft")
    ).as("schedulingServiceDraft");
    cy.route(
      "POST",
      new RegExp(
        "/scheduling/schedules/US:waterhood:clinical-auto:1931/availability"
      )
    ).as("schedulingServiceAvailability");
    cy.route("GET", "/procedures?procedure_type=ordering").as(
      "getProcedureTypeOrdering"
    );
    cy.route("POST", "/print").as("postPrint");
    cy.route("POST", "/label_scans/verifications").as("labelVerifications");
    cy.route("POST", "/label_scans/values").as("createLabelScanValue");
    cy.route("GET", "v1/institution_types").as("getInstitutions");
  },

  shipmentReceiptChecklist: {
    happyPath: () => {
      cy.get('@coi').then(coi =>{
        inf_steps.infusionShipmentReceiptChecklist(coi);
      });
    },
    // C24545
      verifySerialConfirmBtn: () => {
        cy.log('[NEG] Verify the Serial Number "Confirm" button .');
        inputCheckHelpers.checkState('[data-testid="infusion-shipper-serial-number-action-trigger-button"]','be.disabled');
        inputCheckHelpers.identifierCoiLabelCheck('infusion-shipper-serial-number','123','be.disabled');
    },
       // C24546
      nextButtonNegativeNoCoi: () => {
        cy.log('[NEG] Verify the "Next" button when only COI is not filled ');
        inputCheckHelpers.checkState('[data-testid="coi-action-trigger-button"]','be.disabled');
        inputHelpers.scanAndVerifyCoi('infusion-shipper-serial-number', inputs.mfgShippingChecklistInfusionShipperSerialNumber)
        inputHelpers.clicker('[data-testid="pass-button-infusion_shipping_container_intact"]')
        inputHelpers.clicker('[data-testid="pass-button-infusion_seal_on_shipper_intact"]')
        inputHelpers.inputSingleField('[data-testid="#/properties/shipping_receipt_checklist/properties/infusion_additional_comments-input"]', inputs.comment)
        inputCheckHelpers.nextButtonCheck('be.disabled')
    },
      // C24544
      verifyCoiConfirmBtn: () => {
        cy.log('[NEG] Verify the COI "Confirm" button ');
        inputCheckHelpers.checkState('[data-testid="coi-action-trigger-button"]','be.disabled');
        inputCheckHelpers.confirmCoiLabelBlock('coi','rpcngor','be.disabled');
        inputCheckHelpers.confirmCoiLabelBlock('coi','msd87723','be.disabled');
        inputCheckHelpers.confirmCoiLabelBlock('coi','WTH.VFOZBH.F62.','be.disabled');
    },
      // C24550
      nextButtonNegativeNoToggleOne: () => {
        cy.log('[NEG] Verify the "Next" button when only the first toggle is not set .');
        cy.get('@coi').then(coi =>{
          inputHelpers.scanAndVerifyCoi('coi', coi);
        });
        inputHelpers.clicker('[data-testid="pass-button-infusion_seal_on_shipper_intact"]')
        inputHelpers.inputSingleField('[data-testid="#/properties/shipping_receipt_checklist/properties/infusion_additional_comments-input"]', inputs.comment)
        inputCheckHelpers.nextButtonCheck('be.disabled')
    },
      // C24550
      nextButtonNegativeNoToggleTwo: () => {
        cy.log('[NEG] Verify the "Next" button when only the second toggle is not set .');
        cy.reload();
        inputHelpers.clicker('[data-testid="pass-button-infusion_shipping_container_intact"]')
        inputHelpers.inputSingleField('[data-testid="#/properties/shipping_receipt_checklist/properties/infusion_additional_comments-input"]', inputs.comment)
        inputCheckHelpers.nextButtonCheck('be.disabled')
    },
      // C24552
      nextButtonPosToggleNo: () => {
        cy.log('[POS] Verify the "Next" button when the toggles are set to "NO".');
        inputCheckHelpers.clickOnCheck('[data-testid="fail-button-infusion_seal_on_shipper_intact"]', 'be.disabled')
        inputCheckHelpers.clickOnCheck('[data-testid="fail-button-infusion_shipping_container_intact"]', 'be.disabled')
        inputCheckHelpers.inputSingleFieldCheck('[data-testid="#/properties/shipping_receipt_checklist/properties/infusion_seal_on_shipper_intact_reason-input"]','Reason1','be.disabled');
        inputCheckHelpers.inputSingleFieldCheck('[data-testid="#/properties/shipping_receipt_checklist/properties/infusion_shipping_container_intact_reason-input"]','Reason2','not.be.disabled');
    },
  },

  shipmentReceiptSummary: {
    happyPath: () => {
      cy.get('@coi').then(coi =>{
        inf_steps.infusionShipmentReceiptChecklist(coi);
        inf_steps.infusionShipmentReceiptSummary(coi);
      });
    },

    noSignatureCheck: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when the step is not signed.')
        inputCheckHelpers.nextButtonCheck('be.disabled')
    },

    noSignaturePrintSummary: () => {
        cy.log('[NEG] Verify the "Print Summary" Button is disabled when "Your Signature" and "Verifier Signature" is not confirmed.')
        inputCheckHelpers.checkState('[name="viewDocumentPrintSummary"]', 'be.disabled')
    },

    signaturePrintSummaryPos: () => {
        cy.log('[POS] Verify the "Print Summary" Button works when "Your Signature" and "Verifier Signature" is confirmed.')
        signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
        signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], 'phil3@vineti.com');

        inputCheckHelpers.checkState('[name="viewDocumentPrintSummary"]', 'be.enabled')
    }
},

    productReceiptChecklist: {
      happyPath: () => {
        cy.log('Product Receipt Checklist');
        cy.get('@coi').then(coi =>{
          inf_steps.infusionShipmentReceiptChecklist(coi);
          inf_steps.infusionShipmentReceiptSummary(coi);
          inf_steps.infusionProductReceiptChecklist(coi);
        });
      },

      // C24539
      nextNoData: () => {
        cy.log('[NEG] Verify the "Next" button when no data is entered in any field.');
        inputCheckHelpers.nextButtonCheck('be.disabled');
      },

      // C24534
      verifyConfirmBtn: () => {
        cy.log('[NEG] Verify the "Confirm" button.');
        inputCheckHelpers.checkState('[data-testid="bag-identifier-1-button"]','be.disabled');
        inputCheckHelpers.bagIdentifierCoiCheck('bag-identifier-1','rpcngor','be.disabled');
        inputCheckHelpers.bagIdentifierCoiCheck('bag-identifier-1','msd87723','be.disabled');
        inputCheckHelpers.bagIdentifierCoiCheck('bag-identifier-1','WTH.VFOZBH.F62.','be.disabled');
      },

      // C24535
      noWithoutComments: () => {
        cy.log('[NEG] Verify the "Next" button when "NO" is selected without additional comments in one of the toggle.');
        cy.get('@coi').then(coi =>{
          inputCheckHelpers.inputSingleFieldCheck('[data-testid="bag-identifier-1-input"]',`${coi}-FP-01`,'be.disabled');
        });
        inputCheckHelpers.clickOnCheck('[data-testid="pass-button-temperature_out_of_range"]','be.disabled');
        inputCheckHelpers.clickOnCheck('[data-testid="bag-identifier-1-button"]','be.disabled');
        inputCheckHelpers.clickOnCheck('[data-testid="fail-button-investigational_product"]','be.disabled');
        inputCheckHelpers.inputClearCheck('[data-testid="#/properties/product_receipt_checklist/properties/investigational_product_reason-input"]','be.disabled');
      },

      // C24536
      noWithComments: () => {
        cy.log('[POS] Verify the "Next" button when "NO" is selected with some additional comments in one of the toggle.');
        inputCheckHelpers.inputSingleFieldCheck('[data-testid="#/properties/product_receipt_checklist/properties/investigational_product_reason-input"]','Reason three','not.be.disabled');
      },

      // C24538
      noWithBothAdditionalComment: () => {
        cy.log('[POS] Verify the "Next" button when "NO" is selected in both the toggles with some additional comments.');
        inputCheckHelpers.clickOnCheck('[data-testid="fail-button-temperature_out_of_range"]','be.disabled');
        inputCheckHelpers.inputSingleFieldCheck('[data-testid="#/properties/product_receipt_checklist/properties/temperature_out_of_range_reason-input"]','Reason four','not.be.disabled');
      }
    },

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


    productRecieptSummary: {
      // C24488
      noSignatureCheck: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when the step is not signed.')
        inputCheckHelpers.nextButtonCheck('be.disabled')
      },

      // C24489
      noSignaturePrintSummary: () => {
          cy.log('[NEG] Verify the "Print Summary" Button is disabled when "Your Signature" and "Verifier Signature" is not confirmed.')
          inputCheckHelpers.checkState('[name="viewDocumentPrintSummary"]', 'be.disabled')
      },

      // C24490
      signaturePrintSummaryPos: () => {
          cy.log('[POS] Verify the "Print Summary" Button works when "Your Signature" and "Verifier Signature" is confirmed.')
          signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
          signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], 'phil3@vineti.com');
          inputCheckHelpers.checkState('[name="viewDocumentPrintSummary"]', 'be.enabled')
      }
    }
}
