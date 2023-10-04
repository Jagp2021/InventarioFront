import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class State<T> {

  private state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  protected get currentState(): T {
    return this.state$.getValue();
  }
  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.currentState,
      ...newState,
    });
  }
  protected setErrorState(newState: Partial<T>) {
    this.state$.error({
      ...this.currentState,
      ...newState,
    });
  }
}