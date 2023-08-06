import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      schema: 'public',
      table: 'students',
    }
  }
})
export class Students extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_student?: number;

  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
    required: true,
  })
  family_name: string;

  @property({
    type: 'string',
    required: true,
  })
  date_birth: string;

  @property({
    type: 'string',
    required: true,
  })
  email_address: string;

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


  constructor(data?: Partial<Students>) {
    super(data);
  }
}

export interface StudentsRelations {
  // describe navigational properties here
}

export type StudentsWithRelations = Students & StudentsRelations;
