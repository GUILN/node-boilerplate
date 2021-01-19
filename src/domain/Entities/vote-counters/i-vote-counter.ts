import { OptionScore, VoteParameter } from "../../vos/decision-value-objects";
import ArchCriteria from "../ArchCriteria";

export default interface IVoteCounter {
    countVotesForCriteria(computedVotes: VoteParameter[], criteria: ArchCriteria): OptionScore;
}