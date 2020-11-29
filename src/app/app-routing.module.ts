import { TechListsModule } from './pages/tech-lists/tech-lists.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CoreComponent } from './core/core.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      { path: '', component: LandingPageComponent, pathMatch: 'full' },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./pages/sign-up/sign-up.module').then(
            mod => mod.SignUpModule
          )
      },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
