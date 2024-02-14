import { Component, OnInit } from '@angular/core';
import { SQLService, res } from 'src/app/services/sql.service';
import Swal from 'sweetalert2';
import { DropdownChangeEvent } from "primeng/dropdown"
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: 'app-reg-taller',
  templateUrl: './reg-taller.component.html',
  styleUrls: ['./reg-taller.component.css']
})
export class RegTallerComponent implements OnInit {
  usuario: any = sessionStorage.getItem('usuario');
  
  nombreTaller!: string;
  option!:alumno;
  alumnos:alumno[]=[];
  formUser = new FormGroup({
    'nombreTaller': new FormControl('', Validators.required),
    'descTaller': new FormControl('', Validators.required),
    "alumnos": new FormControl('', Validators.required),
    'capacidad': new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')])
  });

  constructor(private sql: SQLService) {
    if (this.usuario) this.usuario = JSON.parse(this.usuario);

  }
  async ngOnInit(): Promise<void> {
    await this.consAlumnos();
  }
  async consAlumnos(){
    let consulta = await this.sql.consulta(this.sql.URL + "/consulta/tallerista")
    consulta.forEach((alumno:any) => {
      this.alumnos = alumno;
    });
  }
  changeListener(evento:DropdownChangeEvent) {
    if (evento.value != null && evento.value.usuario != "Nuevo") {
      let body = {
        usuario: evento.value.usuario
      }
      this.sql.alta(this.sql.URL + "/consulta/tallerista", body)
        .then((usr) => {
          
          if(usr!=undefined){
            this.option = (<alumno[]>usr)[0]
            console.log((<alumno[]>usr))
          }
        });
    } else {
      this.option = this.alumnos[0]
      this.limpiarCampos();
    }
  }
  agregarTaller(){
    let body = {
      nombre: this.formUser.controls.nombreTaller.value,
      descripcion: this.formUser.controls.descTaller.value,
      capacidad: this.formUser.controls.capacidad.value,
      
    }
    console.log(body)
    this.sql.alta(this.sql.URL + "/alta/insertTaller", body).then((res) => {
      let respuesta = <res>res;
      if (respuesta.success) {
        Swal.fire('Registro', 'Se ha registrado correctamente el taller', 'success');
        this.limpiarCampos();
      } else {
        if(respuesta.code == "ER_DUP_ENTRY"){
          Swal.fire('Registro', 'Ya existe un taller con el mismo nombre, modifique el taller', 'error')
        }else{
          Swal.fire('Registro', 'Ha ocurrido un error al registrar el taller, faltan datos ' + respuesta.err, 'error');
        }
      }
      })
}

  limpiarCampos() {
    this.formUser.reset()
  }


 
}


interface taller {
  nombre: string;
  descripcion: string;
  capacidad: string;
}

interface alumno{
  usuario: string;
  nombre: string;
  contrasena: string;
  coordinador: number;
  tallerista: number;
  administrador : number;
}
