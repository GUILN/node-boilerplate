import { expect, assert } from 'chai';
import { describe } from 'mocha';
import ArchCriteria from '../../../domain/Entities/ArchCriteria';
import ArchDecision from '../../../domain/Entities/ArchDecision';
import ArchDecisionOption from '../../../domain/Entities/ArchDecisionOption';
import DecisionGuest from '../../../domain/Entities/decision-guest';
import { DecisionDoesNotContainThisCriteriaError, DecisionDoesNotContainThisOptionsError, 
    GuestNotInvitedForThisDecisionError, VoteAlreadyComputedError } from '../../../domain/errors/arch-decision-errors';
import archDecisionData from '../../fixtures/arch-decision.fixture.json';
import { createArchCriteriaFromFixtureData, createArchDecisionObjectFromFixtureData, createArchOptionFromFixtureData, createDecisionGuestFromFixtureData } from '../../fixtures/fixture-factories';

const archDecision: ArchDecision = createArchDecisionObjectFromFixtureData(archDecisionData);
const someContainedOption: ArchDecisionOption = createArchOptionFromFixtureData(archDecisionData.options[0]);
const someContainedCriterea = createArchCriteriaFromFixtureData(archDecisionData.criterias[0]);
const someContainedGuest = createDecisionGuestFromFixtureData(archDecisionData.guests[0]);


describe("[ArchDecision] - Vote method", () => {
    it("Should throw error when voting for some option that is not contained in decision", () => {
        const notContainedOption = new ArchDecisionOption("Use OPC Servers", "Use OPC Servers");
        assert.throws(() => {
            archDecision.vote({option: notContainedOption, 
                                criteria: someContainedCriterea, 
                                guest: someContainedGuest,
                                value: 3});
        }, DecisionDoesNotContainThisOptionsError);
    });

    it("Should throw error when voting for some criteria that is not contained in decision", () => {
        const notContainedCriteria = new ArchCriteria("How good the UX will be", "UX");
        assert.throws(() => {
            archDecision.vote({option: someContainedOption, 
                criteria: notContainedCriteria, 
                guest: someContainedGuest,
                value: 3});
        }, DecisionDoesNotContainThisCriteriaError)
    });

    it("Should throw error when a not invited guest tryes to vote for the decision", () => {
        const notContainedGuest = new DecisionGuest("John Doe");
        assert.throws(() => {
            archDecision.vote({option: someContainedOption, 
                criteria: someContainedCriterea, 
                guest: notContainedGuest,
                value: 3});
        }, GuestNotInvitedForThisDecisionError)
    });

    it("Should accept and count the vote for existing contained decision and contained criterea", () => {
        const voteResult = archDecision.vote({option: someContainedOption, 
                            criteria: someContainedCriterea, 
                            guest: someContainedGuest,
                            value: 6});
        const optionScore = voteResult.optionsScore
                        .filter(optSc => optSc.option.name === someContainedOption.name)[0];
        expect(optionScore.score).equal(6);
    });

    it("Should throw error when trying to execute vote that alredy had been computed", () => {

        assert.throws(() => {
            archDecision.vote({option: someContainedOption, 
                criteria: someContainedCriterea, 
                guest: someContainedGuest,
                value: 8});
        }, VoteAlreadyComputedError)
    })
});