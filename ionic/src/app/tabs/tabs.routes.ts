import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
        loadComponent: () => import('../Customer/home/home.page').then( m => m.HomePage)
      },
      {
        path: 'basket',
        loadComponent: () => import('../Customer/basket/basket.page').then( m => m.BasketPage)
      },
      {
        path: 'contactus',
        loadComponent: () => import('../Customer/contactus/contactus.page').then( m => m.ContactusPage)
      },
      {
        path: 'faq',
        loadComponent: () => import('../Customer/faq/faq.page').then( m => m.FaqPage)
      },
      {
        path: 'login',
        loadComponent: () => import('../Customer/login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('../Customer/profile/profile.page').then( m => m.ProfilePage)
      },
      {
        path: 'shop',
        loadComponent: () => import('../Customer/shop/shop.page').then( m => m.ShopPage)
      },
      {
        path: 'deliveries',
        loadComponent: () => import('../Admin/deliveries/deliveries.page').then( m => m.DeliveriesPage)
      },
      {
        path: 'inventory',
        loadComponent: () => import('../Admin/inventory/inventory.page').then( m => m.InventoryPage)
      },
      {
        path: 'menu',
        loadComponent: () => import('../Admin/menu/menu.page').then( m => m.MenuPage)
      },
      {
        path: 'orders',
        loadComponent: () => import('../Admin/orders/orders.page').then( m => m.OrdersPage)
      },
      {
        path: 'profiles',
        loadComponent: () => import('../Admin/profiles/profiles.page').then( m => m.ProfilesPage)
      },
      {
        path: 'refunds',
        loadComponent: () => import('../Admin/refunds/refunds.page').then( m => m.RefundsPage)
      },
      {
        path: 'stocktypes',
        loadComponent: () => import('../Admin/inventory/stocktypes/stocktypes.page').then( m => m.StocktypesPage)
      },
      {
        path: 'stockitemcolours',
        loadComponent: () => import('../Admin/inventory/stockitemcolours/stockitemcolours.page').then( m => m.StockitemcoloursPage)
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
