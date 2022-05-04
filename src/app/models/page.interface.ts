import { Pageable } from "./pageable.interface";

export interface Page<T> {
    content: Array<T>;
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    size: number;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}