import {
  ProjectService,
  LogService
} from '../services';

import { Logger } from '../core/Logger';
const log = Logger('app:context:ServicesContext');

export class ServicesContext {

  static instance: ServicesContext;

  private projectService: ProjectService;
  private logService: LogService;

  static getInstance(): ServicesContext {
    if (!ServicesContext.instance) {
      ServicesContext.instance = new ServicesContext();
    }
    return ServicesContext.instance;
  }
  
  public get ProjectService(): ProjectService {
    return this.projectService;
  }
  public get LogService(): LogService {
    return this.logService;
  }

  public setProjectService(projectService: ProjectService): ServicesContext {
    this.projectService = projectService;
    log.debug('setProjectService');
    return this;
  }
  public setLogService(logService: LogService): ServicesContext {
    this.logService = logService;
    log.debug('setLogService');
    return this;
  }

}