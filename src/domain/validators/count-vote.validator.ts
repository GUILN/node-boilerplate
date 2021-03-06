import ArchCriteria from "../entities/arch-criteria";
import DecisionGuest from "../entities/decision-guest";
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
        const totalVotesForCriteria = this.computedVotes.filter(vote => vote.criteria.name === this.criteria.name)?.length;
        return totalVotesForCriteria === this.guests.length;    
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
        if(!validator.isValid()){
            const errorObject: ArchDecisionDomainConditionVerificationError = validator.getValidationErrorObject();
            throw errorObject;
        }
            
    });
}
