import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'studentsmgt',
  connector: 'postgresql',
  // url: 'postgres://studentmgt-user:studentmgt-password@localhost/studentsmgt',
  url: 'postgres://studentmgt-user:studentmgt-password@postgres-students/studentsmgt',
  host: 'localhost',
  port: 5432,
  user: 'studentmgt-user',
  password: 'studentmgt-password',
  database: 'studentsmgt'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class StudentsmgtDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'studentsmgt';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.studentsmgt', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
