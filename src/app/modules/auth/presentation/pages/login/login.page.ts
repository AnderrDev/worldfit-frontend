import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../../domain/usecases/login.usecase';

@Component({
  selector: 'wf-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPageComponent {
  readonly form: FormGroup;
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginUseCase: LoginUseCase,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const { email, password } = this.form.value;
    this.loginUseCase.execute(email, password).subscribe({
      next: (session) => {
        localStorage.setItem('wf_token', session.token);
        this.router.navigate(['/routines']);
      },
      error: (err) => (this.errorMessage = err?.message ?? 'Error al iniciar sesion')
    });
  }
}
