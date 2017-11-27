import { GraphQLArgumentConfig, GraphQLInt } from 'graphql';

import { Utils } from '../../core';
import { ValidationException } from '../../exceptions';

export class LimitArgument implements GraphQLArgumentConfig {

  public type = GraphQLInt;
  public description = 'This si the max amount of data that should be sent to the client';
  public defaultValue = 100;

  static validate(limit: number): void {
    if (!Utils.isPositive(limit)) {
      throw new ValidationException('Limit must be positive');
    }
  }

}