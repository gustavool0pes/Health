# Health
Calculadora de IMC

**Importante:** Use o código abaixo nas **regras do Firestore** para configurar corretamente as permissões de leitura e escrita dos dados dos usuários.

```plaintext
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
