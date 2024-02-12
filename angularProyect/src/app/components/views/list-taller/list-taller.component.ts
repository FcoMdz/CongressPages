import { Component, OnInit } from '@angular/core';
import { SQLService } from 'src/app/services/sql.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-taller',
  templateUrl: './list-taller.component.html',
  styleUrls: ['./list-taller.component.css']
})

export class ListTallerComponent implements OnInit {
  usuario: any = sessionStorage.getItem('usuario');
  talleres: taller[] = []
  termino!:HTMLInputElement;
  constructor(private sql: SQLService){
    if (this.usuario) this.usuario = JSON.parse(this.usuario);
  }

  async ngOnInit(): Promise<void> {
    await this.getTaller()
  }


  async getTaller(){
    (await this.sql.consulta(this.sql.URL + "/consulta/taller")).forEach((taller) =>{
      this.talleres = <taller[]>taller;
    })
  }

  eliminar(tal: taller){
    Swal.fire({
      title: '<strong>Eliminar taller ' + tal.nombre + '</strong>',
      icon: 'question',
      html: `¿De verdad se desea eliminar este taller?`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText:`Cancelar`
    }).then((result) => {
      if(result.isConfirmed){
        let body = {
          nombre: tal.nombre.toString()
        }
        this.sql.alta(this.sql.URL + '/baja/taller', body).then((sqlRes:any) => {
          let resp = sqlRes
          console.log(resp)
          if(resp.success){
            Swal.fire({
              title: '<strong>Eliminar taller ' + tal.nombre + '</strong>',
              icon: 'success',
              html: `Se ha eliminado correctamente el taller`,
            })
            this.ngOnInit()
          }else{
            Swal.fire({
              title: '<strong>Eliminar taller ' + tal.nombre + '</strong>',
              icon: 'error',
              html: `Hubo un error al eliminar el taller. ${resp.err.sqlMessage}`,
            })
          }
        })

      }
    })
  }
}

interface taller {
  nombre: string;
  conferencista: string;
  descripcion: string;
  capacidad: number;
}