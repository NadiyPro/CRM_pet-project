import { OpenAPIObject } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const pathMethods = ['get', 'post', 'put', 'delete', 'patch'];

const generalResponses = {
  400: { description: 'Bad Request' },
  422: { description: 'Unprocessable Entity' },
  500: { description: 'Internal Server Error' },
};

const authResponses = {
  401: { description: 'Unauthorized' },
  403: { description: 'Forbidden' },
};

const deleteResponses = {
  204: { description: 'No Content' },
};

export class SwaggerHelper {
  static setDefaultResponses(document: OpenAPIObject): void {
    for (const key of Object.keys(document.paths)) {
      //  проходить по всіх шляхах (маршрутах) нашого API.
      for (const method of pathMethods) {
        // Внутрішній цикл перевіряє кожен метод HTTP
        // (наприклад, get, post, put, delete, patch) для кожного шляху
        const route = document.paths[key]?.[method] as
          | OperationObject
          | undefined;
        //  перевіряє, чи існує опис цього маршруту (get/post/put/delete/patch)
        // типу перевіряємо наприклад, чи існує в @Controller('users') запит get
        if (route) {
          // Безпечне додавання загальних відповідей
          Object.assign(route.responses, generalResponses);
          if (route.security) {
            Object.assign(route.responses, authResponses);
          } // Якщо маршрут містить поле security (означає, що цей маршрут захищений авторизацією),
          // то до нього додаються додаткові відповіді
          // для помилок авторизації: 401 (Unauthorized) і 403 (Forbidden).

          if (method === 'delete') {
            delete route.responses[200]; // видаляємо відповідь з кодом 200
            Object.assign(route.responses, deleteResponses); // встановлюється відповідь з кодом 204 (No Content)
          } // Якщо метод — це delete, замість відповіді з кодом 200 (успішний запит)
          // встановлюється відповідь з кодом 204 (No Content).
        }
      }
    }
  }
}
