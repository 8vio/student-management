import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Students} from './students.model';
import {Courses} from './courses.model';

@model({
  settings: {
    postgresql: {
      schema: 'public',
      table: 'results'
    },
    foreignKeys: {
      fk_student: {
        name: 'fk_student',
        entity: 'Students',
        entityKey: 'id_student',
        foreignKey: 'cd_student',
      },
      fk_course: {
        name: 'fk_course',
        entity: 'Courses',
        entityKey: 'id_course',
        foreignKey: 'cd_course',
      }
    }
  }
})
export class Results extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_result?: number;

  @belongsTo(() => Students, {name: 'Student'})
  cd_student: number;

  @belongsTo(() => Courses, {name: 'Course'})
  cd_course: number;

  @property({
    type: 'string',
    required: true,
  })
  score: string;

  @property({
    type: 'boolean',
    default: true,
  })
  ic_active?: boolean;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  dt_created?: String;



  constructor(data?: Partial<Results>) {
    super(data);
  }
}

export interface ResultsRelations {
  // describe navigational properties here
}

export type ResultsWithRelations = Results & ResultsRelations;
