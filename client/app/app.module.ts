import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { AppComponent } from "./app.component";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({
            appId: "app-id" // make sure this matches with your Server NgModule
        }),
        HttpClientModule,
        TransferHttpCacheModule,
        BrowserTransferStateModule,
        FormsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModuleShared {
}
