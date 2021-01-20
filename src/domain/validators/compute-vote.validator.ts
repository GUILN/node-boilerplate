import validator from 'validator';
import { ArchDecisionDomainConditionVerificationError, DecisionDoesNotContainThisCriteriaError, DecisionDoesNotContainThisOptionsError, GuestNotInvitedForThisDecisionError, VoteAlreadyComputedError } from '../errors/arch-decision-errors';
import { DecisionParameters, VoteParameter } from '../vos/decision-value-objects';
import IDomainValidator from './i-domain-validator';

export class DecisionContainsOptionPreConditionValidator implements IDomainValidator {
    private readonly decisionParameters: DecisionParameters;
    private readonly voteParameter: VoteParameter;
    constructor(decisionParameters: DecisionParameters, voteParameter: VoteParameter){
        this.decisionParameters = decisionParameters;
        this.voteParameter = voteParameter;
    }
    isValid(): boolean {
        return this.decisionParameters.options.some(opt => opt.name === this.voteParameter.option.name);
    }
    getValidationErrorObject(): ArchDecisionDomainConditionVerificationError {
        return new DecisionDoesNotContainThisOptionsError();
    }
}

export class DecisionContainsCriteriaPreConditionValidator implements IDomainValidator {
    private readonly decisionParameters: DecisionParameters;
    private readonly voteParameter: VoteParameter;
    constructor(decisionParameters: DecisionParameters, voteParameter: VoteParameter){
        this.decisionParameters = decisionParameters;
        this.voteParameter = voteParameter;
    }
    isValid(): boolean {
        return this.decisionParameters.criterias.some(ct => ct.name === this.voteParameter.criteria.name);
    }
    getValidationErrorObject(): ArchDecisionDomainConditionVerificationError {
        return new DecisionDoesNotContainThisCriteriaError();
    }
}

export class DecisionContainsGuestPreConditionValidator implements IDomainValidator {
    private readonly decisionParameters: DecisionParameters;
    private readonly voteParameter: VoteParameter;
    constructor(decisionParameters: DecisionParameters, voteParameter: VoteParameter){
        this.decisionParameters = decisionParameters;
        this.voteParameter = voteParameter;
    }
    isValid(): boolean {
        return this.decisionParameters.guests.some(gt => gt.name === this.voteParameter.guest.name);
    }
    getValidationErrorObject(): ArchDecisionDomainConditionVerificationError {
        return new GuestNotInvitedForThisDecisionError();
    }
}

export class VoteAlreadyComputedValidator implements IDomainValidator {
    private readonly computedVotes: VoteParameter[];
    private readonly voteParameter: VoteParameter;
    constructor(computedVotes: VoteParameter[], voteParameter: VoteParameter){
        this.computedVotes = computedVotes;
        this.voteParameter = voteParameter;
    }
    isValid(): boolean {
        return !this.computedVotes.some(vtParameter => this.voteParameter.option.name === vtParameter.option.name 
                                                        && this.voteParameter.criteria.name === vtParameter.criteria.name
                                                        && this.voteParameter.guest.name === vtParameter.guest.name);
    }
    getValidationErrorObject(): ArchDecisionDomainConditionVerificationError {
        return new VoteAlreadyComputedError();
    }
}

const createComputeVoteValidatorSet = (decisionParameter: DecisionParameters, voteParameter: VoteParameter, computedVotes: VoteParameter[]): IDomainValidator[] => {
    const validators = new Array<IDomainValidator>();
    validators.push(new DecisionContainsOptionPreConditionValidator(decisionParameter, voteParameter));
    validators.push(new DecisionContainsCriteriaPreConditionValidator(decisionParameter, voteParameter));
    validators.push(new DecisionContainsGuestPreConditionValidator(decisionParameter, voteParameter));
    validators.push(new VoteAlreadyComputedValidator(computedVotes, voteParameter));
    return validators;
}


export const executeAllArchDecisionComputeVotePreconditionValidationThrowingErrors = 
            (decisionParameters: DecisionParameters, votePrameter: VoteParameter, computedVotes: VoteParameter[]): void => {
                const validators = createComputeVoteValidatorSet(decisionParameters, votePrameter, computedVotes);
                validators.forEach(validator => {
                    if(!validator.isValid())
                        throw validator.getValidationErrorObject();
                });
            };
