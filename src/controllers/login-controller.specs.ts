import {SchemaObject} from '@loopback/openapi-v3';

  const CredentialsSchema: SchemaObject = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
        minLength: 8,
      },
    },
  };


  export const CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
      'application/json': {schema: CredentialsSchema},
    },
  };




