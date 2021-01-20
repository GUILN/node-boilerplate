import { VoteParameter, OptionScore } from "../../vos/decision-value-objects";
import ArchCriteria from "../arch-criteria";
import IVoteCounter from "./i-vote-counter";

export default class VoteCounter implements IVoteCounter {
    constructor() {
        
    }
    countVotesForCriteria(computedVotes: VoteParameter[], criteria: ArchCriteria): OptionScore {
        throw new Error("Method not implemented.");
    }
}