import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';

type UserRole = 'user' | 'admin';

type UserDto = {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
};

type RoleDto = { id: number; name: string };

type UserPayload = {
  name: string;
  email: string;
  password?: string;
  roleId?: number;
};

@Component({
  selector: 'wf-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss']
})
export class UserListPageComponent implements OnInit {
  users: UserDto[] = [];
  roles: RoleDto[] = [];
  form: FormGroup;
  editing: UserDto | null = null;
  loading = false;
  saving = false;
  message = '';
  errorMessage = '';

  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]],
      role: ['user', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  private loadRoles(): void {
    this.http.get<RoleDto[]>(`${environment.apiUrl}/roles`).subscribe({
      next: (roles) => { this.roles = roles; },
      error: () => { this.roles = []; }
    });
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.http.get<UserDto[]>(this.baseUrl).subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = this.readError(err, 'No se pudieron cargar los usuarios');
        this.loading = false;
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const selectedRole = this.roles.find(r => r.name === this.form.value.role);
    const payload: UserPayload = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password || undefined,
      roleId: selectedRole?.id
    };

    if (!this.editing && !payload.password) {
      this.errorMessage = 'La contrasena es obligatoria para crear usuarios.';
      return;
    }

    if (this.editing && !payload.password) {
      delete payload.password;
    }

    this.saving = true;
    this.message = '';
    this.errorMessage = '';

    const request = this.editing
      ? this.http.put(`${this.baseUrl}/${this.editing.id}`, payload)
      : this.http.post(this.baseUrl, payload);

    request.subscribe({
      next: () => {
        this.message = this.editing ? 'Usuario actualizado correctamente.' : 'Usuario creado correctamente.';
        this.saving = false;
        this.cancelEdit();
        this.loadUsers();
      },
      error: (err) => {
        this.errorMessage = this.readError(err, 'No se pudo guardar el usuario');
        this.saving = false;
      }
    });
  }

  edit(user: UserDto): void {
    this.editing = user;
    this.message = '';
    this.errorMessage = '';
    this.form.patchValue({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
  }

  cancelEdit(): void {
    this.editing = null;
    this.form.reset({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
  }

  delete(user: UserDto): void {
    const confirmed = window.confirm(`Dar de baja al usuario "${user.name}"?`);
    if (!confirmed) return;

    this.message = '';
    this.errorMessage = '';
    this.http.delete(`${this.baseUrl}/${user.id}`).subscribe({
      next: () => {
        this.message = 'Usuario dado de baja correctamente.';
        this.loadUsers();
      },
      error: (err) => (this.errorMessage = this.readError(err, 'No se pudo eliminar el usuario'))
    });
  }

  private readError(err: any, fallback: string): string {
    return err?.error?.message ?? err?.message ?? fallback;
  }
}
