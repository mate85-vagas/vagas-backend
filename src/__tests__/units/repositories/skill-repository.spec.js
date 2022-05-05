import repository from '../../../repositories/SkillRepository';
import Skill from '../../../models/SkillModel';
import { jest } from '@jest/globals';
import { skillModelMock } from '../factory/skill-model-factory';

describe('Skills Context', () => {
  it('getAllSkills: should find all (one) skills', async () => {
    jest.spyOn(Skill, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve({count: 1, rows: [skillModelMock]}));
    const skill = await repository.getAllSkills();
    expect(skill).toBeDefined();
  });

  it('getAllSkills: should return empty skill object', async () => {
    jest.spyOn(Skill, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(null));
    const skill = await repository.getAllSkills();
    expect(skill).toBeNull();
  });

  it('getSkillById: should find a skill by id', async () => {
    jest.spyOn(Skill, 'findOne').mockResolvedValueOnce(Promise.resolve(skillModelMock));
    const skill = await repository.getSkillById(skillModelMock.get('id'));
    expect(skill).toBeDefined();
  });

  it('getSkillById: should return empty skill object', async () => {
    jest.spyOn(Skill, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const skill = await repository.getSkillById(skillModelMock.get('id'));
    expect(skill).toBeNull();
  });

  it('updateSkill: should update skill', async () => {
    jest.spyOn(Skill, 'update').mockResolvedValueOnce(Promise.resolve(skillModelMock));
    try {
      await repository.updateSkill('', skillModelMock.get('id'));
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('updateSkill: should throw error', async () => {
    jest.spyOn(Skill, 'update').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.updateSkill('', skillModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

  it('deleteSkill: should delete skill', async () => {
    jest.spyOn(Skill, 'destroy').mockResolvedValueOnce(Promise.resolve(skillModelMock));
    try {
      await repository.deleteSkill(skillModelMock.get('id'));
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('deleteSkill: should throw error', async () => {
    jest.spyOn(Skill, 'destroy').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.deleteSkill(skillModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

  it('createBulkSkills: should create skills in bulk', async () => {
    jest.spyOn(Skill, 'bulkCreate').mockResolvedValueOnce(Promise.resolve([ skillModelMock ]));
    try {
      await repository.createBulkSkills('');
      expect.anything();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('createBulkSkills: should throw error', async () => {
    jest.spyOn(Skill, 'bulkCreate').mockResolvedValueOnce(new Error("error"));
    try {
      await repository.createBulkSkills('');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

});
