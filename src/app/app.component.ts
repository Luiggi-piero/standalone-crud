import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterModule, CommonModule],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'standalone-crud';
}
