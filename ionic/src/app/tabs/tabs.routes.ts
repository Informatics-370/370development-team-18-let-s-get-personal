import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../Guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('../tabs/tabs.routes').then((m) => m.routes),
      },
      {
        path: 'home',
        loadComponent: () => import('../Customer/home/home.page').then( m => m.HomePage),
        canActivate: [AuthGuard]
      },
      {
        path: 'basket',
        loadComponent: () => import('../Customer/basket/basket.page').then( m => m.BasketPage),
        canActivate: [AuthGuard]
      },
      {
        path: 'contactus',
        loadComponent: () => import('../Customer/contactus/contactus.page').then( m => m.ContactusPage),
        canActivate: [AuthGuard]
      },
      {
        path: 'faq',
        loadComponent: () => import('../Customer/faq/faq.page').then( m => m.FaqPage),
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        loadComponent: () => import('../Profiles/login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('../Profiles/profile/profile.page').then( m => m.ProfilePage),
        canActivate: [AuthGuard]
      },
      {
        path: 'shop',
        loadComponent: () => import('../Customer/shop/shop.page').then( m => m.ShopPage),
        canActivate: [AuthGuard]
      },
      {
        path: 'deliveries',
        loadComponent: () => import('../Admin/deliveries/deliveries.page').then( m => m.DeliveriesPage),
        canActivate: [AuthGuard],
        data: {
          role: 'Admin'
        }
      },
      {
        path: 'inventory',
        loadComponent: () => import('../Admin/inventory/inventory.page').then( m => m.InventoryPage),
        canActivate: [AuthGuard],
        data: {
          role: 'Admin'
        }
      },
      {
        path: 'menu',
        loadComponent: () => import('../Admin/menu/menu.page').then( m => m.MenuPage),
        canActivate: [AuthGuard],
        data: {
          role: 'Admin'
        }
      },
      {
        path: 'orders',
        loadComponent: () => import('../Admin/orders/orders.page').then( m => m.OrdersPage),
        canActivate: [AuthGuard],
        data: {
          role: 'Admin'
        }
      },
      {
        path: 'profiles',
        loadComponent: () => import('../Admin/profiles/profiles.page').then( m => m.ProfilesPage),
        canActivate: [AuthGuard],
        data: {
          role: 'Admin'
        }
      },
      {
        path: 'refunds',
        loadComponent: () => import('../Admin/refunds/refunds.page').then( m => m.RefundsPage),
        canActivate: [AuthGuard],
        data: {
          role: 'Admin'
        }
      },
      {
        path: 'tabsstocktypes',
        loadComponent: () => import('../Admin/inventory/stocktypes/stocktypes.page').then( m => m.StocktypesPage),
        canActivate: [AuthGuard],
        data: {
          role: 'Admin'
        }
      },
      {
        path: 'tabsstockitemcolours',
        loadComponent: () => import('../Admin/inventory/stockitemcolours/stockitemcolours.page').then( m => m.StockitemcoloursPage),
        canActivate: [AuthGuard],
        data: {
          role: 'Admin'
        }
      },
      {
        path: 'discounts',
        loadComponent: () => import('../Admin/discounts/discounts.page').then( m => m.DiscountsPage),
        canActivate: [AuthGuard],
        data: {
          role: 'Admin'
        }
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
