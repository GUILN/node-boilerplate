import { expect, assert } from 'chai';
import { describe } from 'mocha';
import ArchCriteria from '../../../domain/entities/arch-criteria';
import ArchDecisionOption from '../../../domain/entities/arch-decision-option';
import DecisionGuest from '../../../domain/entities/decision-guest';
import { ArchDecisionMoreThanOneCreatorGuestError, ArchDecisionRepeatedParameterError } from '../../../domain/errors/arch-decision-errors';
import { ArchDecisionFactory } from '../../../domain/factories/arch-decision.factory';
import { DecisionParameters } from '../../../domain/vos/decision-value-objects';
import archDecisionNonFaultedData from '../../fixtures/arch-decision.fixture.json';
import archDecisionFaultedData from '../../fixtures/arch-decision-faulty.fixture.json';
import { createArchCriteriaFromFixtureData, createArchDecisionObjectFromFixtureData, createArchOptionFromFixtureData, createDecisionGuestFromFixtureData } from '../../fixtures/fixture-factories';

const nonFaultedDecisionParameters: DecisionParameters = {
    options: archDecisionNonFaultedData.options.map<ArchDecisionOption>(opt => createArchOptionFromFixtureData(opt)),
    criterias: archDecisionNonFaultedData.criterias.map<ArchCriteria>(ct => createArchCriteriaFromFixtureData(ct)),
    guests: archDecisionNonFaultedData.guests.map<DecisionGuest>(gt => createDecisionGuestFromFixtureData(gt))
};

const repeatedCriteriaDecisionParameter: DecisionParameters = {
    ...nonFaultedDecisionParameters, 
    criterias: archDecisionFaultedData.repeated_criterias.map<ArchCriteria>(ct => createArchCriteriaFromFixtureData(ct))
};

const repeatedOptionsDecisionParameter: DecisionParameters = {
    ...nonFaultedDecisionParameters, 
    options: archDecisionFaultedData.repeated_options.map<ArchDecisionOption>(opt => createArchOptionFromFixtureData(opt))
};

const repeatedGuestsDecisionParameter: DecisionParameters = {
    ...nonFaultedDecisionParameters, 
    guests: archDecisionFaultedData.repeated_guests.map<DecisionGuest>(gt => createDecisionGuestFromFixtureData(gt))
};

const moreThanOneCreatorGuestDecisionParameter: DecisionParameters = {
    ...nonFaultedDecisionParameters, 
    guests: archDecisionFaultedData.more_than_one_guest_is_creator.map<DecisionGuest>(gt => createDecisionGuestFromFixtureData(gt))
};

describe("[ArchDecisionFactory] - createArchDecision method", () => {
    
    it("Should throw error when trying to create arch decision with repeated criteria", () => {
        assert.throws(() => {
            
            ArchDecisionFactory.createArchDecision(archDecisionNonFaultedData.decisionName,repeatedCriteriaDecisionParameter);

        }, ArchDecisionRepeatedParameterError);
    });
    it("Should throw error when trying to create arch decision with repeated option", () => {
        assert.throws(() => {

            ArchDecisionFactory.createArchDecision(archDecisionNonFaultedData.decisionName,repeatedOptionsDecisionParameter);

        }, ArchDecisionRepeatedParameterError);
    });
    it("Should throw error when trying to create arch decision with repeated guest", () => {
        assert.throws(() => {

            ArchDecisionFactory.createArchDecision(archDecisionNonFaultedData.decisionName,repeatedGuestsDecisionParameter);

        }, ArchDecisionRepeatedParameterError);
    });
    it("Should throw error if more than one guest is seted as creator of the decision", () => {
        assert.throws(() => {

            ArchDecisionFactory.createArchDecision(archDecisionNonFaultedData.decisionName,moreThanOneCreatorGuestDecisionParameter);
            
        }, ArchDecisionMoreThanOneCreatorGuestError);
    });
});
