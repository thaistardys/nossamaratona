const firebaseConfig = {
  apiKey: "AIzaSyDryXEeO34ZzxFOAvEo1EPoFhKQTe3Bk0k",
  authDomain: "maratona-halloween.firebaseapp.com",
  projectId: "maratona-halloween",
  storageBucket: "maratona-halloween.firebasestorage.app",
  messagingSenderId: "883352584122",
  appId: "1:883352584122:web:84d58a77eee563d2cfe783"
};

const WEEK_TITLES = {
  1: "Origens & Tensão Moderna",
  2: "Maldições, Espaço & Stop-Motion",
  3: "Bonecos, Monstros & Aventura",
  4: "Reta Final & Halloween"
};

const MAX_SYNOPSIS = 160;
const LOCAL_AUTH_CACHE_KEY = 'halloween_auth_cached';

function parseWeekSearch(term) {
  const clean = term.toLowerCase().trim();
  const match = clean.match(/^semana\s*0*(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

function groupMoviesByWeek(moviesList) {
  const grouped = {};
  moviesList.forEach(movie => {
    const week = movie.weekNumber || 1;
    if (!grouped[week]) grouped[week] = [];
    grouped[week].push(movie);
  });
  return Object.keys(grouped).sort((a, b) => a - b).map(weekNum => ({
    weekNumber: parseInt(weekNum, 10),
    weekTitle: WEEK_TITLES[weekNum] || `Semana ${weekNum}`,
    movies: grouped[weekNum]
  }));
}

function resolveCoverUrl(movie) {
  const titleDisplay = movie.title.split(' ')[0];
  const fallbackSvg = `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%23140f24'/%3E%3Ctext x='50%25' y='48%25' fill='%23ff6b00' font-family='Arial' font-weight='bold' font-size='32' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(titleDisplay)}%3C/text%3E%3Ctext x='50%25' y='55%25' fill='%23ff6b00' font-size='48' text-anchor='middle' dominant-baseline='middle'%3E%F0%9F%8E%83%3C/text%3E%3C/svg%3E`;

  if (!movie.cover || movie.cover.trim() === '') {
    return fallbackSvg;
  }
  const cleanCover = movie.cover.trim();

  if (cleanCover.startsWith('data:image/')) {
    return cleanCover;
  }

  if (cleanCover.startsWith('http://') || cleanCover.startsWith('https://')) {
    return `https://images.weserv.nl/?url=${encodeURIComponent(cleanCover)}&default=${encodeURIComponent(fallbackSvg)}`;
  }
  return cleanCover;
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof firebase === 'undefined') {
    console.error("Firebase SDK não carregou! Verifique os scripts no index.html.");
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const auth = firebase.auth();
  const db = firebase.firestore();

  const loginSection = document.querySelector('#login-section');
  const loginCard = document.querySelector('#login-card');
  const loginForm = document.querySelector('#login-form');
  const loginUser = document.querySelector('#login-user');
  const loginPass = document.querySelector('#login-pass');
  const loginFeedback = document.querySelector('#login-feedback');
  const jumpscareOverlay = document.querySelector('#jumpscare-overlay');
  const appWrapper = document.querySelector('#app-wrapper');
  const btnLogout = document.querySelector('#btn-logout');
  const greetingUsername = document.querySelector('#greeting-username');

  // Modal Cadastro
  const btnOpenRegister = document.querySelector('#btn-open-register');
  const registerModal = document.querySelector('#register-modal');
  const registerForm = document.querySelector('#register-form');
  const regName = document.querySelector('#reg-name');
  const regEmail = document.querySelector('#reg-email');
  const regPassword = document.querySelector('#reg-password');
  const registerFeedback = document.querySelector('#register-feedback');
  const btnCancelRegister = document.querySelector('#btn-cancel-register');

  const ruleUpper = document.querySelector('#rule-upper');
  const ruleLower = document.querySelector('#rule-lower');
  const ruleSpecial = document.querySelector('#rule-special');
  const ruleLength = document.querySelector('#rule-length');

  // Modal Recuperação de Senha
  const btnOpenForgot = document.querySelector('#btn-open-forgot');
  const forgotModal = document.querySelector('#forgot-modal');
  const forgotForm = document.querySelector('#forgot-form');
  const forgotEmail = document.querySelector('#forgot-email');
  const forgotFeedback = document.querySelector('#forgot-feedback');
  const btnCancelForgot = document.querySelector('#btn-cancel-forgot');

  // Aplicação Principal
  const weeksContainer = document.querySelector('#weeks-container');
  const btnLoadMore = document.querySelector('#btn-load-more');
  const loadMoreWrapper = document.querySelector('#load-more-wrapper');
  const progressBar = document.querySelector('#progress-bar');
  const progressText = document.querySelector('#progress-text');
  const victoryModal = document.querySelector('#victory-modal');
  const btnCloseModal = document.querySelector('#btn-close-modal');
  const searchInput = document.querySelector('#search-input');
  const btnClearSearch = document.querySelector('#btn-clear-search');

  // Formulário de Filme & Dropzone de Imagem Colada
  const movieFormModal = document.querySelector('#movie-form-modal');
  const movieForm = document.querySelector('#movie-form');
  const btnOpenAddModal = document.querySelector('#btn-open-add-modal');
  const btnCancelForm = document.querySelector('#btn-cancel-form');
  const formModalTitle = document.querySelector('#form-modal-title');

  const inputId = document.querySelector('#movie-id');
  const inputTitle = document.querySelector('#movie-title-input');
  const inputCover = document.querySelector('#movie-cover-input');
  const pasteZone = document.querySelector('#paste-zone');
  const pastePlaceholder = document.querySelector('#paste-placeholder');
  const pastePreviewWrapper = document.querySelector('#paste-preview-wrapper');
  const pastePreviewImg = document.querySelector('#paste-preview-img');
  const btnRemovePasted = document.querySelector('#btn-remove-pasted');
  const movieFileInput = document.querySelector('#movie-file-input');

  const inputWeek = document.querySelector('#movie-week-input');
  const inputDay = document.querySelector('#movie-day-input');
  const inputGenre = document.querySelector('#movie-genre-input');
  const inputSynopsis = document.querySelector('#movie-synopsis-input');
  const synopsisCounter = document.querySelector('#synopsis-counter');

  const deleteModal = document.querySelector('#delete-confirm-modal');
  const deleteModalText = document.querySelector('#delete-modal-text');
  const btnCancelDelete = document.querySelector('#btn-cancel-delete');
  const btnConfirmDelete = document.querySelector('#btn-confirm-delete');
  
  let currentMovies = [];
  let visibleWeeks = 1;
  let searchQuery = '';
  let movieToDeleteId = null;

  // Alternador de Visibilidade da Senha (Olho Fechado / Aberto)
  document.querySelectorAll('.btn-toggle-pass').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.dataset.target;
      const passInput = document.getElementById(targetId);
      if (!passInput) return;

      const isPassword = passInput.type === 'password';
      passInput.type = isPassword ? 'text' : 'password';
      button.textContent = isPassword ? '👁️' : '🙈';
      
      passInput.focus();
      const val = passInput.value;
      passInput.value = '';
      passInput.value = val;
    });
  });

  if (localStorage.getItem(LOCAL_AUTH_CACHE_KEY) === 'true') {
    appWrapper.classList.remove('is-hidden');
    loginSection.classList.add('is-hidden');
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem(LOCAL_AUTH_CACHE_KEY, 'true');
      
      const username = user.displayName 
        ? user.displayName 
        : (user.email ? user.email.split('@')[0] : 'Criatura');
      greetingUsername.textContent = username;

      loginSection.classList.add('is-hidden');
      registerModal.classList.remove('is-active');
      forgotModal.classList.remove('is-active');
      appWrapper.classList.remove('is-hidden');
      listenToFirestoreMovies();
    } else {
      localStorage.removeItem(LOCAL_AUTH_CACHE_KEY);
      appWrapper.classList.add('is-hidden');
      loginSection.classList.remove('is-hidden');
    }
  });

  // Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginUser.value.trim();
    const pass = loginPass.value.trim();

    auth.signInWithEmailAndPassword(email, pass)
      .then(() => {
        loginFeedback.textContent = "Acesso concedido... Bem-vindo(a) ao Covil! 🦇";
        loginFeedback.className = "login-feedback is-success";
        loginCard.classList.add('is-success');
        triggerWelcomeBats();

        setTimeout(() => {
          loginCard.classList.remove('is-success');
          loginFeedback.textContent = "";
          loginFeedback.className = "login-feedback";
          loginForm.reset();
        }, 1000);
      })
      .catch((error) => {
        console.warn("Falha no login:", error.code, error.message);
        loginFeedback.textContent = "CREDENCIAL INVÁLIDA! AS ALMAS REJEITAM VOCÊ! ☠️";
        loginFeedback.className = "login-feedback is-error";
        loginCard.classList.add('is-shaking');
        jumpscareOverlay.classList.add('is-active');

        setTimeout(() => jumpscareOverlay.classList.remove('is-active'), 1400);
        setTimeout(() => loginCard.classList.remove('is-shaking'), 600);
      });
  });

  btnLogout.addEventListener('click', () => {
    localStorage.removeItem(LOCAL_AUTH_CACHE_KEY);
    auth.signOut();
  });

  // ==========================================
  // CADASTRO / CRIAR CONTA (COM NOME)
  // ==========================================
  function validatePassword(pass) {
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const hasLength = pass.length >= 6;

    toggleRule(ruleUpper, hasUpper, "1 letra maiúscula");
    toggleRule(ruleLower, hasLower, "1 letra minúscula");
    toggleRule(ruleSpecial, hasSpecial, "1 caractere especial");
    toggleRule(ruleLength, hasLength, "Mínimo de 6 caracteres");

    return hasUpper && hasLower && hasSpecial && hasLength;
  }

  function toggleRule(element, isValid, labelText) {
    if (isValid) {
      element.classList.add('valid');
      element.textContent = `✔ ${labelText}`;
    } else {
      element.classList.remove('valid');
      element.textContent = `✖ Pelo menos ${labelText}`;
    }
  }

  regPassword.addEventListener('input', () => {
    validatePassword(regPassword.value);
  });

  btnOpenRegister.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    registerForm.reset();
    registerFeedback.textContent = '';
    registerFeedback.className = 'login-feedback';
    validatePassword('');
    
    registerModal.classList.add('is-active');
    setTimeout(() => regName.focus(), 50);
  });

  btnCancelRegister.addEventListener('click', () => {
    registerModal.classList.remove('is-active');
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = regName.value.trim();
    const email = regEmail.value.trim();
    const pass = regPassword.value.trim();

    if (!validatePassword(pass)) {
      registerFeedback.textContent = "A senha não cumpre todos os rituais exigidos!";
      registerFeedback.className = "login-feedback is-error";
      return;
    }

    registerFeedback.textContent = "Invocando novo membro nas sombras...";
    registerFeedback.className = "login-feedback";

    auth.createUserWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        return userCredential.user.updateProfile({
          displayName: name
        });
      })
      .then(() => {
        greetingUsername.textContent = name;
        registerFeedback.textContent = `Pacto selado, ${name}! Entrando no covil...`;
        registerFeedback.className = "login-feedback is-success";
        triggerWelcomeBats();

        setTimeout(() => {
          registerModal.classList.remove('is-active');
          registerForm.reset();
        }, 1200);
      })
      .catch((error) => {
        let msg = "Erro ao criar conta. Tente novamente.";
        if (error.code === 'auth/email-already-in-use') {
          msg = "Este e-mail já pertence a outra criatura!";
        } else if (error.code === 'auth/invalid-email') {
          msg = "O formato do e-mail é inválido!";
        }
        registerFeedback.textContent = msg;
        registerFeedback.className = "login-feedback is-error";
      });
  });

  // ==========================================
  // RECUPERAÇÃO DE SENHA
  // ==========================================
  btnOpenForgot.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    forgotForm.reset();
    forgotFeedback.textContent = '';
    forgotFeedback.className = 'login-feedback';

    if (loginUser.value.trim()) {
      forgotEmail.value = loginUser.value.trim();
    }

    forgotModal.classList.add('is-active');
    setTimeout(() => forgotEmail.focus(), 50);
  });

  btnCancelForgot.addEventListener('click', () => {
    forgotModal.classList.remove('is-active');
  });

  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = forgotEmail.value.trim();

    forgotFeedback.textContent = "Consultando os espíritos...";
    forgotFeedback.className = "login-feedback";

    auth.sendPasswordResetEmail(email)
      .then(() => {
        forgotFeedback.textContent = "Feitiço enviado! Verifique sua caixa de entrada 🦇";
        forgotFeedback.className = "login-feedback is-success";

        setTimeout(() => {
          forgotModal.classList.remove('is-active');
          forgotForm.reset();
        }, 2200);
      })
      .catch((error) => {
        let msg = "Erro ao enviar feitiço. Tente novamente.";
        if (error.code === 'auth/user-not-found') {
          msg = "Nenhuma alma encontrada com este e-mail!";
        } else if (error.code === 'auth/invalid-email') {
          msg = "Formato de e-mail inválido!";
        }
        forgotFeedback.textContent = msg;
        forgotFeedback.className = "login-feedback is-error";
      });
  });

  // ==========================================
  // PROCESSAMENTO DE IMAGEM (COLAR & COMPRIMIR)
  // ==========================================
  function processAndCompressImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 420;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.72);
        setCoverPreview(compressedBase64);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function setCoverPreview(base64OrUrl) {
    if (base64OrUrl && base64OrUrl.trim()) {
      inputCover.value = base64OrUrl;
      pastePreviewImg.src = base64OrUrl;
      pastePreviewWrapper.classList.remove('is-hidden');
      pastePlaceholder.classList.add('is-hidden');
    } else {
      inputCover.value = '';
      pastePreviewImg.src = '';
      pastePreviewWrapper.classList.add('is-hidden');
      pastePlaceholder.classList.remove('is-hidden');
    }
  }

  function handleImagePaste(e) {
    const clipboard = e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData);
    if (!clipboard || !clipboard.items) return;

    for (const item of clipboard.items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          processAndCompressImage(file);
          e.preventDefault();
          break;
        }
      }
    }
  }

  pasteZone.addEventListener('paste', handleImagePaste);
  window.addEventListener('paste', (e) => {
    if (movieFormModal.classList.contains('is-active')) {
      handleImagePaste(e);
    }
  });

  pasteZone.addEventListener('dblclick', () => movieFileInput.click());
  movieFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      processAndCompressImage(e.target.files[0]);
    }
  });

  btnRemovePasted.addEventListener('click', (e) => {
    e.stopPropagation();
    setCoverPreview('');
    movieFileInput.value = '';
  });

  function triggerWelcomeBats() {
    if (typeof confetti !== 'function') return;
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#00ff88', '#9d4edd', '#ff6b00', '#0b0813']
    });
  }

  function listenToFirestoreMovies() {
    db.collection('movies').onSnapshot((snapshot) => {
      currentMovies = [];
      snapshot.forEach(doc => {
        currentMovies.push({ id: doc.id, ...doc.data() });
      });
      renderApp();
    }, (error) => {
      console.error("Erro ao sincronizar com Firestore:", error);
    });
  }

  function updateSynopsisCounter() {
    const currentLength = inputSynopsis.value.length;
    synopsisCounter.textContent = `${currentLength} / ${MAX_SYNOPSIS}`;

    if (currentLength >= MAX_SYNOPSIS) {
      synopsisCounter.classList.add('limit-reached');
    } else {
      synopsisCounter.classList.remove('limit-reached');
    }
  }

  inputSynopsis.addEventListener('input', updateSynopsisCounter);

  function renderApp() {
    weeksContainer.replaceChildren();

    const marathonData = groupMoviesByWeek(currentMovies);
    const term = searchQuery.toLowerCase().trim();
    const targetWeek = parseWeekSearch(term);

    if (currentMovies.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'no-results';
      emptyDiv.innerHTML = `
        <p>Nenhum filme cadastrado na maratona ainda 🎃</p>
        <p class="empty-state-subtitle">Clique no botão <strong>"Novo Filme ➕"</strong> acima para começar!</p>
      `;
      weeksContainer.appendChild(emptyDiv);
      loadMoreWrapper.classList.add('is-hidden');
      updateProgress(0, 0);
      return;
    }

    if (term !== '') {
      loadMoreWrapper.classList.add('is-hidden');
    } else {
      if (visibleWeeks >= marathonData.length) {
        loadMoreWrapper.classList.add('is-hidden');
      } else {
        loadMoreWrapper.classList.remove('is-hidden');
      }
    }

    let totalMatches = 0;
    let watchedCount = 0;

    currentMovies.forEach(m => {
      if (m.watched) watchedCount++;
    });

    marathonData.forEach((week, index) => {
      if (term === '' && index >= visibleWeeks) return;

      let filteredMovies = week.movies;

      if (term !== '') {
        if (targetWeek !== null) {
          if (week.weekNumber !== targetWeek) return;
        } else {
          filteredMovies = week.movies.filter(movie => 
            movie.title.toLowerCase().includes(term) ||
            movie.genre.toLowerCase().includes(term)
          );
          if (filteredMovies.length === 0) return;
        }
      }

      totalMatches += filteredMovies.length;

      const weekEl = document.createElement('section');
      weekEl.className = 'week-container';

      weekEl.innerHTML = `
        <div class="week-header">
          <h2 class="week-title">Semana 0${week.weekNumber}: ${week.weekTitle}</h2>
          <span class="week-badge">${filteredMovies.length} Filme(s)</span>
        </div>
        <div class="movies-grid"></div>
      `;

      const grid = weekEl.querySelector('.movies-grid');

      filteredMovies.forEach(movie => {
        const isWatched = Boolean(movie.watched);
        const resolvedCover = resolveCoverUrl(movie);

        const card = document.createElement('article');
        card.className = `movie-card ${isWatched ? 'is-watched' : ''}`;
        card.id = `card-${movie.id}`;

        card.innerHTML = `
          <span class="card-day-tag">📅 ${movie.day}</span>
          <div class="card-admin-actions">
            <button type="button" class="btn-card-util btn-edit-movie" data-id="${movie.id}" title="Editar Filme">✏️</button>
            <button type="button" class="btn-card-util btn-delete-movie" data-id="${movie.id}" title="Excluir Filme">🗑️</button>
          </div>
          <div class="poster-container">
            <img 
              src="${resolvedCover}" 
              alt="Poster de ${movie.title}" 
              class="poster-img" 
              loading="lazy" 
              referrerpolicy="no-referrer"
            >
          </div>
          <div class="card-body">
            <span class="genre-badge">${movie.genre}</span>
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-synopsis">${movie.synopsis}</p>
            <div class="button-group">
              <button type="button" class="btn-action btn-watched ${isWatched ? 'active-watched' : ''}" data-id="${movie.id}">
                Assisti ✔
              </button>
              <button type="button" class="btn-action btn-unwatched ${!isWatched ? 'active-unwatched' : ''}" data-id="${movie.id}">
                Não assisti ✕
              </button>
            </div>
          </div>
        `;

        const imgEl = card.querySelector('.poster-img');
        imgEl.addEventListener('error', () => {
          imgEl.src = resolveCoverUrl({ title: movie.title, cover: '' });
        }, { once: true });

        grid.appendChild(card);
      });

      weeksContainer.appendChild(weekEl);
    });

    if (term !== '' && totalMatches === 0) {
      const notFoundDiv = document.createElement('div');
      notFoundDiv.className = 'no-results';
      notFoundDiv.innerHTML = `<p>Nenhum filme ou semana encontrada para "<strong>${searchQuery}</strong>" 🎃</p>`;
      weeksContainer.appendChild(notFoundDiv);
    }

    updateProgress(watchedCount, currentMovies.length);
  }

  // ==========================================
  // OPERAÇÕES DO FIRESTORE (CRUD + STATUS)
  // ==========================================
  weeksContainer.addEventListener('click', (e) => {
    const btnAction = e.target.closest('.btn-action');
    if (btnAction) {
      const movieId = btnAction.dataset.id;
      const isWatched = btnAction.classList.contains('btn-watched');
      db.collection('movies').doc(movieId).update({ watched: isWatched });
      return;
    }

    const btnEdit = e.target.closest('.btn-edit-movie');
    if (btnEdit) {
      const id = btnEdit.dataset.id;
      const movie = currentMovies.find(m => m.id === id);
      if (!movie) return;

      formModalTitle.textContent = "Editar Filme";
      inputId.value = movie.id;
      inputTitle.value = movie.title;
      setCoverPreview(movie.cover || '');
      inputWeek.value = movie.weekNumber || 1;
      inputDay.value = movie.day;
      inputGenre.value = movie.genre;
      inputSynopsis.value = movie.synopsis;

      updateSynopsisCounter();
      movieFormModal.classList.add('is-active');
      return;
    }

    const btnDelete = e.target.closest('.btn-delete-movie');
    if (btnDelete) {
      const id = btnDelete.dataset.id;
      const movie = currentMovies.find(m => m.id === id);
      if (!movie) return;

      movieToDeleteId = id;
      deleteModalText.innerHTML = `Tem certeza que deseja remover <strong>"${movie.title}"</strong> da maratona?`;
      deleteModal.classList.add('is-active');
    }
  });

  btnCancelDelete.addEventListener('click', () => {
    movieToDeleteId = null;
    deleteModal.classList.remove('is-active');
  });

  btnConfirmDelete.addEventListener('click', () => {
    if (!movieToDeleteId) return;
    db.collection('movies').doc(movieToDeleteId).delete()
      .then(() => {
        deleteModal.classList.remove('is-active');
        movieToDeleteId = null;
      });
  });

  movieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = inputId.value;

    const movieData = {
      title: inputTitle.value.trim(),
      cover: inputCover.value.trim(),
      weekNumber: parseInt(inputWeek.value, 10),
      day: inputDay.value.trim(),
      genre: inputGenre.value.trim(),
      synopsis: inputSynopsis.value.trim()
    };

    if (id) {
      db.collection('movies').doc(id).update(movieData)
        .then(() => movieFormModal.classList.remove('is-active'));
    } else {
      movieData.watched = false;
      movieData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      db.collection('movies').add(movieData)
        .then(() => movieFormModal.classList.remove('is-active'));
    }
  });

  btnOpenAddModal.addEventListener('click', () => {
    movieForm.reset();
    inputId.value = '';
    setCoverPreview('');
    movieFileInput.value = '';
    formModalTitle.textContent = "Novo Filme";
    updateSynopsisCounter();
    movieFormModal.classList.add('is-active');
  });

  btnCancelForm.addEventListener('click', () => {
    movieFormModal.classList.remove('is-active');
  });

  function updateProgress(watchedCount, totalMovies) {
    const percent = totalMovies > 0 ? Math.round((watchedCount / totalMovies) * 100) : 0;

    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${watchedCount} / ${totalMovies} assistidos (${percent}%)`;

    if (totalMovies > 0 && watchedCount === totalMovies) {
      triggerVictoryConfetti();
      setTimeout(() => {
        victoryModal.classList.add('is-active');
      }, 1000);
    }
  }

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (searchQuery) {
      btnClearSearch.classList.add('is-active');
    } else {
      btnClearSearch.classList.remove('is-active');
    }
    renderApp();
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    btnClearSearch.classList.remove('is-active');
    renderApp();
    searchInput.focus();
  });

  btnLoadMore.addEventListener('click', () => {
    const groups = groupMoviesByWeek(currentMovies);
    if (visibleWeeks < groups.length) {
      visibleWeeks++;
      renderApp();
    }
  });

  btnCloseModal.addEventListener('click', () => {
    victoryModal.classList.remove('is-active');
  });

  function triggerVictoryConfetti() {
    if (typeof confetti !== 'function') return;
    const count = 180;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff6b00', '#9d4edd'] });
    fire(0.2, { spread: 60, colors: ['#ffffff', '#ff6b00'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#9d4edd', '#ff8533'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#c77dff'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#ff6b00'] });
  }
});
