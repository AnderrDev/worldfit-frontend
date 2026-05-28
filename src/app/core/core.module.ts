import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CoreModule: servicios singleton, interceptors y guards.
 * Debe importarse SOLO en AppModule.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent?: CoreModule) {
    if (parent) {
      throw new Error('CoreModule ya esta cargado. Importalo solo desde AppModule.');
    }
  }
}
