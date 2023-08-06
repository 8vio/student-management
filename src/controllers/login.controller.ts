import {
  repository
} from '@loopback/repository';
import {
  post,
  param,
  getModelSchemaRef,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { inject } from '@loopback/core';
import {Login, Credentials} from '../models';
import {LoginRepository} from '../repositories';
import {
  CredentialsRequestBody,

} from './login-controller.specs';
import {UserService, TokenService } from '@loopback/authentication';
import {LoginServiceBindings, TokenServiceBindings } from '../keys';

export class LoginController {
  constructor(
    @repository(LoginRepository)
    public loginRepository : LoginRepository,
    @inject(LoginServiceBindings.LOGIN_SERVICE)
    public loginService: UserService<Login, Credentials>,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
  ) {}

  @post('/sign-up')
  @response(200, {
    description: 'Login model instance',
    content: {'application/json': {schema: getModelSchemaRef(Login)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {
            title: 'NewLogin',
            exclude: ['id'],
          }),
        },
      },
    })
    login: Omit<Login, 'id'>,
  ): Promise<Login> {
    return this.loginRepository.create(login);
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async loginV2(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
    @param.header.string('Host') host: string
  ): Promise<{ token: string }> {



    const user = await this.loginService.verifyCredentials(credentials);


    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.loginService.convertToUserProfile(user);

    const token = await this.jwtService.generateToken(userProfile);

    return { token };
  }

  @del('/login/{id}')
  @response(204, {
    description: 'Login DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.loginRepository.deleteById(id);
  }
}
