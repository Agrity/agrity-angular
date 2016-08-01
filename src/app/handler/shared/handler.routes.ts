import { RouterConfig } from '@angular/router';
import { HandlerHomeComponent } from '../single-pages/handler-home.component';
import { HandlerLoginComponent } from '../handlers/handler-login/index';
import { growerRoutes } from '../growers/shared/index';
import { handlerBidsRoutes } from '../bids/shared/index';

export const handlerRoutes: RouterConfig = [
  ...handlerBidsRoutes,
  ...growerRoutes,
  { component: HandlerHomeComponent, path: 'handler-home' },
  { component: HandlerLoginComponent, path: 'handler-login' },
];
