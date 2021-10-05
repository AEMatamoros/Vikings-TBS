import { Component, OnInit } from '@angular/core';

import {AppServiceService} from '../../services/app-service.service'
@Component({
  selector: 'app-select-player',
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.css']
})
export class SelectPlayerComponent implements OnInit {

  constructor(private service:AppServiceService) { }
  vikings: any;
  ngOnInit(): void {
    this.getPlayers()
  }
  p1:any={nombre:"Jugador 1 sin seleccionar"}
  p2:any={nombre:"Jugador 2 sin seleccionar"}
  counter =0;
  selectPlayer(selected){
    console.log(selected)
    if(this.p1!=selected && this.p2!=selected){
      if(this.counter==0){
        this.p1 = selected
        this.counter++;
      }else{
        this.p2 = selected;
        this.counter=0
      }
    }
  }
  getPlayers(){
    this.service.getPlayers().subscribe(res=>{
      this.vikings= res
      console.log(this.vikings)
    })
  }
  
}
