import EmailList from '../../../models/EmailListModel';
import Chance from 'chance';

const chance = new Chance();
const emailListModelMock = new EmailList();

emailListModelMock.set('id', chance.integer({ min: 1 }));
emailListModelMock.set('email', chance.string());
emailListModelMock.set('isActive', chance.bool());

export { emailListModelMock };