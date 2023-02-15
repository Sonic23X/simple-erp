import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  email: string = '';
  pass: string = '';

  constructor (
    private _authService: AuthService,
    private _router: Router
  ) {
    if (this._authService.getToken() != null) {
      this._router.navigate(['/users']); 
    }
  }

  access (): void {
    let data: Login = {
      email: this.email,
      password: this.pass
    };

    this._authService.access(data).subscribe((response) => {
      this._authService.setToken(response.access_token);
      this._router.navigate(['/users']);
    }, () => {
      Swal.fire({
        title: 'Error',
        text: 'Error al iniciar sesión, intente más tarde',
        icon: 'error'
      });
    });
  }

}
