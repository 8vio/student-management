import {StudentManagementApplication} from './application';
import {ApplicationConfig} from '@loopback/core';


export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new StudentManagementApplication(options);
  await app.boot();

  console.log('DB Migration Starting');
  await app.migrateSchema({
      // The order of table creation is important.
      // A referenced table must exist before creating a
      // foreign key constraint.
      // For PostgreSQL connector, it does not create tables in the
      // right order.  Therefore, this change is needed.
      models: [
        'Courses',
        'Students',
        'Results',
        'Login'
      ],
    });
  console.log('DB Migration Done');


  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3001),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
