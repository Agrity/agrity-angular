import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS, RequestOptions} from '@angular/http';
import {provide} from '@angular/core';
import {HttpClient} from './shared/http-client.service';
import {Config} from './config/Config';
import {HandlerLoginService} from './handler-login/handler-login.service';
import { Logger } from './shared/logger.service';
import {NavBarComponent} from './shared/navbar/navbar.component';

import {AppComponent} from './app.component';

bootstrap(AppComponent,
          [ROUTER_PROVIDERS,
           HTTP_PROVIDERS,
           provide(HttpClient, {useClass: HttpClient}),
           provide(Config, {useClass: Config}),
           provide(HandlerLoginService, {useClass: HandlerLoginService}),
           provide(Logger, {useClass: Logger}),
           NavBarComponent
          ]);
