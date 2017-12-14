import {
  ProjectService,
  LogService,
  InvoiceService,
  DontBeAService,
} from '../services';

import { Logger } from '../core/Logger';
const log = Logger('app:context:ServicesContext');

export class ServicesContext {

  static instance: ServicesContext;

  private projectService: ProjectService;
  private logService: LogService;
  private invoiceService: InvoiceService;
  private dontBeAService: DontBeAService;

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
  public get InvoiceService(): InvoiceService {
    return this.invoiceService;
  }
  public get DontBeAService(): DontBeAService {
    return this.dontBeAService;
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
  public setInvoiceService(invoiceService: InvoiceService): ServicesContext {
    this.invoiceService = invoiceService;
    log.debug('setInvoiceService');
    return this;
  }
  public setDontBeAService(dontBeAService: DontBeAService): ServicesContext {
    this.dontBeAService = dontBeAService;
    log.debug('setDontBeAService');
    return this;
  }

}