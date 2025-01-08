import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CandidateRegistrationComponent } from './app/candidates/components/candidate-registration/candidate-registration.component';
bootstrapApplication(CandidateRegistrationComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
