import { RouterConfig } from '@angular/router';

import { ViewBidsComponent }
    from '../view-bids/view-bids.component';
import { TraderBidCreateComponent }
    from '../bid-create/bid-create.component';

export const traderBidsRoutes: RouterConfig = [
  { component: ViewBidsComponent, path: 'trader-bids'},
  { component: TraderBidCreateComponent, path: 'new-trader-bid'},
];
