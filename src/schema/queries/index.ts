import { Context } from '../../context';
export * from './projects';
export const allLogs = async (root, data, context: Context<common.PageinationArguments>) => {
  return await context.Services.LogService.findAll({
    limit: 100,
    offset: 0
  });
};