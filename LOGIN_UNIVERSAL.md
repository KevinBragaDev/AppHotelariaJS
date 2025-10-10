# Sistema de Login Universal

## Visão Geral

O sistema de login foi atualizado para permitir que usuários façam login sem precisar especificar se são clientes ou funcionários. O sistema agora tenta automaticamente ambos os tipos de usuário.

## Como Funciona

### 1. Frontend (authAPI.js)
- A função `loginRequest(email, senha)` agora usa a rota `/api/login/universal`
- O sistema tenta automaticamente ambos os tipos de usuário
- Retorna informações sobre o tipo de usuário logado

### 2. Backend (AuthController.php)
- Nova função `universalLogin()` que tenta primeiro como cliente, depois como employee
- Mantém as funções originais `login()` e `clienteLogin()` para compatibilidade

### 3. Rotas (login.php)
- Nova rota `/api/login/universal` disponível
- Rotas originais `/api/login/client` e `/api/login/employee` mantidas

## Vantagens

1. **Simplicidade**: Usuários não precisam saber seu tipo de conta
2. **Compatibilidade**: Sistema antigo continua funcionando
3. **Eficiência**: Uma única requisição resolve ambos os casos
4. **Flexibilidade**: Pode identificar automaticamente o tipo de usuário

## Uso

### Frontend
```javascript
import { loginRequest } from './src/api/authAPI.js';

const result = await loginRequest('email@exemplo.com', 'senha123');

if (result.ok) {
    console.log('Login realizado com sucesso!');
    console.log('Tipo de usuário:', result.userType); // 'client' ou 'employee'
    console.log('Token:', result.token);
} else {
    console.log('Erro no login:', result.message);
}
```

### Backend
```php
// Usar a nova função universal
AuthController::universalLogin($conn, $data);

// Ou continuar usando as funções específicas
AuthController::clienteLogin($conn, $data);
AuthController::login($conn, $data); // para employee
```

## Resposta da API

### Sucesso
```json
{
    "token": "jwt_token_aqui",
    "userType": "client", // ou "employee"
    "user": {
        "id": 1,
        "nome": "Nome do Usuário",
        "email": "email@exemplo.com",
        "cargos": "Cliente" // ou cargo do funcionário
    }
}
```

### Erro
```json
{
    "status": "erro",
    "message": "Credenciais inválidas ou usuário não encontrado"
}
```

## Compatibilidade

- ✅ Sistema antigo continua funcionando
- ✅ Novos projetos podem usar a rota universal
- ✅ Migração gradual possível
- ✅ Sem quebra de funcionalidades existentes
