import { Context } from '../../../context';
import { LogModel } from '../../../models/index';

export const createLog = async (root, { input: { log } }, context: Context<common.PageinationArguments>) => {
  const logModel = new LogModel(log, false);
  const newLog = await context.Services.LogService.create(logModel);
  return { log: newLog };
};

export const updateLog = async(root, { input: { id, patch } }, context: Context<common.PageinationArguments>) => {
  const updated = await context.Services.LogService.update(id, patch);
  return { log: updated };
};

export const deleteLog = async(root, { input: { id } }, context: Context<common.PageinationArguments>) => {
  return await { numberOfDeleted: context.Services.LogService.delete(id) };
};