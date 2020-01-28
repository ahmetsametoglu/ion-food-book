import { Component, ViewChild } from '@angular/core';
import { BarcodeScannerComponent } from '../components/barcode-scanner/barcode-scanner.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/app.state';
import { Logout } from '../store/auth/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private store: Store<IAppState>) {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
