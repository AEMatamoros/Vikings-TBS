import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../services/app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {
  player = {
    nombre: '',
    descripcion: '',
    ataque: 1,
    defensa: 1,
    estrellas: 0,
    imagen: '',
    vida: 10
  };
  file: any;
  images: any;
  vikings: any = [];
  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  createPlayer(): void {
    const formData = new FormData();
    formData.append('file', this.images);
    this.service.uploadImg(formData).subscribe(res => {
      console.log(res);
      this.player.imagen = res.imagen;
      this.service.createPlayer(this.player).subscribe(() => {
        this.router.navigate(['/select']);

      });
    });
  }

  selectImage(event): void{
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images);
    }
  }

  getPlayers(): void{
    this.service.getPlayers().subscribe(res => {
      this.vikings = res;
      console.log(this.vikings);
    });
  }
}
