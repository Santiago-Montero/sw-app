export interface IUseCase<T extends Record<string, unknown> | void, R> {
  execute(request?: T): Promise<R>;
}
