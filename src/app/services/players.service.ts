import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Player } from '../commons/interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private firestore: Firestore) {}

  addPlayer(player: Player) {
    const playerRef = collection(this.firestore, 'players');
    return addDoc(playerRef, player);
  }

  getPlayer(filter = '') {
    const playerRef = collection(this.firestore, 'players');
    let q = query(playerRef);

    if (filter) q = query(playerRef, where('name', '==', filter));

    // Se obtiene la data(objetos)
    return collectionData(q) as unknown as Observable<Player[]>;
  }

  async updatePlayer(player: Player) {
    const playerRef = collection(this.firestore, 'players');
    let q = query(playerRef, where('id', '==', player.id));
    // Se obtienen los documentos
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'players', document.id);
      await updateDoc(docRef, { ...player });
    });
  }

  async deletePlayer(id: string) {
    const playerRef = collection(this.firestore, 'players');
    let q = query(playerRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'players', document.id);
      await deleteDoc(docRef);
    });
  }
}
