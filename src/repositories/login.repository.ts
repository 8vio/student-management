import { PasswordHasher } from './../services/hash.password.bcryptjs';
import { PasswordHasherBindings } from '../keys';
import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudentsmgtDataSource} from '../datasources';
import {Login, LoginRelations} from '../models';

export class LoginRepository extends DefaultCrudRepository<
  Login,
  typeof Login.prototype.id,
  LoginRelations
> {
  constructor(
    @inject('datasources.studentsmgt') dataSource: StudentsmgtDataSource,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher
  ) {
    super(Login, dataSource);
  }


  // BASED ON : https://loopback.io/doc/en/lb3/Operation-hooks.html
  // ------------------------------------------------------------->

  definePersistedModel(entityClass: typeof Login) {
    const modelClass = super.definePersistedModel(entityClass);
    modelClass.observe('before save', async ctx => {
      let instance
      if (!ctx.isNewInstance) instance = ctx.data
      if (ctx.isNewInstance) instance = ctx.instance

      try{
      if (instance) {

        //hash password
        if (instance.password) {
          instance.password = await this.passwordHasher.hashPassword(instance.password)
        }
      }
    }
    catch(e){
      console.error(e)
      console.error("Error in user repository hook, before save")
    }
    });


    return modelClass;
  }

}
