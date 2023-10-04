import { Injectable } from '@angular/core';
import { User } from 'src/app/core/interface/user.interface';
import { State } from 'src/app/core/store/State';
import { LocalStorageService } from 'src/app/data/local/local-storage.service';

export interface StateGlobal {
  user: User
}
const initialState: StateGlobal = {
  user: {}
};

@Injectable({
  providedIn: 'root'
})
export class UserStateService extends State<StateGlobal> {

  constructor(private localStorageService: LocalStorageService) {
      super(initialState)
  }

  /**
   * Metodo se deberia invocar una sola vez en header component
   */
  public getUser() {
      this.setState({ user: this.localStorageService.getUserStorage() });
  }

  /**
   * 
   * @param data 
   */
  public setUser(data: User) {
      this.setState({ user: data });
  }
}
