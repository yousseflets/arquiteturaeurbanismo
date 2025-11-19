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
          <h2>Projetos</h2>
          <p>Inspiração em arquitetura e interiores!!</p>
        </div>

        <div class="portfolio-tools">
          <div class="chips">
            <button class="chip" *ngFor="let tag of tags" (click)="selectTag(tag)" [class.active]="selectedTag===tag">{{ tag }}</button>
          </div>
        </div>

        <div class="gallery" [class.single]="filteredImages().length === 1">
          <div class="tile" *ngFor="let img of filteredImages(); let i = index" (click)="open(i)" role="button" tabindex="0">
            <img loading="lazy" [src]="img.src" [alt]="img.alt" />
            <div class="meta">
              <h6>{{ img.title }}</h6>
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
    .portfolio-head { margin-bottom:1.6rem }
    /* fundo suave para a seção de portfólio */
    .page.portfolio { background: linear-gradient(140deg, rgba(123,22,48,0.03), rgba(246,243,241,0.02)); padding: 1rem 0 1rem; border-radius:2px }
    /* margem lateral interna para o portfólio */
    .page.portfolio .container { max-width:1200px; margin:0 auto; padding-left:1.2rem; padding-right:1.2rem }
    .portfolio-head h2 { font-family:'Merriweather Sans', sans-serif; color:var(--brand-deep); font-size:2.6rem; margin:0; letter-spacing:-0.02em }
    .portfolio-head p { color:var(--muted); margin:0.45rem 0 0; font-size:1.05rem }

    .portfolio-tools { display:flex; justify-content:flex-start; margin-top:0.85rem }
    .chips { display:flex; gap:0.6rem; flex-wrap:nowrap; align-items:center }
    .chip { border:0; background:rgba(255,255,255,0.02); padding:0.5rem 0.85rem; border-radius:999px; cursor:pointer; color:var(--muted); font-weight:700; transition:transform .18s ease, box-shadow .18s ease }
    .chip:hover { transform:translateY(-4px); color:var(--brand-deep); box-shadow:0 6px 18px rgba(15,10,10,0.06) }
    .chip.active { background:linear-gradient(90deg, rgba(123,22,48,0.96), rgba(123,22,48,0.86)); color:#fff; box-shadow:0 12px 30px rgba(123,22,48,0.12) }

    .gallery { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1.25rem; margin-top:1.25rem; padding-inline:0.6rem }
    /* garantir que todas as miniaturas tenham o mesmo tamanho visual */
    .tile { position:relative; overflow:hidden; border-radius:16px; cursor:pointer; background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02)); box-shadow:0 10px 30px rgba(15,10,10,0.06); transition:transform .28s cubic-bezier(.2,.9,.2,1), box-shadow .28s ease; aspect-ratio: 3/2; border:1px solid rgba(255,255,255,0.03) }
    .tile:hover { transform:translateY(-6px) scale(1.03); box-shadow:0 30px 70px rgba(15,10,10,0.12) }
    .tile img { width:100%; height:100%; object-fit:cover; object-position:center top; display:block; transition:transform .45s ease }
    .tile:hover img { transform:scale(1.05) }

    /* quando houver apenas 1 item, limitar largura e centralizar para facilitar análise */
    .gallery.single { justify-content: center }
    .gallery.single .tile { width:720px; max-width:100%; aspect-ratio: 16/9 }

    @media (max-width:900px) {
      .gallery.single .tile { width:380px }
    }

    @media (max-width:700px) {
      .gallery.single .tile { width:100%; max-width:100%; aspect-ratio: 16/9 }
    }

    .meta { position:absolute; left:8px; right:8px; bottom:8px; padding:0.6rem 0.6rem; background:linear-gradient(90deg, rgba(123,22,48,0.92), rgba(0,0,0,0.36)); color:#fff; border-radius:12px; display:flex; align-items:center; justify-content:space-between; gap:0.8rem; backdrop-filter: blur(6px); transition: transform .18s ease, opacity .18s ease }
    .tile:hover .meta { transform:translateY(-4px); opacity:0.98 }
    .meta h6 { margin:0; font-size:1.02rem; font-weight:800; line-height:1.05; flex:1 1 auto; min-width:0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; text-overflow:ellipsis; white-space:normal }
    .meta .tag { font-size:0.78rem; opacity:0.95; background:rgba(255,255,255,0.08); padding:0.18rem 0.5rem; border-radius:999px; border:1px solid rgba(255,255,255,0.06); box-shadow:inset 0 -3px 6px rgba(0,0,0,0.12); flex:0 0 auto; margin-left:0.6rem }

    /* lightbox */
    .lightbox { position:fixed; inset:0; background:rgba(6,6,6,0.72); display:flex; align-items:center; justify-content:center; z-index:9999; padding:1rem }
    .lb-inner { max-width:1100px; width:100%; max-height:85%; padding:1rem; background:transparent; display:flex; flex-direction:column; align-items:center; box-sizing:border-box }
    .lb-inner img { max-width:100%; max-height:78vh; object-fit:contain; border-radius:12px; box-shadow:0 40px 90px rgba(0,0,0,0.65); display:block; margin:0 auto }
    .lb-caption { color:#fff; margin-top:0.6rem; font-size:0.95rem }
    .lb-close, .lb-prev, .lb-next { position:absolute; background:rgba(255,255,255,0.95); border:0; padding:0.6rem 0.9rem; border-radius:10px; cursor:pointer; box-shadow:0 10px 30px rgba(0,0,0,0.18) }
    .lb-close { right:20px; top:20px }
    .lb-prev { left:18px; top:50%; transform:translateY(-50%); font-size:22px }
    .lb-next { right:18px; top:50%; transform:translateY(-50%); font-size:22px }

    @media (max-width:1000px) {
      .gallery { grid-template-columns: repeat(2, 1fr); gap:0.9rem }
      .portfolio-head h2 { font-size:2.15rem }
      .tile { aspect-ratio: 4/3 }
    }

    /* Mobile lightbox fixes: centralizar imagem e evitar distorção */
    @media (max-width:700px) {
      .lb-prev, .lb-next { display:none }
      .lightbox { padding: 8px; align-items: center; justify-content: center; overflow:auto }
      .tile { aspect-ratio: 16/9 }
      .lb-inner { width: calc(100% - 16px); max-width:700px; max-height: calc(100vh - 32px); padding: 8px; display:flex; flex-direction:column; align-items:center; justify-content:center; box-sizing:border-box }
      .lb-inner img { width:100%; height:auto; max-width:100%; max-height: calc(100vh - 120px); box-shadow:none; display:block; margin:0 auto }
      .lb-caption { color:#fff; margin-top:0.45rem; text-align:center; font-size:0.95rem; padding:0 6px }
      .lb-close { right:8px; top:8px }
    }

    /* Mobile-specific gallery tweaks */
    @media (max-width:900px) {
      .gallery { grid-template-columns: repeat(2, 1fr); padding-inline:0.6rem }
      .portfolio-tools { margin-bottom:0.6rem }
      .chips { overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:4px }
      .chip { flex:0 0 auto; white-space:nowrap }
      .meta h6 { font-size:0.96rem }
      .meta .tag { font-size:0.72rem; padding:0.18rem 0.45rem }
    }

    @media (max-width:480px) {
      .gallery { grid-template-columns: 1fr; gap:0.9rem; padding-inline:0.8rem; box-sizing:border-box; overflow:hidden }
      .tile { border-radius:12px; aspect-ratio: 16/9; min-height:200px; width:100%; max-width:100vw; box-sizing:border-box; margin:0 auto; overflow:hidden }
      .meta { padding:0.4rem; border-radius:10px }
      .portfolio-head h2 { font-size:1.6rem }
      /* garantir espaço inferior para o footer sem fixá-lo */
      .page.portfolio { padding-bottom:180px }
      /* garantir que a imagem nunca ultrapasse a largura da viewport */
      .tile img { width:100%; height:auto; max-width:100%; object-fit:cover; object-position:center top; display:block }
    }

    @media (max-width:340px) {
      .gallery { grid-template-columns: 1fr }
    }
  `]
})
export class PortfolioComponent {
  selectedTag: string;
  images = [
    { src: '/ambiente-clean.webp', alt: 'Ambiente clean', title: 'Ambiente Clean', tag: 'Interiores' },
    { src: '/arquitetura-contemporanea-residencial.webp', alt: 'Arquitetura residencial', title: 'Residência Contemporânea', tag: 'Residencial' },
    { src: '/espaços-multifuncionais.webp', alt: 'Espaços multifuncionais', title: 'Espaços Multifuncionais', tag: 'Comercial' },
    { src: '/arquitetura_comercial-1.jpg', alt: 'Espaços multifuncionais', title: 'Espaços Multifuncionais', tag: 'Comercial' },
    { src: '/natureza-ambiente-interno.webp', alt: 'Natureza no ambiente', title: 'Natureza Interna', tag: 'Interiores' },
    { src: '/arquitetura-residencial.webp', alt: 'Arquitetura residencial', title: 'Residência Contemporânea', tag: 'Residencial' },
  ];

  get tags() {
    const set = new Set(this.images.map(i => i.tag));
    return Array.from(set);
  }

  constructor() { this.selectedTag = this.images && this.images.length ? this.images[0].tag : '' }

  selectTag(tag: string) { this.selectedTag = tag }

  filteredImages() {
    if (!this.selectedTag) return this.images;
    return this.images.filter(i => i.tag === this.selectedTag);
  }

  isOpen = false;
  current = 0;

  open(i: number) { this.current = i; this.isOpen = true }
  close() { this.isOpen = false }
  prev() { this.current = (this.current - 1 + this.images.length) % this.images.length }
  next() { this.current = (this.current + 1) % this.images.length }
}
