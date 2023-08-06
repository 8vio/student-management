import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {StudentsmgtDataSource} from '../datasources';
import {Results, ResultsRelations, Students, Courses} from '../models';
import {StudentsRepository} from './students.repository';
import {CoursesRepository} from './courses.repository';

export class ResultsRepository extends DefaultCrudRepository<
  Results,
  typeof Results.prototype.id_result,
  ResultsRelations
> {

  public readonly Student: BelongsToAccessor<Students, typeof Results.prototype.id_result>;

  public readonly Course: BelongsToAccessor<Courses, typeof Results.prototype.id_result>;

  constructor(
    @inject('datasources.studentsmgt') dataSource: StudentsmgtDataSource, @repository.getter('StudentsRepository') protected studentsRepositoryGetter: Getter<StudentsRepository>, @repository.getter('CoursesRepository') protected coursesRepositoryGetter: Getter<CoursesRepository>,
  ) {
    super(Results, dataSource);
    this.Course = this.createBelongsToAccessorFor('Course', coursesRepositoryGetter,);
    this.registerInclusionResolver('Course', this.Course.inclusionResolver);
    this.Student = this.createBelongsToAccessorFor('Student', studentsRepositoryGetter,);
    this.registerInclusionResolver('Student', this.Student.inclusionResolver);
  }
}
