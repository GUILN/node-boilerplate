export default interface Repo<T> {
    getAll(): Array<T>;
    getById(id: number): T;
    insert(element: T): void;
    delete(element: T): void;
}