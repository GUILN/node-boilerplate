import { expect, assert } from 'chai';
import { describe } from 'mocha';
import ArchDecisionApplicationService from '../../../domain/application-services/arch-decision.application-service';
import { ApplicationServiceError } from '../../../domain/errors/application-services.errors';
import { ReposContainerStub } from '../../stubs/repositories/repos-container.stub';
import archDecisionFixtureData from '../../fixtures/arch-decision.fixture.json';
import { DecisionParameters } from '../../../domain/vos/decision-value-objects';
import ArchCriteria from '../../../domain/entities/arch-criteria';
import { createArchCriteriaFromFixtureData, createArchOptionFromFixtureData, createDecisionGuestFromFixtureData } from '../../fixtures/fixture-factories';
import ArchDecisionOption from '../../../domain/entities/arch-decision-option';
import DecisionGuest from '../../../domain/entities/decision-guest';

const archDecisionApplicationService: ArchDecisionApplicationService = new ArchDecisionApplicationService(ReposContainerStub.archDecisionRepo);
const decisionParameters: DecisionParameters = {
    criterias: archDecisionFixtureData.criterias.map<ArchCriteria>(ctr => createArchCriteriaFromFixtureData(ctr)),
    options: archDecisionFixtureData.options.map<ArchDecisionOption>(opt => createArchOptionFromFixtureData(opt)),
    guests: archDecisionFixtureData.guests.map<DecisionGuest>(gt => createDecisionGuestFromFixtureData(gt))
}

describe("[ArchDecisionApplicationService] - createArchDecision method", () => {
    it("Should throw ApplicationServiceError error when failing in domains validation during the creation process", () => {
        assert.throws(() => {
            archDecisionApplicationService.createArchDecision("Some Decision",decisionParameters);
        }, ApplicationServiceError);
    });
});
