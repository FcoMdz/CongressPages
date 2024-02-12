import { Component, OnInit } from '@angular/core';
import { SQLService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  usuario!:any;
  iniciarSesion!:HTMLElement;
  ventas!:HTMLElement;

  constructor(private sqlConection: SQLService){
    this.usuario = JSON.parse(sessionStorage.getItem('usuario') || "{}");
  }

  ngOnInit(): void {
    this.recuperarElementos();
    this.revisarUsuario();
  }

  recuperarElementos(){
    this.iniciarSesion = document.getElementById("IniciarSesion")!;
    this.ventas = document.getElementById("ventas")!;
  }

  revisarUsuario(){
    this.ventas.style.display = "none";
    if(Object.keys(this.usuario).length != 0){
      this.iniciarSesion.style.display = "none";
      if(this.usuario.vendedor || this.usuario.administrador) this.ventas.style.display = "block";
    }
  }

}
