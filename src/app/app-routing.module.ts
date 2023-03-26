import { TaxFilingComponent } from './tax-filing/tax-filing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/TaxFiling', pathMatch: 'full' },
  {path: 'TaxFiling', component: TaxFilingComponent},
  { path: '**', redirectTo: '/TaxFiling' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
