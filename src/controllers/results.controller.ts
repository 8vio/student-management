import {
  repository
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
import {Results} from '../models';
import {ResultsRepository} from '../repositories';
import {OPERATION_SECURITY_SPEC} from '../utils/security-specs';
import {authenticate} from '@loopback/authentication';


export class ResultsController {
  constructor(
    @repository(ResultsRepository)
    public resultsRepository : ResultsRepository,
  ) {}

  @post('/results')
  @response(200, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Results model instance',
    content: {'application/json': {schema: getModelSchemaRef(Results)}},
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Results, {
            title: 'NewResults',
            exclude: ['id_result'],
          }),
        },
      },
    })
    results: Omit<Results, 'id_result'>,
  ): Promise<Results> {
    return this.resultsRepository.create(results);
  }


  @get('/results')
  @response(200, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Array of Results model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Results, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
  ): Promise<any[]> {


    let results: any[];
    let resultFormated = []

    results =  await this.resultsRepository.find({
      where: {ic_active: true},
      include: [
        { relation: 'Student'},
        { relation: 'Course'}
      ]
    })

    for (let result of results){
      resultFormated.push({
        "id_result": result.id_result,
        "score":result.score,
        "student": `${result['Student'].first_name} ${result['Student'].family_name}`,
        "course":result['Course'].course_name,
      })
    }

    return resultFormated;

  }

  @del('/results/{id}')
  @response(204, {
    security: OPERATION_SECURITY_SPEC,
    description: 'Results DELETE success',
  })
  @authenticate('jwt')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    // Logic deletion Student
    await this.resultsRepository.updateById(id,{ic_active:false})
  }
}
