// admin-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Panel de Administrador</h1>
      <p>Bienvenido, administrador. Desde aquí puedes gestionar los parqueaderos y usuarios.</p>
      <!-- Aquí puedes agregar componentes específicos para el administrador -->
    </div>
  `
})
export class AdminDashboardComponent {}
