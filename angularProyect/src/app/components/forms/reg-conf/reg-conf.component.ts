import { Component, OnInit } from '@angular/core';
import { SQLService, res } from 'src/app/services/sql.service';
import Swal from 'sweetalert2';
import { DropdownChangeEvent } from "primeng/dropdown"
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: 'app-reg-conf',
  templateUrl: './reg-conf.component.html',
  styleUrls: ['./reg-conf.component.css']
})
export class RegConfComponent implements OnInit {
  usuario: any = sessionStorage.getItem('usuario');

  formUser = new FormGroup({
    'conferencista': new FormControl('', Validators.required),
    'nombre': new FormControl('', Validators.required),
    'descConf': new FormControl('', Validators.required),
    'capacidad': new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')])
  });

  constructor(private sql: SQLService) {
    if (this.usuario) this.usuario = JSON.parse(this.usuario);

  }
  async ngOnInit(): Promise<void> {
    
  }
  async regConferencia(){
    let body = {
      conferencista: this.formUser.controls.conferencista.value,
      nombreConferencia: this.formUser.controls.nombre.value,
      descripcion: this.formUser.controls.descConf.value,
      capacidad: this.formUser.controls.capacidad.value
    }
    console.log(body)
    this.sql.alta(this.sql.URL + "/alta/conferencia", body).then((res) => {
      let respuesta = <res>res;
      if(respuesta.success){
        Swal.fire(
          'Registro', 
          'Se ha registrado correctamente el producto',
          'success'
        );
        this.limpiarCampos();
      }
      else{
        console.log(res)
      }
    });
  }


  limpiarCampos() {
    this.formUser.reset()
  }

  


} 




