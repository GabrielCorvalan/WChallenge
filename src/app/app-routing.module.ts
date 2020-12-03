import { SignUpGuard } from './guards/sign-up-guard';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CoreComponent } from './core/core.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'sign-up',
    canActivate: [SignUpGuard],
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then(
        mod => mod.SignUpModule
      )
  },
  {
    path: '',
    component: CoreComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tech-list',
        loadChildren: () =>
          import('./pages/tech-lists/tech-lists.module').then(
            mod => mod.TechListsModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
