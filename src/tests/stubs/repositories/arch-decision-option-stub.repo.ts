import archDecisionOption from "../../../domain/entities/arch-decision-option";
import ArchDecisionOptionRepo from "../../../domain/repositories/arch-decision-option.repo";

export default class ArchDecisionOptionStubRepo implements ArchDecisionOptionRepo {
    getAll(): archDecisionOption[] {
        throw new Error("Method not implemented.");
    }
    getById(id: number): archDecisionOption {
        throw new Error("Method not implemented.");
    }
    insert(element: archDecisionOption): void {
        throw new Error("Method not implemented.");
    }
    delete(element: archDecisionOption): void {
        throw new Error("Method not implemented.");
    }

}