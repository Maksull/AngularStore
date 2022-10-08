import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";

const features: any[] = [MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatDividerModule]

@NgModule({
    imports: [features],
    exports: [features]
})
export class MaterialFeatures{}