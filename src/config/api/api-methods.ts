import type { AxiosError } from 'axios';
import API_CLIENT from './api-client';
import { apiErrorHandler } from '@/app/error-handling/api-error-handler';

/**
 * ### Used to fetch data from the server
 * - _endpoints must include trailing slash_
 * - endpoint can include query offset and limit and both are conditionally
 * - for getting specific resource with id, include it in the endpoint string
 * @param endpoint
 * @author Ibrahim A Alagbare
 *
 * @example
 * // Usage
 * // Get single resource
 * const response = await Get<User>('api/users/1');
 * // Get all resources
 * const responseAll = await Get<User[]>('api/users');
 * // Get resources with pagination
 * const responseWithPagination = await Get<User[]>('api/users', '0', '10');
 * // Get resources with only offset
 * const responseWithOffset = await Get<User[]>('api/users', '10');
 * // Get resources with only limit
 * const responseWithLimit = await Get<User[]>('api/users', undefined, '5');
 */
export async function Get<Response>(endpoint: string, offset?: string, limit?: string) {
  try {
    let request;
    if (offset && limit) {
      request = await API_CLIENT.get<Response>(`${endpoint}?offset=${offset}&limit=${limit}`);
    }
    if (offset || limit) {
      request = await API_CLIENT.get<Response>(
        `${endpoint}?${offset ? `offset=${offset}` : `offset=${0}`}${limit ? `&limit=${limit}` : ''}`
      );
    }
    request = await API_CLIENT.get<Response>(endpoint);
    return request.data;
  } catch (error) {
    const err = error as AxiosError;
    apiErrorHandler(err);
    throw new Error(err.message);
  }
}

/**
 * ### Used to create a new resource
 * - _endpoint must include trailing slash_
 * @param endpoint
 * @param payload
 * @param contentType
 * @returns
 * @author Ibrahim A Alagbare
 *
 * @example
 * // Usage
 * const response = await Post<NewUser, User>('api/users', { firstName: 'John', lastName: 'Doe' });
 */
export async function Post<Payload, Response>(
  endpoint: string,
  payload: Payload,
  contentType?: string
) {
  try {
    const request = await API_CLIENT.post<Response>(endpoint, payload, {
      headers: {
        'Content-Type': contentType ?? 'application/json',
      },
    });
    return request.data;
  } catch (error) {
    const err = error as AxiosError;
    apiErrorHandler(err);
    throw new Error(err.message);
  }
}

/**
 * ### Used to `fully` update a resource
 * - _endpoint must include trailing slash_
 * @param endpoint
 * @param payload
 * @param id
 * @param contentType
 * @returns
 * @author Ibrahim A Alagbare
 *
 * @example
 * // Usage
 * const response = await Put<User, User>('api/users/', { firstName: 'UpdatedName', lastName: 'UpdatedLastName' }, 1);
 */

export async function Put<Payload, Response>(
  endpoint: string,
  payload: Payload,
  id: string | number,
  contentType?: string
) {
  try {
    //endpoint should include trailing slash
    const request = await API_CLIENT.post<Response>(endpoint + id, payload, {
      headers: {
        'Content-Type': contentType ?? 'application/json',
      },
    });
    return request.data;
  } catch (error) {
    const err = error as AxiosError;
    apiErrorHandler(err);
    throw new Error(err.message);
  }
}
/**
 * ### Used to `partially` update a resource
 * - _endpoint must include trailing slash_
 * @param endpoint
 * @param id
 * @returns
 * @author Ibrahim A Alagbare
 *
 * @example
 * // Usage
 * const response = await Patch<User, Partial<User>>('api/users/', { firstName: 'NewName' }, 1);
 */
export async function Patch<Payload, Response>(
  endpoint: string,
  payload: Partial<Payload>,
  id: string | number,
  contentType?: string
) {
  try {
    //endpoint should include trailing slash
    const request = await API_CLIENT.post<Response>(endpoint + id, payload, {
      headers: {
        'Content-Type': contentType ?? 'application/json',
      },
    });
    return request.data;
  } catch (error) {
    const err = error as AxiosError;
    apiErrorHandler(err);
    throw new Error(err.message);
  }
}

/**
 * ### Used to delete a resource
 * _endpoint MUST include trailing slash_
 * @param endpoint
 * @param id
 * @returns
 * @author Ibrahim A Alagbare
 *
 * @example
 * // Usage
 * const response = await Delete<User>('api/users/', 1);
 */
export async function Delete(endpoint: string, id: string | number) {
  try {
    //endpoint should include trailing slash
    await API_CLIENT.delete<Response>(endpoint + id);
    return true;
  } catch (error) {
    const err = error as AxiosError;
    apiErrorHandler(err);
    throw new Error(err.message);
  }
}
