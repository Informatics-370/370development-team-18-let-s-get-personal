import { Routes } from '@angular/router';
import { AuthGuard } from './Services/authGuard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'deliveries',
    loadComponent: () => import('./deliveries/deliveries.page').then( m => m.DeliveriesPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'delivery-companies',
    loadComponent: () => import('./deliveries/delivery-companies/delivery-companies.page').then( m => m.DeliveryCompaniesPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'discounts',
    loadComponent: () => import('./discounts/discounts.page').then( m => m.DiscountsPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'inventory',
    loadComponent: () => import('./inventory/inventory.page').then( m => m.InventoryPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'best-sellers',
    loadComponent: () => import('./inventory/best-sellers/best-sellers.page').then( m => m.BestSellersPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'stock-take',
    loadComponent: () => import('./inventory/stock-take/stock-take.page').then( m => m.StockTakePage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'stock-item-colours',
    loadComponent: () => import('./inventory/stock-item-colours/stock-item-colours.page').then( m => m.StockItemColoursPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'stock-types',
    loadComponent: () => import('./inventory/stock-types/stock-types.page').then( m => m.StockTypesPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'write-off',
    loadComponent: () => import('./inventory/write-off/write-off.page').then( m => m.WriteOffPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.page').then( m => m.OrdersPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'profiles',
    loadComponent: () => import('./profiles/profiles.page').then( m => m.ProfilesPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'refunds',
    loadComponent: () => import('./refunds/refunds.page').then( m => m.RefundsPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'admin-profile',
    loadComponent: () => import('./admin-profile/admin-profile.page').then( m => m.AdminProfilePage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'process-refund',
    loadComponent: () => import('./refunds/process-refund/process-refund.page').then( m => m.ProcessRefundPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'view-employees',
    loadComponent: () => import('./view-employees/view-employees.page').then( m => m.ViewEmployeesPage),
    canActivate:[AuthGuard],data:{roles:['Admin']}
  },
  {
    path: 'refund-policies',
    loadComponent: () => import('./refunds/refund-policies/refund-policies.page').then( m => m.RefundPoliciesPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'stock-image',
    loadComponent: () => import('./inventory/stock-image/stock-image.page').then( m => m.StockImagePage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'order-requests',
    loadComponent: () => import('./order-requests/order-requests.page').then( m => m.OrderRequestsPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'sales',
    loadComponent: () => import('./sales/sales.page').then( m => m.SalesPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'product-trends',
    loadComponent: () => import('./product-trends/product-trends.page').then( m => m.ProductTrendsPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'successful-deliveries',
    loadComponent: () => import('./deliveries/successful-deliveries/successful-deliveries.page').then( m => m.SuccessfulDeliveriesPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'ratings',
    loadComponent: () => import('./ratings/ratings.page').then( m => m.RatingsPage),
    canActivate:[AuthGuard],data:{roles:['Admin', 'Employee']}
  },
  {
    path: 'audit-trail',
    loadComponent: () => import('./audit-trail/audit-trail.page').then( m => m.AuditTrailPage),
    canActivate:[AuthGuard],data:{roles:['Admin']}
  },  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },







 

];
