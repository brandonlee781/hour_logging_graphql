import { Context } from '../../../context';
import { LogModel } from '../../../models/index';

export const allLogs = async (
  root, 
  { input, options: { limit, offset } }, 
  context: Context<common.PageinationArguments>
): Promise<{logs: LogModel[]}> => {
  const logs = await context.Services.LogService.findAll({ limit, offset });
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
  { input: { name }, options: { limit, offset }  }, 
  context: Context<common.PageinationArguments>
): Promise<{ logs: LogModel[] }> => {
  const project = await context.Services.ProjectService.search(name);
  const projectId = project[0].Id;
  const logs = await context.Services.LogService.findByProjectId(projectId, { limit, offset });
  return { logs };
};

export const allLogsByProjectId = async (
  root, 
  { input: { id }, options: { limit, offset }  }, 
  context: Context<common.PageinationArguments>
): Promise<{logs: LogModel[]}> => {
  let logs;
  if (id !== '') {
    logs = await context.Services.LogService.findByProjectId(id, { limit, offset });
  } else {
    logs = await context.Services.LogService.findAll({ limit, offset });
  }
  return { logs };
};

export const allLogsByDates = async (
  root,
  { input: { start, end }, options: { limit, offset } },
  context: Context<common.PageinationArguments>
): Promise<{ logs: LogModel[] }> => {
  const logs = await context.Services.LogService.findByDate({ start, end }, { limit, offset });
  return { logs };
};