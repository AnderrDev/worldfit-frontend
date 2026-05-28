import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutinesRoutingModule } from './routines-routing.module';
import { RoutineListPageComponent } from './presentation/pages/routine-list/routine-list.page';
import { RoutineRepository } from './domain/repositories/routine.repository';
import { GetAllRoutinesUseCase } from './domain/usecases/get-all-routines.usecase';
import { RoutineRemoteDataSource } from './data/datasources/routine-remote.datasource';
import { RoutineRepositoryImpl } from './data/repositories/routine.repository.impl';

@NgModule({
  declarations: [RoutineListPageComponent],
  imports: [SharedModule, RoutinesRoutingModule],
  providers: [
    RoutineRemoteDataSource,
    GetAllRoutinesUseCase,
    { provide: RoutineRepository, useClass: RoutineRepositoryImpl }
  ]
})
export class RoutinesModule {}
