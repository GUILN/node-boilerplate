import ArchDecision from "../entities/arch-decision";
import { DecisionParameters } from "../vos/decision-value-objects";

interface ArchDecisionQueryParameters {
    name: string,
    id?: number,
    creatorGuestName?: string
}

export default class ArchDecisionApplicationService {

    constructor() {
        
    }

    createArchDecision(decisionName: string, decisionParameters: DecisionParameters): ArchDecision {
        throw Error("Not Implemented");
    }
    getArchDecision(archDecisionQueryParameters: ArchDecisionQueryParameters): ArchDecision{
        throw Error("Not Implemented");
    }
    deleteArchDecision(archDecisionQueryParameters: ArchDecisionQueryParameters): void {

    }
}