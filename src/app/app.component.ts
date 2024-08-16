import { Component, OnInit } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatTabLink, MatTabNav, MatTabNavPanel],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  activeLink!: 'studies' | 'favourites';

  ngOnInit(): void {
    this.activeLink = window.location.href.includes('favourites')
      ? 'favourites'
      : 'studies';
  }
}
