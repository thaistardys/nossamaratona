:root {
  --bg-body: #0b0813;
  --bg-container: #140f24;
  --bg-week: #1a1430;
  --bg-card: #231b40;
  --bg-card-hover: #2b224e;
  --border-color: #3b2d6b;
  --orange-primary: #ff6b00;
  --orange-hover: #ff8533;
  --orange-glow: rgba(255, 107, 0, 0.45);
  --purple-accent: #9d4edd;
  --purple-light: #c77dff;
  --text-main: #f3f0fa;
  --text-muted: #958cb3;
  --danger-color: #ff3366;
  --danger-hover: #ff1a53;
  --danger-bg: #3f1d28;
  --success-color: #00ff88;
  --watched-bg: #1c1c22;
  --watched-border: #2e2e38;
  --watched-text: #71717a;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-body);
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  padding: 1rem 0.75rem 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.is-hidden {
  display: none;
}

.jumpscare-overlay {
  position: fixed;
  inset: 0;
  background: #000000;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  overflow: hidden;
}

.jumpscare-overlay.is-active {
  display: flex;
}

.jumpscare-face {
  font-size: 8rem;
  animation: scarePulse 0.15s infinite alternate;
  filter: drop-shadow(0 0 50px var(--danger-color));
}

@keyframes scarePulse {
  0% { 
    transform: scale(1) rotate(-3deg); 
    filter: drop-shadow(0 0 40px var(--danger-color)); 
  }
  100% { 
    transform: scale(1.3) rotate(4deg); 
    filter: drop-shadow(0 0 80px #ffffff); 
  }
}

.login-container {
  width: 100%;
  max-width: 420px;
  animation: fadeIn 0.4s ease forwards;
}

.login-card {
  background: var(--bg-container);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.8rem 1.25rem;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(157, 78, 221, 0.2);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.login-header {
  text-align: center;
  margin-bottom: 1.25rem;
}

.login-icon {
  font-size: 2.5rem;
  display: block;
  filter: drop-shadow(0 0 10px var(--orange-glow));
  margin-bottom: 0.3rem;
}

.login-title {
  font-family: 'Creepster', cursive;
  font-size: 2rem;
  color: var(--orange-primary);
  letter-spacing: 1px;
}

.login-subtitle {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.btn-submit-login {
  width: 100%;
  padding: 0.8rem;
  font-size: 0.95rem;
  margin-top: 0.75rem;
}

.login-feedback {
  min-height: 1.2rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  margin: 0.4rem 0 0.6rem;
}

.login-feedback.is-error {
  color: var(--danger-color);
}

.login-feedback.is-success {
  color: var(--success-color);
}

.login-card.is-shaking {
  animation: shake 0.4s ease-in-out;
  border-color: var(--danger-color);
  box-shadow: 0 0 30px rgba(255, 51, 102, 0.6);
}

.login-card.is-success {
  border-color: var(--success-color);
  box-shadow: 0 0 35px rgba(0, 255, 136, 0.6);
  transform: scale(1.02);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}

.app-wrapper {
  width: 100%;
  background-color: var(--bg-container);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.25rem 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  animation: fadeIn 0.4s ease forwards;
}

.header-top-bar {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.btn-logout {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.btn-logout:hover {
  border-color: var(--danger-color);
  color: #ffccd5;
}

.btn-primary-action {
  background: var(--orange-primary);
  color: #0b0813;
  border: none;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.55rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.btn-primary-action:hover {
  background: var(--orange-hover);
  transform: translateY(-1px);
}

.app-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.main-title {
  font-family: 'Creepster', cursive;
  font-size: 2.2rem;
  color: var(--orange-primary);
  text-shadow: 0 0 15px var(--orange-glow);
  letter-spacing: 1px;
  line-height: 1.1;
  margin-bottom: 0.4rem;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.progress-section {
  background: rgba(11, 8, 19, 0.95);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  margin-bottom: 1rem;
  position: sticky;
  top: 8px;
  z-index: 10;
  backdrop-filter: blur(8px);
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--purple-light);
  margin-bottom: 0.5rem;
}

.progress-bar-track {
  width: 100%;
  height: 12px;
  background-color: #120e1e;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.progress-bar-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--purple-accent), var(--orange-primary));
  box-shadow: 0 0 10px var(--orange-glow);
  border-radius: 6px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-section {
  margin-bottom: 1.5rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  font-size: 0.95rem;
  pointer-events: none;
  opacity: 0.6;
}

#search-input {
  width: 100%;
  padding: 0.75rem 2.4rem 0.75rem 2.6rem;
  background-color: var(--bg-week);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}

#search-input:focus {
  border-color: var(--orange-primary);
  box-shadow: 0 0 10px var(--orange-glow);
}

#search-input::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}

.btn-clear-search {
  position: absolute;
  right: 0.8rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1rem;
  cursor: pointer;
  display: none;
  padding: 0.2rem 0.4rem;
}

.btn-clear-search.is-active {
  display: block;
}

.btn-clear-search:hover {
  color: var(--orange-primary);
}

.no-results {
  text-align: center;
  padding: 2.5rem 1rem;
  color: var(--text-muted);
  background-color: var(--bg-week);
  border-radius: 12px;
  border: 1px dashed var(--border-color);
}

.empty-state-subtitle {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--purple-light);
}

.week-container {
  background-color: var(--bg-week);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.35s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.week-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed var(--border-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.week-title {
  font-family: 'Creepster', cursive;
  font-size: 1.6rem;
  color: var(--orange-primary);
  letter-spacing: 0.5px;
}

.week-badge {
  background: rgba(157, 78, 221, 0.15);
  border: 1px solid var(--purple-accent);
  color: var(--purple-light);
  padding: 0.2rem 0.6rem;
  border-radius: 14px;
  font-size: 0.75rem;
  font-weight: 600;
}

.movies-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.movie-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: background-color 0.25s, border-color 0.25s;
}

.card-day-tag {
  background: rgba(11, 8, 19, 0.85);
  color: var(--orange-primary);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.3rem 0.6rem;
  border-bottom-right-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.card-admin-actions {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  display: flex;
  gap: 4px;
  background: rgba(11, 8, 19, 0.85);
  padding: 0.2rem 0.4rem;
  border-bottom-left-radius: 8px;
  border-left: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.btn-card-util {
  background: transparent;
  border: none;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.2rem;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.btn-card-util:hover {
  opacity: 1;
}

.poster-container {
  width: 100%;
  aspect-ratio: 2 / 3;
  position: relative;
  overflow: hidden;
  background-color: #120e1e;
}

.poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.genre-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--purple-light);
  background: rgba(157, 78, 221, 0.15);
  border-radius: 4px;
  padding: 0.15rem 0.4rem;
  margin-bottom: 0.4rem;
}

.movie-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
  line-height: 1.25;
}

.movie-synopsis {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
  margin-bottom: 1rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: auto;
}

.btn-action {
  padding: 0.55rem 0.25rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.25);
  color: var(--text-muted);
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.btn-action.active-unwatched {
  background-color: var(--danger-bg);
  border-color: var(--danger-color);
  color: #ffccd5;
}

.btn-action.active-watched {
  background-color: var(--orange-primary);
  border-color: var(--orange-primary);
  color: #0c0a10;
  font-weight: 700;
  box-shadow: 0 0 8px var(--orange-glow);
}

.movie-card.is-watched {
  background-color: var(--watched-bg);
  border-color: var(--watched-border);
}

.movie-card.is-watched .poster-img {
  filter: grayscale(100%) opacity(35%);
}

.movie-card.is-watched .movie-title {
  color: var(--watched-text);
  text-decoration: line-through;
}

.movie-card.is-watched .movie-synopsis,
.movie-card.is-watched .card-day-tag,
.movie-card.is-watched .genre-badge {
  color: #52525b;
  background: transparent;
  border-color: transparent;
}

.load-more-container {
  text-align: center;
  margin-top: 1rem;
}

.load-more-container.is-hidden {
  display: none;
}

.btn-load-more {
  width: 100%;
  background: transparent;
  border: 2px dashed var(--orange-primary);
  color: var(--orange-primary);
  padding: 0.75rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(7, 5, 12, 0.85);
  backdrop-filter: blur(8px);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 1rem;
}

.modal-overlay.is-active {
  display: flex;
}

.modal-content {
  background: var(--bg-week);
  border: 2px solid var(--orange-primary);
  border-radius: 16px;
  padding: 1.75rem;
  width: 100%;
  max-width: 440px;
  text-align: center;
}

.form-modal-content {
  background: #161028;
  border: 1px solid var(--purple-accent);
  box-shadow: 0 0 25px rgba(157, 78, 221, 0.25);
  text-align: left;
}

.modal-icon {
  font-size: 2.8rem;
  display: block;
  margin-bottom: 0.5rem;
}

.modal-title {
  font-family: 'Creepster', cursive;
  font-size: 2.2rem;
  color: var(--orange-primary);
  margin-bottom: 1rem;
}

.modal-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.4;
}

.modal-btn {
  margin-top: 1.25rem;
  width: 100%;
  background: var(--orange-primary);
  color: #0b0813;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.delete-modal-content {
  border-color: var(--danger-color);
  box-shadow: 0 0 25px rgba(255, 51, 102, 0.3);
  max-width: 380px;
}

.delete-title {
  color: var(--danger-color);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.delete-modal-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn-danger-action {
  background: var(--danger-color);
  color: #ffffff;
  border: none;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 51, 102, 0.4);
  transition: background-color 0.2s, transform 0.2s;
}

.btn-danger-action:hover {
  background: var(--danger-hover);
  transform: translateY(-1px);
}

.form-group {
  margin-bottom: 1.1rem;
}

.form-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--purple-light);
  margin-bottom: 0.4rem;
}

.form-group input, 
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 0.9rem;
  background-color: #0e0a1a;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.form-group select {
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23ff6b00' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 12px) center;
  padding-right: 2rem;
}

.form-group select option {
  background-color: #161028;
  color: var(--text-main);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--orange-primary);
  box-shadow: 0 0 10px var(--orange-glow);
  background-color: #130d24;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.label-with-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.label-with-counter label {
  margin-bottom: 0;
}

.char-counter {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.2s ease;
}

.char-counter.limit-reached {
  color: var(--orange-primary);
  font-weight: 700;
}

.form-group textarea {
  resize: none;
  min-height: 80px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

@media (min-width: 640px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
  }

  .btn-load-more {
    width: auto;
    padding: 0.8rem 2rem;
    border-radius: 30px;
  }

  .jumpscare-face {
    font-size: 15rem;
  }
}

@media (min-width: 1024px) {
  body {
    padding: 2.5rem 1rem 4rem;
    align-items: flex-start;
  }

  .app-wrapper {
    max-width: 1150px;
    padding: 2.5rem 2rem;
    border-radius: 20px;
  }

  .main-title {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .week-container {
    padding: 1.8rem;
    border-radius: 16px;
  }

  .week-title {
    font-size: 2.2rem;
  }

  .movies-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .btn-load-more:hover {
    background: var(--orange-primary);
    color: #0b0813;
    box-shadow: 0 0 18px var(--orange-glow);
    transform: translateY(-2px);
  }

  .movie-card:hover {
    background-color: var(--bg-card-hover);
    border-color: var(--purple-accent);
  }

  .movie-card:hover .poster-img {
    transform: scale(1.03);
  }

  .modal-btn {
    width: auto;
    padding: 0.75rem 2rem;
  }
}
