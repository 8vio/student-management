
import {UserService} from '@loopback/authentication';
import {Credentials} from '../models/credentials.model';
import {repository} from '@loopback/repository';
import {LoginRepository} from '../repositories/login.repository';
import {inject} from '@loopback/core';
import {UserProfile, securityId} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {PasswordHasher} from './hash.password.bcryptjs';
import {HttpErrors} from '@loopback/rest';
import {Login} from '../models';

export class MyLoginService implements UserService<Login, Credentials> {
  constructor(
    @repository(LoginRepository) public loginRepository: LoginRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<Login> {
    const foundUser = await this.loginRepository.findOne({
      where: {
        username: {
          ilike: credentials.username,
        }
      }
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(
        `Incorrect user and password combination.`,
      );
    }
    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(
        'Incorrect user and password combination.',
      );
    }

    return foundUser

  }

  convertToUserProfile(login: Login): MyUserLoginProfile {

    const userProfile = {
      [securityId]: login.id.toString(),
      id: login.id,
      name: login.username,
    };
    return userProfile;
  }
}


export class MyUserLoginProfile implements UserProfile {
  [attribute: string]: any;
  username?: string;
  [securityId]: string;

}


