import { Component, OnInit } from '@angular/core';
import { SQLService } from 'src/app/services/sql.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-conf',
  templateUrl: './list-conf.component.html',
  styleUrls: ['./list-conf.component.css']
})

export class ListConfComponent implements OnInit {
  usuario: any = sessionStorage.getItem('usuario');
  conferencias: conferencia[] = []
  termino!:HTMLInputElement;
  constructor(private sql: SQLService){
    if (this.usuario) this.usuario = JSON.parse(this.usuario);
  }

  async ngOnInit(): Promise<void> {
    await this.getConferencia()
  }


  async getConferencia(){
    (await this.sql.consulta(this.sql.URL + "/consulta/conferencia")).forEach((conferencia) =>{
      this.conferencias = <conferencia[]>conferencia;
    })
  }

  eliminar(confe: conferencia){
    Swal.fire({
      title: '<strong>Eliminar conferencia ' + confe.nombre + '</strong>',
      icon: 'question',
      html: `¿De verdad se desea eliminar esta conferencia?`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText:`Cancelar`
    }).then((result) => {
      if(result.isConfirmed){
        let body = {
          nombre: confe.nombre.toString()
        }
        this.sql.alta(this.sql.URL + '/baja/conferencia', body).then((sqlRes:any) => {
          let resp = sqlRes
          console.log(resp)
          if(resp.success){
            Swal.fire({
              title: '<strong>Eliminar conferencia ' + confe.nombre + '</strong>',
              icon: 'success',
              html: `Se ha eliminado correctamente la conferencia`,
            })
            this.ngOnInit()
          }else{
            Swal.fire({
              title: '<strong>Eliminar conferencia ' + confe.nombre + '</strong>',
              icon: 'error',
              html: `Hubo un error al eliminar la conferencia. ${resp.err.sqlMessage}`,
            })
          }
        })

      }
    })
  }
}

interface conferencia {
  nombre: string;
  conferencista: string;
  descripcion: string;
  capacidad: number;
}