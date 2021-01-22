import ArchDecision from "../entities/arch-decision";
import IVoteCounter, { VoteCounterType } from "../entities/vote-counters/i-vote-counter";
import VoteCounter from "../entities/vote-counters/vote-counter";
import { ArchDecisionRepeatedParameterError } from "../errors/arch-decision-errors";
import { executeAllArchDecisionCreateValidationsThrowingError } from "../validators/create-arch-decision.validator";
import { DecisionParameters } from "../vos/decision-value-objects";

export const VoteCounterFactory = { 
    createVoteCounter: (voteCounterType: VoteCounterType): IVoteCounter => {
        let voteCounter: IVoteCounter = new VoteCounter();
        
        return voteCounter;
    }
};

export const ArchDecisionFactory = {
    createArchDecision: (archDecisionName: string, decisionParameters: DecisionParameters, voteCounterType: VoteCounterType='normal'): ArchDecision => {
        executeAllArchDecisionCreateValidationsThrowingError(decisionParameters);
        const voteCounter = VoteCounterFactory.createVoteCounter(voteCounterType);
        const archDecision = new ArchDecision(archDecisionName, decisionParameters, voteCounter);
        return archDecision;
    }
}

