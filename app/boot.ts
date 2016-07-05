import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS, RequestOptions} from '@angular/http';
import {provide} from '@angular/core';

import { Config,
         HttpClient,
         Logger } from './shared/index';
import { NavBarComponent } from './shared/navbar/index';
import {HandlerLoginService}
    from './handlers/handler-login/handler-login.service';
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
