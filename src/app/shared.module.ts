
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from "./material.module";
import { MatGridListModule, MatSidenavModule } from "@angular/material";


@NgModule({
  //declarations: [ConfirmDialogComponent],
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSidenavModule
  ],
  exports: [
    FlexLayoutModule,
    LayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSidenavModule
  ],
  entryComponents: [
  ],
  providers: []
})
export class SharedModule { }
