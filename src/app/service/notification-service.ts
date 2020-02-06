import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    this.snackBar.open(message, "X", { panelClass: 'success' });
  }

  showWarning(message: string): void {
    this.snackBar.open(message, "X", { panelClass: 'warning' });
  }

  showError(message: string): void {
    const snack = this.snackBar.open(message, "X", { panelClass: 'error' });
    snack.onAction().subscribe(() => {
      snack.dismiss();
    });
  }
}
