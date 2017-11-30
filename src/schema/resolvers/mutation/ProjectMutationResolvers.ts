import { Context } from '../../../context';
import { ProjectModel } from '../../../models/';

export const createProject = async (
  root,
  { input: { project } },
  context: Context<common.PageinationArguments>
): Promise<{ project: ProjectModel }> => {
  const projectModel = new ProjectModel(project, false);
  const newProject = await context.Services.ProjectService.create(projectModel);
  return { project: newProject };
};