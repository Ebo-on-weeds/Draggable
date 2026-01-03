import { Delete, Get, Patch, Post, Put } from './api-methods';
import type IHandler from './i-handler';

export class handler<TResponse, TRequest, TUpdate> implements IHandler<
  TResponse,
  TRequest,
  TUpdate
> {
  private endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  async findAll(offset?: number | string, limit?: number | string): Promise<TResponse> {
    const response = await Get<TResponse>(this.endpoint, String(offset), String(limit));
    return response;
  }
  async findOne(id: string | number): Promise<TResponse> {
    const response = await Get<TResponse>(this.endpoint + id);
    return response;
  }
  async create(payload: TRequest, contentType?: string): Promise<TResponse> {
    const response = await Post<TRequest, TResponse>(this.endpoint, payload, contentType);
    return response;
  }
  async update(
    payload: TUpdate,
    method: 'PUT' | 'PATCH',
    id: string | number,
    contentType?: string
  ): Promise<TResponse> {
    if (method === 'PUT') {
      const response = await Put<TUpdate, TResponse>(this.endpoint, payload, id, contentType);
      return response;
    } else {
      const response = await Patch<TUpdate, TResponse>(this.endpoint, payload, id, contentType);
      return response;
    }
  }
  async delete(id: string | number): Promise<boolean> {
    const response = await Delete(this.endpoint, id);
    return response;
  }
}
