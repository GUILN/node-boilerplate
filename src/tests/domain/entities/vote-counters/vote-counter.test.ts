import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { createArchCriteriaFromFixtureData, createArchOptionFromFixtureData, createDecisionGuestFromFixtureData } from '../../../fixtures/fixture-factories';
import archDecisionData from '../../../fixtures/arch-decision.fixture.json';
import ArchDecisionOption from '../../../../domain/entities/arch-decision-option';
import ArchCriteria from '../../../../domain/entities/arch-criteria';
import DecisionGuest from '../../../../domain/entities/decision-guest';
import { DecisionParameters, VoteParameter } from '../../../../domain/vos/decision-value-objects';
import VoteCounter from '../../../../domain/entities/vote-counters/vote-counter';

const createDecisionParameters = (): DecisionParameters => {
    return {options: archDecisionData.options?.map<ArchDecisionOption>(optionFixDt => createArchOptionFromFixtureData(optionFixDt)), 
            criterias: archDecisionData.criterias?.map<ArchCriteria>(criteria => createArchCriteriaFromFixtureData(criteria)),
            guests: archDecisionData.guests?.map<DecisionGuest>(guest => createDecisionGuestFromFixtureData(guest))
        };
}

describe("[VoteCounter] - countVotesForCriteria method", () => {

    let decisionParameters = createDecisionParameters();
    let voteCounter = new VoteCounter();

    it("Should return vote count for all contained options for a given criteria even if that criteria has received 0 votes as well as the right count for all votes", () => {
        const specificCriteria = createArchCriteriaFromFixtureData(archDecisionData.criterias[0]);
        const uniqueVotedOption = createArchOptionFromFixtureData(archDecisionData.options[0]);
        const computedVotesAllInSameOption = decisionParameters.guests.map<VoteParameter>(guest_ => ({option: uniqueVotedOption, criteria: specificCriteria, guest: guest_}));

        const voteResult = voteCounter.countVotesForCriteria(decisionParameters, computedVotesAllInSameOption, specificCriteria);
        const allAvailableOptions = decisionParameters.options.map<string>(opt => opt.name || "");
        const allFoundOptions = new Array<string>();

        voteResult.optionsScore.forEach(optScore => {
            if(allAvailableOptions.indexOf(optScore.option.name || "") >=0)
                allFoundOptions.push(optScore.option.name || "");
            if(optScore.option.name === uniqueVotedOption.name)
                expect(optScore.score).equal(decisionParameters.guests.length); //Unique voted option
            else
                expect(optScore.score).equal(0); //Option that received no votes
        });

        expect(allAvailableOptions.length).equal(allFoundOptions.length);
    });
});
