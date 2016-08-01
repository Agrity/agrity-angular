import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home-page/home.component';
import { NotFoundComponent } from './handler/single-pages/not-found.component';
import { handlerRoutes } from './handler/shared/handler.routes';
import { traderRoutes } from './trader/shared/trader.routes';

const routes: RouterConfig = [

  { component: HomeComponent, path: '' },
  ...handlerRoutes,
  ...traderRoutes,
  { component: NotFoundComponent, path: '**' },
];

export const appRouterProviders = [
  provideRouter(routes),
];
