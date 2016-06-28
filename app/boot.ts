import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS, RequestOptions} from '@angular/http';
import {provide} from '@angular/core';
import {HttpClient} from './HttpClient';
import {Config} from './config/Config';
import {HandlerLoginService} from './handler-login/handler-login.service';
import {ErrorHandling} from './ErrorHandling';

import {AppComponent} from './app.component';

bootstrap(AppComponent,
          [ROUTER_PROVIDERS,
           HTTP_PROVIDERS,
           provide(HttpClient, {useClass: HttpClient}),
           provide(Config, {useClass: Config}),
           provide(HandlerLoginService, {useClass: HandlerLoginService}),
           provide(ErrorHandling, {useClass: ErrorHandling})
          ]);
