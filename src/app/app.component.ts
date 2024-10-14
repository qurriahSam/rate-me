import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './libs/alert/alert.component';
import { LocalStorageService } from './localStorageService/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'chat-grp-ai';
  constructor(private localStorage: LocalStorageService) {}
  ngOnInit(): void {
    const user = this.localStorage.getItem('user');
    if (user) {
    }
  }
}
