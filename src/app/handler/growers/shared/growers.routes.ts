import { RouterConfig } from '@angular/router';
import { GrowerCreateComponent } from '../grower-create/index';
import { GrowerDetailComponent } from '../grower-detail/index';
import { GrowerListComponent } from '../grower-list/index';

export const growerRoutes: RouterConfig = [
  { component: GrowerListComponent, path: 'growers' },
  { component: GrowerDetailComponent, path: 'growers/:id' },
  { component: GrowerCreateComponent, path: 'new-grower' },
];
