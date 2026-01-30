import {Component, inject, signal} from '@angular/core';
import { HeaderComponent } from '../header-component/header-component';
import { FooterComponent } from '../footer-component/footer-component';
import { AppUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-manage-user-component',
    standalone: true,
   imports: [HeaderComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './manage-user-component.html',
  styleUrl: './manage-user-component.css',
})
export class ManageUserComponent {
    protected isLoadingUsers = true;
    // protected users: AppUser[] = [];
    private readonly userService = inject(UserService);

    protected usersSignal = signal<AppUser[]>([]);

    protected error = '';
    protected statusMessage = '';

    private readonly fb = inject(FormBuilder);

      protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    address: ['', Validators.required],
    username: ['', Validators.required],
    password: ['']
  });

      private async loadUsers() {
    this.isLoadingUsers = true;``
    try {
      this.usersSignal.set(await this.userService.getUsers());
      console.log('user list', this.usersSignal)
    } catch (error) {
      console.error(error);
      this.error = 'Unable to load users. Please try again.';
    } finally {
      this.isLoadingUsers = false;
    }
  }

    constructor() {
    this.loadUsers();
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.error = '';
      this.statusMessage = '';
    });
  }


    async handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Name, age, address, and username are required. Age must be a number.';
      return;
    }

    const { name, age, address, username, password } = this.form.getRawValue();
    const numericAge = Number(age);
    if (!Number.isFinite(numericAge)) {
      this.error = 'Age must be a number.';
      return;
    }

    console.log('data: ', this.form.getRawValue())
     const created = await this.userService.createUser({
          name: name.trim(),
          age: numericAge,
          address: address.trim(),
          username: username.trim(),
          password
        });
        this.usersSignal.set([...this.usersSignal(), created]);
        this.statusMessage = 'User created successfully. You can now sign in with this account.';

  }

    async handleDelete(user: AppUser) {
    const confirmed = typeof window !== 'undefined' ? window.confirm('Delete this user?') : true;
    if (!confirmed) {
      return;
    }

    try {
      await this.userService.deleteUser(user.id);
      this.usersSignal.set(this.usersSignal().filter(existing => existing.id !== user.id));
      // if (this.editingId === user.id) {
      //   this.resetForm();
      // }
      this.statusMessage = 'User deleted.';
    } catch (error) {
      console.error(error);
      // this.error = this.extractServerMessage(error) ?? 'Unable to delete user.';
    }
  }

}
