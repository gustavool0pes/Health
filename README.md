# Health
 Calculadora de IMC

Importante usar também esse código para as regras do firestore!

<!--
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para a coleção de usuários
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Regras para a subcoleção imc dentro de cada usuário
      match /imc/{documentId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
-->

Junto com o código do projeto esse código deve ser colocado nas regras do firestore, para que se possa salvar os dados dos cadastros e também dos calculos do IMC dos usuários. 
Eles criam as sub coleções no banco de dados do firestore.
