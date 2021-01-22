import ArchCriteria from "../entities/arch-criteria";
import ArchDecisionOption from "../entities/arch-decision-option";
import DecisionGuest from "../entities/decision-guest";
import { ArchDecisionDomainConditionVerificationError, ArchDecisionMoreThanOneCreatorGuestError, ArchDecisionRepeatedParameterError } from "../errors/arch-decision-errors";
import { DecisionParameters } from "../vos/decision-value-objects";
import IDomainValidator from "./i-domain-validator";

export class DecisionParameterRepeatedParameterValidator implements IDomainValidator {
    private readonly decisionParameters: DecisionParameters;
    constructor(decisionParamers: DecisionParameters){
        this.decisionParameters = decisionParamers;
    }

    isValid(): boolean {
        return !(this.hasRepeatedCriterias() || this.hasRepeatedOptions() || this.hasRepeatedGuests())
    }
    getValidationErrorObject(): ArchDecisionDomainConditionVerificationError {
        const err = new ArchDecisionRepeatedParameterError();
        return err;
    }

    private hasRepeatedCriterias(): boolean {
        return ArrayHasRepeatedItem<ArchCriteria>(this.decisionParameters.criterias, (ctr) => ctr.name.trim().toUpperCase());
    }
    private hasRepeatedOptions(): boolean {
        return ArrayHasRepeatedItem<ArchDecisionOption>(this.decisionParameters.options, (opt) => opt.name?.trim().toUpperCase() || "");
    }
    private hasRepeatedGuests(): boolean {
        return ArrayHasRepeatedItem<DecisionGuest>(this.decisionParameters.guests, (gt) => gt.name.trim().toUpperCase());
    }
}

export class IsMoreThanOneCreatorGuestValidator implements IDomainValidator {
    private readonly guests: Array<DecisionGuest>;
    constructor(guests: Array<DecisionGuest>){
        this.guests = guests;
    }

    isValid(): boolean {
        return !this.hasMoreThanOneCreatorGuest();
    }
    getValidationErrorObject(): ArchDecisionDomainConditionVerificationError {
        return new ArchDecisionMoreThanOneCreatorGuestError();
    }
    private hasMoreThanOneCreatorGuest(): boolean {
        let creatorGuestHadBeenSeenSoFar = false;
        for(let guest of this.guests) {
            if(creatorGuestHadBeenSeenSoFar && guest.isCreator)
                return true;
            if(guest.isCreator)
                creatorGuestHadBeenSeenSoFar = true;
        }
        return false;
    }
}

export const executeAllArchDecisionCreateValidationsThrowingError = (decisionParameters: DecisionParameters): void => {
    const allValidators = getAllArchDecisionCreateValidators(decisionParameters);
    allValidators.forEach(validator => {
        if(!validator.isValid()){
            const err = validator.getValidationErrorObject();
            throw err;
        }
    });
};

const getAllArchDecisionCreateValidators = (decisionParamters: DecisionParameters): Array<IDomainValidator> => {
    const validators = new Array<IDomainValidator>();
    validators.push(new DecisionParameterRepeatedParameterValidator(decisionParamters));
    validators.push(new IsMoreThanOneCreatorGuestValidator(decisionParamters.guests));
    return validators;
};

function ArrayHasRepeatedItem<T>(array: Array<T>, unique_hash_string_generator: (param: T) => string): boolean {
    let uniqueHashStringsSoFar = new Set<string>();
    for(let item of array) {
        let item_hash_string = unique_hash_string_generator(item);
        if(uniqueHashStringsSoFar.has(item_hash_string))
            return true;
        uniqueHashStringsSoFar.add(item_hash_string);
    }
    return false;
};

