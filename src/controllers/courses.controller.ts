import {
  repository,
  Where
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Courses, Results} from '../models';
import {CoursesRepository, ResultsRepository} from '../repositories';
import {OPERATION_SECURITY_SPEC} from '../utils/security-specs';
import {authenticate} from '@loopback/authentication';


export class CoursesController {
  constructor(
    @repository(CoursesRepository)
    public coursesRepository : CoursesRepository,
    @repository(ResultsRepository)
    public resultsRepository : ResultsRepository,
  ) {}

  @post('/courses')
  @response(200, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Courses model instance',
    content: {'application/json': {schema: getModelSchemaRef(Courses)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Courses, {
            title: 'NewCourses',
            exclude: ['id_course'],
          }),
        },
      },
    })
    courses: Omit<Courses, 'id_course'>,
  ): Promise<Courses> {
    return this.coursesRepository.create(courses);
  }


  @get('/courses')
  @response(200, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Array of Courses model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Courses, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
  ): Promise<Courses[]> {
    return this.coursesRepository.find({where:{ic_active:true}});
  }

  @del('/courses/{id}')
  @response(204, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Courses DELETE success',
  })
  @authenticate('jwt')
  async deleteById(@param.path.number('id') id: number): Promise<void> {

    let whereResults : Where<Results>= {cd_course : id}

    // Logic deletion results
    await this.resultsRepository.updateAll({ic_active:false}, whereResults);

    // Logic deletion course
    await this.coursesRepository.updateById(id,{ic_active:false})

  }
}
