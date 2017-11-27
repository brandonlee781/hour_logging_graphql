import { Context } from '../../context';

export const allProjects = async (root, data, context: Context<common.PageinationArguments>) => {
  return await context.Services.ProjectService.findAll({
    limit: 100,
    offset: 0
  });
};