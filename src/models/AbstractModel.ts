export interface AbstractModel<Attributes, RawAttributes> {
  toJSON(): Attributes;
  toDatabaseObject(): RawAttributes;
}