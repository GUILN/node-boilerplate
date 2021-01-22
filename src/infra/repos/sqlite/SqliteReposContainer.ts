import {ReposContainer} from "../../../domain/repositories/repos-container";
import ArchDecisionOptionContainerSqliteRepo from './arch-decision-option-sqlite.repo';
import ArchDecisionSqliteRepo from "./arch-decision-sqlite.repo";

export const SqliteReposContainer: ReposContainer = {
    archDecisionRepo: new ArchDecisionSqliteRepo(),
    archDecisionOptionRepo: new ArchDecisionOptionContainerSqliteRepo(),
}