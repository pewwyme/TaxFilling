import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//angular material
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TaxFilingComponent} from './tax-filing/tax-filing.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule, CurrencyPipe} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

//filter
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NumeralModule} from 'ngx-numeral'
@NgModule({
  declarations: [
    AppComponent, TaxFilingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatStepperModule,
    MatFormFieldModule,FormsModule, ReactiveFormsModule, MatRadioModule, BrowserAnimationsModule, MatSelectModule, CommonModule
    ,FilterPipeModule, Ng2SearchPipeModule,NumeralModule.forRoot(), MatTooltipModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule {

}

