import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from './store/store.module';
import { appInitializer } from './appInitializer';
import { AuthService } from './services/auth.service';
import { StoreFirstGuard } from './guards/store-first.guard';
import { AdminModule } from './admin/admin.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        StoreModule,
        AdminModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [StoreFirstGuard, AuthService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
            deps: [AuthService],
        },],
    bootstrap: [AppComponent]
})
export class AppModule { }
