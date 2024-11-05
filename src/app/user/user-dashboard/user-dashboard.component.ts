// user-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Panel de Usuario</h1>
      <!-- Aquí puedes agregar más componentes específicos para el usuario -->
    </div>
  `
})
export class UserDashboardComponent {}
