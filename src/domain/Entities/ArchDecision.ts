import ArchDecisionOption from './ArchDecisionOption';
import ArchCriteria from './ArchCriteria';
import { ArchDecisionVotingIsntFinishedError, DecisionDoesNotContainThisCriteriaError, DecisionDoesNotContainThisOptionsError, GuestNotInvitedForThisDecisionError, VoteAlreadyComputedError } from '../errors/arch-decision-errors';
import DecisionGuest from './decision-guest';
import { DecisionParameters, OptionScore, VoteParameter, VoteResult } from '../vos/decision-value-objects';
import { executeAllArchDecisionComputeVotePreconditionValidationThrowingErrors } from '../validators/compute-vote.validator';
import { executeAllArchDecisionCountVotePreconditionValidationThrowingErrors } from '../validators/count-vote.validator';

export default class ArchDecision {
    public readonly decisionName?: string;
    private readonly decisionParameters: DecisionParameters;
    private readonly criteriaVoteResultMap: Map<String, VoteResult> = new Map<String, VoteResult>();
    
    private computedVotes: VoteParameter[] = new Array<VoteParameter>();

    constructor(decisionName: string,decisionParameters: DecisionParameters) {
        this.decisionName = decisionName;
        this.decisionParameters = decisionParameters;

        this.decisionParameters.criterias.forEach(criteria => {
            this.criteriaVoteResultMap.set(criteria.name, 
                {isVotingConcluded: false, optionsScore: this.decisionParameters.options.map<OptionScore>(opt => ({option: opt, score: 0}))})
        });
    }

    public computeVote(voteParameter: VoteParameter): void {
        executeAllArchDecisionComputeVotePreconditionValidationThrowingErrors(this.decisionParameters, voteParameter, this.computedVotes);
        
        this.computedVotes.push(voteParameter);
    }

    public countVotes(criteria: ArchCriteria | 'all'='all'): VoteResult {
        if(criteria === 'all')
            return this.countVotesForAllCriteria();
        
        return this.countVotesForCriterea(criteria);
    }
    private countVotesForCriterea(criteria: ArchCriteria): VoteResult {
        executeAllArchDecisionCountVotePreconditionValidationThrowingErrors(this.computedVotes, this.decisionParameters.guests, criteria);
        const optionsScore: OptionScore[] = this.decisionParameters.options
                                                        .map(opt => ({option: opt, score: this.getScoreForOptionInCriterea(criteria, opt)}));
        return {isVotingConcluded: true, optionsScore: optionsScore};
    }

    private getScoreForOptionInCriterea(criterea: ArchCriteria, option: ArchDecisionOption): number {
        return this.computedVotes.filter(cp => cp.criteria.name === criterea.name && cp.option.name === option.name)
                    .reduce<number>((pv, cv) => pv + cv.value,0);
    }

    private countVotesForAllCriteria(): VoteResult {
        this.executeCountVotesForAllCriteriaPreConditionVerification();
        throw new Error('Method not implemented.');
    }


    private executeCountVotesForAllCriteriaPreConditionVerification(): void {
        throw new ArchDecisionVotingIsntFinishedError();
    }    
}