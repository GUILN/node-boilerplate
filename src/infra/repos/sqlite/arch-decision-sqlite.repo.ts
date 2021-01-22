import archDecision from "../../../domain/entities/arch-decision";
import ArchDecisionRepo from "../../../domain/repositories/arch-decision.repo";


export default class ArchDecisionSqliteRepo implements ArchDecisionRepo {
    getAll(): archDecision[] {
        throw new Error("Method not implemented.");
    }
    getById(id: number): archDecision {
        throw new Error("Method not implemented.");
    }
    insert(element: archDecision): void {
        throw new Error("Method not implemented.");
    }
    delete(element: archDecision): void {
        throw new Error("Method not implemented.");
    }

}