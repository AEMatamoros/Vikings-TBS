import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'app-batle',
  templateUrl: './batle.component.html',
  styleUrls: ['./batle.component.css']
})
export class BatleComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private service: AppServiceService) { }
  turn = 1;
  p1Id: number;
  p2Id: number;
  p1: any;
  p2: any;
  log = [];
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.p1Id = parseInt(params.get('p1'), 10);
      this.p2Id = parseInt(params.get('p2'), 10);
      this.service.getPlayer(this.p1Id).subscribe(res => {
        this.p1 = res;
        this.p1 = this.powerUps(this.p1);
      });
      this.service.getPlayer(this.p2Id).subscribe(res => {
        this.p2 = res;
        this.p2 = this.powerUps(this.p2);
      });
    });
  }

  atacar(player): void {
    if (player.id === this.p1.id) {
      if (this.p1.ataque > this.p2.defensa) {
        this.p2.vida = this.p2.vida - (this.p1.ataque - this.p2.defensa);
        this.log.push(`Ataca jugador 1, daño ${(this.p1.ataque - this.p2.defensa)}`);
        this.turn = 2;
      } else {
        this.p2.vida = this.p2.vida - 1;
        this.log.push(`Ataca jugador 1, daño 1`);
        this.turn = 2;
      }
    } else if (player.id === this.p2.id) {
      if (this.p2.ataque > this.p1.defensa) {
        this.p1.vida = this.p1.vida - (this.p2.ataque - this.p1.defensa);
        this.log.push(`Ataca jugador 2, daño ${(this.p2.ataque - this.p1.defensa)}`);
        this.turn = 1;
      } else {
        this.p1.vida = this.p1.vida - 1;
        this.log.push(`Ataca jugador 2, daño ${(this.p1.ataque - this.p2.defensa)}`);
        this.turn = 1;
      }
    }
    if (this.p1.vida <= 0 || this.p2.vida <= 0) {
      if (this.p1.vida > 0) {
        this.log.push(`Ganador ${this.p1.nombre}`);
        this.service.deletePlayer(this.p2.id).subscribe(res => {
          this.log.push(`${this.p2.nombre} ha sido eleminado de la batalla.`);
        });
        this.service.winCon(this.p1.id, this.p1.estrellas).subscribe(res => {
          this.log.push(`${this.p1.nombre} ha ganado una estrella.`);
        });
      } else {
        this.log.push(`Ganador ${this.p2.nombre}`);
        this.service.deletePlayer(this.p1.id).subscribe(res => {
          this.log.push(`${this.p1.nombre} ha sido eleminado de la batalla.`);
        });
      }
      this.turn = 0;
    }


  }

  powerUps(player): void {
    player.ataque = player.ataque + player.estrellas;
    player.defensa = player.defensa + player.estrellas;
    player.vida = player.vida + player.estrellas;
    return player;
  }


}
