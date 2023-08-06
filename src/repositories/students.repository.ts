import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudentsmgtDataSource} from '../datasources';
import {Students, StudentsRelations} from '../models';

export class StudentsRepository extends DefaultCrudRepository<
  Students,
  typeof Students.prototype.id_student,
  StudentsRelations
> {
  constructor(
    @inject('datasources.studentsmgt') dataSource: StudentsmgtDataSource,
  ) {
    super(Students, dataSource);
  }
}
