import ArchDecisionOption from './ArchDecisionOption';
import ArchCriteria from './ArchCriteria';
import { DecisionDoesNotContainThisCriteriaError, DecisionDoesNotContainThisOptionsError, GuestNotInvitedForThisDecisionError, VoteAlreadyComputedError } from '../errors/arch-decision-errors';
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
    
    private voteResult: VoteResult;
    private computedVotes: VoteParameter[] = new Array<VoteParameter>();

    constructor(decisionName: string,decisionParameters: DecisionParameters) {
        this.decisionName = decisionName;
        this.decisionParameters = decisionParameters;
        this.voteResult = {isVotingConcluded: false, 
                            optionsScore: this.decisionParameters.options.map<OptionScore>(opt => ({option: opt, score: 0}))
                        }
    }


    public vote(voteParameter: VoteParameter): VoteResult {
        this.executeVotePreConditionVerification(voteParameter);
        this.executeVote(voteParameter);
        this.computedVotes.push(voteParameter);
        return this.voteResult;
    }

    executeVote(voteParameter: VoteParameter): VoteResult {
        this.voteResult.optionsScore = this.voteResult
                                    .optionsScore
                                    .map<OptionScore>(optSc => (voteParameter.option.name === optSc.option.name ? {option: optSc.option, score: optSc.score += voteParameter.value} 
                                                                                                            : {option: optSc.option, score: optSc.score}))
        return this.voteResult;
    }

    executeVotePreConditionVerification(voteParameter: VoteParameter): void {
        if(!this.decisionContainsOption(voteParameter.option))
            throw new DecisionDoesNotContainThisOptionsError();
        else if(!this.decisionContainsCriteria(voteParameter.criteria))
            throw new DecisionDoesNotContainThisCriteriaError();
        else if(!this.decisionContainsGuest(voteParameter.guest))
            throw new GuestNotInvitedForThisDecisionError();
        else if(this.voteAlreadyComputed(voteParameter))
            throw new VoteAlreadyComputedError();
    }
    voteAlreadyComputed(voteParameter: VoteParameter): boolean {
        return this.computedVotes.some(vtParameter => voteParameter.option.name === vtParameter.option.name 
                                                    && voteParameter.criteria.name === vtParameter.criteria.name
                                                    && voteParameter.guest.name === vtParameter.guest.name);
    }

    decisionContainsOption(option: ArchDecisionOption): boolean {
        return this.decisionParameters.options.some(opt => opt.name === option.name);
    }

    decisionContainsCriteria(criteria: ArchCriteria): boolean {
        return this.decisionParameters.criterias.some(ct => ct.name === criteria.name);
    }

    decisionContainsGuest(guest: DecisionGuest): boolean {
        return this.decisionParameters.guests.some(gt => gt.name === guest.name);
    }
}