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
    loadComponent: () => import('./Customer/basket/basket.page').then( m => m.BasketPage),
    canActivate: [AuthGuard]
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
    loadComponent: () => import('./Customer/profile/profile.page').then( m => m.ProfilePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    loadComponent: () => import('./Customer/shop/shop.page').then( m => m.ShopPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'deliveries',
    loadComponent: () => import('./Admin/deliveries/deliveries.page').then( m => m.DeliveriesPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
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
    loadComponent: () => import('./Admin/profiles/profiles.page').then( m => m.ProfilesPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
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
    loadComponent: () => import('./Admin/inventory/stocktypes/stocktypes.page').then( m => m.StocktypesPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: 'stockitemcolours',
    loadComponent: () => import('./Admin/inventory/stockitemcolours/stockitemcolours.page').then( m => m.StockitemcoloursPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: 'editstockitemcolours',
    loadComponent: () => import('./Admin/inventory/stockitemcolours/editstockitemcolours/editstockitemcolours.page').then( m => m.EditstockitemcoloursPage)
<<<<<<< HEAD
  },
  {
    path: 'delivery-company',
    loadComponent: () => import('./Admin/deliveries/deliverycompany/delivery-company/delivery-company.page').then( m => m.DeliveryCompanyPage)
  },
  {
    path: 'previous-orders',
    loadComponent: () => import('./Customer/profile/previous-orders/previous-orders/previous-orders.page').then( m => m.PreviousOrdersPage)
  },
  {
    path: 'product-rating',
    loadComponent: () => import('./Customer/profile/previous-orders/previous-orders/product-rating/product-rating.page').then( m => m.ProductRatingPage)
  },
  {
    path: 'edit-deliverycompany',
    loadComponent: () => import('./Admin/deliveries/deliverycompany/edit-delivery-company/edit-deliverycompany/edit-deliverycompany.page').then( m => m.EditDeliverycompanyPage)
  },
  {
    path: 'edit-productrating',
    loadComponent: () => import('./Customer/profile/previous-orders/previous-orders/product-rating/edit-productrating/edit-productrating.page').then( m => m.EditProductratingPage)
=======
>>>>>>> developer
  },  {
    path: 'previous-orders',
    loadComponent: () => import('./Customer/profile/previous-orders/previousorders/previous-orders/previous-orders.page').then( m => m.PreviousOrdersPage)
  },
  {
    path: 'previous-orders',
    loadComponent: () => import('./Customer/profile/previous-orders/previous-orders/previous-orders.page').then( m => m.PreviousOrdersPage)
  },
  {
    path: 'previous-orders',
    loadComponent: () => import('./Customer/profile/previous-orders/previous-orders.page').then( m => m.PreviousOrdersPage)
  },
  {
    path: 'deliverycompany',
    loadComponent: () => import('./Admin/deliveries/deliverycompany/deliverycompany.page').then( m => m.DeliverycompanyPage)
  },
  {
    path: 'edit-deliverycompany',
    loadComponent: () => import('./Admin/deliveries/deliverycompany/edit-deliverycompany/edit-deliverycompany/edit-deliverycompany.page').then( m => m.EditDeliverycompanyPage)
  },
  {
    path: 'edit-deliverycompany',
    loadComponent: () => import('./Admin/deliveries/deliverycompany/edit-deliverycompany/edit-deliverycompany.page').then( m => m.EditDeliverycompanyPage)
  }



];
