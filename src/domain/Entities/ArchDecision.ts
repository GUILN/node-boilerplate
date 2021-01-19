import ArchDecisionOption from './ArchDecisionOption';
import ArchCriteria from './ArchCriteria';
import { DecisionDoesNotContainThisCriteriaError, DecisionDoesNotContainThisOptionsError, GuestNotInvitedForThisDecisionError } from '../errors/arch-decision-errors';
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

export default class ArchDecision {
    public readonly decisionName?: string;
    private readonly decisionParameters: DecisionParameters;

    constructor(decisionName: string,decisionParameters: DecisionParameters) {
        this.decisionName = decisionName;
        this.decisionParameters = decisionParameters;
    }


    public vote(voteParameter: VoteParameter): void {
        this.executeVotePreConditionVerification(voteParameter);
    }

    executeVotePreConditionVerification(voteParameter: VoteParameter): void {
        if(!this.decisionContainsOption(voteParameter.option))
            throw new DecisionDoesNotContainThisOptionsError();
        else if(!this.decisionContainsCriteria(voteParameter.criteria))
            throw new DecisionDoesNotContainThisCriteriaError();
        else if(!this.decisionContainsGuest(voteParameter.guest))
            throw new GuestNotInvitedForThisDecisionError();
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