import inputs from '../fixtures/inputs.json';
import sharedConstants from "../fixtures/assertions.json";
import regressionInput from '../fixtures/inputsRegression.json';
import inputCheckHelpers from './shared_block_helpers/inputFieldCheckHelpers';
import inputChecker from '../utils/shared_block_helpers/inputFieldCheckHelpers';
import actionButtonsHelper from './shared_block_helpers/actionButtonHelpers';
import inputHelpers from './shared_block_helpers/inputFieldHelpers';
import orderingSteps from '../utils/ordering_steps';
import signatureHelpers from './shared_block_helpers/signatureHelpers';
import col_steps from "../utils/collection_steps";
export default { 
    collectionAliases: () => {
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

    idmTestResults: {
      happyPath: (treatmentInformation) => {
        cy.log('idmTestResults')
        col_steps.testResults(treatmentInformation);
      },

      docUploadNegative: () =>{
        cy.log('idmTestResults')
        inputCheckHelpers.nextButtonCheck('be.disabled')
      }
    },

    patientVerification: {
      happyPath: () => {
        cy.log('patientVerification')
        col_steps.patientId();
      },

      nextButtonNegative: () => {
        cy.log('patientVerification')
        inputCheckHelpers.nextButtonCheck('be.disabled')
      },

      printSummaryNegative: () => {
        cy.log('patientVerification')
        inputCheckHelpers.checkState('[name="viewDocumentPrintSummary"]', 'be.disabled')
      },

      printSummaryPositive: () => {
        cy.log('patiendVerification')
        signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
        signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'],inputs.verifier[0]);
        inputCheckHelpers.checkState('[name="viewDocumentPrintSummary"]', 'be.enabled')
      }
    },

    // Collection Session
    collectionSession: {
      happyPath: () => {
        cy.log('Collection Session');
        col_steps.collectionProcedure();
      },

      // C21675
      noDataFilledNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when no data is filled.');
        inputChecker.checkState('[data-testid="secondary-button-action"]','not.be.disabled')
        inputChecker.nextButtonCheck('be.disabled');
      },

      // C24107
      patientWeightInputOnlyNegative: () => {
        cy.log('[NEG] Verify that "Next" Button is disabled when only "Patient Weight" is filled and "Was CBC collected prior to apheresis?" is empty.');
        inputChecker.inputSingleFieldCheck('[id="#/properties/patient_weight-input"]', inputs.patientWeight, 'be.disabled');
        inputChecker.nextButtonCheck('be.disabled');
        cy.wait(1000);
      },

      // C24108
      apheresisSelectedOnlyNegative: () => {
        cy.log('[NEG] Verify that "Next" Button is disabled when only "Was CBC collected prior to apheresis?" is filled and "Patient Data" is empty.');
        cy.wait(1000);
        inputChecker.inputClearCheck("[data-testid='#/properties/patient_weight-input']", 'be.disabled');
        inputHelpers.clicker('[data-testid="pass-button-cbc_collected"]');
        inputChecker.nextButtonCheck('be.disabled');
        cy.wait(1000);
      },

      // C21684
      reasonforChangePositive: () => {
        cy.log('[POS] Verify that a reason for change is asked upon changing values');
        cy.log('Weight Change');
        cy.reload();
        inputHelpers.clicker('[data-testid="pass-button-cbc_collected"]');
        inputHelpers.inputSingleField('[id="#/properties/patient_weight-input"]', inputs.patientWeight);
        inputHelpers.inputDateField('input[id="#/properties/apheresis_date-input"]',`${inputs.apheresisDate}{enter}`);
        inputHelpers.inputSingleField('[id="#/properties/custom_fields/properties/apheresis_equipment-input"]', inputs.apheresisEquipment);
        actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
          apiAliases: ['@patchProcedureSteps', '@getProcedures']
        });

        cy.wait(2000);
        inputHelpers.clicker('[data-testid="back-nav-link"]');
        cy.wait(['@getProcedures']);
        inputHelpers.inputSingleField('[id="#/properties/patient_weight-input"]', inputs.patientWeight+10);
        inputHelpers.clicker('[data-testid="primary-button-action"]');
        cy.get('[data-testid="reason-for-change-textarea"]').clear().type('Reason');
        inputHelpers.clicker('[data-testid="reason-for-change-save"]');
        cy.wait(['@patchProcedureSteps', '@getProcedures']);
      }
    },

    // Collection Bag Identification
    collectionBagIdentification: {
      happyPath: () => {
        cy.log('Collection Bag Identification');
        col_steps.collectionProcedure();
      },
      
      // C21680
      noDataFilledNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when no data is filled.');
        cy.wait(1000);
        inputChecker.nextButtonCheck('be.disabled');
        cy.wait(1000);
      },
      
      // C21681
      firstCheckBoxUncheckedNegative: (coi) => {
        cy.log('[NEG] Verify the "Next" Button is disabled when first checkbox is unchecked.');
        cy.get('[data-testid="input-enter-day_1_bag_1_udn"]').first().clear().type(inputs.day1Bag1Udn);
        cy.get('[data-testid="input-confirm-day_1_bag_1_udn"]').first().clear().type(inputs.confirmDay1Bag1Udn);
        // inputHelpers.clicker(`[data-testid="txt-field-layout-Confirm that your site's pre-collection label has been applied to the bag.-answer"]>>>>`);
        inputHelpers.clicker('[data-testid="recordButton-day_1_bag_1_udn"]');
        cy.wait("@createLabelScanValue");
        // inputHelpers.scanAndVerifyCoi('coi',coi);
        inputChecker.scanAndVerifyCheck('coi',coi,'be.visible','be.disabled');
        inputHelpers.clicker(`[data-testid="txt-field-layout-Confirm that you have applied the sponsor-provided label to the collection bag.-answer"]>>>>`);
        inputChecker.nextButtonCheck('be.disabled');
      },

      // C22161
      secondCheckBoxUnCheckedNegative: (coi) => {
        cy.log('[NEG] Verify the "Next" Button is disabled when second checkbox is unchecked.');
        // cy.reload();
        // inputHelpers.clicker(`[data-testid="txt-field-layout-Confirm that your site's pre-collection label has been applied to the bag.-answer"]>>>>`);
        // inputHelpers.clicker(`[data-testid="txt-field-layout-Confirm that you have applied the sponsor-provided label to the collection bag.-answer"]>>>>`);
        // inputChecker.nextButtonCheck('be.disabled');
      },
      
      // C24113
      onlyUDNrecordedNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when "UDN" value is filled and others are empty.');
      },
      
      // C24114
      coiEmptyNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when "COI" value is not filled and others are filled.');
      },

      // C22076
      invalidCoiNegative: (coi) =>{
        cy.log('[NEG] Verify functionality of label_verification_step_row block');

        // -------Unable to find .big-green-check-mark Not visible
        // inputChecker.scanAndVerifyCheck('coi','abdefgsf','not.be.visible','be.disabled');
        // inputChecker.scanAndVerifyCheck('coi','12345','not.be.visible','be.disabled');
        // inputChecker.scanAndVerifyCheck('coi',`${coi}${"-PRC-01"}`,'not.be.visible','be.disabled');
        // inputChecker.scanAndVerifyCheck('coi',`${coi}${"-PRC-FP-01"}`,'not.be.visible','be.disabled');
        
        inputChecker.confirmCoiLabelBlock('coi','abdefgsf','be.disabled');
        inputChecker.confirmCoiLabelBlock('coi','12345','be.disabled');
        inputChecker.confirmCoiLabelBlock('coi',`${coi}${"-PRC-01"}`,'be.disabled');
        inputChecker.confirmCoiLabelBlock('coi',`${coi}${"-PRC-FP-01"}`,'be.disabled');
      },
    },

      // Bag Selection
      collectionBagSelection: {
        happyPath: () => {
          cy.log('Bag Selection');
          col_steps.cryopreservationBagSelection();
        },
        // C21732	[NEG] Verify the "Next" Button when no selector is selected.
          noSelectorNegative: () => {
          cy.log('[NEG] Verify the "Next" Button when no selector is selected.');
          cy.wait(1000);
          inputChecker.nextButtonCheck('be.disabled');
          cy.wait(1000);
        },
         // C21736	[NEG] Verify the "Next" Button when selector is on 'Do not Ship'. 
          shipperNegative: () => {
          cy.log('[NEG] Verify the "Next" Button when selector is on "Do not Ship"');
          cy.wait(1000);
          inputHelpers.clicker('[data-testid="fail-button-0"]');
          inputChecker.nextButtonCheck('be.disabled');
          cy.wait(1000);
        },
      },
       // Transfer Bag to shipper
       collectionBagTransfer: {
        happyPath: () => {
          cy.log('Transfer Bag to Shipper');
          col_steps.cryopreservationTransferBagsToShipper();
        },

        // C21741	[NEG] Verify the "Next" Button when no data is filled. 
        noDataFilledNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when no data is filled.');
        cy.wait(1000);
        inputChecker.nextButtonCheck('be.disabled');
        cy.wait(1000);
        },

        // C22047	[NEG] Verify the "Confirm" Button is disabled when no data is filled. 
        noDataFilledConfirmButtonNegative: () => {
          cy.log('[NEG] Verify the "Confirm" Button is disabled when no data is filled.');
          cy.wait(1000);
          inputChecker.confirmCoiLabelBlock('be.disabled');
          cy.wait(1000);
          },

          


      






    },





}
