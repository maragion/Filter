import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FilterComponent} from './components/filter/filter.component';
import {TableComponent} from './components/table/table.component';
import {AccountsComponent} from './pages/accounts/accounts.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgxMaskDirective, provideEnvironmentNgxMask} from "ngx-mask";

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    AccountsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    TableComponent,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective
  ],
  providers: [DatePipe, provideEnvironmentNgxMask()],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
