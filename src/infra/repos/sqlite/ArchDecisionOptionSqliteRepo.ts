import { arch } from 'os';
import ArchDecisionOption from '../../../domain/Entities/ArchDecisionOption';
import ArchDecisionOptionRepo from '../../../domain/repositories/ArchDecisionOptionRepo';
import {openDb} from './SqliteConnetion';

export default class ArchDecisionOptionSqliteRepo implements ArchDecisionOptionRepo {

    getAll(): ArchDecisionOption[] {
        let archDecisionOptions = new Array<ArchDecisionOption>();
        archDecisionOptions.push({id: 1, name: 'option 1'});
        
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