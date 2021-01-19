import ArchDecisionOption from './ArchDecisionOption';
import ArchCriteria from './ArchCriteria';
import { ArchDecisionVotingIsntFinishedError, DecisionDoesNotContainThisCriteriaError, DecisionDoesNotContainThisOptionsError, GuestNotInvitedForThisDecisionError, VoteAlreadyComputedError } from '../errors/arch-decision-errors';
import DecisionGuest from './decision-guest';

interface DecisionParameters {
    options: Array<ArchDecisionOption>,
    criterias: Array<ArchCriteria>,
    guests: Array<DecisionGuest>
}

interface VoteParameter {
    option: ArchDecisionOption,
    criteria: ArchCriteria,
    guest: DecisionGuest,
    value: number
}

interface OptionScore {
    option: ArchDecisionOption,
    score: number,
}

interface VoteResult {
    optionsScore: OptionScore[],
    isVotingConcluded: boolean
}

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
        this.executeComputeVotePreConditionVerification(voteParameter);
        this.computedVotes.push(voteParameter);
    }

    public countVotes(criteria: ArchCriteria | 'all'='all'): VoteResult {
        if(criteria === 'all')
            return this.countVotesForAllCriteria();
        
        return this.countVotesForCriterea(criteria);
    }
    private countVotesForCriterea(criteria: ArchCriteria): VoteResult {
        this.executeCountVotesForSpecificCriteriaPreConditionVerification(criteria);
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

    private executeCountVotesForSpecificCriteriaPreConditionVerification(criteria: ArchCriteria): void {
        if(this.computedVotes.filter(vote => vote.criteria.name === criteria.name)?.length < this.decisionParameters.guests.length) {
            throw new ArchDecisionVotingIsntFinishedError();
        }
    }

    private executeCountVotesForAllCriteriaPreConditionVerification(): void {
        throw new ArchDecisionVotingIsntFinishedError();
    }

    private executeComputeVotePreConditionVerification(voteParameter: VoteParameter): void {
        if(!this.decisionContainsOption(voteParameter.option))
            throw new DecisionDoesNotContainThisOptionsError();
        else if(!this.decisionContainsCriteria(voteParameter.criteria))
            throw new DecisionDoesNotContainThisCriteriaError();
        else if(!this.decisionContainsGuest(voteParameter.guest))
            throw new GuestNotInvitedForThisDecisionError();
        else if(this.voteAlreadyComputed(voteParameter))
            throw new VoteAlreadyComputedError();
    }
    private voteAlreadyComputed(voteParameter: VoteParameter): boolean {
        return this.computedVotes.some(vtParameter => voteParameter.option.name === vtParameter.option.name 
                                                    && voteParameter.criteria.name === vtParameter.criteria.name
                                                    && voteParameter.guest.name === vtParameter.guest.name);
    }

    private decisionContainsOption(option: ArchDecisionOption): boolean {
        return this.decisionParameters.options.some(opt => opt.name === option.name);
    }

    private decisionContainsCriteria(criteria: ArchCriteria): boolean {
        return this.decisionParameters.criterias.some(ct => ct.name === criteria.name);
    }

    private decisionContainsGuest(guest: DecisionGuest): boolean {
        return this.decisionParameters.guests.some(gt => gt.name === guest.name);
    }
}