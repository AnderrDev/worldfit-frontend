import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExerciseListPageComponent } from './presentation/pages/exercise-list/exercise-list.page';
import { ExerciseRepository } from './domain/repositories/exercise.repository';
import { GetAllExercisesUseCase } from './domain/usecases/get-all-exercises.usecase';
import { ExerciseRemoteDataSource } from './data/datasources/exercise-remote.datasource';
import { ExerciseRepositoryImpl } from './data/repositories/exercise.repository.impl';

@NgModule({
  declarations: [ExerciseListPageComponent],
  imports: [SharedModule, ExercisesRoutingModule],
  providers: [
    ExerciseRemoteDataSource,
    GetAllExercisesUseCase,
    { provide: ExerciseRepository, useClass: ExerciseRepositoryImpl }
  ]
})
export class ExercisesModule {}
