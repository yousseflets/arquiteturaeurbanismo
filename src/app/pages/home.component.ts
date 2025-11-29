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
          <img src="img-home.png" alt="img-home" />
        </div>

        <div class="hero-text">
          <h1><i>Thaís Roza</i></h1>
          <p class="lead">ARQUITETURA E URBANISMO</p>
          <p class="lead">Transformo ideias em espaços funcionais, modernos e cheios de personalidade — do jeitinho que você sempre sonhou.</p>
          <br />
          <div class="hero-cta">
            <a routerLink="/portfolio" class="btn-cta">Ver Projetos</a>
          </div>
        </div>
      </div>
    </section>
    <br />
    <section class="home-projects page">
      <div class="container">
        <h2><i>Destaques</i></h2>

        <div class="carousel" aria-roledescription="carousel" (mouseenter)="pause()" (mouseleave)="resume()"
          (pointerdown)="startDrag($event)" (pointermove)="onDrag($event)" (pointerup)="endDrag($event)" (pointercancel)="endDrag($event)" (pointerleave)="endDrag($event)">
          <div class="slides" [style.transform]="'translateX(' + (-current * 100) + '%)'">
            <div class="slide" *ngFor="let img of slides; let i = index" [class.active]="i === current">
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
            <img src="/natureza-ambiente-interno.webp" alt="Projeto destaque" />
        </div>
        </div>
    </div>
    </section>
  `,
  styles: [`
    .hero-full { position:relative; min-height:50vh; display:flex; align-items:center; justify-content:center }
    .hero-inner { position:relative; z-index:2; padding:4.5rem 0 3rem; display:grid; grid-template-columns:460px 1fr; gap:2.2rem; align-items:center; width:100%; max-width:1100px; margin:0 auto }
    .hero-visual { position:relative; display:flex; align-items:center; justify-content:flex-start }
    .hero-decor { position:absolute; left:-28px; top:6%; width:56px; height:360px; background:var(--brand-deep); border-radius:18px; z-index:0; pointer-events:none }
    .hero-visual img { width:460px; height:360px; object-fit:cover; border-radius:10px; box-shadow:0 30px 80px rgba(11,6,6,0.12); position:relative; z-index:1 }
    .hero-text { max-width:560px; color:var(--text-dark); text-align:right; animation:heroIn .6s ease both }
    .hero-text h1 { font-size:3.8rem; margin:0 0 0.6rem; font-family:'Merriweather Sans', sans-serif; color:var(--brand-deep); letter-spacing:0.6px }
    .hero-text .lead { font-size:1rem; color:var(--muted); margin-bottom:1rem; font-style:normal }
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
    .test-title { max-width:100%; width:auto; text-align:left; font-family:'Merriweather Sans', sans-serif; color:var(--brand-deep); margin:0.3rem }
    .testimonial-grid { max-width:1100px; width:100%; display:grid; grid-template-columns:1fr 420px; gap:2.5rem; justify-items:center; align-items:center }
    .testimonial .quotes { padding:1rem 0; text-align:center; display:flex; flex-direction:column; align-items:center; gap:1rem; width:100% }
    .quote { font-size:1.15rem; line-height:1.75; background:#fff; padding:1.25rem 1.5rem; border-radius:12px; box-shadow:0 20px 48px rgba(11,6,6,0.07); border-left:8px solid var(--brand-deep); max-width:780px; width:100%; box-sizing:border-box; text-align:center; margin:0 auto }
    .quote-footer { margin-top:0.6rem; color:var(--brand-deep); font-weight:700 }
    .testimonial .visual { justify-self:center; display:flex; justify-content:center; align-items:center }
    .testimonial .visual img { width:380px; max-width:100%; border-radius:8px; box-shadow:0 22px 60px rgba(0,0,0,0.08); display:block; margin:0 auto }
    .home-projects h2 { margin-left:4.5rem; font-weight:600; color:var(--brand-deep); letter-spacing:0.2px }
    .carousel { position:relative; overflow:hidden; margin-top:1rem }
    .slides { display:flex; transition:transform 520ms cubic-bezier(.22,.9,.3,1); box-sizing: border-box }
    .slide { min-width:100%; padding:0.6rem; box-sizing: border-box; display:flex; justify-content:center }
      .slide-link { display:block; border-radius:14px; box-shadow:0 18px 48px rgba(0,0,0,0.10); overflow:hidden; background:var(--bg-off); transition: transform 420ms cubic-bezier(.2,.9,.2,1), box-shadow 420ms ease }
      .slide-link { transform: scale(.96) }
      .slide.active .slide-link { transform: scale(1); box-shadow:0 36px 80px rgba(11,6,6,0.12) }
      .slide-media { height:340px; display:flex; align-items:center; justify-content:center }
      .slide-media img { max-width:100%; max-height:100%; object-fit:cover; display:block }
      .slide-caption { margin-top:0.6rem; text-align:center; font-weight:700; color:var(--brand-deep); font-size:0.95rem }

    .ctrl { position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.92); border:0; width:46px; height:46px; border-radius:50%; font-size:22px; color:var(--brand-deep); cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 20px rgba(0,0,0,0.06) }
    .ctrl.prev { left:8px }
    .ctrl.next { right:8px }

    .dots { display:flex; gap:0.6rem; justify-content:center; margin-top:0.75rem }
    .dots button { width:34px; height:8px; border-radius:8px; background:rgba(0,0,0,0.08); border:0; transition: all 220ms ease }
    .dots button.active { background:var(--brand-deep); width:44px; height:10px }

    @media (max-width:700px) {
      .hero-text h1 { font-size:2rem }
      .hero-inner { padding:3rem 0 }
      .home-projects h2 { margin-left:0.3rem }
      .profile-card .card-inner { flex-direction:column; align-items:flex-start; padding:0.9rem }
      .profile-card .avatar { width:72px; height:72px }
      .testimonial-grid { grid-template-columns:1fr; gap:1rem }
      .testimonial .visual { justify-self:center }
      .quote { font-size:1rem; max-width:690px}
      .testimonial .visual img { width:100%; max-width:260px }
      .hero-full { min-height:32vh }
      .hero-inner { padding:1.2rem 0 }
    }
    /* Ajustes gerais para tablet/mobile: empilhar hero e ajustar imagens */
    @media (max-width:900px) {
      .hero-inner { grid-template-columns:1fr; gap:1rem; padding:2.2rem 0; box-sizing:border-box; padding-left:1rem; padding-right:1rem }
      .hero-visual { justify-content:center }
      .hero-visual img { width:100%; max-width:220px; height:auto }
      .hero-text { text-align:center; padding-left:0.6rem; padding-right:0.6rem }
      .hero-text .lead { text-align:center; overflow-wrap:break-word; word-break:break-word; white-space:normal }
      .hero-decor { display:none }
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
  slides = [
    '/ambiente-clean.webp',
    '/arquitetura_comercial-1.jpg',
    '/arquitetura-contemporanea-residencial.webp',
    '/arquitetura-residencial.webp',
    '/espaços-multifuncionais.webp',
    '/natureza-ambiente-interno.jpeg',
    '/natureza-ambiente-interno.webp'
  ];
  current = 0;
  autoplayInterval = 3000;
  private _autoplayTimer: any = null;

  // swipe/drag support
  private _dragStartX: number | null = null;
  private _dragDeltaX = 0;
  private _isDragging = false;

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

  startDrag(e: PointerEvent) {
    // begin drag
    this._dragStartX = e.clientX;
    this._dragDeltaX = 0;
    this._isDragging = true;
    this.clearAutoplay();
    try { (e.target as Element).setPointerCapture?.(e.pointerId); } catch {}
  }

  onDrag(e: PointerEvent) {
    if (!this._isDragging || this._dragStartX === null) return;
    this._dragDeltaX = e.clientX - this._dragStartX;
  }

  endDrag(e: PointerEvent) {
    if (!this._isDragging) return;
    const delta = this._dragDeltaX;
    const threshold = 60; // px
    if (Math.abs(delta) > threshold) {
      if (delta < 0) this.next(); else this.prev();
    }
    this._dragStartX = null;
    this._dragDeltaX = 0;
    this._isDragging = false;
    this.startAutoplay();
    try { (e.target as Element).releasePointerCapture?.(e.pointerId); } catch {}
  }
}
