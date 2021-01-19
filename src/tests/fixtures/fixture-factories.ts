import ArchDecision from '../../domain/Entities/ArchDecision';
import ArchDecisionOption from '../../domain/Entities/ArchDecisionOption';
import ArchCriteria from '../../domain/Entities/ArchCriteria';

interface optionFixtureData {
    name: string,
    description: string,
    score: number
}

interface criteriaFixtureData {
    name: string,
    description: string
}

interface decisionCriteriaFixtureData {
    decisionName: string,
    options: optionFixtureData[],
    criterias: criteriaFixtureData[]
}

export const createArchCriteriaFromFixtureData = (fixtureData: criteriaFixtureData): ArchCriteria => {
    return new ArchCriteria(fixtureData.name, fixtureData.description);
}

export const createArchOptionFromFixtureData = (fixtureData: optionFixtureData): ArchDecisionOption => {
    return new ArchDecisionOption(fixtureData.name, fixtureData.description);
}

export const createArchDecisionObjectFromFixtureData = (fixtureData: decisionCriteriaFixtureData): ArchDecision => {
    const options = new Array<ArchDecisionOption>();
    const criterias = new Array<ArchCriteria>();
    fixtureData.options?.forEach(optionFixDt => options.push(createArchOptionFromFixtureData(optionFixDt)))
    fixtureData.criterias?.forEach(criteriaFixDt => criterias.push(createArchCriteriaFromFixtureData(criteriaFixDt)));
    return new ArchDecision(fixtureData.decisionName, options, criterias);
}
