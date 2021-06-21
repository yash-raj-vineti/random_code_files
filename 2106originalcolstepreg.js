import inputs from '../fixtures/inputs.json';
import regressionInput from '../fixtures/inputsRegression.json';
import inputCheckHelpers from './shared_block_helpers/inputFieldCheckHelpers';
import inputChecker from '../utils/shared_block_helpers/inputFieldCheckHelpers';
import actionButtonsHelper from './shared_block_helpers/actionButtonHelpers';
import inputHelpers from './shared_block_helpers/inputFieldHelpers';
import signatureHelpers from './shared_block_helpers/signatureHelpers';
import col_steps from "../utils/collection_steps";
import common from "../support/index";


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
      happyPath: (treatmentInformation) => {
        cy.log('patientVerification')
        col_steps.testResults(treatmentInformation);
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
      happyPath: (treatmentInformation) => {
        cy.log('Collection Session');
        col_steps.testResults(treatmentInformation);
        col_steps.patientId();
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
      happyPath: (treatmentInformation,coi) => {
        cy.log('Collection Bag Identification');
        col_steps.testResults(treatmentInformation);
        col_steps.patientId();
        col_steps.collectionProcedure();
        cy.get('@coi').then(coi =>{
        col_steps.collectionBagIdentification(coi);
        })
      },
      
      // C21680
      noDataFilledNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when no data is filled.');
        cy.wait(1000);
        inputChecker.nextButtonCheck('be.disabled');
        cy.wait(1000);
      },
      
      // C24113
      onlyUDNNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when "UDN" value is filled and others are empty.');
        cy.get('[data-testid="input-enter-day_1_bag_1_udn"]').first().clear().type(inputs.day1Bag1Udn);
        cy.get('[data-testid="input-confirm-day_1_bag_1_udn"]').first().clear().type(inputs.confirmDay1Bag1Udn);
        inputHelpers.clicker('[data-testid="recordButton-day_1_bag_1_udn"]');
        cy.wait("@createLabelScanValue");
        inputChecker.nextButtonCheck('be.disabled');
      },
      
      // C24114
      coiEmptyNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when "COI" value is not filled and others are filled.');
        inputHelpers.clicker(`[data-testid="txt-field-layout-Confirm that your site's pre-collection label has been applied to the bag.-answer"]>>>>`);
        inputHelpers.clicker(`[data-testid="txt-field-layout-Confirm that you have applied the sponsor-provided label to the collection bag.-answer"]>>>>`);
        inputChecker.nextButtonCheck('be.disabled');
      },

      // C22076
      invalidCoiNegative: () =>{
        cy.log('[NEG] Verify functionality of label_verification_step_row block');
        inputChecker.confirmCoiLabelBlock('coi','abdefgsf','be.disabled');
        inputChecker.confirmCoiLabelBlock('coi','12345','be.disabled');
        cy.get('@coi').then(coi =>{
        inputChecker.confirmCoiLabelBlock('coi',`${coi}${"-PRC-01"}`,'be.disabled');
        inputChecker.confirmCoiLabelBlock('coi',`${coi}${"-PRC-FP-01"}`,'be.disabled');
        })
      },

      // C21681
      firstCheckBoxUncheckedNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when first checkbox is unchecked.');
        cy.reload();
        cy.get('@coi').then(coi =>{
        inputChecker.scanAndVerifyCheck('coi',coi,'be.visible','be.disabled');
        })
        inputHelpers.clicker(`[data-testid="txt-field-layout-Confirm that you have applied the sponsor-provided label to the collection bag.-answer"]>>>>`);
        inputChecker.nextButtonCheck('be.disabled');
      },

      // C22161
      secondCheckBoxUnCheckedNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when second checkbox is unchecked.');
        cy.reload();
        inputHelpers.clicker(`[data-testid="txt-field-layout-Confirm that your site's pre-collection label has been applied to the bag.-answer"]>>>>`);
        inputChecker.nextButtonCheck('be.disabled');
      }
    },

    collectionBagData: {

      happyPath: (treatmentInformation) => {
        cy.log('Collection Bag Data');
        col_steps.testResults(treatmentInformation);
        col_steps.patientId();
        col_steps.collectionProcedure();
        cy.get('@coi').then(coi =>{
        col_steps.collectionBagIdentification(coi);
        col_steps.collectionBagData(coi);
        })
      },
      //C21683
      nextButtonDefaultNegative: () => {
        cy.log('[NEG] Verify the "Next" Button is disabled when no data is filled.');
        cy.get('[data-testid="primary-button-action"]').should('be.disabled');
      },
      //C22162
      confirmBagLabelNegative: () =>{
        cy.log('[NEG] Verify functionality of confirm_bag_label block.');
        inputChecker.confirmCoiLabelBlock('coi','abdefgsf','be.disabled');
        inputChecker.confirmCoiLabelBlock('coi','12345','be.disabled');
        cy.get('@coi').then(coi =>{
        inputChecker.confirmCoiLabelBlock('coi',`${coi}${"-PRC-01"}`,'be.disabled');
        inputChecker.confirmCoiLabelBlock('coi',`${coi}${"-PRC-FP-01"}`,'be.disabled');
        })
      },
      // C24119  
      nextButtonCoiNegative:() =>{
        cy.log('[NEG] Verify the "Next" Button is disabled when "COI" value is filled and rest are empty.');
        cy.get('@coi').then(coi =>{
        inputChecker.scanAndVerifyCheck('coi',coi,'be.visible', 'be.disabled');
        })
      },
      //C21685
      startEndTimeNegative: () =>{
        cy.log('[NEG] Verify the "Next" Button is disabled when "End" time is less than "Start" time.'); 
        inputHelpers.inputSingleField('[id="collection_start_time"]',regressionInput.collectionStep.collectionStartTime);
        inputHelpers.inputSingleField('[id="collection_end_time"]',regressionInput.collectionStep.collectionEndTime);
        inputChecker.nextButtonCheck('be.disabled');
      },
      //C21686 
      startEndTimeEqualNegative: () =>{
        cy.log('[NEG] Verify the "Next" Button is disabled when "End" time is equal to "Start" time.');
        inputHelpers.inputSingleField('[id="collection_start_time"]',regressionInput.collectionStep.collectionStartEqualTime);
        inputHelpers.inputSingleField('[id="collection_end_time"]',regressionInput.collectionStep.collectionEndEqualTime);
        inputChecker.nextButtonCheck('be.disabled');
      },
      //C24121
      nextButtonCoiAndTimeNegative: () =>{
        cy.log('[NEG] Verify the "Next" Button is disabled when "COI" value and time is filled and rest are empty.');
        inputHelpers.inputSingleField('[id="collection_start_time"]',inputs.collectionStartTime);
        inputHelpers.inputSingleField('[id="collection_end_time"]',inputs.collectionEndTime);
        inputChecker.nextButtonCheck('be.disabled');
      },
      //C22163 
      collectedProductVolumeNegative: () =>{
        cy.log('[NEG] Verify only valid input(numeric value) is accepted in "Collected Product Volume in mL" block.');
        inputChecker.inputSingleFieldCheck('[data-testid="#/properties/collected_product_volume-input"]',"asdasda",'be.disabled');
        inputChecker.inputSingleFieldCheck('[data-testid="#/properties/collected_product_volume-input"]',"@#$%",'be.disabled');
        },
      //C22164  
      anticoagulantVolumeNegative: () =>{
        cy.log('[[NEG] Verify only valid input(numeric value) is accepted in "Anticoagulant Volume in mL" block.');
        inputHelpers.inputSingleField('[id="#/properties/collected_product_volume-input"]',inputs.collectedProductVolume);
        inputChecker.inputSingleFieldCheck('[data-testid="#/properties/anticoagulant_volume-input"]',"asdasda",'be.disabled');
        inputChecker.inputSingleFieldCheck('[data-testid="#/properties/anticoagulant_volume-input"]',"@#$%",'be.disabled');
        },

      //C26574
      dropdownNegative: () =>{
        cy.log('[NEG] Verify the "Next" button when all fields are filled and no item is selected in dropdown.');
        inputHelpers.inputSingleField('[id="#/properties/anticoagulant_volume-input"]',inputs.anticoagulantVolume);
        inputChecker.nextButtonCheck('be.disabled');
      },

      //C24125
        timeFieldEmptyNegative: () =>{
        cy.log('[NEG] Verify the "Next" Button is disabled when "COI",Dropdown and Bag details are filled and time value is empty.');
        inputHelpers.dropDownSelect("[id*='#/properties/anticoagulant_type']",1,"Type A");
        inputChecker.clearField('[id="collection_start_time"]');
        inputChecker.clearField('[id="collection_end_time"]');
        inputChecker.nextButtonCheck('be.disabled');
        },

        //C22166 
        reasonForChange: () => {
          inputHelpers.inputSingleField('[id="collection_start_time"]',inputs.collectionStartTime);
          inputHelpers.inputSingleField('[id="collection_end_time"]',inputs.collectionEndTime);

          cy.log('[POS] Verify that a reason for change is asked upon changing values');
          actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {apiAliases: ['@patchProcedureSteps', '@getProcedures']});
          cy.wait(2000);
          inputHelpers.clicker('[data-testid="back-nav-link"]')
          cy.wait(['@getProcedures'])
  
          inputHelpers.inputSingleField('[id="#/properties/collected_product_volume-input"]','108');
          inputHelpers.clicker('[data-testid="primary-button-action"]');
  
          cy.get('[data-testid="reason-for-change-textarea"]').clear().type('Reason');
          inputHelpers.clicker('[data-testid="reason-for-change-save"]')
          cy.wait(['@patchProcedureSteps', '@getProcedures'])
      }
    },

    collectionBagSummary: {

      happyPath: (treatmentInformation) => {
        cy.log('collectionSummary')
        col_steps.testResults(treatmentInformation);
        col_steps.patientId();
        col_steps.collectionProcedure();
        cy.get('@coi').then(coi =>{
        col_steps.collectionBagIdentification(coi);
        col_steps.collectionBagData(coi);
        })
        col_steps.collectionBagSummary();
      },

      //C21699
      defaultNegative: () => {
        cy.log('[NEG] Verify "Next" button is disabled when no signature is done.');
        cy.get('[data-testid="primary-button-action"]').should('be.disabled');
      },
      //C21701  
      printSummaryNegative: () => {
        cy.log('[NEG] Verify "Print Summary" is disabled when no signature is done.');
        inputChecker.checkState('[data-test-id="view-document-block"] >>>','be.disabled');
      },
      //C21702
      printSummaryPositive: () => {
        cy.log("[POS] Verify 'Print Summary' is enabled when signature is done.");
        signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
        signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'],inputs.verifier[0]);
        inputChecker.checkState('[data-test-id="view-document-block"] >>>','not.be.disabled');
      },
      //C21703 
      editButtonPositive: () =>{
        cy.log('[POS] Verify the "Edit" buttons.');
        inputHelpers.clickerWithSelectorIndex('[data-testid="edit-collection_session"]',0);
        cy.wait(['@getProcedures']);
        inputHelpers.inputSingleField('[data-testid="#/properties/patient_weight-input"]','100');
        inputHelpers.clicker('[data-testid="primary-button-action"]');
        cy.get('[data-testid="reason-for-change-textarea"]').clear().type('Reason');
        inputHelpers.clicker('[data-testid="reason-for-change-save"]')
        cy.wait(['@patchProcedureSteps', '@getProcedures']);

        inputHelpers.clickerWithSelectorIndex('[data-testid="edit-collection_bag_identification"]',0);
        cy.wait(['@getProcedures']);
        inputHelpers.clicker('[data-testid="primary-button-action"]');
        
        inputHelpers.clickerWithSelectorIndex('[data-testid="edit-collection_bag_data"]',0);
        cy.wait(['@getProcedures']);
        inputHelpers.inputSingleField('[id="#/properties/anticoagulant_volume-input"]','90.0');
        inputHelpers.clicker('[data-testid="primary-button-action"]');
        cy.get('[data-testid="reason-for-change-textarea"]').clear().type('Reason');
        inputHelpers.clicker('[data-testid="reason-for-change-save"]')
        cy.wait(['@patchProcedureSteps', '@getProcedures']);

      }

    },

    collectionHandOff: {
    
      happyPath: (treatmentInformation) => {
        cy.log('collectionSummary')
        col_steps.testResults(treatmentInformation);
        col_steps.patientId();
        col_steps.collectionProcedure();
        cy.get('@coi').then(coi =>{
        col_steps.collectionBagIdentification(coi);
        col_steps.collectionBagData(coi);
        col_steps.collectionBagSummary();
        col_steps.collectionHandoff(coi);
        common.loginAs("phil");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.get(`tr[data-testid="treatment-${coi}"]`).click();
        })
      },

      //C21695
      defaultNegative: () => {
        cy.log('[NEG] Verify "Next" button is disabled when no data is filled.');
        cy.get('[data-testid="primary-button-action"]').should('be.disabled');
      },
      //C22167 
      confirmBagLabelNegative: () => {
        cy.log('[NEG] Verify functionality of confirm_bag_label block.');
        inputChecker.identifierCoiLabelCheck('bag-1-identifier','jfmvm','be.disabled');
        inputChecker.identifierCoiLabelCheck('bag-1-identifier','12345','be.disabled');
        cy.get('@coi').then(coi =>{
        inputChecker.identifierCoiLabelCheck('bag-1-identifier',`${coi}${"-PRC-01"}`,'be.disabled');
        inputChecker.identifierCoiLabelCheck('bag-1-identifier',`${coi}${"-PRC-FP-01"}`,'be.disabled');
        inputChecker.identifierCoiLabelCheck('bag-1-identifier',`${coi}`,'be.disabled');
        })
      },
      //C21696 
      nextButtonNegative: () => {
      cy.log('[NEG] Verify the "Next" Button is disabled when "Your Signature" is not confirmed.');
      cy.get('@coi').then(coi =>{
      inputChecker.scanAndVerifyCheck("bag-1-identifier", `${coi}-APH-01`, 'be.visible', 'not.be.disabled');
      })
      inputHelpers.clicker('[data-testid="primary-button-action"]');
      inputChecker.checkState( '[data-testid="approver-sign-button"]','not.be.disabled');
      },
      //C21698
      printSummaryPositive: () => {
        cy.log("[POS] Verify 'Print Summary' is enabled when Your Signature is done.");
        signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
        inputChecker.checkState('[data-test-id="view-document-block"] >>>','not.be.disabled');
      }     
    },

    collectionHandoffReceipt: {
      happyPath:(treatmentInformation) => {
        col_steps.testResults(treatmentInformation);
        col_steps.patientId();
        col_steps.collectionProcedure();
        cy.get('@coi').then(coi =>{
        col_steps.collectionBagIdentification(coi);
        col_steps.collectionBagData(coi);
        col_steps.collectionBagSummary();
        col_steps.collectionHandoff(coi);
        common.loginAs("phil");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.get(`tr[data-testid="treatment-${coi}"]`).click();
        col_steps.collectionHandoffRecipt(coi);
        })
      },

      // C21715
      noValuefilled: () => {
        cy.log('[NEG] Verify the "Next" Button when no data is filled.');
        inputChecker.inputClearCheck('[data-testid="bag-1-identifier-input-field"]','be.disabled');
      },

      // C21791
      verifyConfirmButton: () => {
        cy.log('[NEG] Verify the "Confirm" Button when no data is filled.');
        inputChecker.identifierCoiLabelCheck('bag-1-identifier','25341','be.disabled');
        inputChecker.identifierCoiLabelCheck('bag-1-identifier','absdj','be.disabled');
        inputChecker.identifierCoiLabelCheck('bag-1-identifier','WTH.VFOZBH.1011','be.disabled');
      },

      // C21720
      signatureNotConfirmed: () => {
        cy.log('[NEG] Verify the "Next" Button when Signature is not confirmed.');
        inputChecker.clearField('[data-testid="bag-1-identifier-input-field"]');
        cy.get('@coi').then(coi =>{
        inputChecker.inputCoiWithPlaceholder('[data-testid="bag-1-identifier-input-field"]',coi,'APH-01');
        })
        inputHelpers.clicker('[data-testid="bag-1-identifier-action-trigger-button"]');
        inputChecker.nextButtonCheck('be.enabled');
        inputHelpers.clicker('[data-testid="primary-button-action"]');
        inputChecker.checkState('[data-testid="signature-collection-handoff-receipt-approver"]','be.visible');
        inputChecker.checkState('[data-testid="approver-sign-button"]','be.enabled');
        inputChecker.checkState("[data-test-id='view-document-block'] >>>", 'be.disabled');
        inputChecker.nextButtonCheck('be.disabled');
      },

      // C21718
      signatureConfirmed: () => {
        cy.log('[POS] Verify the "Print Summary" Button when "Your Signature" is confirmed');
        signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
        inputChecker.checkState("[data-test-id='view-document-block'] >>>", 'be.enabled');
        inputChecker.nextButtonCheck('be.enabled');
      }

    },

    cryopreservationCollectionSummary: {
      happyPath:(treatmentInformation) => {
        col_steps.testResults(treatmentInformation);
        col_steps.patientId();
        col_steps.collectionProcedure();
        cy.get('@coi').then(coi =>{
        col_steps.collectionBagIdentification(coi);
        col_steps.collectionBagData(coi);
        col_steps.collectionBagSummary();
        col_steps.collectionHandoff(coi);
        common.loginAs("phil");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.get(`tr[data-testid="treatment-${coi}"]`).click();
        col_steps.collectionHandoffRecipt(coi);
        col_steps.collectionSummary();
        })
      },

      // C21722
      verifyNextButton: () => {
        cy.log('[POS] Verify the "Next" Button');
        inputChecker.nextButtonCheck('be.enabled');
      }

    },

    cryopreservationBags: {
      happyPath: (treatmentInformation) => {
        col_steps.testResults(treatmentInformation);
        col_steps.patientId();
        col_steps.collectionProcedure();
        cy.get('@coi').then(coi =>{
        col_steps.collectionBagIdentification(coi);
        col_steps.collectionBagData(coi);
        col_steps.collectionBagSummary();
        col_steps.collectionHandoff(coi);
        common.loginAs("phil");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.get(`tr[data-testid="treatment-${coi}"]`).click();
        col_steps.collectionHandoffRecipt(coi);
        })
        col_steps.collectionSummary();
        col_steps.cryopreservationBags();
      },

      // C21723
      noDataFilled: () => {
        cy.log('[NEG] Verify the "Next" Button when no data/invalid is filled.');
        inputChecker.clearField('[id="#/properties/item_count-input"]');
        inputChecker.nextButtonCheck('be.disabled');
        inputChecker.inputInvalidData('[id="#/properties/item_count-input"]','abcd');
        inputChecker.nextButtonCheck('be.disabled');
        inputChecker.inputStringValue('[id="#/properties/item_count-input"]',12);
        inputChecker.nextButtonCheck('be.disabled');
      }
    },

    applyLabelBags: {
      happyPath: (coi,treatmentInformation) => {
        col_steps.testResults(treatmentInformation);
        col_steps.patientId();
        col_steps.collectionProcedure();
        cy.get('@coi').then(coi =>{
        col_steps.collectionBagIdentification(coi);
        col_steps.collectionBagData(coi);
        col_steps.collectionBagSummary();
        col_steps.collectionHandoff(coi);
        common.loginAs("phil");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.get(`tr[data-testid="treatment-${coi}"]`).click();
        col_steps.collectionHandoffRecipt(coi);
        col_steps.collectionSummary();
        col_steps.cryopreservationBags();
        col_steps.applyLabelsBags(coi);
        })
      },

      // C22079
      verifyConfirmButtons: () => {
        cy.log('[NEG] Verify the "Confirm" Button (s) when no data is filled.');
        cy.get('@coi').then(coi =>{
        inputChecker.inputCoiWithPlaceholder('[data-testid="bag-identifier-1-input"]', `${coi}`, "PRC-01")
        inputHelpers.clicker(`[data-testid="bag-identifier-1-button"]`)
        inputHelpers.clicker('[id="#/properties/custom_fields/properties/applied_label_to_bag_collection"]')
        inputChecker.inputCoiWithPlaceholder('[data-testid="bag-identifier-2-input"]', `${coi}`, "PRC-02")
        })
        inputHelpers.clicker(`[data-testid="bag-identifier-2-button"]`)
        inputHelpers.clicker('[id="#/properties/custom_fields/properties/applied_label_to_bag_collection2"]')
        inputHelpers.clicker('[id="#/properties/custom_fields/properties/applied_label_to_bag_collection3"]')
        inputChecker.checkState(`[data-testid="bag-identifier-3-button"]`,'be.disabled');
        inputChecker.bagIdentifierCoiCheck(`bag-identifier-3`,'COI-FP-02','be.disabled');
        inputChecker.checkState(`[data-testid="bag-identifier-3-button"]`,'be.disabled');
        inputChecker.bagIdentifierCoiCheck(`bag-identifier-3`,'sjdh1272','be.disabled');
        inputChecker.checkState(`[data-testid="bag-identifier-3-button"]`,'be.disabled');
        inputChecker.bagIdentifierCoiCheck(`bag-identifier-3`,'abcd','be.disabled');
      },


      // C22080
      verifyNextButtonNoData: () => {
        cy.log('[NEG] Verify the "Next" Button when no data is filled.');
        inputChecker.nextButtonCheck('be.disabled');
      }
    },

    applyLabelCassettes: {
      happyPath: (treatmentInformation) => {
        col_steps.testResults(treatmentInformation);
        col_steps.patientId();
        col_steps.collectionProcedure();
        cy.get('@coi').then(coi =>{
        col_steps.collectionBagIdentification(coi);
        col_steps.collectionBagData(coi);
        col_steps.collectionBagSummary();
        col_steps.collectionHandoff(coi);
        common.loginAs("phil");
        cy.visit("/collection");
        common.clickOnFilter('appointment', 'All');
        cy.get(`tr[data-testid="treatment-${coi}"]`).click();
        col_steps.collectionHandoffRecipt(coi);
        col_steps.collectionSummary();
        col_steps.cryopreservationBags();
        col_steps.applyLabelsBags(coi);
        col_steps.applyLabelsCassettes(coi);
        })
      },

      // C24106 
      nextButtonNoData: () => {
        cy.log('[NEG] Verify the "Next" Button when no data is filled.');
        inputChecker.nextButtonCheck('be.disabled');
      },

      // C24231 
      nextButtonNotCoi: () => {
        cy.log('[NEG] Verify the "Next" Button when only COI is not filled.');
        inputHelpers.clicker('[id="#/properties/data/properties/label_applied_to_cassette"]');
        inputHelpers.clicker('[id="#/properties/data/properties/bag_inserted_into_cassette"]');
        inputChecker.clearField('[data-testid="cassette-1-input"]');
        inputChecker.clearField('[data-testid="cassette-2-input"]');
        inputChecker.clearField('[data-testid="cassette-3-input"]');
        inputChecker.nextButtonCheck('be.disabled');
      },

      // C24111 
      secondUnchecked: () => {
        cy.log('[NEG] Verify the "Next" Button when only second checkbox is unchecked.');
        inputHelpers.clicker('[id="#/properties/data/properties/bag_inserted_into_cassette"]');
        cy.get('@coi').then(coi =>{
        for (let i = 0; i < inputs.collectionItemCount; i++) {
          let bagNumber = i + 1;
          let cassetteInputId = `cassette-${bagNumber}-input`;
          let cassetteConfirmButtonId = `cassette-${bagNumber}-button`;
          inputChecker.clearField(`[data-testid="${cassetteInputId}"]`);
          inputChecker.inputCoiWithPlaceholder(`[data-testid=${cassetteInputId}]`,`${coi}`,`PRC-0${bagNumber}`);
          inputHelpers.clicker(`[data-testid=${cassetteConfirmButtonId}]`);
        }
      })
        inputChecker.nextButtonCheck('be.disabled');
      },

      // C24110 
      firstUnchecked: () => {
        cy.log('[NEG] Verify the "Next" Button when only first checkbox is unchecked.');
        inputHelpers.clicker('[id="#/properties/data/properties/label_applied_to_cassette"]');
        inputChecker.nextButtonCheck('be.disabled');
      },

      // C22081 
      confirmButtonNoData: () => {
        cy.log('[NEG] Verify the "Confirm" Button (s) when no data is filled.');
        for(let j=1; j <= inputs.collectionItemCount; j++) {
              inputChecker.bagIdentifierCoiCheck(`cassette-${j}`,'sdfh127','be.disabled');
              inputChecker.bagIdentifierCoiCheck(`cassette-${j}`,'sdqwer','be.disabled');
              inputChecker.bagIdentifierCoiCheck(`cassette-${j}`,'COI-FPS-01','be.disabled');
        }
        
      }
  },
    enterBagData: {
     happyPath: (treatmentInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      cy.get('@coi').then(coi =>{
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      col_steps.cryopreservationBags();
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      })
      },
    // C24118
    nextButtonNegativeAll: () => {
      cy.log('[NEG] Verify the "Next" Button is disabled when no data is filled.');
      inputChecker.nextButtonCheck('be.disabled');
    },
      //C24181
    nextButtonNegativeCoi: () => {
      cy.log('[NEG] Verify the "Next" Button when only COI data is not filled.');
      for (let i = 0; i < inputs.collectionItemCount; i++) {
      let bagNumber = i + 1
      let bagCheckboxId = bagNumber > 1 ? bagNumber : ''
      inputHelpers.inputSingleField(`[data-testid="#/properties/mononuclear_cell_count${bagCheckboxId}-input"]`,`${inputs.totalCells + i}`);
      inputHelpers.inputSingleField(`[data-testid="#/properties/product_volume${bagCheckboxId}-input"]`,`${inputs.productVolume+ i}`);
      }
      inputChecker.nextButtonCheck('be.disabled');
    },
    //C21730
    nextButtonNegativeCellCount: () => {
      cy.log('[NEG] Verify the "Next" Button when only "Cell Count" label is not filled. ');
      cy.get('@coi').then(coi =>{
      for (let i = 0; i < inputs.collectionItemCount; i++) {
      let bagNumber = i + 1
      let bagInputId = `bag-identifier-${bagNumber}-input`
      let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
      inputHelpers.inputSingleField(`[data-testid=${bagInputId}]`,`${coi}-PRC-0${bagNumber}`);
      inputHelpers.clicker(`[data-testid=${bagConfirmButtonId}]`);
      let bagCheckboxId = bagNumber > 1 ? bagNumber : ''
      inputHelpers.inputSingleField(`[data-testid="#/properties/product_volume${bagCheckboxId}-input"]`,`${inputs.productVolume+ i}`);
      }
    })
      inputChecker.nextButtonCheck('be.disabled');
    },
    //C24127
    nextButtonNegativeProductVolume: () => {
      cy.log('[NEG] Verify the "Next" Button when only "Product Volume" label is not filled.');
      for (let i = 0; i < inputs.collectionItemCount; i++) {
      let bagNumber = i + 1
      let bagCheckboxId = bagNumber > 1 ? bagNumber : ''
      inputChecker.clearField(`[data-testid="#/properties/product_volume${bagCheckboxId}-input"]`);
      inputHelpers.inputSingleField(`[data-testid="#/properties/mononuclear_cell_count${bagCheckboxId}-input"]`,`${inputs.totalCells + i}`);
      }
      inputChecker.nextButtonCheck('be.disabled');
    },
    //C22082
    coiNegative: () => {
      cy.log('[[NEG] Verify the "Confirm" Button (s) when no data is filled.');
      cy.get('@coi').then(coi =>{
      for (let i = 0; i < inputs.collectionItemCount; i++) {
        let bagNumber = i + 1
        let bagInputId = `bag-identifier-${bagNumber}-input`
        let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
        inputChecker.clearField(`[data-testid=${bagInputId}]`);
        inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
        inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-APH-0${bagNumber}`, 'be.disabled');
      }
    })
    },
    // C24082
    cellCountNegative: () => {
      cy.log('Verify the "Cell Count" label.');
      for (let i = 0; i < inputs.collectionItemCount; i++) {
      let bagNumber = i + 1     
      let bagCheckboxId = bagNumber > 1 ? bagNumber : ''
        inputChecker.inputInvalidData(`[data-testid="#/properties/mononuclear_cell_count${bagCheckboxId}-input"]`, 'abc')
      }
    },
    // C24123
    productVolumeNegative: () => {
      cy.log('Verify the "Product Volume" label.');
      for (let i = 0; i < inputs.collectionItemCount; i++) {
      let bagNumber = i + 1     
      let bagCheckboxId = bagNumber > 1 ? bagNumber : ''
      inputChecker.inputInvalidData(`[data-testid="#/properties/product_volume${bagCheckboxId}-input"]`, 'abc')
      }
    }
  },
  controlledRateFreezer: {
    happyPath: (treatmentInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      cy.get('@coi').then(coi =>{
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      col_steps.cryopreservationBags();
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      })
    },
    // C24115 
      nextButtonNegativeAll: () => {
        cy.log('[NEG] Verify the "Next" Button when no data is filled.');
        inputChecker.nextButtonCheck('be.disabled');
    },
      // C22084
      coiNegative: () => {
      cy.log('[[NEG] Verify the "Confirm" Button (s) when no data is filled.');
      cy.get('@coi').then(coi =>{
      for (let i = 0; i < inputs.collectionItemCount; i++) {
        let bagNumber = i + 1
        let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
        inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
        inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-APH-0${bagNumber}`, 'be.disabled');
      }
    })
    },
      // C21738
    recordNegative: () => {
      cy.log('[[NEG] Verify the "Record" Button when no data is filled.');
      inputChecker.checkState(`[data-testid="recordButton-crf_section"]`, 'be.disabled');
      inputChecker.enterAndConfirmNegativeCheck('crf_section', '123', '321','not.be.disabled', 'be.disabled');
    },
    // C24117
    nextButtonNegativeCoi: () => {
      cy.log('Verify the "Next" Button when only COI number is not added.');
      inputHelpers.inputEnterAndConfirm('crf_section', inputs.crfEnter);
      inputChecker.nextButtonCheck('be.disabled');
    }
  },
  collectionBagStorage: {
    happyPath: (treatmentInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      cy.get('@coi').then(coi =>{
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      col_steps.cryopreservationBags();
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      col_steps.collectionBagStorage(coi);
      })
    },
    // C21766 
      nextButtonNegativeAll: () => {
        cy.log('[NEG] Verify the "Next" Button when no data is filled.');
        inputChecker.nextButtonCheck('be.disabled');
    },
      // C22085
      coiNegative: () => {
        cy.log('[[NEG] Verify the "Confirm" Button (s) when no data is filled.');
        cy.get('@coi').then(coi =>{
        inputChecker.checkState(`[data-testid="crf-section-action-trigger-button"]`, 'be.disabled');
        inputChecker.identifierCoiLabelCheck('crf-section', '123', 'be.disabled');
        for (let i = 0; i < inputs.collectionItemCount; i++) {
        let bagNumber = i + 1
        let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
        inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
        inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-APH-0${bagNumber}`, 'be.disabled');
      }
    })
    },
      // C21771
    recordNegative: () => {
      cy.log('[[NEG] Verify the "Record" Button when no data is filled.');
      inputChecker.checkState(`[data-testid="recordButton-ln2_storage"]`, 'be.disabled');
      inputChecker.enterAndConfirmNegativeCheck('ln2_storage', '123', '321', 'not.be.disabled','be.disabled');
    },
    // C24184
    nextButtonNegativeCoi: () => {
      cy.log('Verify the "Next" Button when only Scan Bag Values not added.');
      inputHelpers.inputSingleField('[data-testid="crf-section-input-field"]', inputs.crfEnter);
      inputHelpers.clicker('[data-testid="crf-section-action-trigger-button"]');
      inputHelpers.inputEnterAndConfirm('ln2_storage', inputs.enterLn2Number);
      inputChecker.nextButtonCheck('be.disabled');
    }
  },
  cryopreservationSummary: {
    happyPath: (treatmentInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      cy.get('@coi').then(coi =>{
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      col_steps.cryopreservationBags();
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      col_steps.collectionBagStorage(coi);
      })
      col_steps.cryopreservationSummary();
    },
    // C21794 
    nextButtonNegativeAll: () => {
      cy.log('[NEG] Verify the "Next" Button when the Signatures are not confirmed');
        inputChecker.nextButtonCheck('be.disabled');
    },
      // C21796
    printSummaryButtonNegative: () => {
      cy.log('NEG] Verify "Print Summary" when the signatures are not confirmed.');
      inputCheckHelpers.checkState("[data-test-id='view-document-block'] >>>", 'be.disabled');
    },
      // C21797
    verifyEditButtonsPositive: () => {
      cy.log('[POS] Verify the "Edit" buttons');
      inputHelpers.clicker('[data-testid="edit-enter_bag_data"]');
      inputCheckHelpers.inputSingleFieldCheck('[data-testid="#/properties/mononuclear_cell_count-input"]', '25.0', 'not.be.disabled')
      inputHelpers.clicker('[data-testid="primary-button-action"]');
      cy.get('[data-testid="reason-for-change-textarea"]').clear().type('Reason');
      inputHelpers.clicker('[data-testid="reason-for-change-save"]');
    },
    // C21802
    printSummaryButtonPositive: () => {
      cy.log('POS] Verify "Print Summary" when the signatures are confirmed.');
      signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
      signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], inputs.verifier[1]);
      inputCheckHelpers.checkState("[data-test-id='view-document-block'] >>>", 'not.be.disabled');
    }
  },

  // Bag Selection
  collectionBagSelection: {
    happyPath: (treatmentInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      cy.get('@coi').then(coi =>{
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      col_steps.cryopreservationBags();
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      col_steps.collectionBagStorage(coi);
      })
      col_steps.cryopreservationSummary();
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
    }
  },

  // Transfer Bag to shipper
  collectionBagTransfer: {
    happyPath: (treatmentInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      cy.get('@coi').then(coi =>{
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      //col_steps.cryopreservationBags();
      inputHelpers.inputSingleField('[id="#/properties/item_count-input"]', inputs.collectionItemCount);
      actionButtonsHelper.clickActionButton(
       actionButtonsHelper.actionButtonKeys.PRIMARY,
       {
         apiAliases: ["@patchProcedureSteps", "@getProcedures"],
       }
      );
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      col_steps.collectionBagStorage(coi);
      col_steps.cryopreservationSummary();
      col_steps.cryopreservationBagSelection();
      col_steps.cryopreservationTransferBagsToShipper(coi);
      })
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
      cy.log('[NEG] Verify the "Confirm" Button is disabled when no/invalid data is filled.');
      cy.wait(1000);
      cy.get('@coi').then(coi =>{
      inputChecker.checkState(`[data-testid="ln-2-storage-action-trigger-button"]`, 'be.disabled');
      inputChecker.identifierCoiLabelCheck('ln-2-storage', '100', 'be.disabled');
        let bagNumber = 1
        let bagConfirmButtonId = `bag-identifier-${bagNumber}-button`
        inputChecker.checkState(`[data-testid=${bagConfirmButtonId}]`, 'be.disabled');
        inputChecker.bagIdentifierCoiCheck(`bag-identifier-${bagNumber}`, `${coi}-APH-0${bagNumber}`, 'be.disabled');
      inputChecker.checkState(`[data-testid="coi-action-trigger-button"]`, 'be.disabled');
      inputChecker.identifierCoiLabelCheck('coi', '100', 'be.disabled');
      })
      cy.wait(1000);
      },

    // C30472	[NEG] Verify the "Next" Button when only COI values are not added.
    coiMissingValue: (scope) => {
        cy.log('Verify the "Next" Button when only COI Values not added.');
        inputHelpers.inputSingleField('[data-testid="ln-2-storage-input-field"]', inputs.enterLn2Number);
        inputHelpers.clicker('[data-testid="ln-2-storage-action-trigger-button"]');
        inputHelpers.scanAndVerifyCoi('coi', scope.coi);
        inputChecker.nextButtonCheck('be.disabled');
        cy.wait(1000);
      }
    },

    airWayBillGet:{
    getCollAirWayBill : (scope, testId) => {
      common.loginAs("oliver");
      cy.visit("/ordering");
      cy.wait(7000);
      cy.get('td[data-testid="patient-identifier"]')
        .contains(scope.patientInformation.subjectId)
        .click();
      cy.get('[data-testid="td-stage-plane-icon"]')
        .eq(0)
        .parent()
        .parent()
        .parent()
        .find('[data-testid="td-stage-site-details"]')
        .invoke("text")
        .then((text) => {
          scope.airWayBill = text.substring(9, text.length);
          common.loginAs("phil");
          cy.visit("/collection");
          cy.wait(3000);
          common.clickOnFilter('appointment', 'All');
          cy.get('@coi').then(coi =>{
          inputHelpers.clicker(`tr[data-testid="treatment-${coi}"]`);
          if (testId) {
            inputHelpers.inputSingleField(`[data-testid="${testId}"]`,scope.airWayBill);
          } else {
            inputHelpers.inputSingleField('[data-testid="collection-airway-bill-input-field"]',scope.airWayBill);
            inputHelpers.clicker('[data-testid="collection-airway-bill-action-trigger-button"]');
          }
          cy.wait("@labelVerifications");
          cy.log("collectionAirwayBill", scope.airWayBill);
        });
      })
    }
  },

  collectionShippingChecklist: {
    happyPath: (treatmentInformation,scope, patientInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      cy.get('@coi').then(coi =>{
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      //col_steps.cryopreservationBags();
      inputHelpers.inputSingleField('[id="#/properties/item_count-input"]', inputs.collectionItemCount);
      actionButtonsHelper.clickActionButton(
       actionButtonsHelper.actionButtonKeys.PRIMARY,
       {
         apiAliases: ["@patchProcedureSteps", "@getProcedures"],
       }
     );
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      col_steps.collectionBagStorage(coi);
      col_steps.cryopreservationSummary();
      col_steps.cryopreservationBagSelection();
      col_steps.cryopreservationTransferBagsToShipper(coi);
      // col_steps.shippingChecklist(scope, patientInformation)
    })
    },

    happyPath2: () => {
      inputHelpers.inputEnterAndConfirm('shipper_serial_number', inputs.enterShipperSrNumber);
      cy.wait("@labelVerifications");
      inputHelpers.clicker('[data-testid="pass-button-attach_shipping_label"]')
      inputHelpers.clicker('[data-testid="pass-button-place_material_into_shipper"]')
      inputHelpers.clicker('[data-testid="pass-button-activate_temperature_monitor"]')
      inputHelpers.clicker('[data-testid="pass-button-place_summary_document"]')
      inputHelpers.inputSingleField('[data-testid="#/properties/shipping_checklist/properties/issue-input"]', 'comment')
    },

    // 	C21746	[NEG] Verify the "Next" Button when no data is filled. 
    noDataFilledNegative: () => {
      cy.log('[NEG] Verify the "Next" Button when no data is filled.');
      inputChecker.nextButtonCheck('be.disabled');
    },
    // C30414 [[NEG] Verify the "Record" Button when no data is filled.
    noRecordNegative: () => {
      cy.log('[[NEG] Verify the "Record" Button when no data is filled.');
      inputChecker.checkState(`[data-testid="recordButton-shipper_serial_number"]`, 'be.disabled');
      inputChecker.enterConfirmCheckNegative('shipper_serial_number', '123', '321', 'be.disabled');
    },

    // 	C22171	[NEG] Verify Additional text area for Attach shipping labels to shipper label.
    noDataFilledShippingLabelAdditionalTextAreaNegative: ()=>{
      inputHelpers.clicker('[data-testid="fail-button-attach_shipping_label"]');
      inputChecker.checkState('[data-testid="#/properties/shipping_checklist/properties/attach_shipping_label_reason-input"]','be.visible');
      inputHelpers.clicker('[data-testid="pass-button-place_material_into_shipper"]');
      inputHelpers.clicker('[data-testid="pass-button-activate_temperature_monitor"]');
      inputHelpers.clicker('[data-testid="pass-button-place_summary_document"]');
      inputHelpers.inputEnterAndConfirm('shipper_serial_number', inputs.enterShipperSrNumber);
      inputChecker.nextButtonCheck('be.disabled');
    
    },

    // C22334	[NEG] Verify the Additional information text area for placing the materials into shipper according to the SOP label.
    noDataFilledSopLabelAdditionalTextAreaNegative: ()=>{
      inputHelpers.clicker('[data-testid="fail-button-place_material_into_shipper"]');
      inputChecker.checkState('[data-testid="#/properties/shipping_checklist/properties/place_material_into_shipper_reason-input"]','be.visible');
      inputHelpers.clicker('[data-testid="pass-button-attach_shipping_label"]');
      inputHelpers.clicker('[data-testid="pass-button-activate_temperature_monitor"]');
      inputHelpers.clicker('[data-testid="pass-button-place_summary_document"]');
      inputChecker.nextButtonCheck('be.disabled');
    
    },

    // 	C22335	[NEG] Verify Additional information text area for Activating the Temperature monitor label
    noDataFilledTemperatureLabelAdditionalTextAreaNegative: ()=>{
      inputHelpers.clicker('[data-testid="fail-button-activate_temperature_monitor"]');
      inputChecker.checkState('[data-testid="#/properties/shipping_checklist/properties/activate_temperature_monitor_reason-input"]','be.visible');
      inputHelpers.clicker('[data-testid="pass-button-attach_shipping_label"]');
      inputHelpers.clicker('[data-testid="pass-button-place_material_into_shipper"]');
      inputHelpers.clicker('[data-testid="pass-button-place_summary_document"]');
      inputChecker.nextButtonCheck('be.disabled');
   
    },

    // C22496	[NEG] Verify the Additional information text area for Placing the summary documents in Shipper
    noSummaryDocumentsAdditionalTextAreaNegative: ()=>{
      inputHelpers.clicker('[data-testid="fail-button-place_summary_document"]');
      inputChecker.checkState('[data-testid="#/properties/shipping_checklist/properties/place_summary_document_reason-input"]','be.visible');
      inputHelpers.clicker('[data-testid="pass-button-attach_shipping_label"]');
      inputHelpers.clicker('[data-testid="pass-button-activate_temperature_monitor"]');
      inputHelpers.clicker('[data-testid="pass-button-place_material_into_shipper"]');
      inputChecker.nextButtonCheck('be.disabled');
  
    }

    

    // Airway bill number not found in input.json
  },


  collectionShippingSummary: {
    happyPath: (treatmentInformation,scope, patientInformation) => {
      col_steps.testResults(treatmentInformation);
      col_steps.patientId();
      col_steps.collectionProcedure();
      cy.get('@coi').then(coi =>{
      col_steps.collectionBagIdentification(coi);
      col_steps.collectionBagData(coi);
      col_steps.collectionBagSummary();
      col_steps.collectionHandoff(coi);
      common.loginAs("phil");
      cy.visit("/collection");
      common.clickOnFilter('appointment', 'All');
      cy.get(`tr[data-testid="treatment-${coi}"]`).click();
      col_steps.collectionHandoffRecipt(coi);
      col_steps.collectionSummary();
      //col_steps.cryopreservationBags();
      inputHelpers.inputSingleField('[id="#/properties/item_count-input"]', inputs.collectionItemCount);
      actionButtonsHelper.clickActionButton(
       actionButtonsHelper.actionButtonKeys.PRIMARY,
       {
         apiAliases: ["@patchProcedureSteps", "@getProcedures"],
       }
     );
      col_steps.applyLabelsBags(coi);
      col_steps.applyLabelsCassettes(coi);
      col_steps.enterBagData(coi);
      col_steps.controlledRateFreezer(coi);
      col_steps.collectionBagStorage(coi);
      col_steps.cryopreservationSummary();
      col_steps.cryopreservationBagSelection();
      col_steps.cryopreservationTransferBagsToShipper(coi);
      col_steps.shippingChecklist(scope, patientInformation);
      col_steps.collectionShippingSummary();
      })
    },

    // 	C21751	[NEG] Verify "Done" button when no signature is done.
    noSignatureDoneNegative: ()=>{
      cy.log('[NEG] Verify the "Next" Button when the Signatures are not confirmed');
      inputChecker.checkState('[data-testid="primary-button-action"]', 'be.disabled');
    
    },

    // C21756	[NEG] Verify 'Print Summary' is disabled when no signature is done. 
    noSignaturePrintNegative:()=>{
      cy.log('NEG] Verify "Print Summary" when the signatures are not confirmed.');
      inputCheckHelpers.checkState("[data-test-id='view-document-block'] >>>", 'be.disabled');
    },

    // 	C21755	[POS] Verify "Done" button after signature is done. 
    signatureDonePositive:()=>{
      cy.wait(2000);
      signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);
      signatureHelpers.clickSignDocumentButton('verifier', ['@postSignature'], inputs.verifier[1]);
      inputChecker.checkState('[data-testid="primary-button-action"]', 'not.be.disabled');
      cy.wait(10000);
    },

    // C21757	[POS] Verify 'Print Summary' is enabled when signature is done.
    signaturePrintPositive:()=>{
      cy.log('POS] Verify "Print Summary" when the signatures are confirmed.');
      inputCheckHelpers.checkState('[name="viewDocumentPrintSummary"]', 'be.enabled')
    }
  }

}
