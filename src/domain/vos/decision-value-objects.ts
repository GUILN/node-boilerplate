import ArchCriteria from "../Entities/ArchCriteria";
import ArchDecisionOption from "../Entities/ArchDecisionOption";
import DecisionGuest from "../Entities/decision-guest";

export interface DecisionParameters {
    options: Array<ArchDecisionOption>,
    criterias: Array<ArchCriteria>,
    guests: Array<DecisionGuest>
}

export interface VoteParameter {
    option: ArchDecisionOption,
    criteria: ArchCriteria,
    guest: DecisionGuest,
    value: number
}

export interface OptionScore {
    option: ArchDecisionOption,
    score: number,
}

export interface VoteResult {
    optionsScore: OptionScore[],
    isVotingConcluded: boolean
}