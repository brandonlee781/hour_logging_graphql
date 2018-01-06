import * as uuid from 'uuid/v4';
import { models } from 'models';
import { AbstractModel } from './AbstractModel';

export class Project implements models.project.Attributes {
  public id?: string;
  public name?: string;
  public color?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(builder: ProjectModel) {
    this.id = builder.Id;
    this.name = builder.Name;
    this.color = builder.Color;
    this.createdAt = builder.CreatedAt;
    this.updatedAt = builder.UpdatedAt;
  }
}

// tslint:disable:variable-name
export class RawProject implements models.project.RawAttributes {
  public id?: string;
  public name: string;
  public color: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(builder: ProjectModel) {
    this.id = builder.Id;
    this.name = builder.Name;
    this.color = builder.Color;
    this.created_at = builder.CreatedAt;
    this.updated_at = builder.UpdatedAt;
  }
}

export class ProjectModel implements AbstractModel<models.project.Attributes, models.project.RawAttributes> {
  private id?: string;
  private name: string;
  private color: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor(attributes?: models.project.Attributes | models.project.RawAttributes, isRaw: boolean = true) {
    if (attributes) {
      if (isRaw) {
        this.mapDatabaseObject(attributes);
      } else {
        this.mapJson(attributes);
      }
    }
  }

  public get Id(): string {
    return this.id;
  }
  public get Name(): string {
    return this.name;
  }
  public get Color(): string {
    return this.color;
  }
  public get CreatedAt(): Date {
    return this.createdAt;
  }
  public get UpdatedAt(): Date {
    return this.updatedAt;
  }

  public setId(id: string): ProjectModel {
    this.id = id;
    return this;
  }
  public setName(name: string): ProjectModel {
    this.name = name;
    return this;
  }
  public setColor(color: string): ProjectModel {
    this.color = color;
    return this;
  }
  public setCreatedAt(stamp: Date): ProjectModel {
    this.createdAt = stamp;
    return this;
  }
  public setUpdatedAt(stamp: Date): ProjectModel {
    this.updatedAt = stamp;
    return this;
  }

  public mapJson(attributes: models.project.Attributes): ProjectModel {
    if (attributes !== undefined) {
      this.setId(attributes.id);
      this.setName(attributes.name);
      this.setColor(attributes.color);
      this.setCreatedAt(attributes.createdAt);
      this.setUpdatedAt(attributes.updatedAt);
    }
    return this;
  }
  public mapDatabaseObject(attributes: models.project.RawAttributes): ProjectModel {
    if (attributes !== undefined) {
      this.setId(attributes.id);
      this.setName(attributes.name);
      this.setColor(attributes.color);
      this.setCreatedAt(attributes.created_at);
      this.setUpdatedAt(attributes.updated_at);
    }
    return this;
  }

  public validate(): boolean {
    return !!this.name;
  }

  public toJSON(): Project {
    if (!this.id) {
      this.id = uuid();
    }
    return new Project(this);
  }
  public toDatabaseObject(): RawProject {
    if (!this.id) {
      this.id = uuid();
    }
    return new RawProject(this);
  }

  public merge(model: ProjectModel): ProjectModel {
    this.setName(model.Name || this.Name);
    return this;
  }
}
