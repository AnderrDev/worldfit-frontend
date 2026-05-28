import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './presentation/pages/login/login.page';
import { AuthRepository } from './domain/repositories/auth.repository';
import { LoginUseCase } from './domain/usecases/login.usecase';
import { AuthRemoteDataSource } from './data/datasources/auth-remote.datasource';
import { AuthRepositoryImpl } from './data/repositories/auth.repository.impl';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [SharedModule, AuthRoutingModule],
  providers: [
    AuthRemoteDataSource,
    LoginUseCase,
    { provide: AuthRepository, useClass: AuthRepositoryImpl }
  ]
})
export class AuthModule {}
