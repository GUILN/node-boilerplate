import ArchDecision from '../../domain/Entities/ArchDecision';
import ArchDecisionOption from '../../domain/Entities/ArchDecisionOption';
import ArchCriteria from '../../domain/Entities/ArchCriteria';
import DecisionGuest from '../../domain/Entities/decision-guest';

interface optionFixtureData {
    name: string,
    description: string,
    score: number
}

interface criteriaFixtureData {
    name: string,
    description: string
}

interface decisionGuestFixtureData {
    isCreator: boolean,
    name: string
}

interface decisionCriteriaFixtureData {
    decisionName: string,
    options: optionFixtureData[],
    criterias: criteriaFixtureData[],
    guests: DecisionGuest[]
}

export const createArchCriteriaFromFixtureData = (fixtureData: criteriaFixtureData): ArchCriteria => {
    return new ArchCriteria(fixtureData.name, fixtureData.description);
}

export const createArchOptionFromFixtureData = (fixtureData: optionFixtureData): ArchDecisionOption => {
    return new ArchDecisionOption(fixtureData.name, fixtureData.description);
}

export const createDecisionGuestFromFixtureData = (fixtureData: decisionGuestFixtureData): DecisionGuest => {
    return new DecisionGuest(fixtureData.name, fixtureData.isCreator);
}

export const createArchDecisionObjectFromFixtureData = (fixtureData: decisionCriteriaFixtureData): ArchDecision => {
    const options = new Array<ArchDecisionOption>();
    const criterias = new Array<ArchCriteria>();
    const guests = new Array<DecisionGuest>();
    fixtureData.options?.forEach(optionFixDt => options.push(createArchOptionFromFixtureData(optionFixDt)))
    fixtureData.criterias?.forEach(criteriaFixDt => criterias.push(createArchCriteriaFromFixtureData(criteriaFixDt)));
    fixtureData.guests?.forEach(guestFixDt => guests.push(createDecisionGuestFromFixtureData(guestFixDt)));

    return new ArchDecision(fixtureData.decisionName, {options: options, criterias: criterias, guests: guests});
}
