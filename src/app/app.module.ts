import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CnrsModalComponent } from './cnrs-modal/cnrs-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CnrsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [CnrsModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
