import Job from '../../../models/JobModel';
import Chance from 'chance';

const chance = new Chance();
const jobModelMock = new Job();

jobModelMock.set('id', chance.integer({ min: 1 }));
jobModelMock.set('description', chance.string());
jobModelMock.set('title', chance.string());
jobModelMock.set('site', chance.string());
jobModelMock.set('type', chance.string());
jobModelMock.set('workload', chance.floating({ min: 1 }));
jobModelMock.set('salary', chance.floating({ min: 1 }));
jobModelMock.set('endingDate', chance.date());
jobModelMock.set('startingDate', chance.date());
jobModelMock.set('scholarity', chance.string());
jobModelMock.set('createdAt', chance.date());

export { jobModelMock };
