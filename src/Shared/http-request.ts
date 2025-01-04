export interface HttpRequest<T = any> {
    params?: Record<string, string>;
    body?: T;
    query?: Record<string, string>;
}