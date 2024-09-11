import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginView, UserHttpService } from '@app/data/user';

@Injectable({ providedIn: 'root' })
export class ProjectsResolver implements Resolve<LoginView> {
  constructor(private userHttpService: UserHttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<LoginView> {
    return this.userHttpService.login().then((view: LoginView) => {
      console.log('ProjectsResolver#resolve', view);
      return view;
      }
    )
  }
}
