import * as faker from 'faker';
import { ProjectModel } from '../../models/ProjectModel';
import { Utils } from '../../core/Utils';

export const makeProject = (): ProjectModel => {
  return (new ProjectModel())
    .setName(faker.internet.domainName())
    .setColor(Utils.getColor());
};