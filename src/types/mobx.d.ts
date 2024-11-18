declare module 'mobx' {
  export function makeAutoObservable(target: any, overrides?: any, options?: any): any;
  export function runInAction<T>(fn: () => T): T;
}
