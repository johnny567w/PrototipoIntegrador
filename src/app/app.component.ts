import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxSonnerToaster} from 'ngx-sonner'
import SignInComponent from './auth/features/sign-in/sign-in.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgxSonnerToaster,SignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prototipointegrador';
}
