import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { ApplicationServiceError } from '../../../domain/errors/application-services.errors';

describe("[ArchDecisionApplicationService] - createArchDecision method", () => {
    it("Should throw ApplicationServiceError error when failing in domains validation during the creation process", () => {
        assert.throws(() => {

        }, ApplicationServiceError);
    });
});