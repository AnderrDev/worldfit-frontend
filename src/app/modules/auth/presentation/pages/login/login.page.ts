import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../../domain/usecases/login.usecase';
import { AuthRepository } from '../../../domain/repositories/auth.repository';

@Component({
  selector: 'wf-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPageComponent {
  private readonly adminEmail = 'admin@worldfit.com';
  private readonly adminPassword = 'Admin123';

  readonly form: FormGroup;
  mode: 'login' | 'register' = 'login';
  successMessage = '';
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginUseCase: LoginUseCase,
    private readonly authRepository: AuthRepository,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['Usuario Demo', [Validators.minLength(3)]],
      email: [this.adminEmail, [Validators.required, Validators.email]],
      password: [this.adminPassword, [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.successMessage = '';
    this.errorMessage = '';

    if (this.mode === 'register') {
      this.register();
      return;
    }

    const { email, password } = this.form.value;
    this.loginUseCase.execute(email, password).subscribe({
      next: (session) => {
        localStorage.setItem('wf_token', session.token);
        this.router.navigate(['/routines']);
      },
      error: (err) => (this.errorMessage = this.readError(err, 'Correo o contrasena incorrectos'))
    });
  }

  showLogin(): void {
    this.mode = 'login';
    this.successMessage = '';
    this.errorMessage = '';
    this.form.patchValue({
      fullName: 'Usuario Demo',
      email: this.adminEmail,
      password: this.adminPassword
    });
  }

  showRegister(): void {
    this.mode = 'register';
    this.successMessage = '';
    this.errorMessage = '';
    this.form.patchValue({
      fullName: '',
      email: '',
      password: ''
    });
  }

  private register(): void {
    const { fullName, email, password } = this.form.value;
    if (!fullName || String(fullName).trim().length < 3) {
      this.errorMessage = 'El nombre es obligatorio y debe tener al menos 3 caracteres.';
      return;
    }
    this.authRepository.register(email, password, fullName).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Ahora puedes iniciar sesion.';
        this.mode = 'login';
        this.form.patchValue({ email, password });
      },
      error: (err) => (this.errorMessage = this.readError(err, 'No se pudo registrar el usuario'))
    });
  }

  private readError(err: any, fallback: string): string {
    return err?.error?.message ?? err?.message ?? fallback;
  }
}
