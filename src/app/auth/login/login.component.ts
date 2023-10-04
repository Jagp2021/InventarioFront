import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from '../../core/services/ui/app.layout.service';
import { AuthService, User } from '../../core/services/auth/auth.service';
import { LocalStorageService } from 'src/app/data/local/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;
  public isLoading: boolean = false;
  constructor(
    public layoutService: LayoutService,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.formLogin = this._fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  public loginUser(): void {
    this.isLoading = true;
    this._localStorageService.setKey('sesion','1');
    this._router.navigate(['/']);
  }
}
