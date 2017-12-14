import { DontBeAModel } from '../../../models';
import { Context } from '../../../context';

export const allDontBeAs = async (
  root, 
  data, 
  context: Context<common.PageinationArguments>
): Promise<{ dontBeAs: DontBeAModel[] }> => {
  const dontBeAs = await context.Services.DontBeAService.findAll({
    limit: 100,
    offset: 0
  });
  return { dontBeAs };
};

export const randomDontBeA = async(
  root, 
  data, 
  context: Context<common.PageinationArguments>
): Promise<{ dontBeA: DontBeAModel }> => {
  const dontBeA = await context.Services.DontBeAService.findRandom();
  return { dontBeA };
};