import Technology from '../../../models/TechnologyModel';
import Chance from 'chance';

const chance = new Chance();
const technologyModelMock = new Technology();

technologyModelMock.set('id', chance.integer({ min: 1 }));
technologyModelMock.set('description', chance.string());

export { technologyModelMock };
