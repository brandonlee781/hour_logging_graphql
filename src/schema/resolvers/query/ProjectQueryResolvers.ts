import { ProjectModel } from '../../../models';
import { Context } from '../../../context';

export const allProjects = async (
  root, 
  data, 
  context: Context<common.PageinationArguments>
): Promise<{ projects: ProjectModel[] }> => {
  const projects = await context.Services.ProjectService.findAll({
    limit: 100,
    offset: 0
  });
  return { projects };
};

export const oneProject = async(
  root, 
  { input: { id } }, 
  context: Context<common.PageinationArguments>
): Promise<{ project: ProjectModel }> => {
  const project = await context.Services.ProjectService.findById(id);
  return { project };
};