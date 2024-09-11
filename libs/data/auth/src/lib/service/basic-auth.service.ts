import { inject, Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { AuthToken } from '../model/auth.model';
import { appendAuthHeader, generateAuthToken } from '../utils/auth.util';
import { LoginView, User, UserHttpService, UserLoginCommand, UserRegistrationCommand } from '@app/data/user';

@Injectable({ providedIn: 'root' })
export class BasicAuthService {
	// Should be only set if the credentials are valid if invalid keep null
	private authToken: AuthToken | null = null;

	private userHttpService = inject(UserHttpService);

	get isAuthenticated() {
		return this.authToken !== null;
	}

	register(command: UserRegistrationCommand): Promise<User> {
		console.log('BasicAuthService#register', command);

		return this.userHttpService.register(command);
	}

	async login(command: UserLoginCommand): Promise<LoginView> {
		console.log('BasicAuthService#login', command);

		// 1. Generate Auth Token
		this.authToken = generateAuthToken(command.email, command.password);

		// 2. Auth Header will be appended by the interceptor on the http login request
		try {
			return await this.userHttpService.login();
		} catch (error) {
			// 3. On Failure, null Auth Token
			this.authToken = null;
			throw error;
		}
	}

	logout() {
		this.authToken = null;
		document.location.reload();
	}

	appendAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
		if (this.authToken == null) return req;

		return req.clone({
			headers: appendAuthHeader(req.headers, this.authToken),
		});
	}
}
