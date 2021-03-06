import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GalleryModule } from "ng-gallery";
import { LightboxModule } from "ng-gallery/lightbox";
import { AppComponent } from "./app.component";
import { CnrsModalComponent } from "./cnrs-modal/cnrs-modal.component";
import { MarkdownPipe } from "./markdown.pipe";
import { TechnologiesViewerComponent } from "./technologies-viewer.component";

TechnologiesViewerComponent;
const materialModules = [
  MatTabsModule,
  MatCardModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatSelectModule,
  MatMenuModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTabsModule,
  MatSnackBarModule,
  MatDividerModule,
  MatInputModule,
  MatRippleModule,
  MatProgressBarModule,
  MatBottomSheetModule,
  MatGridListModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatListModule,
  MatExpansionModule,
];

@NgModule({
  declarations: [
    AppComponent,
    CnrsModalComponent,
    TechnologiesViewerComponent,
    MarkdownPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ...materialModules,
    GalleryModule,
    LightboxModule,
  ],
  providers: [],
  entryComponents: [CnrsModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
