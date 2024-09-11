import { HttpClient } from '@angular/common/http';
import { UserRegistrationCommand } from '../actions/user.actions';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginView, User } from '../model/user-domain.model';

@Injectable({ providedIn: 'root' })
export class UserHttpService {
  private http = inject(HttpClient);

  register(command: UserRegistrationCommand): Promise<User> {
    return lastValueFrom(this.http.post<User>(`/api/registration`, command));
  }

  login(): Promise<LoginView> {
    return lastValueFrom(this.http.get<LoginView>('/api/user'));
  }
}
