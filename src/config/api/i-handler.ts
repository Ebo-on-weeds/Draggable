/**
 * Abstract contract for REST-style handlers.
 * Implementations should wrap a concrete endpoint and delegate to the shared API methods.
 */
export default abstract class IHandler<ResponseType, RequestType> {
  /**
   * Fetch a paginated collection for the underlying endpoint.
   */
  abstract findAll(offset?: number | string, limit?: number | string): Promise<ResponseType>;
  /**
   * Fetch a single resource by identifier.
   */
  abstract findOne(id: string | number): Promise<ResponseType>;
  /**
   * Create a new resource using the provided payload.
   */
  abstract create(payload: RequestType, contentType?: string): Promise<ResponseType>;
  /**
   * Update an existing resource via PUT or PATCH.
   */
  abstract update(
    payload: RequestType,
    method: 'PUT' | 'PATCH',
    id: string | number,
    contentType?: string
  ): Promise<ResponseType>;
  /**
   * Delete a resource by identifier.
   */
  abstract delete(id: string | number): Promise<boolean>;
}
