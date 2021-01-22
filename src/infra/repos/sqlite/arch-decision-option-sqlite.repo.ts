
import ArchDecisionOption from '../../../domain/entities/arch-decision-option';
import ArchDecisionOptionRepo from '../../../domain/repositories/arch-decision-option.repo';
//import {openDb} from './SqliteConnetion';

export default class ArchDecisionOptionSqliteRepo implements ArchDecisionOptionRepo {

    getAll(): ArchDecisionOption[] {
        let archDecisionOptions = new Array<ArchDecisionOption>();
        archDecisionOptions.push(new ArchDecisionOption("opt 1", "desc"));
        
        return archDecisionOptions;
    }
    getById(id: number): ArchDecisionOption {
        throw new Error('Method not implemented.');
    }
    insert(element: ArchDecisionOption): void {
        throw new Error('Method not implemented.');
    }
    delete(element: ArchDecisionOption): void {
        throw new Error('Method not implemented.');
    }
}