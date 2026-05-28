import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutineListPageComponent } from './presentation/pages/routine-list/routine-list.page';

const routes: Routes = [
  { path: '', component: RoutineListPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutinesRoutingModule {}
