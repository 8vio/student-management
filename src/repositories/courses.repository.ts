import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudentsmgtDataSource} from '../datasources';
import {Courses, CoursesRelations} from '../models';

export class CoursesRepository extends DefaultCrudRepository<
  Courses,
  typeof Courses.prototype.id_course,
  CoursesRelations
> {
  constructor(
    @inject('datasources.studentsmgt') dataSource: StudentsmgtDataSource,
  ) {
    super(Courses, dataSource);
  }
}
