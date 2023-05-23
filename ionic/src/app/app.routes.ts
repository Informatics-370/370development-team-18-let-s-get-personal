import { Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './Guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./Customer/home/home.page').then( m => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'basket',
    loadComponent: () => import('./Customer/basket/basket.page').then( m => m.BasketPage)
  },
  {
    path: 'contactus',
    loadComponent: () => import('./Customer/contactus/contactus.page').then( m => m.ContactusPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    loadComponent: () => import('./Customer/faq/faq.page').then( m => m.FaqPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./Customer/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./Customer/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'shop',
    loadComponent: () => import('./Customer/shop/shop.page').then( m => m.ShopPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'deliveries',
    loadComponent: () => import('./Admin/deliveries/deliveries.page').then( m => m.DeliveriesPage)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./Admin/inventory/inventory.page').then( m => m.InventoryPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: 'menu',
    loadComponent: () => import('./Admin/menu/menu.page').then( m => m.MenuPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: 'orders',
    loadComponent: () => import('./Admin/orders/orders.page').then( m => m.OrdersPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: 'profiles',
    loadComponent: () => import('./Admin/profiles/profiles.page').then( m => m.ProfilesPage)
  },
  {
    path: 'refunds',
    loadComponent: () => import('./Admin/refunds/refunds.page').then( m => m.RefundsPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: 'stocktypes',
    loadComponent: () => import('./Admin/inventory/stocktypes/stocktypes.page').then( m => m.StocktypesPage)
  },
  {
    path: 'stockitemcolours',
    loadComponent: () => import('./Admin/inventory/stockitemcolours/stockitemcolours.page').then( m => m.StockitemcoloursPage)
  },
  {
    path: 'editstockitemcolours',
    loadComponent: () => import('./Admin/inventory/stockitemcolours/editstockitemcolours/editstockitemcolours.page').then( m => m.EditstockitemcoloursPage)
  }

];
