import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './presentation/pages/login/login.page';
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthHttpRepository } from './infrastructure/repositories/auth-http.repository';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [SharedModule, AuthRoutingModule],
  providers: [
    { provide: AuthRepository, useClass: AuthHttpRepository }
  ]
})
export class AuthModule {}
