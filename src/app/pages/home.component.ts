import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule],
  selector: 'app-home',
  template: `
    <section class="hero hero-full">
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="container hero-inner">
        <div class="hero-text">
          <h1>Thais Roza</h1>
          <p class="lead">Arquitetura e urbanismo — projetos residenciais e comerciais</p>
          <br />
          <a routerLink="/portfolio" class="btn-cta">Ver Portfólio</a>
        </div>
      </div>
    </section>

    <section class="home-projects page">
      <div class="container">
        <h2>Destaques</h2>

        <div class="carousel" aria-roledescription="carousel" (mouseenter)="pause()" (mouseleave)="resume()">
          <div class="slides" [style.transform]="'translateX(' + (-current * 100) + '%)'">
            <div class="slide" *ngFor="let img of slides; let i = index">
                <a routerLink="/portfolio" class="slide-link" aria-hidden="true">
                  <div class="slide-media">
                    <img [src]="img" [alt]="'Destaque ' + (i+1)" />
                  </div>
                </a>
            </div>
          </div>

          <button class="ctrl prev" (click)="prev()" aria-label="Anterior">‹</button>
          <button class="ctrl next" (click)="next()" aria-label="Próximo">›</button>

          <div class="dots">
            <button *ngFor="let _ of slides; let i = index" (click)="go(i)" [class.active]="i === current" aria-label="Ir para slide {{i+1}}"></button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-full { position:relative; min-height:50vh; display:flex; align-items:center; justify-content:center }
    .hero-inner { position:relative; z-index:2; padding:6rem 0; display:flex; align-items:center; justify-content:center; width:100%; max-width:var(--container) }
    .hero-text { max-width:820px; color:var(--text-dark); text-align:center; animation:heroIn .6s ease both }
    .hero-text h1 { font-size:4.4rem; margin:0 0 0.6rem; font-family:'Playfair Display',serif; color:var(--brand-deep) }
    .hero-text .lead { font-size:1.05rem; color:var(--muted); margin-bottom:1rem }
      .btn-cta { background:var(--brand-deep); color:#fff; padding:0.8rem 1.1rem; border-radius:12px; text-decoration:none; font-weight:700; box-shadow:0 10px 30px rgba(123,22,48,0.12); border:1px solid rgba(0,0,0,0.03) }

      @keyframes heroIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }

    /* carousel styles */
    .home-projects { padding-bottom:2rem }
    .home-projects h2 { margin-left:4.5rem; font-weight:600; color:var(--brand-deep); letter-spacing:0.2px }
    .carousel { position:relative; overflow:hidden; margin-top:1rem }
    .slides { display:flex; transition:transform 320ms cubic-bezier(.2,.9,.2,1) }
    .slide { min-width:100%; padding:0.6rem }
      .slide-link { display:block; border-radius:12px; box-shadow:0 12px 34px rgba(0,0,0,0.10); overflow:hidden; background:var(--bg-off) }
      .slide-media { height:340px; display:flex; align-items:center; justify-content:center }
      .slide-media img { max-width:100%; max-height:100%; object-fit:contain; display:block }

    .ctrl { position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.9); border:0; width:44px; height:44px; border-radius:8px; font-size:22px; color:var(--brand-deep); cursor:pointer }
    .ctrl.prev { left:8px }
    .ctrl.next { right:8px }

    .dots { display:flex; gap:0.4rem; justify-content:center; margin-top:0.75rem }
    .dots button { width:10px; height:10px; border-radius:50%; background:rgba(0,0,0,0.12); border:0 }
    .dots button.active { background:var(--brand-deep) }

    @media (max-width:700px) {
      .hero-text h1 { font-size:2rem }
      .hero-inner { padding:3rem 0 }
      .home-projects h2 { margin-left:0.3rem }
    }
    @media (max-width:900px) {
      .slide-media { height:260px }
    }
    @media (max-width:700px) {
      .slide-media { height:200px }
    }
  `]
})
export class HomeComponent {
  slides = ['/ambiente-clean.webp','/arquitetura-residencial.jpg','/espaços-multifuncionais.webp','/natureza-ambiente-interno.webp'];
  current = 0;
  autoplayInterval = 1500;
  private _autoplayTimer: any = null;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
  }

  startAutoplay() {
    this.clearAutoplay();
    if (!this.slides || this.slides.length <= 1) return;
    this._autoplayTimer = setInterval(() => this.next(), this.autoplayInterval);
  }

  clearAutoplay() {
    if (this._autoplayTimer) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = null;
    }
  }

  pause() { this.clearAutoplay() }
  resume() { this.startAutoplay() }

  prev() { this.current = (this.current - 1 + this.slides.length) % this.slides.length }
  next() { this.current = (this.current + 1) % this.slides.length }
  go(i: number) { this.current = i }
}
