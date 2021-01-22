import {ReposContainer} from "../../../domain/repositories/repos-container";
import ArchDecisionOptionContainerSqliteRepo from './ArchDecisionOptionSqliteRepo';

export const SqliteReposContainer: ReposContainer = {
    archDecisionOptionRepo: new ArchDecisionOptionContainerSqliteRepo(),
}