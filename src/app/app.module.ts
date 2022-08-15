import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { FormsModule } from '@angular/forms'
import { MatBadgeModule } from '@angular/material/badge'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { LetModule } from '@ngrx/component'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CartComponent } from './cart/cart.component'
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component'
import { HomeComponent } from './home/home.component'
import { ProductCardComponent } from './products/product-card/product-card.component'
import { ProductListComponent } from './products/product-list/product-list.component'
import { ProductsComponent } from './products/products.component'
import { SidenavComponent } from './sidenav/sidenav.component'
import { appReducer, effects } from './store/state'

const materialModules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatBadgeModule
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductListComponent,
    ProductsComponent,
    ProductCardComponent,
    CartComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    materialModules,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot(effects),
    LetModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
