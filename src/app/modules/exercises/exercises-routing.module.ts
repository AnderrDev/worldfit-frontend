import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseListPageComponent } from './presentation/pages/exercise-list/exercise-list.page';

const routes: Routes = [
  { path: '', component: ExerciseListPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule {}
