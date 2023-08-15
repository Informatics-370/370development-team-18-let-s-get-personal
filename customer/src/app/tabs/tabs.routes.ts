import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // {
      //   path: 'tab1',
      //   loadComponent: () =>
      //     import('../tab1/tab1.page').then((m) => m.Tab1Page),
      // },    
      {
        path: 'basket',
        loadComponent: () => import('../basket/basket.page').then( m => m.BasketPage)
      },
      {
        path: 'contact-us',
        loadComponent: () => import('../contact-us/contact-us.page').then( m => m.ContactUsPage)
      },
      {
        path: 'faq',
        loadComponent: () => import('../faq/faq.page').then( m => m.FaqPage)
      },
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then( m => m.HomePage)
      },
      {
        path: 'shop-all',
        loadComponent: () => import('../shop-all/shop-all.page').then( m => m.ShopAllPage)
      },
      {
        path: 'login',
        loadComponent: () => import('../login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'create-profile',
        loadComponent: () => import('../create-profile/create-profile.page').then( m => m.CreateProfilePage)
      },
      {
        path: 'personalisation',
        loadComponent: () => import('../personalisation/personalisation.page').then( m => m.PersonalisationPage)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('../forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
      },
      {
        path: 'view-profile',
        loadComponent: () => import('../view-profile/view-profile.page').then( m => m.ViewProfilePage)
      },
      {
        path: 'make-payment',
        loadComponent: () => import('../basket/make-payment/make-payment.page').then( m => m.MakePaymentPage)
      },
      {
        path: 'clothing',
        loadComponent: () => import('../shop-all/clothing/clothing.page').then( m => m.ClothingPage)
      },
      {
        path: 'drinking',
        loadComponent: () => import('../shop-all/drinking/drinking.page').then( m => m.DrinkingPage)
      },
      {
        path: 'stationary',
        loadComponent: () => import('../shop-all/stationary/stationary.page').then( m => m.StationaryPage)
      },
      {
        path: 'previous-orders',
        loadComponent: () => import('../view-profile/previous-orders/previous-orders.page').then( m => m.PreviousOrdersPage)
      },
      {
        path: 'experience-rating',
        loadComponent: () => import('../view-profile/experience-rating/experience-rating.page').then( m => m.ExperienceRatingPage)
      },
      {
        path: 'update-profile',
        loadComponent: () => import('../view-profile/update-profile/update-profile.page').then( m => m.UpdateProfilePage)
      },
      {
        path: 'product-rating',
        loadComponent: () => import('../view-profile/previous-orders/product-rating/product-rating.page').then( m => m.ProductRatingPage)
      },
      {
        path: 'edit-product-rating',
        loadComponent: () => import('../view-profile/previous-orders/product-rating/edit-product-rating/edit-product-rating.page').then( m => m.EditProductRatingPage)
      },
      {
        path: 'edit-experience-rating',
        loadComponent: () => import('../view-profile/experience-rating/edit-experience-rating/edit-experience-rating.page').then( m => m.EditExperienceRatingPage)
      },
      {
        path: 'edit-personalization',
        loadComponent: () => import('../personalisation/edit-personalization/edit-personalization.page').then( m => m.EditPersonalizationPage)
      },
      {
        path: 'check-out',
        loadComponent: () => import('../basket/make-payment/check-out/check-out.page').then( m => m.CheckOutPage)
      },
      {
        path: 'successful-payment',
        loadComponent: () => import('../basket/make-payment/check-out/successful-payment/successful-payment.page').then( m => m.SuccessfulPaymentPage)
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
