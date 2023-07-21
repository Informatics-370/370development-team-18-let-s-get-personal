//<<<<<<< Updated upstream
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  }, 

//Customer 
  {
    path: 'home',
    loadComponent: () => import('./Customer/home/home.page').then( m => m.HomePage)
    ////canActivate: [AuthGuard]
  },
  {
    path: 'basket',
    loadComponent: () => import('./Customer/basket/basket.page').then( m => m.BasketPage)
    //canActivate: [AuthGuard]
  },
  {
    path: 'contactus',
    loadComponent: () => import('./Customer/contactus/contactus.page').then( m => m.ContactusPage)
    //canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    loadComponent: () => import('./Customer/faq/faq.page').then( m => m.FaqPage)
    //canActivate: [AuthGuard]
  },
  {
    path: 'previous_orders',
    loadComponent: () => import('./Profiles/previous-orders/previous-orders.page').then( m => m.PreviousOrdersPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'product_rating',
    loadComponent: () => import('./Profiles/previous-orders/product-rating/product-rating.page').then( m => m.ProductRatingPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit_product_rating',
    loadComponent: () => import('./Profiles/previous-orders/product-rating/edit-productrating/edit-productrating.page').then( m => m.EditProductratingPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    loadComponent: () => import('./Customer/shop/shop.page').then( m => m.ShopPage),
    //canActivate: [AuthGuard]
  },

//Admin...
  {
    path: 'deliveries',
    loadComponent: () => import('./Admin/deliveries/deliveries.page').then( m => m.DeliveriesPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: 'delivery_company',
    loadComponent: () => import('./Admin/deliveries/deliverycompany/deliverycompany.page').then(m => m.DeliverycompanyPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: 'edit_delivery_company',
    loadComponent: () => import('./Admin/deliveries/deliverycompany/edit-deliverycompany/edit-deliverycompany.page').then(m => m.EditDeliverycompanyPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },
  {
    path: 'discounts',
    loadComponent: () => import('./Admin/discounts/discounts.page').then( m => m.DiscountsPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },  
  {
    path: 'edit-discounts',
    loadComponent: () => import('./Admin/discounts/edit-discounts/edit-discounts.page').then( m => m.EditDiscountsPage),
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
    path: 'best-sellers',
    loadComponent: () => import('./Admin/inventory/best-sellers/best-sellers.page').then( m => m.BestSellersPage),
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
    loadComponent: () => import('./Admin/inventory/stockitemcolours/editstockitemcolours/editstockitemcolours.page').then( m => m.EditstockitemcoloursPage),
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
    path: 'editstocktypes',
    loadComponent: () => import('./Admin/inventory/stocktypes/editstocktype/editstocktype.page').then( m => m.EditstocktypePage),
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
    path: 'admin_profiles',
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
    path: 'process-refund',
    loadComponent: () => import('./Admin/refunds/process-refund/process-refund.page').then( m => m.ProcessRefundPage),
    canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    }
  },

//Profiles...
  {
    path: 'changepassword',
    loadComponent: () => import('./Profiles/changepassword/changepassword.page').then( m => m.ChangepasswordPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-profile',
    loadComponent: () => import('./Profiles/create-profile/create-profile.page').then( m => m.CreateProfilePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./Profiles/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./Profiles/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./Profiles/profile/profile.page').then( m => m.ProfilePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'update-profile',
    loadComponent: () => import('./Profiles/profile/update-profile/update-profile.page').then( m => m.UpdateProfilePage),
    canActivate: [AuthGuard]
  },   

//shop   
  
  {
    path: 'kidsclothing',
    loadComponent: () => import('./Customer/shop/kidsclothing/kidsclothing.page').then( m => m.KidsclothingPage)
  },
  {
    path: 'adultclothing',
    loadComponent: () => import('./Customer/shop/adultclothing/adultclothing.page').then( m => m.AdultclothingPage)
  },
  {
    path: 'flasks',
    loadComponent: () => import('./Customer/shop/flasks/flasks.page').then( m => m.FlasksPage)
  },
  {
    path: 'waterbottles',
    loadComponent: () => import('./Customer/shop/waterbottles/waterbottles.page').then( m => m.WaterbottlesPage)
  },
  {
    path: 'mugs',
    loadComponent: () => import('./Customer/shop/mugs/mugs.page').then( m => m.MugsPage)
  },
  {
    path: 'glasses',
    loadComponent: () => import('./Customer/shop/glasses/glasses.page').then( m => m.GlassesPage)
  },
  {
    path: 'notebooks',
    loadComponent: () => import('./Customer/shop/notebooks/notebooks.page').then( m => m.NotebooksPage)
  },
  {
    path: 'make-payment',
    loadComponent: () => import('./Customer/basket/make-payment/make-payment.page').then( m => m.MakePaymentPage)
  },
  {
    path: 'update-experienc-rating',
    loadComponent: () => import('./Profiles/profile/update-experienc-rating/update-experienc-rating.page').then( m => m.UpdateExperiencRatingPage)
  }

  
  
];
