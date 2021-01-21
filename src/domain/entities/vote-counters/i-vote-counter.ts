import { DecisionParameters, OptionScore, VoteParameter, VoteResult } from "../../vos/decision-value-objects";
import ArchCriteria from "../arch-criteria";

export default interface IVoteCounter {
    countVotesForCriteria(decisionParameters: DecisionParameters,computedVotes: VoteParameter[], criteria: ArchCriteria): VoteResult;
}