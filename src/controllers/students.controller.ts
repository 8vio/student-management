import {
  repository,
  Where,
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
import {Students} from '../models';
import {StudentsRepository} from '../repositories';
import {OPERATION_SECURITY_SPEC} from '../utils/security-specs';
import {authenticate} from '@loopback/authentication';
import {ResultsRepository} from '../repositories';
import {Results} from '../models';
import {getFormattedDate} from '../utils/formats'

export class StudentsController {
  constructor(
    @repository(StudentsRepository)
    public studentsRepository : StudentsRepository,
    @repository(ResultsRepository)
    public resultsRepository : ResultsRepository,
  ) {}

  @post('/students')
  @response(200, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Students model instance',
    content: {'application/json': {schema: getModelSchemaRef(Students)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, {
            title: 'NewStudents',
            exclude: ['id_student'],
          }),
        },
      },
    })
    students: Omit<Students, 'id_student'>,
  ): Promise<Students> {
    return this.studentsRepository.create(students);
  }

  @get('/students')
  @response(200, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Array of Students model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Students, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
  ): Promise<Students[]> {

  let students = await this.studentsRepository.find({where:{ic_active:true}});



  // Changing format to MM/DD/YYYY
  students.map(student => {
      student.date_birth = getFormattedDate(student.date_birth)

  });

    return students
  }

  @del('/students/{id}')
  @response(204, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Students DELETE success',
  })
  @authenticate('jwt')
  async deleteById(
   @param.path.number('id') id: number,
   ): Promise<void> {

    let whereResults : Where<Results>= {cd_student : id}

    // Logic deletion results
    await this.resultsRepository.updateAll({ic_active:false}, whereResults);

    // Logic deletion Student
    await this.studentsRepository.updateById(id,{ic_active:false})
  }
}
