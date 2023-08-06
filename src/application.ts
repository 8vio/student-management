import {AuthenticationComponent} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingScope} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MyAuthenticationSequence} from './sequence';
import {JWTAuthenticationStrategy} from './authentication-strategies/jwt-strategy';
import {
  TokenServiceBindings,
  PasswordHasherBindings,
  TokenServiceConstants,
  LoginServiceBindings,
} from './keys';

import {JWTService} from './services/jwt-service';
import {MyLoginService} from './services/login-service';
import {BcryptHasher} from './services/hash.password.bcryptjs';
import {registerAuthenticationStrategy} from '@loopback/authentication';
import {SECURITY_SCHEME_SPEC} from './utils/security-specs';



const pkg = require('../package.json');

export class StudentManagementApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.api({
      openapi: '3.0.0',
      info: {title: pkg.name, version: pkg.version},
      paths: {},
      components: {securitySchemes: SECURITY_SCHEME_SPEC},
      servers: [{url: '/api'}],
    });

    this.component(AuthenticationComponent);
    this.component(RestExplorerComponent);

    //register JWT strategy
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

    // Set up the AUTH sequence
    this.sequence(MyAuthenticationSequence);

    //set JWT binding settings
    this.setUpBindings();

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

  }

  setUpBindings(): void {
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

    this.bind(LoginServiceBindings.LOGIN_SERVICE).toClass(MyLoginService);

  }
}
