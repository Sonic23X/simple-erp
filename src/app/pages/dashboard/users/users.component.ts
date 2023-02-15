import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {

  rows: Array<User> = [ ];
  name: string = '';
  email: string = '';

  constructor(
    private _userService: UsersService
  ) { }

  ngOnInit() {
    this._userService.getUser().subscribe((response) => {
      this.rows = response;
    }, () => {
      Swal.fire({
        title: 'Error',
        text: 'Error al consumir la información, intente más tarde',
        icon: 'error'
      })
    });
  }

  create() {
    this._userService.createUser(this.name, this.email).subscribe((response) => {
      Swal.fire({
        title: 'Hecho',
        text: 'Registro creado con exito',
        icon: 'success'
      });

      this.rows.push(response);
      this.name = '';
      this.email = '';
    }, () => {
      Swal.fire({
        title: 'Error',
        text: 'Error al crear al usuario, intente más tarde',
        icon: 'error'
      })
    });
  }

  async updateMail(userId: Number) {
    const { value: email } = await Swal.fire({
      title: 'Input email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address'
    })

    this._userService.updateEmail(email, userId).subscribe((response) => {

      Swal.fire({
        title: 'Hecho',
        text: 'Correo actualizado con exito',
        icon: 'success'
      });

      this.rows.forEach(element => {
        if (element.id == response.id) {
          element.email = response.email
        }
      });
    }, () => {
      Swal.fire({
        title: 'Error',
        text: 'Error al actualizar la información, intente más tarde',
        icon: 'error'
      })
    })

  }

  deleteUser(userId: Number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.dropUser(userId).subscribe((response) => {
          this.rows = this.rows.filter(element => element.id != userId);

          Swal.fire({
            title: 'Hecho',
            text: 'Usuario eliminado con exito',
            icon: 'success'
          });
        }, () => {
          Swal.fire({
            title: 'Error',
            text: 'Error al borrar el usuario, intente más tarde',
            icon: 'error'
          })
        });
      }
    })
  }
}
