import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { PlayersService } from 'src/app/services/players.service';
import { Player } from '../../../commons/interfaces/player.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  _playerService = inject(PlayersService);
  _router = inject(Router);
  // Obtiene el estado de ruta
  _location = inject(Location);

  player!: Player;

  ngOnInit(): void {
    this.player = (this._location.getState() as any).player;
    if (this.player) this.setForm(this.player);
  }

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

  setForm(player: any) {
    // setea el formulario
    this.form.patchValue(this.player as any);
    // agrega nuevos formularios y valores
    player.decks.map((deck: any) => {
      // crea un formulario
      const deckForm = new FormGroup({
        name: new FormControl(deck.name),
        cards: new FormControl(deck.cards),
      });

      (this.form.get('decks') as FormArray).push(deckForm);
    });
  }

  updatePlayer() {
    this._playerService.updatePlayer({
      id: this.player.id,
      ...this.form.getRawValue(),
    } as Player);

    this._router.navigate(['users']);
  }
}
