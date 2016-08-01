import { RouterConfig } from '@angular/router';

import { ViewHandlersComponent }
    from '../view-handlers/view-handlers.component';
import { HandlerSellerCreateComponent }
    from '../handler-create/handler-create.component';

export const handlerSellersRoutes: RouterConfig = [
  { component: ViewHandlersComponent, path: 'handler-sellers'},
  { component: HandlerSellerCreateComponent, path: 'new-handler-seller'},
];
