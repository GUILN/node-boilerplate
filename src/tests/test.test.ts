import { expect } from 'chai';
import { describe } from 'mocha';

import { ApplicationContainer } from '../container';
import ArchDecisionOption from '../domain/Entities/ArchDecisionOption';

const archDecisionOptionRepo = ApplicationContainer.reposContainer.archDecisionOptionRepo;

// describe('Test test', () => {
//     it('checking test', () => {
//         const sut = 1;
//         expect(sut).to.be.eq(1);
//     })
// });

describe('[ArchDecisionOptionRepoTest]', () => {
    it('Should Retrieve expected Arch Options', () => {
        const sut = 1;
        expect(sut).to.be.eq(1);
    });

    it('Should Return a list of options at least one with name option 1', () => {
        const arrArchDecisionOptions = archDecisionOptionRepo.getAll();
        const names = arrArchDecisionOptions
                        .reduce<string>((previousStr, currentOp) => previousStr  + currentOp.name, "");
        expect(names).to.contain("option 1")
    });
});

