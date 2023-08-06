import {BindingKey} from '@loopback/context';
import {PasswordHasher} from './services/hash.password.bcryptjs';
import {TokenService, UserService} from '@loopback/authentication';
import {Login} from './models';
import {Credentials} from '../src/models/credentials.model';


export namespace TokenServiceConstants {
  // export const TOKEN_SECRET_VALUE = process.env.TOKEN_SECRET_VALUE;
  export const TOKEN_SECRET_VALUE = 'ShyftLabsSecreteValue';
  export const TOKEN_EXPIRES_IN_VALUE = '18000';
}


export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}



export namespace LoginServiceBindings {
  export const LOGIN_SERVICE = BindingKey.create<
    UserService<Login, Credentials>
  >('services.login.service');
}

export namespace ApiConstants {
  export const API_DOMAIN = process.env.API_URL;
}

