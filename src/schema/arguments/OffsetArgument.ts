import { GraphQLArgumentConfig, GraphQLInt } from 'graphql';

import { Utils } from '../../core';
import { ValidationException } from '../../exceptions';

export class OffsetArgument implements GraphQLArgumentConfig {

  public type = GraphQLInt;
  public description = 'The number of data entries skipped when data is requested';
  public defaultValue = 0;

  static validate(offset: number): void {
    if (!Utils.isPositive(offset)) {
      throw new ValidationException('Offset must be positive');
    }
  }

}