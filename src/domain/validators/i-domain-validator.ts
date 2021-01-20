import { ArchDecisionDomainConditionVerificationError } from "../errors/arch-decision-errors";

export default interface IDomainValidator {
    isValid(): boolean;
    getValidationErrorObject(): ArchDecisionDomainConditionVerificationError;
}