import { RouterConfig } from '@angular/router';
import { TraderHomeComponent } from '../single-pages/trader-home.component';
import { TraderLoginComponent } from '../traders/trader-login/index';
import { traderBidsRoutes }
    from '../trader-bids/shared/index';
import { handlerSellersRoutes }
    from '../handler-seller/shared/index';

export const traderRoutes: RouterConfig = [
  { component: TraderHomeComponent, path: 'trader-home' },
  { component: TraderLoginComponent, path: 'trader-login' },
  ...traderBidsRoutes,
  ...handlerSellersRoutes,
];
