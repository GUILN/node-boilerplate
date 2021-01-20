import ArchCriteria from "../entities/arch-criteria";
import ArchDecisionOption from "../entities/arch-decision-option";
import DecisionGuest from "../entities/decision-guest";

export interface DecisionParameters {
    options: Array<ArchDecisionOption>,
    criterias: Array<ArchCriteria>,
    guests: Array<DecisionGuest>
}

export interface VoteParameter {
    option: ArchDecisionOption,
    criteria: ArchCriteria,
    guest: DecisionGuest,
    value?: number
}

export interface OptionScore {
    option: ArchDecisionOption,
    score: number,
}

export interface VoteResult {
    optionsScore: OptionScore[],
    isVotingConcluded: boolean
}