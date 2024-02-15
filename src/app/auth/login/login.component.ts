import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from '../../core/services/ui/app.layout.service';
import { LocalStorageService } from 'src/app/data/local/local-storage.service';
import { PermisosStateServiceService } from 'src/app/domain/service/parametrizacion/permisos-state-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;
  public isLoading: boolean = false;
  public loginCorrecto: boolean = true;
  constructor(
    public layoutService: LayoutService,
    private _permisosService: PermisosStateServiceService,
    private _fb: FormBuilder,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formLogin = this._fb.group({
      usuario: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  public loginUser(): void {
    this.isLoading = true;
    this._permisosService.fnValidarIngreso(this.formLogin.value).then((res) => {
      this.isLoading = false;
      if(!res.estado){
        this.loginCorrecto = false;
      } else {
        this._localStorageService.setKey('sesion',JSON.stringify(res.data));
        this._router.navigate(['/']);
      }
    });
  }
}
