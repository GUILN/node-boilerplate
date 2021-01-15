import ArchDecisionOption from './ArchDecisionOption';
import ArchCriteria from './ArchCriteria';

export default class ArchDecision {
    public ProjectName?: string;
    public DecisionName?: string;
    public Options?: Array<ArchDecisionOption>;
    public Criterias?: Array<ArchCriteria>;
}