import { notifications } from '@mantine/notifications';
import { AxiosError, HttpStatusCode, isAxiosError } from 'axios';

export const apiErrorHandler = (error: AxiosError) => {
  const IS_AXIOS_ERROR = isAxiosError(error);
  //Just a guard clause
  if (!IS_AXIOS_ERROR) return;

  let title: string;
  /**
   * TODO: modify the message to extract more precise information after reviewing the API error response structure
   */
  const MESSAGE: string = error.message;

  switch (error.status) {
    case HttpStatusCode.BadRequest:
      {
        title = 'Bad Request - 400';
      }
      break;
    case HttpStatusCode.Unauthorized:
      {
        title = 'Unauthorized - 401';
      }
      break;
    case HttpStatusCode.Forbidden:
      {
        title = 'Forbidden - 403';
      }
      break;
    case HttpStatusCode.NotFound:
      {
        title = 'Not Found - 404';
      }
      break;
    case HttpStatusCode.InternalServerError:
      {
        title = 'Internal Server Error - 500';
      }
      break;
    case HttpStatusCode.UnprocessableEntity:
      {
        title = 'Unprocessable Entity - 422';
      }
      break;
    case HttpStatusCode.Locked:
      {
        title = 'Locked - 423';
      }
      break;
    case HttpStatusCode.TooManyRequests:
      {
        title = 'Too Many Requests - 429';
      }
      break;
    case HttpStatusCode.MethodNotAllowed:
      {
        title = 'Method Not Allowed - 405';
      }
      break;
    default:
      {
        title = 'An unexpected error occurred';
      }
      break;
  }

  notifications.show({
    title,
    message: MESSAGE,
    position: 'bottom-center',
    color: 'red',
    styles: {
      body: {
        backgroundColor: 'red',
        color: 'white',
      },
    },
  });
};
