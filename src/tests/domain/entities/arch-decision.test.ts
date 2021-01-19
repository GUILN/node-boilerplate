import { expect, assert } from 'chai';
import { describe } from 'mocha';
import ArchCriteria from '../../../domain/Entities/ArchCriteria';
import ArchDecision from '../../../domain/Entities/ArchDecision';
import ArchDecisionOption from '../../../domain/Entities/ArchDecisionOption';
import { DecisionDoesNotContainThisCriteriaError, DecisionDoesNotContainThisOptionsError } from '../../../domain/errors/arch-decision-errors';
import archDecisionData from '../../fixtures/arch-decision.fixture.json';
import { createArchCriteriaFromFixtureData, createArchDecisionObjectFromFixtureData, createArchOptionFromFixtureData } from '../../fixtures/fixture-factories';

const archDecision: ArchDecision = createArchDecisionObjectFromFixtureData(archDecisionData);
const someContainedOption: ArchDecisionOption = createArchOptionFromFixtureData(archDecisionData.options[0]);
const someContainedCriterea = createArchCriteriaFromFixtureData(archDecisionData.criterias[0]);


describe("[ArchDecision] - Vote method", () => {
    it("Should throw error when voting for some option that is not contained in decision", () => {
        const notContainedOption = new ArchDecisionOption("Use OPC Servers", "Use OPC Servers");
        assert.throws(() => {
            archDecision.vote(notContainedOption, someContainedCriterea, 5);
        }, DecisionDoesNotContainThisOptionsError);
    });

    it("Should throw error when voting for some criteria that is not contained in decision", () => {
        const notContainedCriteria = new ArchCriteria("How good the UX will be", "UX");
        assert.throws(() => {
            archDecision.vote(someContainedOption, notContainedCriteria, 3);
        }, DecisionDoesNotContainThisCriteriaError)
    });

    // it("Should accept and count the vote for existing contained decision and contained criterea", () => {
    //     archDecision.vote(someContainedOption, someContainedCriterea, 4);
    // });
});