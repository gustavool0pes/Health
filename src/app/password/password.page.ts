import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {
  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController
  ) {}

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  async resetPassword() {
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      await this.showToast('Email de redefinição de senha enviado com sucesso.');

      
      setTimeout(() => {
        this.router.navigate(['/login']); 
      }, 3000);
    } catch (error) {
      console.error('Erro ao enviar o email de redefinição de senha:', error);
      await this.showToast('Erro ao enviar o email de redefinição de senha. Verifique se o email está correto.');
    }
  }
  
}
