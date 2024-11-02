import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  nome: string = ''; 
  peso: number | null = null;
  altura: number | null = null;
  resultadoIMC: { imc: number; classificacao: string } | null = null;
  records: any[] = []; 
  editingRecord: any = null; 
  userLoggedIn: boolean = false; 

  constructor(
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.loadRecords();

    
    this.afAuth.authState.subscribe(user => {
      this.userLoggedIn = !!user;
      if (!this.userLoggedIn) {
        this.router.navigate(['/login']);
      }
    });
  }
  calcularIMC() {
    const peso = parseFloat(String(this.peso).replace(',', '.'));
    const altura = parseFloat(String(this.altura).replace(',', '.'));

    if (!isNaN(peso) && !isNaN(altura) && peso > 0 && altura > 0) {
        const imc = peso / (altura * altura);
        const classificacao = this.classificacaoIMC(imc);
        this.resultadoIMC = { imc, classificacao };
    } else {
        this.mostrarErro();
        this.resultadoIMC = null;
    }
}
  
  

classificacaoIMC(imc: number): string {
  if (imc < 18.5) {
    return 'Abaixo do peso';
  } else if (imc >= 18.5 && imc < 24.9) {
    return 'Peso normal';
  } else if (imc >= 25 && imc < 29.9) {
    return 'Sobrepeso';
  } else {
    return 'Obesidade';
  }
}


  async mostrarErro() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Por favor, insira valores válidos para peso e altura.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async logout() {
    console.log('Tentando fazer logout...');
    try {
      await this.afAuth.signOut();
      console.log('Usuário deslogado com sucesso!');
      const alert = await this.alertController.create({
        header: 'Logout',
        message: 'Você foi desconectado com sucesso.',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }


async addRecord() {
    this.calcularIMC(); 

    if (!this.resultadoIMC) {
        console.error('Cálculo do IMC falhou.');
        return;
    }

    const user = await this.afAuth.currentUser ;
    if (!user) {
        console.error('Usuário não está logado');
        return;
    }

    const record = {
        nome: this.nome,
        altura: this.altura,
        peso: this.peso,
        resultadoIMC: this.resultadoIMC
    };

    if (this.editingRecord) {
        await this.firestore.collection('users').doc(user.uid).collection('imc').doc(this.editingRecord.id).update(record);
        this.editingRecord = null;
    } else {
        await this.firestore.collection('users').doc(user.uid).collection('imc').add(record);
    }

    this.loadRecords(); 
    this.resetFields(); 
}
  
  

async loadRecords() {
  const user = await this.afAuth.currentUser ;
  if (!user) {
      console.error('Usuário não está logado');
      return;
  }

  const snapshot = await this.firestore.collection('users').doc(user.uid).collection('imc').get().toPromise();

  if (snapshot && snapshot.docs) {
      this.records = snapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...(data as { nome?: string; altura?: number; peso?: number; resultadoIMC?: any }) };
      });
  } else {
      this.records = [];
  }
}

  editRecord(record: any) {
    this.nome = record.nome;
    this.altura = record.altura;
    this.peso = record.peso;
    this.editingRecord = record;
  }

  async deleteRecord(record: any) {
    const user = await this.afAuth.currentUser ;
    if (!user) {
        console.error('Usuário não está logado');
        return;
    }
    await this.firestore.collection('users').doc(user.uid).collection('imc').doc(record.id).delete();
    this.loadRecords();
}

  resetFields() {
    this.nome = '';
    this.altura = null;
    this.peso = null;
    this.resultadoIMC = null;
  }
}