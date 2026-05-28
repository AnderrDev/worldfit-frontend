import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutinesRoutingModule } from './routines-routing.module';
import { RoutineListPageComponent } from './presentation/pages/routine-list/routine-list.page';
import { RoutineRepository } from './domain/repositories/routine.repository';
import { RoutineHttpRepository } from './infrastructure/repositories/routine-http.repository';

@NgModule({
  declarations: [RoutineListPageComponent],
  imports: [SharedModule, RoutinesRoutingModule],
  providers: [
    { provide: RoutineRepository, useClass: RoutineHttpRepository }
  ]
})
export class RoutinesModule {}
