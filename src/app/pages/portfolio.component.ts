import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-portfolio',
  template: `
    <section class="page portfolio">
      <div class="container">
        <div class="portfolio-head">
          <h2>Portfólio</h2>
          <p>Projetos selecionados — clique nas imagens para ampliar.</p>
        </div>

        <div class="gallery">
          <div class="tile" *ngFor="let img of images; let i = index" (click)="open(i)" role="button" tabindex="0">
            <img [src]="img.src" [alt]="img.alt" />
            <div class="meta">
              <h3>{{ img.title }}</h3>
              <span class="tag">{{ img.tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="lightbox" *ngIf="isOpen" (click)="close()">
        <button class="lb-close" (click)="close(); $event.stopPropagation()" aria-label="Fechar">✕</button>
        <button class="lb-prev" (click)="prev(); $event.stopPropagation()" aria-label="Anterior">‹</button>
        <div class="lb-inner" (click)="$event.stopPropagation()">
          <img [src]="images[current].src" [alt]="images[current].alt" />
          <div class="lb-caption">{{ images[current].title }} — {{ images[current].tag }}</div>
        </div>
        <button class="lb-next" (click)="next(); $event.stopPropagation()" aria-label="Próximo">›</button>
      </div>
    </section>
  `,
  styles: [`
    .portfolio-head { margin-bottom:1.25rem }
    .portfolio-head h2 { font-family:'Merriweather Sans', sans-serif; color:var(--brand-deep); font-size:2.2rem; margin:0 }
    .portfolio-head p { color:var(--muted); margin:0.35rem 0 0 }

    .gallery { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1rem; margin-top:1.25rem }
    .tile { position:relative; overflow:hidden; border-radius:12px; cursor:pointer; background:var(--bg-off); box-shadow:0 10px 30px rgba(11,6,6,0.06); transition:transform .28s ease, box-shadow .28s ease }
    .tile:hover { transform:translateY(-6px); box-shadow:0 18px 42px rgba(11,6,6,0.12) }
    .tile img { width:100%; height:100%; object-fit:cover; display:block }
    .meta { position:absolute; left:0; bottom:0; right:0; padding:0.8rem 1rem; background:linear-gradient(0deg, rgba(11,6,6,0.6), rgba(11,6,6,0.0)); color:#fff }
    .meta h3 { margin:0; font-size:1rem }
    .meta .tag { font-size:0.8rem; opacity:0.9 }

    /* lightbox */
    .lightbox { position:fixed; inset:0; background:rgba(0,0,0,0.65); display:flex; align-items:center; justify-content:center; z-index:9999 }
    .lb-inner { max-width:1100px; width:90%; max-height:85%; padding:1rem; background:transparent; display:flex; flex-direction:column; align-items:center; box-sizing:border-box }
    .lb-inner img { max-width:100%; max-height:78vh; object-fit:contain; border-radius:8px; box-shadow:0 18px 40px rgba(0,0,0,0.5); display:block; margin:0 auto }
    .lb-caption { color:#fff; margin-top:0.6rem }
    .lb-close, .lb-prev, .lb-next { position:absolute; background:rgba(255,255,255,0.95); border:0; padding:0.6rem 0.9rem; border-radius:8px; cursor:pointer }
    .lb-close { right:20px; top:20px }
    .lb-prev { left:20px; top:50%; transform:translateY(-50%); font-size:22px }
    .lb-next { right:20px; top:50%; transform:translateY(-50%); font-size:22px }

    @media (max-width:900px) {
      .lb-prev, .lb-next { display:none }
      .gallery { gap:0.6rem }
    }

    /* Mobile lightbox fixes: centralizar imagem e evitar distorção */
    @media (max-width:700px) {
      .lightbox { padding: 8px; align-items: center; justify-content: center; overflow:auto }
      .lb-inner { width: calc(100% - 16px); max-width:50%; max-height: calc(100vh - 32px); padding: 8px; display:flex; flex-direction:column; align-items:center; justify-content:center; box-sizing:border-box }
      .lb-inner img { width:100%; height:auto; max-width:100%; max-height: calc(100vh - 120px); box-shadow:none; display:block; margin:0 auto }
      .lb-caption { color:#fff; margin-top:0.45rem; text-align:center; font-size:0.95rem; padding:0 6px }
      .lb-close { right:8px; top:8px }
    }
  `]
})
export class PortfolioComponent {
  images = [
    { src: '/ambiente-clean.webp', alt: 'Ambiente clean', title: 'Ambiente Clean', tag: 'Interiores' },
    { src: '/arquitetura-residencial.jpg', alt: 'Arquitetura residencial', title: 'Residência Contemporânea', tag: 'Residencial' },
    { src: '/espaços-multifuncionais.webp', alt: 'Espaços multifuncionais', title: 'Espaços Multifuncionais', tag: 'Comercial' },
    { src: '/natureza-ambiente-interno.webp', alt: 'Natureza no ambiente', title: 'Natureza Interna', tag: 'Interiores' },
  ];

  isOpen = false;
  current = 0;

  open(i: number) { this.current = i; this.isOpen = true }
  close() { this.isOpen = false }
  prev() { this.current = (this.current - 1 + this.images.length) % this.images.length }
  next() { this.current = (this.current + 1) % this.images.length }
}
