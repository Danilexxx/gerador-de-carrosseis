export default function CarouselPreview({ carousel, isGenerating }) {
  if (isGenerating) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loader" style={{ width: '40px', height: '40px', borderTopColor: 'var(--primary-color)', marginBottom: '20px' }}></div>
        <p style={{ color: 'var(--text-secondary)' }}>A Inteligência Artificial está roteirizando o seu carrossel...</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '10px' }}>Isso pode levar de 10 a 30 segundos.</p>
      </div>
    );
  }

  if (!carousel) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '4rem', opacity: 0.2, marginBottom: '20px' }}>📑</div>
        <h3 style={{ marginBottom: '10px' }}>Nenhum Carrossel Gerado</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Preencha o formulário e clique em Gerar para ver o resultado do roteiro do carrossel aqui.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '25px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontSize: '1.4rem' }}>{carousel.titulo}</h2>
        {carousel.legenda && (
          <div style={{ marginTop: '15px' }}>
            <strong style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sugestão de Legenda:</strong>
            <p style={{ fontSize: '0.95rem', whiteSpace: 'pre-wrap', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{carousel.legenda}</p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {carousel.slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <span className="slide-number">{index + 1} / {carousel.slides.length}</span>
            <div className="slide-content">
              {slide.titulo && <h2 style={{ fontSize: slide.titulo.length > 50 ? '1.4rem' : '1.8rem' }}>{slide.titulo}</h2>}
              {slide.texto && <p style={{ whiteSpace: 'pre-wrap', fontSize: '1.05rem' }}>{slide.texto}</p>}
            </div>
            {slide.notaAdicional && (
              <div style={{ position: 'absolute', bottom: '15px', width: '85%', fontSize: '0.8rem', color: '#818cf8', background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: '6px', textAlign: 'center' }}>
                💡 {slide.notaAdicional}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
