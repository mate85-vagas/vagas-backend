import Skill from '../../../models/SkillModel';
import Chance from 'chance';

const chance = new Chance();
const skillModelMock = new Skill();

skillModelMock.set('id', chance.integer({ min: 1 }));
skillModelMock.set('description', chance.string());

export { skillModelMock };
