import repository from '../../../repositories/TechnologyRepository';
import Technology from '../../../models/TechnologyModel';
import { jest } from '@jest/globals';
import { technologyModelMock } from '../factory/technology-model-factory';

describe('Technologies Context', () => {
  it('getAllTechnologies: should find all (one) technologies', async () => {
    jest.spyOn(Technology, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve({count: 1, rows: [technologyModelMock]}));
    const technology = await repository.getAllTechnologies();
    expect(technology).toBeDefined();
  });

  it('getAllTechnologies: should return empty technology object', async () => {
    jest.spyOn(Technology, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(null));
    const technology = await repository.getAllTechnologies();
    expect(technology).toBeNull();
  });

  it('getTechnologyById: should find a technology by id', async () => {
    jest.spyOn(Technology, 'findOne').mockResolvedValueOnce(Promise.resolve(technologyModelMock));
    const technology = await repository.getTechnologyById(technologyModelMock.get('id'));
    expect(technology).toBeDefined();
  });

  it('getTechnologyById: should return empty technology object', async () => {
    jest.spyOn(Technology, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const technology = await repository.getTechnologyById(technologyModelMock.get('id'));
    expect(technology).toBeNull();
  });

  it('updateTechnology: should update technology', async () => {
    jest.spyOn(Technology, 'update').mockResolvedValueOnce(Promise.resolve(technologyModelMock));
    try {
      await repository.updateTechnology('', technologyModelMock.get('id'));
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('updateTechnology: should throw error', async () => {
    jest.spyOn(Technology, 'update').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.updateTechnology('', technologyModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

  it('deleteTechnology: should delete technology', async () => {
    jest.spyOn(Technology, 'destroy').mockResolvedValueOnce(Promise.resolve(technologyModelMock));
    try {
      await repository.deleteTechnology(technologyModelMock.get('id'));
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('deleteTechnology: should throw error', async () => {
    jest.spyOn(Technology, 'destroy').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.deleteTechnology(technologyModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

  it('createBulkTechnologies: should create technologies in bulk', async () => {
    jest.spyOn(Technology, 'bulkCreate').mockResolvedValueOnce(Promise.resolve([ technologyModelMock ]));
    try {
      await repository.createBulkTechnologies('');
      expect.anything();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('createBulkTechnologies: should throw error', async () => {
    jest.spyOn(Technology, 'bulkCreate').mockResolvedValueOnce(new Error("error"));
    try {
      await repository.createBulkTechnologies('');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

});
