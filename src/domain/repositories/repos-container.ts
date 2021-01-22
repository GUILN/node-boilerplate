import ArchDecisionOptionRepo from "./arch-decision-option.repo";
import ArchDecisionRepo from "./arch-decision.repo";

export interface ReposContainer {
    archDecisionRepo: ArchDecisionRepo,
    archDecisionOptionRepo: ArchDecisionOptionRepo
}