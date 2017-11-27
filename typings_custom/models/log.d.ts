declare module 'models' {

  export namespace models {
    namespace log {

      interface Attributes {
        id?: string;
        date?: string;
        startTime?: string;
        endTime?: string;
        duration?: number;
        projectId?: string;
        projectName?: string;
        project?: models.project.Attributes;
        note?: string;
        createdAt?: Date;
        updatedAt?: Date;
      }

      interface RawAttributes {
        id?: string;
        date?: string;
        start_time?: string;
        end_time?: string;
        duration?: number;
        project_id?: string;
        project_name?: string;
        project?: models.project.RawAttributes;
        note?: string;
        created_at?: Date;
        updated_at?: Date; 
      }

    }
  }

}