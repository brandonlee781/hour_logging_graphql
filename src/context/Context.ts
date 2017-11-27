import * as express from 'express';

import { ServicesContext } from './ServicesContext';

export class Context<A> {

  /**
   * We use this property to store the resolve arguments
   * from the root query or mutation, so that we can access
   * them laster in a type resolver
   */
  private args: A;

  constructor(
    private request: express.Request,
    private response: express.Response,
    private services: ServicesContext
  ) {}

  public get Args(): A {
    return this.args;
  }
  public get Response(): express.Response {
    return this.response;
  }
  public get Request(): express.Request {
    return this.request;
  }
  public get Services(): ServicesContext {
    return this.services;
  }
  public getLanguage(): string[] {
    return this.request.acceptsLanguages();
  }

  public setResolveArguments(args: A): void {
    this.args = args;
  }
}