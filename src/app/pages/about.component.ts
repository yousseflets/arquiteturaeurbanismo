import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-about',
  template: `
    <section class="page about">
      <div class="container about-grid">
        <div class="about-info">
          <h2>Quem sou eu?</h2>
          <br />
          <div class="info-cards">
            <div class="card"><strong>Mogiana</strong><span> 36 anos</span></div>
            <div class="card"><strong>Formada</strong><span>Arquitetura e Urbanismo</span></div>
            <div class="card"><strong>Designer</strong><span>Design de Interiores</span></div>
            <div class="card"><strong>Perfil</strong><span>Empresária • Comunicativa</span></div>
            <div class="card"><strong>Família</strong><span>Mãe de dois meninos</span></div>
            <div class="card"><strong>Hobby</strong><span>Artesanato e artes</span></div>
          </div>
          <p class="about-text">Desenvolvo projetos residenciais e comerciais que destacam o uso de 
            materiais naturais, a qualidade da iluminação e a ergonomia. Busco soluções elegantes e 
            funcionais, sempre com atenção aos detalhes e à experiência do usuário em cada ambiente.</p>
          <div class="about-actions">
            <a class="btn-cta" href="https://api.whatsapp.com/send?phone=5511989273898&text=Ol%C3%A1%20vim%20atrav%C3%A9s%20do%20seu%20site%2C%20gostaria%20de%20realizar%20um%20or%C3%A7amento" target="_blank" rel="noopener noreferrer">Realizar Orçamento</a>
          </div>
        </div>
        <div class="about-photo" aria-hidden="true">
          <img src="/img-home-page.png" alt="Thaís Roza" />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about { margin:2rem; padding:3.5rem 0; position:relative; overflow:visible }
    /* panel decorative on the right, slightly reduced width for better composition */
    .about::after { content:''; position:absolute; right:-2%; top:-3rem; width:44%; height:calc(100% + 6rem); background:var(--brand-deep); border-top-left-radius:220px; border-bottom-left-radius:220px; z-index:0 }

    .about-grid { position:relative; z-index:1; display:grid; grid-template-columns:1fr 420px; gap:1.0rem; align-items:center }
    .about-info { padding:1rem 0;  display:flex; flex-direction:column; justify-content:center }
    .about-info h2 { font-family:'Merriweather Sans',sans-serif; color:var(--text-dark); font-size:2.6rem; margin:0 0 0.5rem }
    .eyebrow { color:var(--muted); font-weight:600; margin-bottom:1rem }

    .info-cards { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:0.45rem; margin-bottom:0.8rem }
    .card { background:#fff; padding:0.45rem 0.70rem; border-radius:10px; box-shadow:0 6px 18px rgba(11,6,6,0.06); display:flex; justify-content:space-between; align-items:center; font-weight:600; opacity:0; transform:translateY(8px); animation:fadeUp .56s ease forwards }
    .card:nth-child(1){ animation-delay:0.05s } .card:nth-child(2){ animation-delay:0.12s }
    .card:nth-child(3){ animation-delay:0.18s } .card:nth-child(4){ animation-delay:0.24s }
    .card:nth-child(5){ animation-delay:0.30s } .card:nth-child(6){ animation-delay:0.36s }

    @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
    .card span { color:var(--muted); font-weight:500 }

    .about-text { color:var(--text-dark); margin-top:0.9rem; max-width:85%; font-size:1.05rem; line-height:1.7; background:#fff; padding:1rem 1.1rem; border-radius:10px; box-shadow:0 18px 40px rgba(11,6,6,0.06); border-left:6px solid var(--brand-warm); animation:textIn .5s ease both }

    @keyframes textIn { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:none } }

    .about-actions { margin-top:0.9rem; display:flex; gap:0.5rem }
    .btn-cta { background:var(--brand-deep); color:#fff; padding:0.55rem 0.9rem; border-radius:10px; text-decoration:none; font-weight:700 }
    .btn-muted { background:transparent; color:var(--brand-deep); padding:0.45rem 0.8rem; border-radius:10px; border:1px solid rgba(11,6,6,0.06); text-decoration:none }

    .about-photo { position:relative; border-radius:18px; overflow:hidden; display:flex; align-items:center; justify-content:center; padding:0; transform:translateX(-12%); box-shadow:0 30px 80px rgba(123,22,48,0.12); }
    .about-photo img { width:100%; height:100%; max-width:650px; max-height:650px; object-fit:cover; object-position:50% 28%; display:block }

    @media (max-width:1100px) {
      .about-grid { grid-template-columns:1fr 320px }
      .about-text { max-width:100% }
    }

    /* Mobile: empilha colunas, esconde o painel decorativo e torna a imagem fluida */
    @media (max-width:900px) {
      .about { margin:1rem; padding:1.5rem 0 }
      .about::after { display:none }
      .about-grid { grid-template-columns:1fr; gap:1rem }
      .about-photo { position:static; order:-1; width:100%; height:320px; transform:none; box-shadow:0 12px 30px rgba(0,0,0,0.06); border-radius:10px }
      .about-photo img { width:100%; height:100%; object-fit:cover; object-position:50% 35% }
      .about-info h2 { font-size:1.6rem }
      .info-cards { grid-template-columns:repeat(1,1fr) }
      .about-text { max-width:100%; padding:0.9rem; font-size:1rem; line-height:1.6 }
      .card { padding:0.5rem 0.6rem; font-size:0.95rem }
    }
  `]
})
export class AboutComponent {}
