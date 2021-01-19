import ArchDecisionOption from './ArchDecisionOption';
import ArchCriteria from './ArchCriteria';
import { DecisionDoesNotContainThisOptionsError } from '../errors/arch-decision-errors';

export default class ArchDecision {
    private readonly decisionName?: string;
    private readonly options: Array<ArchDecisionOption>;
    private readonly criterias: Array<ArchCriteria>;

    constructor(decisionName: string,options: Array<ArchDecisionOption>, criterias: Array<ArchCriteria>) {
        this.decisionName = decisionName;
        this.options = options;
        this.criterias = criterias;
    }


    public vote(option: ArchDecisionOption, criterea: ArchCriteria, voteValue: number): void {
        
        //throw new DecisionDoesNotContainThisOptionsError();
    }
}