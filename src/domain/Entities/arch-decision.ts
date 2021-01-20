import ArchCriteria from './arch-criteria';
import { DecisionParameters, OptionScore, VoteParameter, VoteResult } from '../vos/decision-value-objects';
import { executeAllArchDecisionComputeVotePreconditionValidationThrowingErrors } from '../validators/compute-vote.validator';
import { executeAllArchDecisionCountVotePreconditionValidationThrowingErrors } from '../validators/count-vote.validator';
import IVoteCounter from './vote-counters/i-vote-counter';
import VoteCounter from './vote-counters/vote-counter';

export default class ArchDecision {
    public readonly decisionName?: string;
    private readonly decisionParameters: DecisionParameters;
    private readonly criteriaVoteResultMap: Map<String, VoteResult> = new Map<String, VoteResult>();
    
    private computedVotes: VoteParameter[] = new Array<VoteParameter>();
    private voteCounter: IVoteCounter;

    constructor(decisionName: string,decisionParameters: DecisionParameters, voteCounter:IVoteCounter= new VoteCounter()) {
        this.decisionName = decisionName;
        this.decisionParameters = decisionParameters;
        this.voteCounter = voteCounter;

        this.decisionParameters.criterias.forEach(criteria => {
            this.criteriaVoteResultMap.set(criteria.name, 
                {isVotingConcluded: false, optionsScore: this.decisionParameters.options.map<OptionScore>(opt => ({option: opt, score: 0}))});
        });
    }

    public computeVote(voteParameter: VoteParameter): void {
        executeAllArchDecisionComputeVotePreconditionValidationThrowingErrors(this.decisionParameters, voteParameter, this.computedVotes);
        this.computedVotes.push(voteParameter);
    }

    public countVotesForCriteria(criteria: ArchCriteria): VoteResult {
        executeAllArchDecisionCountVotePreconditionValidationThrowingErrors(this.computedVotes, this.decisionParameters.guests, criteria);
        this.voteCounter.countVotesForCriteria(this.computedVotes, criteria);
        throw Error("Not Implemented countVotesForCriterea");
    }
}