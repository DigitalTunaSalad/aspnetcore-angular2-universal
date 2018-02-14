import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AppModuleShared } from "./app.module";
import { AppComponent } from "./app.component";

import { ServerPrebootModule } from "preboot/server";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // our Common AppModule
    AppModuleShared,

    ServerModule,
    ServerPrebootModule.recordEvents({ appRoot: "app" }),
    NoopAnimationsModule
  ]
})
export class AppModule {

}
