import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { baseUrlApi, hostName, port } from './global';

/* Configuracion swagger. */
const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    host: hostName,
    basePath: baseUrlApi,
    info: {
      title: 'API FOR BI SERVICE APPLICATION',
      version: '1.0.0',
      description: 'This is a REST API application made with Express.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com'
      }
    },
    servers: [{
      url: `http://${hostName}:${port}${baseUrlApi}`,
      description: 'Api Documentation about project'
    }]
  },
  apis: ['**/*.ts']
};

export default swaggerJSDoc(swaggerOptions);
