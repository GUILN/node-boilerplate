import { VoteParameter, OptionScore, DecisionParameters, VoteResult } from "../../vos/decision-value-objects";
import ArchCriteria from "../arch-criteria";
import ArchDecisionOption from "../arch-decision-option";
import IVoteCounter, { VoteCounterType } from "./i-vote-counter";

export default class VoteCounter implements IVoteCounter {
    constructor() {
        
    }
    getVoteCounterType = (): VoteCounterType => 'normal';

    countVotesForCriteria(decisionParameters: DecisionParameters,computedVotes: VoteParameter[], criteria: ArchCriteria): VoteResult {
        let optionsScore: OptionScore[] = decisionParameters.options.map<OptionScore>(opt => ({option: opt, score: 0}));
        let computeVoteForOption = (option: ArchDecisionOption): void => {
            optionsScore.filter(optScore => optScore.option.name === option.name)[0].score += 1;
        }

        computedVotes.filter(cpVotes => cpVotes.criteria.name === criteria.name)
                        ?.forEach(criteriaVote => computeVoteForOption(criteriaVote.option));
        return {optionsScore: optionsScore, isVotingConcluded: true};
    }
}
