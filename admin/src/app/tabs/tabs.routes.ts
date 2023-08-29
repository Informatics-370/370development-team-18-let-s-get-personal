import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../Services/authGuard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      
      // {
      //   path: 'tab3',
      //   loadComponent: () =>
      //     import('../tab3/tab3.page').then((m) => m.Tab3Page),
      // },
      {
        path: 'deliveries',
        loadComponent: () => import('../deliveries/deliveries.page').then( m => m.DeliveriesPage)
      },
      {
        path: 'delivery-companies',
        loadComponent: () => import('../deliveries/delivery-companies/delivery-companies.page').then( m => m.DeliveryCompaniesPage)
      },
      {
        path: 'edit-company',
        loadComponent: () => import('../deliveries/delivery-companies/edit-company/edit-company.page').then( m => m.EditCompanyPage)
      },
      {
        path: 'discounts',
        loadComponent: () => import('../discounts/discounts.page').then( m => m.DiscountsPage)
      },
      {
        path: 'edit-discounts',
        loadComponent: () => import('../discounts/edit-discounts/edit-discounts.page').then( m => m.EditDiscountsPage)
      },
      {
        path: 'inventory',
        loadComponent: () => import('../inventory/inventory.page').then( m => m.InventoryPage)
      },
      {
        path: 'best-sellers',
        loadComponent: () => import('../inventory/best-sellers/best-sellers.page').then( m => m.BestSellersPage)
      },
      {
        path: 'stock-take',
        loadComponent: () => import('../inventory/stock-take/stock-take.page').then( m => m.StockTakePage)
      },
      {
        path: 'stock-item-colours',
        loadComponent: () => import('../inventory/stock-item-colours/stock-item-colours.page').then( m => m.StockItemColoursPage)
      },
      {
        path: 'stock-types',
        loadComponent: () => import('../inventory/stock-types/stock-types.page').then( m => m.StockTypesPage)
      },
      {
        path: 'write-off',
        loadComponent: () => import('../inventory/write-off/write-off.page').then( m => m.WriteOffPage)
      },
      {
        path: 'orders',
        loadComponent: () => import('../orders/orders.page').then( m => m.OrdersPage)
      },
      {
        path: 'profiles',
        loadComponent: () => import('../profiles/profiles.page').then( m => m.ProfilesPage)
      },
      {
        path: 'refunds',
        loadComponent: () => import('../refunds/refunds.page').then( m => m.RefundsPage)
      },
      {
        path: 'admin-profile',
        loadComponent: () => import('../admin-profile/admin-profile.page').then( m => m.AdminProfilePage)
      },
      {
        path: 'login',
        loadComponent: () => import('../login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'edit-stock-item-colours',
        loadComponent: () => import('../inventory/stock-item-colours/edit-stock-item-colours/edit-stock-item-colours.page').then( m => m.EditStockItemColoursPage)
      },
      {
        path: 'edit-stock-types',
        loadComponent: () => import('../inventory/stock-types/edit-stock-types/edit-stock-types.page').then( m => m.EditStockTypesPage)
      },
      {
        path: 'process-refund',
        loadComponent: () => import('../refunds/process-refund/process-refund.page').then( m => m.ProcessRefundPage)
      },
      {
        path: 'view-employees',
        loadComponent: () => import('../view-employees/view-employees.page').then( m => m.ViewEmployeesPage)
      },
      {
        path: 'refund-policies',
        loadComponent: () => import('../refunds/refund-policies/refund-policies.page').then( m => m.RefundPoliciesPage)
      },
      {
        path: 'stock-image',
        loadComponent: () => import('../inventory/stock-image/stock-image.page').then( m => m.StockImagePage)
      },
      {
        path: 'update-imageprice',
        loadComponent: () => import('../inventory/personalisedprices/update-imageprice/update-imageprice.page').then( m => m.UpdateImagepricePage)
      },
      {
        path: 'update-textprice',
        loadComponent: () => import('../inventory/personalisedprices/update-textprice/update-textprice.page').then( m => m.UpdateTextpricePage)
      },
      {
        path: 'order-requests',
        loadComponent: () => import('../order-requests/order-requests.page').then( m => m.OrderRequestsPage),
        canActivate:[AuthGuard],data:{roles:['Admin']}
      },
      {
        path: 'sales',
        loadComponent: () => import('../sales/sales.page').then( m => m.SalesPage)
      },
      {
        path: '',
        redirectTo: '/tabs/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
