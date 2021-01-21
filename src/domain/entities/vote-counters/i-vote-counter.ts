import { DecisionParameters, OptionScore, VoteParameter, VoteResult } from "../../vos/decision-value-objects";
import ArchCriteria from "../arch-criteria";

export type VoteCounterType = 'normal' | 'wheighned-vote';

export default interface IVoteCounter {
    countVotesForCriteria(decisionParameters: DecisionParameters,computedVotes: VoteParameter[], criteria: ArchCriteria): VoteResult;
    getVoteCounterType(): VoteCounterType;
}