import API_CLIENT from './api-client';

/**
 * GET request method
 * @param endpoint
 * @author Ibrahim A Alagbare
 */
export async function Get<Returned_Data>(
  endpoint: string,
  offset: string,
  limit: string
) {
  try {
    let request;
    if (offset && limit) {
      request = await API_CLIENT.get<Returned_Data>(
        `${endpoint}?offset=${offset}&limit=${limit}`
      );
    }
    if (offset || limit) {
      request = await API_CLIENT.get<Returned_Data>(
        `${endpoint}?${offset ? `offset=${offset}` : `offset=${0}`}${limit ? `&limit=${limit}` : ''}`
      );
    }
    request = await API_CLIENT.get<Returned_Data>(endpoint);
    return request.data;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
}

export async function Post<Payload, Response>(
  endpoint: string,
  payload: Payload,
  isFormData?: boolean
) {
  try {
    if (isFormData) {
      const request = await API_CLIENT.post<Response>(endpoint, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return request.data;
    }
    const request = await API_CLIENT.post<Response>(endpoint, payload);
    return request.data;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
}

export async function Put<Payload, Response>(
  endpoint: string,
  payload: Payload,
  isFormData?: boolean
) {
  try {
    if (isFormData) {
      const request = await API_CLIENT.post<Response>(endpoint, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return request.data;
    }
    const request = await API_CLIENT.post<Response>(endpoint, payload);
    return request.data;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
}

export async function Patch<Payload, Response>(
  endpoint: string,
  payload: Payload,
  isFormData?: boolean
) {
  try {
    if (isFormData) {
      const request = await API_CLIENT.post<Response>(endpoint, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return request.data;
    }
    const request = await API_CLIENT.post<Response>(endpoint, payload);
    return request.data;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
}

export async function Delete<Response>(endpoint: string) {
  try {
    const request = await API_CLIENT.delete<Response>(endpoint);
    return request.data;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
}
