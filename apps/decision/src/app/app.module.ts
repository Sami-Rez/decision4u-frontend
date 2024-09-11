import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { BasicAuthInterceptor, ErrorInterceptor } from '@app/data/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
	declarations: [AppComponent],
	imports: [
		HttpClientModule,

		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(appRoutes, { useHash: true }),
	],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
	bootstrap: [AppComponent],
})
export class AppModule {
}
