# 🎃 Maratona de Halloween • Painel Interativo 🦇

> Uma aplicação web temática, imersiva e completa para gerenciar listas de filmes de terror durante a temporada de Halloween, com sincronização em tempo real via Firebase, controle de progresso e experiência rica em efeitos visuais.

---

## 🔮 Sobre o Projeto

O **Maratona de Halloween** foi desenvolvido para transformar a experiência de acompanhar maratonas de cinema de terror em algo interativo e visualmente cativante. 

Com interface imersiva no estilo *dark horror* (paleta roxa, preta e abóbora neon), a aplicação permite cadastrar, filtrar e acompanhar cada filme assistido, separando os títulos em semanas temáticas. Além disso, conta com um fluxo de autenticação seguro, validação de rituais de feitiço (senhas), área inteligente para colar imagens da área de transferência sem depender de servidores de mídia e efeitos festivos comemorativos.

---

## 📸 Funcionalidades Principais

- **🦇 Acesso ao Covil (Autenticação Completa)**:
  - Login seguro via **Firebase Authentication**.
  - Criação de nova conta com atribuição de nome/alcunha personalizada.
  - Validador interativo em tempo real para requisitos de senha (maiúscula, minúscula, caractere especial e tamanho mínimo).
  - Alternador de visibilidade de senha (*olho aberto/fechado* 🙈/👁️).
  - Recuperação de senha por e-mail oficial disparada pelo Firebase.
  - Efeito interativo de *jumpscare* 👹 caso as credenciais estejam incorretas.

- **📜 Gestão de Filmes (CRUD em Tempo Real)**:
  - Inclusão, edição e exclusão de títulos sincronizados instantaneamente via **Cloud Firestore**.
  - **Dropzone Inteligente de Capas**: Cole posters diretamente da área de transferência com `Ctrl + V` ou faça upload de arquivo local.
  - **Compressão Automática via Canvas**: As imagens coladas são redimensionadas e comprimidas localmente em formato Base64/JPEG (~40–60 KB), economizando tráfego e dispensando custos com buckets de storage.
  - Contador interativo de caracteres para sinopses curtas (máx. 160 caracteres).

- **🩸 Organização & Experiência de Usuário**:
  - Agrupamento automático por semanas com subtítulos temáticos (*Origens, Maldições, Bonecos, Reta Final*).
  - Marcador de status com alternância visual: filme não assistido vs. filme assistido (com efeito de poster em escala de cinza e título riscado).
  - Barra de progresso dinâmica que calcula o percentual de conclusão da maratona em tempo real.
  - Filtro e pesquisa instantânea por nome do filme, gênero ou semana específica (ex: `semana 1`).
  - Efeito de confetes temáticos e modal de vitória comemorativo ao atingir 100% da maratona.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Estruturação acessível com modais nativos e marcação limpa.
- **CSS3 Moderno**: 
  - CSS Custom Properties (variáveis de tema).
  - CSS Grid e Flexbox para layout responsivo.
  - Animações fluidas de pulso, fade-in, shakes e backdrop-filter (blur).
  - Fontes temáticas do Google Fonts (*Creepster* & *Inter*).
- **JavaScript (Vanilla ES6+)**:
  - Manipulação assíncrona com `async/await`.
  - Manipulação da Clipboard API (`paste`) e API de Canvas para compressão gráfica.
- **Firebase**:
  - **Firebase Auth SDK**: Controle de sessões, perfis de usuário (`displayName`) e redefinição de senhas.
  - **Cloud Firestore**: Banco de dados NoSQL com listeners reativos em tempo real (`onSnapshot`).
- **Canvas Confetti**: Biblioteca leve para efeitos visuais de boas-vindas e vitória.

---

## 📂 Estrutura de Arquivos

```plaintext
maratona-halloween/
│
├── index.html       # Estrutura completa, modais e containers da aplicação
├── style.css        # Estilos globais, tema dark, responsividade e animações
├── script.js        # Lógica de negócios, integração com Firebase e eventos DOM
└── README.md        # Documentação do projeto
🚀 Como Executar o Projeto
Clone o repositório:

Bash
git clone [https://github.com/seu-usuario/maratona-halloween.git](https://github.com/seu-usuario/maratona-halloween.git)
cd maratona-halloween
Configuração do Firebase:

Abra o arquivo script.js.

Localize o objeto firebaseConfig e certifique-se de que suas credenciais do Firebase estejam configuradas:

JavaScript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
Regras do Firestore:

No painel do seu Firebase Console, certifique-se de permitir acesso para usuários logados:

JavaScript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
Executar:

Como o projeto utiliza HTML, CSS e JavaScript puros, basta abrir o arquivo index.html em qualquer navegador web ou servi-lo via extensão como a Live Server do VS Code.

🎃 Regras para Feitiço Protetor (Senha)
Para manter os maus espíritos afastados, cada senha cadastrada no Covil deve respeitar:

[x] Pelo menos 1 letra maiúscula

[x] Pelo menos 1 letra minúscula

[x] Pelo menos 1 caractere especial (!@#$%^&*...)

[x] Mínimo de 6 dígitos/caracteres (requisito padrão do Firebase Auth)

👻 Licença
Este projeto foi feito nas sombras para noites de puro terror. Distribuído sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
