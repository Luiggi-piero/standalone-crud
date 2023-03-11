import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { debounceTime, Observable } from 'rxjs';

import { Player } from 'src/app/commons/interfaces/player.interface';

import { PlayersService } from '../../../services/players.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // forma 1
  // constructor(private playerService: PlayersService){}
  // forma 2 (desde v14)
  _playerService = inject(PlayersService);
  _router = inject(Router);

  searcher = new FormControl('');
  players$!: Observable<Player[]>;

  ngOnInit(): void {
    this.players$ = this._playerService.getPlayer();
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe((term) => {
      if (term) this.players$ = this._playerService.getPlayer(term);
      else this.players$ = this._playerService.getPlayer();
    });
  }

  editPlayer(player: Player) {
    this._router.navigateByUrl('/users/edit', { state: { player } });
  }

  deletePlayer(player: Player) {
    console.log(player);
    if (confirm(`Seguro de eliminar a ${player.name}?`)) {
      this._playerService.deletePlayer(player.id);
    }
  }
}