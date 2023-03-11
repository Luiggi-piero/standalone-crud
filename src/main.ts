import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

// import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';

import { enviroment } from './enviroments/enviroment';
import { appRoutes } from './app/app.routes';

// Se ejecuta la aplicacion desde un componente(AppComponent) y no desde un modulo
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(enviroment.firebase)),
      provideFirestore(() => getFirestore())
    ),
  ],
}).catch((error) => console.log(error));
