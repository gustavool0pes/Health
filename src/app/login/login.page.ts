import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = ''; 
  password: string = ''; 
  isPasswordVisible: boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router, private toastController: ToastController) { }

  ngOnInit() { }

  async onLogin(event: Event) {
    event.preventDefault(); 
    console.log('Tentativa de login:', this.email, this.password);
    
    if (this.email && this.password) {
      console.log('Email e Senha fornecidos:', this.email, this.password); 
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
        console.log('Login bem-sucedido:', userCredential);
        this.router.navigate(['/home']);
      } catch (error: any) {
        console.error('Erro ao fazer login:', error);
        if (error.code === 'auth/wrong-password') {
          this.showToast('Senha incorreta. Tente novamente.');
        } else if (error.code === 'auth/user-not-found') {
          this.showToast('Usuário não encontrado. Verifique seu email.');
        } else {
          this.showToast('Falha no login: ' + error.message);
        }
      }
    } else {
      this.showToast('Email e senha devem ser fornecidos');
      console.error('Email e senha devem ser fornecidos');
    }
  }
  

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    });
    await toast.present();
  }
  
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; // Alterna a visibilidade da senha
  }
}
  
