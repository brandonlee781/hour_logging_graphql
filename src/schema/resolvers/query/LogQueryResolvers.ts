import { Context } from '../../../context';
import { LogModel } from '../../../models/index';

export const allLogs = async (root, data, context: Context<common.PageinationArguments>): Promise<LogModel[]> => {
  return await context.Services.LogService.findAll({
    limit: 100,
    offset: 0
  });
};

export const oneLog = async (root, data, context: Context<common.PageinationArguments>): Promise<LogModel> => {
  return await context.Services.LogService.findById(data.id);
};

export const allLogsByProjectName = async (
  root, 
  data, 
  context: Context<common.PageinationArguments>
): Promise<LogModel[]> => {
  const project = await context.Services.ProjectService.search(data.name);
  const projectId = project[0].Id;
  return await context.Services.LogService.findByProjectId(projectId);
};

export const allLogsByProjectId = async (
  root, 
  data, 
  context: Context<common.PageinationArguments>
): Promise<LogModel[]> => {
  return await context.Services.LogService.findByProjectId(data.id);
};