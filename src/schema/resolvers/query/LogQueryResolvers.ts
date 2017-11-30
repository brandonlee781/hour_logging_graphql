import { Context } from '../../../context';
import { LogModel } from '../../../models/index';

export const allLogs = async (
  root, 
  data, 
  context: Context<common.PageinationArguments>
): Promise<{logs: LogModel[]}> => {
  const logs = await context.Services.LogService.findAll({ limit: 100, offset: 0 });
  return { logs };
};

export const oneLog = async (
  root,
  { input: { id } }, 
  context: Context<common.PageinationArguments>
): Promise<{log: LogModel}> => {
  const log = await context.Services.LogService.findById(id);
  return { log };
};

export const allLogsByProjectName = async (
  root, 
  { input: { name } }, 
  context: Context<common.PageinationArguments>
): Promise<{ logs: LogModel[] }> => {
  const project = await context.Services.ProjectService.search(name);
  const projectId = project[0].Id;
  const logs = await context.Services.LogService.findByProjectId(projectId);
  return { logs };
};

export const allLogsByProjectId = async (
  root, 
  { input: { id } }, 
  context: Context<common.PageinationArguments>
): Promise<{logs: LogModel[]}> => {
  const logs = await context.Services.LogService.findByProjectId(id);
  return { logs };
};