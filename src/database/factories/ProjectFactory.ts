import * as faker from 'faker';
import { ProjectModel } from '../../models/ProjectModel';

export const makeProject = (): ProjectModel => {
  return (new ProjectModel())
    .setName(faker.internet.domainName());
};