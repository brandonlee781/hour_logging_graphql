declare module 'models' {
  export namespace models {
    namespace dontBeA {

      interface Attributes {
        id?: string;
        phrase?: string;
        episodeNo?: string;
        episodeTitle?: string;
        createdAt?: Date;
        updatedAt?: Date;
      }

      interface RawAttributes {
        id?: string;
        phrase?: string;
        episode_no?: string;
        episode_title?: string;
        created_at?: Date;
        updated_at?: Date;
      }

    }
  }
}