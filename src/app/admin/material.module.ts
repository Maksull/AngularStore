import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";


const features: any[] = [MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatDividerModule, MatTableModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatCheckboxModule];

@NgModule({
    imports: [features],
    exports: [features]
})
export class MaterialFeatures { }