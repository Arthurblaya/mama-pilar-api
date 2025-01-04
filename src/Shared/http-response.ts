export interface HttpResponse {
    status: (code: number) => HttpResponse;
    json: (data: any) => void;
}