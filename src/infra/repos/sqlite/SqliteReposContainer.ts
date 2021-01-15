import {ReposContainer} from "../../../domain/repositories/ReposContainer";
import ArchDecisionOptionContainerSqliteRepo from './ArchDecisionOptionSqliteRepo';

export const SqliteReposContainer: ReposContainer = {
    archDecisionOptionRepo: new ArchDecisionOptionContainerSqliteRepo(),
}