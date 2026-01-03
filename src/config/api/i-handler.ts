/**
 * Abstract contract for REST-style handlers.
 * Implementations should wrap a concrete endpoint and delegate to the shared API methods.
 *
 */
// added UpdateType generic parameter to support different types for update(PATCH/PUT) payloads
export default abstract class IHandler<ResponseType, RequestType, UpdateType = RequestType> {
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
    payload: UpdateType,
    method: 'PUT' | 'PATCH',
    id: string | number,
    contentType?: string
  ): Promise<ResponseType>;
  /**
   * Delete a resource by identifier.
   */
  abstract delete(id: string | number): Promise<boolean>;
}
