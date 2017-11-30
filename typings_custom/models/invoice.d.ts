declare module 'models' {

  export namespace models {
    namespace invoice {

      interface Attributes {
        id?: string;
        number?: number;
        date?: string;
        logs?: models.log.Attributes[];
        hours?: number;
        rate?: number;
        createdAt?: Date;
        updatedAt?: Date;
      }

      interface RawAttributes {
        id?: string;
        number?: number;
        date?: string;
        logs?: string
        hours?: number;
        rate?: number;
        created_at?: Date;
        updated_at?: Date;
      }

    }
  }

}