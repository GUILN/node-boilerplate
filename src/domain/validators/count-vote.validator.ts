import ArchCriteria from "../Entities/ArchCriteria";
import DecisionGuest from "../Entities/decision-guest";
import { ArchDecisionDomainConditionVerificationError, ArchDecisionVotingIsntFinishedError } from "../errors/arch-decision-errors";
import { VoteParameter } from "../vos/decision-value-objects";
import IDomainValidator from "./i-domain-validator";

export class CriteriaVoteHasFinishedValidator implements IDomainValidator {
    private computedVotes: Array<VoteParameter>;
    private guests: Array<DecisionGuest>;
    private criteria: ArchCriteria;

    constructor(computedVotes: Array<VoteParameter>, guests: Array<DecisionGuest>, criteria: ArchCriteria) {
        this.computedVotes = computedVotes;
        this.guests = guests;
        this.criteria = criteria;
    }

    isValid(): boolean {
        return this.computedVotes.filter(vote => vote.criteria.name === this.criteria.name)?.length == this.guests.length;    
    }
    getValidationErrorObject(): ArchDecisionDomainConditionVerificationError {
        return new ArchDecisionVotingIsntFinishedError();
    }
}

const createAllVotePreconditionValidators = (computedVotes: Array<VoteParameter>,
                                                guests: Array<DecisionGuest>,
                                                criteria: ArchCriteria): Array<IDomainValidator> => {
    let validators = new Array<IDomainValidator>();
    validators.push(new CriteriaVoteHasFinishedValidator(computedVotes, guests, criteria))
    return validators;
}

export const executeAllArchDecisionCountVotePreconditionValidationThrowingErrors = (computedVotes: Array<VoteParameter>,
                                                                                    guests: Array<DecisionGuest>,
                                                                                    criteria: ArchCriteria): void => {
    const validators: Array<IDomainValidator> = createAllVotePreconditionValidators(computedVotes, guests, criteria);
    validators.forEach(validator => {
        if(!validator.isValid())
            throw validator.getValidationErrorObject();
    });
}