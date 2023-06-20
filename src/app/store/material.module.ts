import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from "@angular/material/expansion";

const features: any[] = [MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatDividerModule, MatInputModule,
    MatCardModule, MatInputModule, MatTableModule, MatExpansionModule, MatIconModule]

@NgModule({
    imports: [features],
    exports: [features]
})
export class MaterialModule { }