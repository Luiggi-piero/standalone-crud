import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { PlayersService } from 'src/app/services/players.service';
import { Player } from '../../../commons/interfaces/player.interface';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent {
  _playerService = inject(PlayersService);
  _router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    decks: new FormArray([]),
  });

  get decks() {
    return (this.form.get('decks') as FormArray).controls;
  }

  createDeck() {
    (this.form.get('decks') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        cards: new FormControl(null, Validators.required),
      })
    );
  }

  addPlayer() {
    this._playerService.addPlayer({
      id: new Date().getTime().toString(),
      ...this.form.getRawValue(),
    } as Player);

    this._router.navigate(['users']);
  }
}
