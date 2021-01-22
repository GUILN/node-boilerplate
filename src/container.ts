
import {SqliteReposContainer} from './infra/repos/sqlite/SqliteReposContainer';
import {ReposContainer} from './domain/repositories/repos-container';
import { environment, config } from './config';

interface IApplicationContainer {
    reposContainer: ReposContainer
}

const ProdApplicationContainer: IApplicationContainer = {
    reposContainer: SqliteReposContainer
}

const DevApplicationContainer: IApplicationContainer = {
    reposContainer: SqliteReposContainer
}

const TestApplicationContainer: IApplicationContainer = {
    reposContainer: SqliteReposContainer
}

interface IContainerMap {
    prod: IApplicationContainer,
    test: IApplicationContainer,
    dev: IApplicationContainer
}

const containerMap: IContainerMap = {
    prod: ProdApplicationContainer,
    test: TestApplicationContainer,
    dev: DevApplicationContainer
}

function getConfiguredContainerByEnvironmen<k extends keyof IContainerMap>(envi: k): IContainerMap[k] {
    return containerMap[envi];
}



export const ApplicationContainer: IApplicationContainer = getConfiguredContainerByEnvironmen(config.environment);

