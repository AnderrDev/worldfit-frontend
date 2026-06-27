import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserListPageComponent } from './presentation/pages/user-list/user-list.page';

@NgModule({
  declarations: [UserListPageComponent],
  imports: [SharedModule, UsersRoutingModule]
})
export class UsersModule {}
