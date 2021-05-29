import translation from "../fixtures/assertions.json";
import common from "../support/index";
import schedulingSteps from "./scheduling_steps";
import translationHelpers from "../utils/shared_block_helpers/translationHelpers";
import ordering from "../fixtures/orderingAssertions.json";
import actionButtonsHelper from '../utils/shared_block_helpers/actionButtonHelpers';
import signatureHelpers from '../utils/shared_block_helpers/signatureHelpers';
import inputHelpers from '../utils/shared_block_helpers/inputFieldHelpers'

const NavigateProgress = (headerTitle, phaseTestId) => {
  cy.log("NavigateProgress");
  // start on a separate page
  cy.get('[data-testid="h1-header"]').should(($p) => {
    expect($p).to.not.contain(headerTitle);
  });

  cy.waitForElementAndClick(`[data-testid="${phaseTestId}"]`);

  // assert that it is on the specified page
  cy.get('[data-testid="h1-header"]').should("contain", headerTitle);
};

const ViewTreatmentInformation = (data, headerTitle) => {
  NavigateProgress(headerTitle, "progress-phase-treatment");
  common.ConfirmTreatmentInformation(data);
 // common.ClickPrimaryActionButton();
 actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
  apiAliases: ['@patchProcedureSteps', '@getProcedures']
});

};
const getCoi = (scope) => {
  cy.get('[data-testid = "patientInformationHeader.coi-value"]')
    .invoke("text")
    .then((text) => {
      cy.log("The coi", text);
      scope.coi = text;
    });
  cy.wait(2000);
};

const verifySummaryPageElements = () => {
  translationHelpers.assertChildElement('[data-test-id="ordering-summary-block"]', 'div > h3', ordering.commonSummaryLabel.therapySection.therapySubHeader);
  translationHelpers.assertChildElement('[data-test-id="ordering-summary-block"]', 'div > h3', ordering.commonSummaryLabel.patientSection.patientSubHeader, 1);
  translationHelpers.assertChildElement('[data-test-id="ordering-summary-block"]', 'div > h3', ordering.commonSummaryLabel.studyDetailsSection.studySubHeader, 2);
  translationHelpers.assertChildElement('[data-test-id="ordering-summary-block"]', 'div > h3', ordering.commonSummaryLabel.treatmentSection.treatmentSubHeader, 3);
  translationHelpers.assertChildElement('[data-test-id="ordering-summary-block"]', 'div > h3', ordering.commonSummaryLabel.investigatorSection.investigatorSubHeader, 4);
  translationHelpers.assertChildElement('[data-test-id="ordering-summary-block"]', 'div > h3', ordering.commonSummaryLabel.scheduleSection.scheduleSubHeader, 5);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]", 0, 'div', ordering.commonSummaryLabel.therapySection.therapyName);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]", 1, 'div', ordering.commonSummaryLabel.therapySection.studyIndication);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]", 2, 'div', ordering.commonSummaryLabel.patientSection.firstName);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]", 3, 'div', ordering.commonSummaryLabel.patientSection.middleName);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]", 4, 'div', ordering.commonSummaryLabel.patientSection.familyName);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]", 5, 'div', ordering.commonSummaryLabel.patientSection.dateOfBirth);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]", 6, 'div', ordering.commonSummaryLabel.patientSection.sex);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]", 7, 'div', ordering.commonSummaryLabel.studyDetailsSection.subjectId);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",8,'div',ordering.commonSummaryLabel.treatmentSection.siteName);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",9,'div',ordering.commonSummaryLabel.investigatorSection.physicianName);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",10,'div',ordering.commonSummaryLabel.scheduleSection.collectionSite);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",11,'div',ordering.commonSummaryLabel.scheduleSection.collectionDate);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",12,'div',ordering.commonSummaryLabel.scheduleSection.siteAddress);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",13,'div',ordering.commonSummaryLabel.scheduleSection.contactName);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",14,'div',ordering.commonSummaryLabel.scheduleSection.contactNumber);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",15,'div',ordering.commonSummaryLabel.scheduleSection.additionalNotes);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",16,'div',ordering.commonSummaryLabel.scheduleSection.infusionSite);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",17,'div',ordering.commonSummaryLabel.scheduleSection.infusionDate);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",18,'div',ordering.commonSummaryLabel.scheduleSection.siteAddress);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]", 19, 'div', ordering.commonSummaryLabel.scheduleSection.contactName);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",20,'div',ordering.commonSummaryLabel.scheduleSection.contactNumber);
  translationHelpers.assertSectionChildElement("[data-testid=display-only]",21,'div',ordering.commonSummaryLabel.scheduleSection.additionalNotes);

  cy.get("[data-testid=edit-patient]").eq(0).should("be.visible");
  cy.get("[data-testid=edit-patient]").eq(1).should("be.visible");
  cy.get("[data-testid=edit-prescriber]").eq(0).should("be.visible");
  cy.get("[data-testid=edit-scheduling]").eq(0).should("be.visible");
};
export default {
  CreateOrder: (ordersHeader) => {
    // cy.get('[data-testid="nav_li_ordering"]')
    //   .should("be.visible")
    //   .and("have.text", translation.ordering);
    cy.waitForElementAndClick('[data-testid="nav_li_ordering"]');

    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertSingleField('[data-testid="nav_li_ordering"]',translation.ordering)
      translationHelpers.assertSingleField('[data-testid="ordering-header"]',ordersHeader)
      translationHelpers.assertSingleField('[data-testid="add-patient-button"]',translation.newPatient)
      translationHelpers.assertSingleField('[data-testid="header-patient"]',ordering.patientMenu.patientHeader)
      translationHelpers.assertSingleField('[data-testid="header-patient-identifier"]',ordering.patientMenu.subjectNumberHeader)
      translationHelpers.assertSingleField('[data-testid="header-therapy-study"]',ordering.patientMenu.studyHeader)
      translationHelpers.assertSingleField('[data-testid="header-ordering-site"]',ordering.patientMenu.siteHeader)
      translationHelpers.assertSingleField('[data-testid="header-status"]',ordering.patientMenu.statusHeader)

    }

    cy.waitForElementAndClick('[data-testid="add-patient-button"]');
  },

  SelectTherapy: (therapy) => {
    //cy.wait('@products', { timeout: 120000 });
    cy.wait(3000);

    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertSingleField('[data-testid="h1-header"]',translation.selectTherapy)
      translationHelpers.assertSectionChildElement('[data-testid="therapy-item-waterhood"]', 0, 'div', ordering.therapyMenu.therapyHeader)
      translationHelpers.assertSingleField('[data-testid="execution-context-waterhood_1931_us"]', ordering.therapyMenu.therapySelect)
    }

   // cy.get("[data-testid=" + therapy + "]").click();
   inputHelpers.clicker("[data-testid=" + therapy + "]");
    
    cy.wait(["@postProcedures", "@getProcedures", "@getProcedures"]);
  },

  AddPatientInformation: (patientData, treatmentInfo) => {
    cy.log("AddPatientInformation");
    //cy.get("[data-testid='#/properties/first_name-input']").first().clear().type(patientData.firstName);
    inputHelpers.inputSingleField('[data-testid="#/properties/first_name-input"]', patientData.firstName)
    
    //cy.get("[data-testid='#/properties/middle_name-input']").clear().type(patientData.middleName);
    inputHelpers.inputSingleField('[data-testid="#/properties/middle_name-input"]', patientData.middleName)
    
    //cy.get("[data-testid='#/properties/last_name-input']").clear().type(patientData.lastName);
    inputHelpers.inputSingleField('[data-testid="#/properties/last_name-input"]', patientData.lastName)
    
    cy.get("[id*='#/properties/dob-input']").clear().type(`${patientData.dataOfBirthFormat}{enter}`).clear().type(`${patientData.dataOfBirthFormat}{enter}`);
    cy.get("[id*='#/properties/biological_sex']").eq(1).select("Male");
    //cy.get("[data-testid='#/properties/identifier-input']").clear().type(patientData.subjectId);
    inputHelpers.inputSingleField('[data-testid="#/properties/identifier-input"]', patientData.subjectId)
    

    cy.log("SelectOrderingSite");
    cy.get("[data-testid='primary-button-action']").should("be.disabled");
    cy.waitForElementAndClick('[data-testid="institution_id"] .select');
    cy.get(`[data-testid="institution_id"] .select-content li:nth-child(${treatmentInfo.prescriber_select_index})`).should("be.visible");
    cy.waitForElementAndClick(`[data-testid="institution_id"] .select-content li:nth-child(${treatmentInfo.prescriber_select_index})`);

    if (Cypress.env('runWithHelpers')) {
        translationHelpers.assertSingleField('[data-testid="patientInformationHeader.name"]',translation.nameLabel)
        translationHelpers.assertSingleField('[data-testid="patientInformationHeader.dob"]',translation.dateOfBirthLabel)
        translationHelpers.assertSingleField('[data-testid="patientInformationHeader.subject_id"]',translation.subjectNumberLabel)
        translationHelpers.assertSingleField('[data-testid="patientInformationHeader.therapy"]',translation.therapy)
        translationHelpers.assertSingleField('[data-testid="patientInformationHeader.coi"]',translation.COI)
        translationHelpers.assertSingleField('[data-testid="progress-patient-name"]',ordering.patientMenu.patientHeader)
        translationHelpers.assertSingleField('[data-testid="progress-prescriber-name"]',ordering.patientDetailsMenu.prescriberHeader)
        translationHelpers.assertSingleField('[data-testid="progress-scheduling-name"]',translation.scheduling)
        translationHelpers.assertSingleField('[data-testid="progress-review-name"]',translation.review)
        translationHelpers.assertSingleField('[data-testid="progress-approval-name"]',translation.approval)
        translationHelpers.assertPageTitles('[data-test-id="ordering_patient"]','h1',translation.patientDetails)
        cy.get('[data-testid="section-heading-title"]').eq(0).invoke('text').should('equal', translation.patientInfo)
        cy.get('[data-testid="section-heading-description"]').eq(0).invoke('text').should('equal', translation.patientInfoDescription)
        translationHelpers.assertSingleField('[data-testid="MaterialDateControl-Label-#/properties/dob"]',translation.dateOfBirth)
        translationHelpers.assertSingleField('[data-testid="select-control-label"]',translation.sex)
        cy.get('[data-testid="section-heading-title"]').eq(1).invoke('text').should('equal', translation.studyDetails)
        cy.get('[data-testid="section-heading-description"]').eq(1).invoke('text').should('equal', translation.studyDetailsDescription)
        translationHelpers.assertSectionChildElement('[data-testid="institution_id"]', 0, "label" , translation.orderingPhaseSiteName)
        translationHelpers.assertSectionChildElement('[id="#/properties/first_name"]', 0, "label" , translation.firstName)
        translationHelpers.assertSectionChildElement('[id="#/properties/middle_name"]', 0, "label" , ordering.patientDetailsMenu.middleNameOption)
        translationHelpers.assertSectionChildElement('[id="#/properties/last_name"]', 0, "label" , translation.familyName)
        translationHelpers.assertSectionChildElement('[id="#/properties/identifier"]', 0, "label" , translation.subjectId)
        translationHelpers.assertSingleField('[data-testid="cancel-button-action"]', ordering.patientDetailsMenu.cancelOrder)
        translationHelpers.assertSingleField('[data-testid="back-nav-link"]', translation.backLabel)
        translationHelpers.assertSingleField('[data-testid="primary-button-action"]', translation.next)
      }

    common.ClickPrimaryActionButton();
  },

  testOrderingHeaders: (orderingHeadersBar , patientInformation) => {
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.name"]', orderingHeadersBar.nameLabel)
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.name-value"]', `${patientInformation.lastName}${", "}${patientInformation.firstName}${" "}${patientInformation.middleName}`)
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.dob"]', orderingHeadersBar.dateOfBirthLabel)
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.dob-value"]', patientInformation.dataOfBirthFormat)
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.subject_id"]', orderingHeadersBar.subjectNumberLabel)
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.subject_id-value"]', patientInformation.subjectId)
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.therapy"]', orderingHeadersBar.therapyLabel)
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.therapy-value"]', translation.therapyValue)
      translationHelpers.assertSingleField('[data-testid="patientInformationHeader.coi"]', orderingHeadersBar.coiLabel)
  }
  cy.get("[data-testid='primary-button-action']").should("be.disabled");
},

  SelectPrescriber: (data, sharedConstants) => {
    cy.log("SelectPrescriber");
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="ordering_prescriber"]','h1', ordering.prescriberDetailsMenu.prescriberInformation)
      translationHelpers.assertChildElement('[data-test-id="prescriber-info-block-block"]', 'h4', ordering.prescriberDetailsMenu.principalInvestigator)
      translationHelpers.assertChildElement('[data-test-id="prescriber-info-block-block"]', 'span', ordering.prescriberDetailsMenu.selectTheTreatment)
      translationHelpers.assertChildElement('[data-test-id="prescriber-info-block-block"]', 'label', ordering.prescriberDetailsMenu.physicianName)
      translationHelpers.assertSingleField('[data-testid="cancel-button-action"]', ordering.prescriberDetailsMenu.cancelOrder)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', ordering.prescriberDetailsMenu.back)
      translationHelpers.assertChildElement('[data-testid="secondary-button-action"]', 'span', sharedConstants.saveAndClose)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', sharedConstants.next)
      }

    cy.get("[data-testid='primary-button-action']").should("be.disabled");
    cy.waitForElementAndClick('[data-testid="physician_user_id"] .select');
    cy.waitForElementAndClick(`[data-testid="physician_user_id"] .select-content li:nth-child(${data.prescriber_select_index})`);
   //common.ClickPrimaryActionButton();
   actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
    apiAliases: ['@patchProcedureSteps', '@getProcedures']
  });

  },

  ViewTreatmentInformation,

  CheckSchedulingAvailability: (therapy, region = "US") => {
    cy.wait("@schedulingServiceSchedule", { timeout: 140000 }).then((resp) => {
      expect(resp.status).eq(404);
    });
    cy.wait("@schedulingServiceAvailability");
    schedulingSteps.fillInstitutionInformation(
      translation,
      `infusion${therapy}`,
      translation["infusionInstrName" + region]
    );

    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="ordering_scheduling"]','h1', ordering.schedulingClinicalSiteInformation.scheduling)
      translationHelpers.assertSingleField('[data-testid="lbl-schedule-title-collection"]', ordering.schedulingClinicalSiteInformation.collection)
      translationHelpers.assertSingleField('[data-testid="lbl-schedule-title-infusion"]', ordering.schedulingClinicalSiteInformation.infusion)
      translationHelpers.assertSingleField('[data-testid="lbl-site-select-collection"]', ordering.schedulingClinicalSiteInformation.selectSite)
      translationHelpers.assertSingleField('[data-testid="lbl-site-select-infusion"]', ordering.schedulingClinicalSiteInformation.selectSite)
      translationHelpers.assertSingleField('[data-testid="lbl-additional-notes-collection"]', ordering.schedulingClinicalSiteInformation.additionalNotes)
      translationHelpers.assertSingleField('[data-testid="lbl-additional-notes-infusion"]', ordering.schedulingClinicalSiteInformation.additionalNotes)
      translationHelpers.assertSingleField('[data-testid="lbl-selected-date-collection"]', ordering.schedulingClinicalSiteInformation.schedulerText)
      translationHelpers.assertSingleField('[data-testid="lbl-selected-date-infusion"]', ordering.schedulingClinicalSiteInformation.pending)
      translationHelpers.assertSingleField('[data-testid="cancel-button-action"]', ordering.schedulingClinicalSiteInformation.cancelOrder)
      translationHelpers.assertSingleField('[data-testid="back-nav-link"]', ordering.schedulingClinicalSiteInformation.backLabel)
      translationHelpers.assertChildElement('[data-testid="secondary-button-action"]', 'span', ordering.schedulingClinicalSiteInformation.saveAndClose)
      translationHelpers.assertChildElement('[data-testid="primary-button-action"]', 'span', ordering.schedulingClinicalSiteInformation.next)
    };

    cy.scheduleFirstAvailableDate({ institutionType: `collection${therapy}` });
    cy.wait("@schedulingServiceDraft");
    // cy.get('[data-testid="btn-schedule"]')
    //   .click()
    inputHelpers.clicker('[data-testid="btn-schedule"]');
    
    //  .then(() => {
        cy.wait("@schedulingServiceCreate");
    //  });
    cy.wait(2000);
  },

  AddSchedulingOrder: (
    sharedConstants,
    nextOrSave = "next",
    reasonForChange = false
  ) => {
    if (nextOrSave === "next") {
      cy.get('[data-testid="primary-button-action"]').should("contain",sharedConstants.next);
      cy.get('[data-testid="secondary-button-action"]').should("be.enabled");
    } else {
      cy.get('[data-testid="primary-button-action"]').should("contain",sharedConstants.saveButtonText);
    }
    cy.get('[data-testid="primary-button-action"]').should("be.enabled");
    if (reasonForChange) {
      cy.waitForElementAndClick('[data-testid="primary-button-action"]');
      common.AddValueToReasonForChange();
    } else {

      //common.ClickPrimaryActionButton();
      actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
        apiAliases: ['@patchProcedureSteps', '@getProcedures']
      });
    

    }
  },


  SubmitOrder: () => {
    cy.get("[data-testid=h1-header]").should('have.text',ordering.reviewOrderSummary.confirmOrder);
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertSingleField("[data-testid=section-heading-title]",ordering.commonSummaryLabel.reviewSubHeader)
      translationHelpers.assertSingleField("[data-testid=primary-button-action]",ordering.commonSummaryLabel.submitOrderButton)
      translationHelpers.assertPageTitles("[data-test-id=ordering_confirm_order]",'h1',ordering.reviewOrderSummary.confirmOrder)
      cy.get("[data-test-id=view-document-block] > div > div > button > span").should('be.visible').should('have.text',ordering.commonSummaryLabel.summaryButton)
      verifySummaryPageElements();
    }
    //common.singleSignature();
    signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);

    //common.ClickPrimaryActionButton();
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
  
  },

  ApproveOrder: (scope) => {
    getCoi(scope);
    cy.get("[data-testid=h1-header]").should("have.text",ordering.approveOrderSummary.approveOrder);
    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertSingleField("[data-testid=primary-button-action]",ordering.approveOrderSummary.approve)
      translationHelpers.assertPageTitles("[data-test-id=ordering_approval]",'h1',ordering.approveOrderSummary.approveOrder)
      cy.get("[data-test-id=view-document-block] > div > div > button > span").should('be.visible').should('have.text',ordering.commonSummaryLabel.summaryButton)
      verifySummaryPageElements();
    }
   // common.singleSignature();
   signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);

    //common.ClickPrimaryActionButton();
    actionButtonsHelper.clickActionButton(actionButtonsHelper.actionButtonKeys.PRIMARY, {
      apiAliases: ['@patchProcedureSteps', '@getProcedures']
    });
  },

  cancelOption: () => {
    //cy.get('[data-testid="cancel-button-action"]').click();
    inputHelpers.clicker('[data-testid="cancel-button-action"]')
    
   // cy.get('[data-testid="cancel-page-reason-select"]  > div').click();
    inputHelpers.clicker('[data-testid="cancel-page-reason-select"]  > div')
    

    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertPageTitles('[data-test-id="cancel_cancel_order"]','h1',ordering.orderCancel.orderCancelHeader)
      translationHelpers.assertSingleField('[data-testid="subtitle1-header"]',ordering.orderCancel.orderCancelSubheader)
      translationHelpers.assertSingleField('[data-testid="section-heading-title"]',ordering.orderCancel.sectionHeader)
      translationHelpers.assertSingleField('[data-testid="section-heading-description"]',ordering.orderCancel.cancelReason)
      translationHelpers.assertSingleField('[data-testid="approver-role-title"]', ordering.orderCancel.yourSignature)
      translationHelpers.assertSingleField('[data-testid="approver-sign-button"]', ordering.orderCancel.signConfirm)
      translationHelpers.assertSingleField('[data-testid="approver-role-text"]', ordering.orderCancel.confirmerRole)
      translationHelpers.assertSingleField('[data-testid="approver-prompt"]', ordering.orderCancel.approverPrompt)
      translationHelpers.assertSingleField('[data-testid="cancel-page-cancel-button"]',ordering.orderCancel.cancelYes)
      translationHelpers.assertSingleField('[data-testid="cancel-page-abort-button"]',ordering.orderCancel.cancelNo)
    }

    //cy.get(".select-content > :nth-child(1)").click();
    inputHelpers.clicker(".select-content > :nth-child(1)")
    
    //common.singleSignature();
    signatureHelpers.clickSignDocumentButton('approver', ['@postSignature']);

    //cy.get('[data-testid="cancel-page-cancel-button"]').click();
    inputHelpers.clicker('[data-testid="cancel-page-cancel-button"]')
    

    cy.wait(10000);

    if (Cypress.env('runWithHelpers')) {
      translationHelpers.assertSingleField('[data-testid="h1-header"]',ordering.orderCancel.cancelledOrder)
      translationHelpers.assertBlockLabelContains('[data-testid="subtitle1-header"]', {index: 0, label: ordering.orderCancel.OrderWasCancelled})
      translationHelpers.assertSingleField('[data-testid="cancelled-page-cancel-reason"]',ordering.orderCancel.cancelledReason)
      translationHelpers.assertSingleField('[data-testid="cancel-page-cancel-button"]',ordering.orderCancel.close)
    }
    //cy.get('[data-testid="cancel-page-cancel-button"]').click()
    inputHelpers.clicker('[data-testid="cancel-page-cancel-button"]')
    
    
  },
};
