import { expect, assert } from 'chai';
import { describe } from 'mocha';
import ArchCriteria from '../../../domain/Entities/ArchCriteria';
import ArchDecision from '../../../domain/Entities/ArchDecision';
import ArchDecisionOption from '../../../domain/Entities/ArchDecisionOption';
import DecisionGuest from '../../../domain/Entities/decision-guest';
import { ArchDecisionVotingIsntFinishedError, DecisionDoesNotContainThisCriteriaError, DecisionDoesNotContainThisOptionsError, 
    GuestNotInvitedForThisDecisionError, VoteAlreadyComputedError } from '../../../domain/errors/arch-decision-errors';
import archDecisionData from '../../fixtures/arch-decision.fixture.json';
import { createArchCriteriaFromFixtureData, createArchDecisionObjectFromFixtureData, createArchOptionFromFixtureData, createDecisionGuestFromFixtureData } from '../../fixtures/fixture-factories';

let archDecision: ArchDecision = createArchDecisionObjectFromFixtureData(archDecisionData);
const someContainedOption: ArchDecisionOption = createArchOptionFromFixtureData(archDecisionData.options[0]);
const someContainedCriterea = createArchCriteriaFromFixtureData(archDecisionData.criterias[0]);
const someContainedGuest = createDecisionGuestFromFixtureData(archDecisionData.guests[0]);


describe("[ArchDecision] - computeVote method", () => {
    it("Should throw error when computong vote for some option that is not contained in decision", () => {
        const notContainedOption = new ArchDecisionOption("Use OPC Servers", "Use OPC Servers");
        assert.throws(() => {
            archDecision.computeVote({option: notContainedOption, 
                                criteria: someContainedCriterea, 
                                guest: someContainedGuest,
                                value: 3});
        }, DecisionDoesNotContainThisOptionsError);
    });

    it("Should throw error when computing vote for some criteria that is not contained in decision", () => {
        const notContainedCriteria = new ArchCriteria("How good the UX will be", "UX");
        assert.throws(() => {
            archDecision.computeVote({option: someContainedOption, 
                criteria: notContainedCriteria, 
                guest: someContainedGuest,
                value: 3});
        }, DecisionDoesNotContainThisCriteriaError)
    });

    it("Should throw error when a not invited guest tries to compute vote for the decision", () => {
        const notContainedGuest = new DecisionGuest("John Doe");
        assert.throws(() => {
            archDecision.computeVote({option: someContainedOption, 
                criteria: someContainedCriterea, 
                guest: notContainedGuest,
                value: 3});
        }, GuestNotInvitedForThisDecisionError)
    });

    it("Should throw error when trying to compute vote that alredy had been computed (same option, same criterea, same guest)", () => {

        assert.throws(() => {
            archDecision.computeVote({option: someContainedOption, 
                criteria: someContainedCriterea, 
                guest: someContainedGuest,
                value: 8});

            archDecision.computeVote({option: someContainedOption, 
                    criteria: someContainedCriterea, 
                    guest: someContainedGuest,
                    value: 5});
        }, VoteAlreadyComputedError)
    })
});

describe("[Arch Decision] - countVote method - for specific criterea", () => {

    archDecision = createArchDecisionObjectFromFixtureData(archDecisionData);

    it("Should throw error if ArchDecision voting is not finished yet (Not all guests have voted) ArchDecisionVotingIsntFinishedError", () => {
        assert.throws(() => {
            archDecision.countVotes(someContainedCriterea);
        }, ArchDecisionVotingIsntFinishedError)
    });

    it("Should return VoteResult Object containing right score for some criterea which voting has already finished (All guests computed votes)", () => {
        let expectedVotingScore = 0;
        archDecisionData.guests.forEach(guestFixtureData => {
            archDecision.computeVote({option: someContainedOption, criteria: someContainedCriterea,
                                 guest: createDecisionGuestFromFixtureData(guestFixtureData),
                                 value: 2});
            expectedVotingScore += 2;
        });

        const voteResult = archDecision.countVotes(someContainedCriterea);
        let optionScoreForCriteria = voteResult.optionsScore.filter(vtResult => vtResult.option.name === someContainedOption.name)[0].score;
        expect(optionScoreForCriteria).equal(expectedVotingScore);
    });

});