import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UrlaubPayload } from './urlaub.model';
import { User } from './../user/user.model';
import { UrlaubService } from './urlaub.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor(private urlaubService: UrlaubService, private userService: UserService) {
  }

  readonly user = new BehaviorSubject<User>(new User());
  readonly user$ = this.user.asObservable();

  set updateUser(user: User) {
    const newUser: User = Object.assign({}, user);
    this.user.next(newUser);
  }

  async fetchAll(arbeitnehmerNr) {
    if (arbeitnehmerNr !== undefined && arbeitnehmerNr !== null) {
      const userPayload = await this.userService.index(arbeitnehmerNr).toPromise();
      const urlaubPayload: UrlaubPayload = await this.urlaubService.index(arbeitnehmerNr).toPromise();

      const user: User = Object.assign(new User(), userPayload.body.payload);
      user.arbeitnehmerNr = arbeitnehmerNr;
      user.urlaub = urlaubPayload.payload.urlaubModelList;
      this.user.next(user);
    }
  }
}
