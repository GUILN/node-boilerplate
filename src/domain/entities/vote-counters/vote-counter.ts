import { VoteParameter, OptionScore, DecisionParameters, VoteResult } from "../../vos/decision-value-objects";
import ArchCriteria from "../arch-criteria";
import IVoteCounter from "./i-vote-counter";

export default class VoteCounter implements IVoteCounter {
    constructor() {
        
    }
    countVotesForCriteria(decisionParameters: DecisionParameters,computedVotes: VoteParameter[], criteria: ArchCriteria): VoteResult {
        let optionsScore: OptionScore[] = decisionParameters.options.map<OptionScore>(opt => ({option: opt, score: 0}));
        let computeVoteForOption = (vote: VoteParameter): void => {
            optionsScore.filter(optScore => optScore.option.name === vote.option.name)[0].score += 1;
        }

        computedVotes.filter(cpVotes => cpVotes.criteria.name === criteria.name)
                        ?.forEach(criteriaVote => computeVoteForOption(criteriaVote));
        return {optionsScore: optionsScore, isVotingConcluded: true};
    }
}