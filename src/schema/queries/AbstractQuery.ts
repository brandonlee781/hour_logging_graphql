import { GraphQLResolveInfo } from 'graphql';

import { Context } from '../../context';

export interface GraphQLQueryInterface {
  allow: string[];
  before<A, S>(context: Context<A>, args: A, source?: S): Promise<A>;
  after<R, A, S>(result: R, context: Context<A>, args?: A, source?: S): Promise<R>;
  execute<R, A>(args: A, context: Context<A>, info: GraphQLResolveInfo): Promise<R>;
}

export class AbstractQuery {
  
  /**
   * Needed permission roles
   * @type {string[]}
   * @memberOf AbstractQuery
   */
  public allow: string[] = [];

  /**
   * Before Hook. Alters the args obejct before the 
   * actual resolver(exeucte) will be called.
   */
  public before<A, S>(context: Context<A>, args: A, source?: S): Promise<A> {
    return Promise.resolve(args);
  }

  /**
   * After Hook. It will be called after the actual
   * resolver(execute). Alters the results before sending
   * it to the client.
   * 
   * @template R
   * @template A
   * @template S
   * @param {R} result
   * @param {Context} context
   * @param {A} [args]
   * @param {S} [source]
   * @returns {Promise<R>}
   * 
   * @memberOf AbstractQuery
   */
  public after<R, A, S>(result: R, context: Context<A>, args?: A, source?: S): Promise<R> {
    return Promise.resolve(result);
  }

  /**
   *  Resolver, gathers the needed data. 
   * @param {any} args 
   * @param {Context} context
   * @returns {Promise<R>}
   * 
   * @memberOf AbstractQuery
   */
  public execute<R, A>(args: A, context: Context<A>, info: GraphQLResolveInfo): Promise<R> {
    return undefined;
  }

  public resolve = async<R, A>(args: A, context: Context<A>, info: GraphQLResolveInfo): Promise<R> => {
    // store the root query arguments
    context.setResolveArguments(args);

    // first check roles
    // if (!context.hasUserRoles(this.allow)) {
    //   context.Response.send(401);
    //   return Promise.reject('401 Unauthorized');
    // }

    const newArgs = await this.before(context, args);
    const result = await this.execute<R, A>(newArgs, context, info);
    
    await this.after(result, context, args);

    return result;

  }

}