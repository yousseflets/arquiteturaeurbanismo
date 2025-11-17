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
        <div class="hero-visual" aria-hidden="true">
          <div class="hero-decor"></div>
          <img src="/img-home.png" alt="Projeto destaque" />
        </div>

        <div class="hero-text">
          <h1><i>Thaís Roza</i></h1>
          <p class="lead">ARQUITETURA E URBANISMO</p>
          <p class="lead">Crio projetos residenciais e comerciais que unem estética e funcionalidade, 
            priorizando materiais naturais, iluminação e bem-estar.</p>
          <div class="hero-cta">
            <a routerLink="/portfolio" class="btn-cta">Ver Portfólio</a>
          </div>
        </div>
      </div>
    </section>
    <br />
    <section class="home-projects page">
      <div class="container">
        <h2><i>Destaques</i></h2>

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
    <section class="testimonial page">
    <div class="container testimonial-container">
        <h2 class="test-title">Depoimentos</h2>
        <div class="testimonial-grid">
        <div class="quotes">
            <div class="quote">“O trabalho da Thaís superou nossas expectativas — criou espaços elegantes e funcionais que realmente valorizam nosso dia a dia.”
            <div class="quote-footer">— Cliente residencial</div>
            </div>
            <div style="height:0.9rem"></div>
            <div class="quote">“Profissional, atenta aos detalhes e com excelente sensibilidade estética. Recomendo para projetos residenciais e comerciais.”
            <div class="quote-footer">— Escritório parceiro</div>
            </div>
        </div>
        <div class="visual">
            <img src="/arquitetura-residencial.jpg" alt="Projeto destaque" />
        </div>
        </div>
    </div>
    </section>
  `,
  styles: [`
    .hero-full { position:relative; min-height:50vh; display:flex; align-items:center; justify-content:center }
    .hero-inner { position:relative; z-index:2; padding:4.5rem 0 3rem; display:grid; grid-template-columns:460px 1fr; gap:2.2rem; align-items:center; width:100%; max-width:1100px; margin:0 auto }
    .hero-visual { position:relative; display:flex; align-items:center; justify-content:flex-start }
    .hero-decor { position:absolute; left:-28px; top:6%; width:56px; height:360px; background:var(--brand-deep); border-radius:18px; z-index:0 }
    .hero-visual img { width:460px; height:360px; object-fit:cover; border-radius:10px; box-shadow:0 30px 80px rgba(11,6,6,0.12); position:relative; z-index:1 }
    .hero-text { max-width:560px; color:var(--text-dark); text-align:right; animation:heroIn .6s ease both }
    .hero-text h1 { font-size:3.8rem; margin:0 0 0.6rem; font-family:'Merriweather Sans', sans-serif; color:var(--brand-deep); letter-spacing:0.6px }
    .hero-text .lead { font-size:1.05rem; color:var(--muted); margin-bottom:1rem; font-style:normal }
    .hero-cta { margin:1.1rem 0 }
    .hero-contact { margin-top:1.2rem; text-align:right }
    .hero-contact p { margin:0 0 0.5rem 0; color:var(--muted) }
      .btn-cta { background:var(--brand-deep); color:#fff; padding:0.8rem 1.1rem; border-radius:12px; text-decoration:none; font-weight:700; box-shadow:0 10px 30px rgba(123,22,48,0.12); border:1px solid rgba(0,0,0,0.03) }

      @keyframes heroIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }

    /* carousel styles */
    .home-projects { padding-bottom:2rem }
    /* profile card under hero */
    .profile-card { margin-top:-4.5rem; margin-bottom:2rem; display:block }
    .profile-card .card-inner { background:#fff; box-shadow:0 34px 70px rgba(11,6,6,0.08); border-radius:12px; padding:1.15rem; display:flex; gap:1rem; align-items:center; max-width:920px; margin:0 auto }
    .profile-card .avatar { width:88px; height:88px; border-radius:10px; object-fit:cover; box-shadow:0 10px 28px rgba(0,0,0,0.08) }
    .profile-card h3 { margin:0; font-size:1.05rem; color:var(--brand-deep) }
    .profile-card p { margin:0; color:var(--muted); font-size:0.98rem }
    .testimonial { margin-top:2.6rem; color:var(--muted); font-style:italic }
    .testimonial-container { display:flex; flex-direction:column; align-items:center }
    .test-title { width:1000px; text-align:left; font-family:'Merriweather Sans', sans-serif; color:var(--brand-deep); margin:0.3rem }
    .testimonial-grid { max-width:1100px; width:100%; display:grid; grid-template-columns:1fr 420px; gap:2.5rem; justify-items:center; align-items:center }
    .testimonial .quotes { padding:1rem 0; text-align:center }
    .quote { font-size:1.15rem; line-height:1.75; background:#fff; padding:1.25rem 1.5rem; border-radius:12px; box-shadow:0 20px 48px rgba(11,6,6,0.07); border-left:8px solid var(--brand-deep); max-width:780px; text-align:center }
    .quote-footer { margin-top:0.6rem; color:var(--brand-deep); font-weight:700 }
    .testimonial .visual { justify-self:center }
    .testimonial .visual img { width:380px; border-radius:8px; box-shadow:0 22px 60px rgba(0,0,0,0.08); display:block }
    .home-projects h2 { margin-left:4.5rem; font-weight:600; color:var(--brand-deep); letter-spacing:0.2px }
    .carousel { position:relative; overflow:hidden; margin-top:1rem }
    .slides { display:flex; transition:transform 320ms cubic-bezier(.2,.9,.2,1); box-sizing: border-box }
    .slide { min-width:100%; padding:0.6rem; box-sizing: border-box }
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
      .profile-card .card-inner { flex-direction:column; align-items:flex-start; padding:0.9rem }
      .profile-card .avatar { width:72px; height:72px }
      .testimonial-grid { grid-template-columns:1fr; gap:1rem }
      .testimonial .visual { justify-self:center }
      .quote { font-size:1rem }
      .testimonial .visual img { width:100%; max-width:360px }
    }
    /* Ajustes gerais para tablet/mobile: empilhar hero e ajustar imagens */
    @media (max-width:900px) {
      .hero-inner { grid-template-columns:1fr; gap:1rem; padding:2.2rem 0 }
      .hero-visual { justify-content:center }
      .hero-visual img { width:100%; max-width:420px; height:auto }
      .hero-text { text-align:center }
      .hero-text .lead { text-align:center }
      .profile-card { margin-top:1rem }
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
