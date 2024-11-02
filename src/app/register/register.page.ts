import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  fullName: string = '';
  birthDate: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private loadingController: LoadingController,
    private router: Router 
  ) {}

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      this.showToast("As senhas não coincidem.");
      return;
    }
  
    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();
  
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      const user = userCredential.user;
  
      
      if (user) {
        
        await this.firestore.collection('users').doc(user.uid).set({
          fullName: this.fullName,
          birthDate: this.birthDate,
          email: this.email,
          password: this.password,
        });
  
        await loading.dismiss();
        this.isAuthenticated = true;
        this.showToast("Usuário registrado com sucesso!");
        this.router.navigate(['/login']);
      } else {
        throw new Error("Usuário não encontrado após registro.");
      }
    } catch (error) {
      await loading.dismiss();
      this.showToast("Erro ao registrar usuário.");
      console.error(error);
    }
  }
  
  

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}