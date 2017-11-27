import { ProjectActions } from '../actions';
import { ProjectModel } from '../models/ProjectModel';
import { Logger } from '../core/Logger';
import { NotFoundException } from '../exceptions';

export class ProjectService {

  private log = Logger('app:service:ProjectService');

  constructor(private projectActions: ProjectActions) {}

  public async findAll(options: common.PageinationArguments): Promise<ProjectModel[]> {
    this.log.debug('findAll called');
    const results = await this.projectActions.findAll(options);
    return results.map(result => new ProjectModel(result));
  }

  public async findById(id: string): Promise<ProjectModel> {
    this.log.debug('findById called with id=', id);
    const result = await this.projectActions.findById(id);
    if (result === null) {
      throw new NotFoundException(id);
    }
    return new ProjectModel(result);
  }

  public async findByIds(ids: string[]): Promise<ProjectModel[]> {
    this.log.debug('findByIds called with ids=', ids);
    const results = await this.projectActions.findByIds(ids);
    return results.map(result => new ProjectModel(result));
  }

  public async search(text: string): Promise<ProjectModel[]> {
    this.log.debug('search called with text=', text);
    const results = await this.projectActions.search(text);
    return results.map(result => new ProjectModel(result));
  }

  public async create(projectModel: ProjectModel): Promise<ProjectModel> {
    this.log.debug('created called with =', projectModel);
    const id = await this.projectActions.create(projectModel.toDatabaseObject());
    return this.findById(id);
  }

  public async update(newProjectModel: ProjectModel): Promise<ProjectModel> {
    this.log.debug('updated called with = ', newProjectModel);
    const projectModel = await this.findById(newProjectModel.Id);
    projectModel.merge(newProjectModel);
    await this.projectActions.update(projectModel.toDatabaseObject());
    return this.findById(newProjectModel.Id);
  }

  public async delete(id: string): Promise<void> {
    this.log.debug('delete called with id=', id);
    return this.projectActions.delete(id);
  }
}