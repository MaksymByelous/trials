import { Component, input } from '@angular/core';

@Component({
  selector: 'trials-snackbar',
  standalone: true,
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  message = input.required<string>();
}
