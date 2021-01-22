import { ReposContainer } from "../../../domain/repositories/repos-container";
import ArchDecisionOptionStubRepo from "./arch-decision-option-stub.repo";
import ArchDecisionStubRepo from "./arch-decision-stub.repo";

export const ReposContainerStub:ReposContainer = {
    archDecisionRepo: new ArchDecisionStubRepo(),
    archDecisionOptionRepo: new ArchDecisionOptionStubRepo()
} 