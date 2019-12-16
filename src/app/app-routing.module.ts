import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./services/auth-guard.service";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  { path: 'home',loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),canActivate: [AuthGuardService]},
  { path: 'list',loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),canActivate: [AuthGuardService]},
  //{ path: 'myProfile',loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfilePageModule)},
  { path: 'logout', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren:() => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'myProfile', loadChildren:()=> import('./my-profile/my-profile.module').then(m=> m.MyProfilePageModule),canActivate: [AuthGuardService] },
  { path: 'contact-us', loadChildren: './contact-us/contact-us.module#ContactUsPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'utilities', loadChildren: './utilities/utilities.module#UtilitiesPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
