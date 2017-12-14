import * as uuid from 'uuid/v4';
import { models } from 'models';
import { AbstractModel } from './AbstractModel';

export class DontBeAModel implements AbstractModel<models.dontBeA.Attributes, models.dontBeA.RawAttributes> {
  private id?: string;
  private phrase?: string;
  private episodeNo?: string;
  private episodeTitle?: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  // tslint:disable-next-line:no-any
  constructor(attributes?: any, isRaw: boolean = true) {
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
  public get Phrase(): string {
    return this.phrase;
  }
  public get EpisodeNo(): string {
    return this.episodeNo;
  }
  public get EpisodeTitle(): string {
    return this.episodeTitle;
  }
  public get CreatedAt(): Date {
    return this.createdAt;
  }
  public get UpdatedAt(): Date {
    return this.updatedAt;
  }

  public setId(id: string): DontBeAModel {
    this.id = id;
    return this;
  }
  public setPhrase(phrase: string): DontBeAModel {
    this.phrase = phrase;
    return this;
  }
  public setEpisodeNo(no: string): DontBeAModel {
    this.episodeNo = no;
    return this;
  }
  public setEpisodeTitle(title: string): DontBeAModel {
    this.episodeTitle = title;
    return this;
  }
  public setCreatedAt(stamp: Date): DontBeAModel {
    this.createdAt = stamp;
    return this;
  }
  public setUpdatedAt(stamp: Date): DontBeAModel {
    this.updatedAt = stamp;
    return this;
  }

  public mapJson(attributes: models.dontBeA.Attributes): DontBeAModel {
    if (attributes !== undefined) {
      this.setId(attributes.id);
      this.setPhrase(attributes.phrase);
      this.setEpisodeNo(attributes.episodeNo);
      this.setEpisodeTitle(attributes.episodeTitle);
      this.setCreatedAt(attributes.createdAt);
      this.setUpdatedAt(attributes.updatedAt);
    }
    return this;
  }
  public mapDatabaseObject(attributes: models.dontBeA.RawAttributes): DontBeAModel {
    if (attributes !== undefined) {
      this.setId(attributes.id);
      this.setPhrase(attributes.phrase);
      this.setEpisodeNo(attributes.episode_no);
      this.setEpisodeTitle(attributes.episode_title);
      this.setCreatedAt(attributes.created_at);
      this.setUpdatedAt(attributes.updated_at);
    }
    return this;
  }

  public validate(): boolean {
    return !!this.phrase &&
           !!this.episodeNo &&
           !!this.episodeTitle;
  }

  public toJSON(): DontBeA {
    if (!this.id) {
      this.id = uuid();
    }
    return new DontBeA(this);
  }
  public toDatabaseObject(): RawDontBeA {
    if (!this.id) {
      this.id = uuid();
    }
    return new RawDontBeA(this);
  }

  public merge(model: DontBeAModel): DontBeAModel {
    this.setId(model.id || this.Id);
    this.setPhrase(model.phrase || this.Phrase);
    this.setEpisodeNo(model.episodeNo || this.EpisodeNo);
    this.setEpisodeTitle(model.episodeTitle || this.EpisodeTitle);
    return this;
  }
}

export class DontBeA implements models.dontBeA.Attributes {
  public id?: string;
  public phrase?: string;
  public episodeNo?: string;
  public episodeTitle?: string;
  public updatedAt?: Date;

  constructor(builder: DontBeAModel) {
    this.id = builder.Id;
    this.phrase = builder.Phrase;
    this.episodeNo = builder.EpisodeNo;
    this.episodeTitle = builder.EpisodeTitle;
    this.updatedAt = builder.UpdatedAt;
  }
}

// tslint:disable:variable-name
export class RawDontBeA implements models.dontBeA.RawAttributes {
  public id?: string;
  public phrase?: string;
  public episode_no?: string;
  public episode_title?: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(builder: DontBeAModel) {
    this.id = builder.Id;
    this.phrase = builder.Phrase;
    this.episode_no = builder.EpisodeNo;
    this.episode_title = builder.EpisodeTitle;
    this.created_at = builder.CreatedAt;
    this.updated_at = builder.UpdatedAt;
  }
}