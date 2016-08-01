import { RouterConfig } from '@angular/router';
import { BidDetailComponent } from '../bid-detail/index';
import { BidListComponent } from '../bid-list/index';
import { BidCreateComponent } from '../bid-create/index';

export const handlerBidsRoutes: RouterConfig = [
  { component: BidListComponent, path: 'bids' },
  { component: BidDetailComponent, path: 'bids/:id' },
  { component: BidCreateComponent, path: 'new-bid' },
];
