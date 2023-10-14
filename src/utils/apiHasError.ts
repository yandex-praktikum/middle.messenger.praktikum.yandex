import { APIError } from '../api/type';

export function apiHasError(response: any): response is APIError {
    return response?.reason;
}
