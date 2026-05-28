import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExerciseListPageComponent } from './presentation/pages/exercise-list/exercise-list.page';
import { ExerciseRepository } from './domain/repositories/exercise.repository';
import { ExerciseHttpRepository } from './infrastructure/repositories/exercise-http.repository';

@NgModule({
  declarations: [ExerciseListPageComponent],
  imports: [SharedModule, ExercisesRoutingModule],
  providers: [
    { provide: ExerciseRepository, useClass: ExerciseHttpRepository }
  ]
})
export class ExercisesModule {}
