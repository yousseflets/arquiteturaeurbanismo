import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('arquiteturaeurbanismo');
  // ano atual mostrado no rodapé
  currentYear = new Date().getFullYear();
  // controla o menu móvel
  navOpen = false;

  private _touchStartX: number | null = null;
  private _touchStartY: number | null = null;
  private _swipeAllowed = false;
  // bound listener refs so we can remove them later
  private _boundTouchStart?: (e: TouchEvent) => void;
  private _boundTouchMove?: (e: TouchEvent) => void;

  constructor() {
    // bloqueia panning horizontal global, exceto quando o toque começar dentro do carrossel
    if (typeof window !== 'undefined' && 'addEventListener' in window) {
      // store bound handlers to allow proper removal later
      this._boundTouchStart = this.onTouchStart.bind(this);
      this._boundTouchMove = this.onTouchMove.bind(this);
      // use passive:false on touchstart so we can call preventDefault early if needed
      window.addEventListener('touchstart', this._boundTouchStart, { passive: false });
      window.addEventListener('touchmove', this._boundTouchMove, { passive: false });
    }
  }

  private onTouchStart(e: TouchEvent) {
    const t = e.touches && e.touches[0];
    if (!t) return;
    this._touchStartX = t.clientX;
    this._touchStartY = t.clientY;
    // decidir se o gesto começou dentro de um elemento que deve permitir swipe
    const target = (e.target as Element | null);
    this._swipeAllowed = false;
    if (target && target.closest) {
      if (target.closest('.carousel, .slides, .slide-media')) {
        this._swipeAllowed = true;
      }
    }
    // if the touch does not start in an allowed area, prevent default on start
    // this avoids any horizontal panning from beginning (but preserves vertical scroll)
    if (!this._swipeAllowed) {
      // allow small vertical drags: do not prevent here, we'll prevent inside touchmove when gesture is horizontal
      // keep this minimal to avoid blocking normal vertical scrolling
    }
  }

  private onTouchMove(e: TouchEvent) {
    if (!this._touchStartX || !this._touchStartY) return;
    const t = e.touches && e.touches[0];
    if (!t) return;
    const dx = t.clientX - this._touchStartX;
    const dy = t.clientY - this._touchStartY;

    // se o gesto for mais horizontal que vertical e não começou dentro do carrossel, bloquear
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      // permitir swipe se o toque começou em um elemento permitido
      if (this._swipeAllowed) return;
      // Bloquear o scroll padrão (panning horizontal da página)
      e.preventDefault();
    }
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
    // bloquear scroll do body quando o menu móvel estiver aberto
    try {
      if (this.navOpen) document.body.classList.add('no-scroll');
      else document.body.classList.remove('no-scroll');
    } catch (err) {
      // ignore em ambientes sem document
    }
  }

  closeNav() {
    this.navOpen = false;
    try { document.body.classList.remove('no-scroll'); } catch (err) {}
  }

  // remover listeners ao destruir (boa prática)
  ngOnDestroy() {
    if (typeof window !== 'undefined' && 'removeEventListener' in window) {
      if (this._boundTouchStart) window.removeEventListener('touchstart', this._boundTouchStart);
      if (this._boundTouchMove) window.removeEventListener('touchmove', this._boundTouchMove);
    }
    try { document.body.classList.remove('no-scroll'); } catch (err) {}
  }
}
