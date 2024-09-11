import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicAuthService } from '@app/data/auth';
import { UserLoginCommand } from '@app/data/user';
import { LoginComponent } from './login.component';
import { LoginFormData } from '../model/login-view.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login-container',
	standalone: true,
	imports: [CommonModule, LoginComponent],
	template: ` <app-register (login)="onLogin($event)"></app-register>`,
	styles: [],
})
export class LoginContainerComponent {
	authService = inject(BasicAuthService);
	router = inject(Router);

	onLogin(formData: LoginFormData) {
		const command: UserLoginCommand = formData;

		this.authService
			.login(command)
			// success
			.then(() => {
				this.router.navigate(['/']);
			})
			// failure
			.catch((error) => {
				// TODO Show Angular Material Snackbar
				console.error('Login failed:', error);
			});
	}
}
