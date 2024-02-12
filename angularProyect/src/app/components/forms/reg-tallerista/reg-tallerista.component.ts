import { Component, OnInit } from '@angular/core';
import { SQLService, res } from 'src/app/services/sql.service';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { DropdownChangeEvent } from "primeng/dropdown"
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reg-tallerista',
  templateUrl: './reg-tallerista.component.html',
  styleUrls: ['./reg-tallerista.component.css']
})

export class RegTalleristaComponent implements OnInit{
  usuario: any = sessionStorage.getItem('usuario');
  btnReg!: HTMLButtonElement;
  btnElm!: HTMLButtonElement;
  alumnos:alumno[]=[];
  option!:alumno;
  formUser = new FormGroup({
    'usuario': new FormControl('', [Validators.required, Validators.maxLength(20)]),
    'nombre': new FormControl('', [Validators.required]),
    'contrasena': new FormControl('', [Validators.required]),
    'coordinador': new FormControl(false),
    'tallerista': new FormControl(false),
    'administrador': new FormControl(false)
  });


  constructor(private sql: SQLService){
    if (this.usuario) this.usuario = JSON.parse(this.usuario);
  }

  async ngOnInit(): Promise<void> {
    await this.getData();
    this.btnReg = <HTMLButtonElement>document.getElementById("btnReg")!;
    this.btnElm = <HTMLButtonElement>document.getElementById("btnElm")!;
  }

  async getData(){
    await this.consAlumnos();
  }

  async consAlumnos(){
    let consulta = await this.sql.consulta(this.sql.URL + "/consulta/usuario")
    consulta.forEach((alumno:any) => {
      this.alumnos = alumno;
      this.alumnos.splice(0, 0, <alumno>{
        nombre: "Nuevo alumno",
        administrador: 0,
        contrasena: '',
        coordinador: 0,
        usuario: 'Nuevo',
        tallerista: 0
      })
    });
  }
  limpiarFormulario() {
    this.formUser.reset()
    this.btnReg.innerHTML = '<i class="fa-solid fa-book"></i> Registrar <i class="fa-solid fa-book"></i>';
  }
  loadUsr(usr: alumno){
    if(usr){
      this.formUser.controls.nombre.setValue(usr.nombre)
      this.formUser.controls.usuario.setValue(usr.usuario)
      this.formUser.controls.contrasena.setValue(usr.contrasena)
      this.formUser.controls.coordinador.setValue((usr.coordinador == 1) ? true : false)
      this.formUser.controls.tallerista.setValue((usr.tallerista == 1) ? true : false)
      this.formUser.controls.administrador.setValue((usr.administrador == 1) ? true : false )
      this.btnReg.innerHTML = '<i class="fa-solid fa-pencil"></i> Actualizar <i class="fa-solid fa-pencil"></i>';
    }
  }
  changeListener(evento:DropdownChangeEvent) {
    if (evento.value != null && evento.value.usuario != "Nuevo") {
      let body = {
        usuario: evento.value.usuario
      }
      this.sql.alta(this.sql.URL + "/consulta/getusr", body)
        .then((usr) => {
          
          if(usr!=undefined){
            
            this.option = (<alumno[]>usr.constructor())[0]
            console.log((<alumno[]>usr.valueOf()))
            this.loadUsr(this.option);
          }
        });
    } else {
      this.option = this.alumnos[0]
      this.limpiarFormulario();
    }
  }

  registrarUsuario() {
    let body = {
      usuarioAnt: this.option.usuario,
      usuario: this.formUser.controls.usuario.value,
      nombre: this.formUser.controls.nombre.value,
      contrasena: this.formUser.controls.contrasena.value,
      coordinador: (this.formUser.controls.coordinador.value ? true : false),
      tallerista: (this.formUser.controls.tallerista.value ? true : false),
      administrador: (this.formUser.controls.administrador.value ? true : false)
    }
    if (this.option.usuario == "Nuevo") {
      this.sql.alta(this.sql.URL + "/alta/alumno", body).then((res) => {
        let respuesta = <res>res;
        if (respuesta.success) {
          Swal.fire('Registro', 'Se ha registrado correctamente el alumno', 'success');
          this.limpiarFormulario();
          this.getData();
        } else {
          if(respuesta.code == "ER_DUP_ENTRY"){
            Swal.fire('Registro', 'Ya existe un alumno con el mismo usuario, modifique el usuario', 'error')
          }else{
            Swal.fire('Registro', 'Ha ocurrido un error al registrar el alumno, faltan datos ' + respuesta.err, 'error');
          }
        }
      })
    } else {
      this.sql.alta(this.sql.URL + "/cambio/usuario", body).then((res) => {
        let respuesta = <res>res;
        if (respuesta.success) {
          Swal.fire('Actualizar', 'Se ha actualizado correctamente el alumno', 'success');
          this.limpiarFormulario();
          this.getData();
        } else {
          if(respuesta.code == "ER_DUP_ENTRY"){
            Swal.fire('Actualizar', 'Ya existe un alumno con el mismo usuario, modifique el usuario', 'error')
          }else{
            Swal.fire('Actualizar', 'Ha ocurrido un error al actualizar el alumno, faltan datos', 'error')
          }
        }

      });
    }
  }

  eliminarUsuario(){
    if(this.usuario.usuario != this.option.usuario){
      let body = {
        usuario: this.option.usuario
      }
        this.sql.alta(this.sql.URL + "/baja/alumno",body).then((res) => {
          let respuesta = <res>res;
          if (respuesta.success) {
            Swal.fire('Eliminado', 'Se ha eliminado correctamente el alumno', 'success');
            this.limpiarFormulario();
            this.getData();
          } else {
            Swal.fire('Eliminado', 'Ha ocurrido un error al eliminar el alumno' + respuesta.err, 'error');
          }
        })
      }else{
        Swal.fire('Eliminar', 'No se puede eliminar el usuario que esta en la sesión', 'info')
      }
    }
    
}

interface alumno{
  usuario: string;
  nombre: string;
  contrasena: string;
  coordinador: number;
  tallerista: number;
  administrador : number;
}
