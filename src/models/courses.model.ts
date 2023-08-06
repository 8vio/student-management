import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      schema: 'public',
      table: 'courses',
    }
  }
})
export class Courses extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_course?: number;

  @property({
    type: 'string',
    required: true,
  })
  course_name: string;

  @property({
    type: 'boolean',
    default: true,
  })
  ic_active?: boolean;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  dt_created?: string;


  constructor(data?: Partial<Courses>) {
    super(data);
  }
}

export interface CoursesRelations {
  // describe navigational properties here
}

export type CoursesWithRelations = Courses & CoursesRelations;
