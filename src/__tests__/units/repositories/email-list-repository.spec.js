import repository from '../../../repositories/EmailListRepository';
import EmailList from '../../../models/EmailListModel';
import { jest } from '@jest/globals';
import { emailListModelMock } from '../factory/email-list-model-factory';

describe('EmailLists Context', () => {
  it('getAllEmailLists: should find all (one) emailLists', async () => {
    jest.spyOn(EmailList, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve({count: 1, rows: [emailListModelMock]}));
    const emailList = await repository.getAllEmailLists();
    expect(emailList).toBeDefined();
  });

  it('getAllEmailLists: should return empty emailList object', async () => {
    jest.spyOn(EmailList, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(null));
    const emailList = await repository.getAllEmailLists();
    expect(emailList).toBeNull();
  });

  it('getEmailListById: should find a emailList by id', async () => {
    jest.spyOn(EmailList, 'findOne').mockResolvedValueOnce(Promise.resolve(emailListModelMock));
    const emailList = await repository.getEmailListById(emailListModelMock.get('id'));
    expect(emailList).toBeDefined();
  });

  it('getEmailListById: should return empty emailList object', async () => {
    jest.spyOn(EmailList, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const emailList = await repository.getEmailListById(emailListModelMock.get('id'));
    expect(emailList).toBeNull();
  });

  it('updateAllIsActive: should update every isActive in emailList', async () => {
    jest.spyOn(EmailList, 'update').mockResolvedValueOnce(Promise.resolve(emailListModelMock));
    try {
      await repository.updateAllIsActive(true);
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('updateAllIsActive: should throw error', async () => {
    jest.spyOn(EmailList, 'update').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.updateAllIsActive(true);
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

  it('updateEmailList: should update emailList', async () => {
    jest.spyOn(EmailList, 'update').mockResolvedValueOnce(Promise.resolve(emailListModelMock));
    try {
      await repository.updateEmailList('', emailListModelMock.get('id'));
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('updateEmailList: should throw error', async () => {
    jest.spyOn(EmailList, 'update').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.updateEmailList('', emailListModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

  it('deleteBulkEmailLists: should delete emailList', async () => {
    jest.spyOn(EmailList, 'destroy').mockResolvedValueOnce(Promise.resolve(emailListModelMock));
    try {
      await repository.deleteBulkEmailLists([ emailListModelMock.get('id') ]);
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('deleteBulkEmailLists: should throw error', async () => {
    jest.spyOn(EmailList, 'destroy').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.deleteBulkEmailLists(emailListModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

  it('createBulkEmailLists: should create emailLists in bulk', async () => {
    jest.spyOn(EmailList, 'bulkCreate').mockResolvedValueOnce(Promise.resolve([ emailListModelMock ]));
    try {
      await repository.createBulkEmailLists('');
      expect.anything();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('createBulkEmailLists: should throw error', async () => {
    jest.spyOn(EmailList, 'bulkCreate').mockResolvedValueOnce(new Error("error"));
    try {
      await repository.createBulkEmailLists('');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

});
