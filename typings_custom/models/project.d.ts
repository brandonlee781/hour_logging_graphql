declare module 'models' {

  export namespace models {
    namespace project {

      interface Attributes {
        id?: string;
        name?: string;
        color?: string;
        createdAt?: Date;
        updatedAt?: Date;
      }

      interface RawAttributes {
        id?: string;
        name?: string;
        color?: string;
        created_at?: Date;
        updated_at?: Date;
      }

    }
  }

}