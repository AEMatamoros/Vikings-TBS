import { Component, OnInit } from '@angular/core';

import { AppServiceService } from '../../services/app-service.service';
@Component({
  selector: 'app-select-player',
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.css']
})
export class SelectPlayerComponent implements OnInit {

  p1 = { nombre: 'Jugador 1 sin seleccionar' };
  p2 = { nombre: 'Jugador 2 sin seleccionar' };
  counter = 0;
  vikings: any;

  constructor(private service: AppServiceService) { }
  ngOnInit(): void {
    this.getPlayers();
  }

  selectPlayer(selected): void {
    if (this.p1 !== selected && this.p2 !== selected) {
      if (this.counter === 0) {
        this.p1 = selected;
        this.counter++;
      } else {
        this.p2 = selected;
        this.counter = 0;
      }
    }
  }

  getPlayers(): void {
    this.service.getPlayers().subscribe(res => {
      this.vikings = res;
    });
  }

}
