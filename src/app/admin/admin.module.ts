import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AuthComponent } from "./auth.component";
import { MaterialFeatures } from "./material.module";

@NgModule({
    imports: [MaterialFeatures, RouterModule, FormsModule, BrowserModule],
    declarations: [AdminComponent, AuthComponent],
    providers: []
})
export class AdminModule { }