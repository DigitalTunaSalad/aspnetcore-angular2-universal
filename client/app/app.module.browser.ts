import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ORIGIN_URL, REQUEST } from "@nguniversal/aspnetcore-engine";
import { AppModuleShared } from "./app.module";
import { AppComponent } from "./app.component";
import { BrowserPrebootModule } from "preboot/browser";

export function getOriginUrl(): string {
    return window.location.origin;
}

export function getRequest(): { cookie: string } {
    // the Request object only lives on the server
    return { cookie: document.cookie };
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserPrebootModule.replayEvents(),
        BrowserAnimationsModule,

        // our Common AppModule
        AppModuleShared

    ],
    providers: [
        {
            // we need this for our Http calls since they'll be using an ORIGIN_URL provided in main.server
            // (Also remember the Server requires Absolute URLs)
            provide: ORIGIN_URL,
            useFactory: (getOriginUrl)
        }, {
            // the server provides these in main.server
            provide: REQUEST,
            useFactory: (getRequest)
        }
    ]
})
export class AppModule { }
