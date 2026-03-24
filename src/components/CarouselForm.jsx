import { useState, useEffect } from 'react';
import { gerarCarrossel } from '../services/ai';

export default function CarouselForm({ apiKey, setGeneratedCarousel, isGenerating, setIsGenerating, openSettings }) {
  const [pageName, setPageName] = useState('');
  const [niche, setNiche] = useState('');
  const [theme, setTheme] = useState('');
  const [reference, setReference] = useState('');
  const [referenceImage, setReferenceImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            if (file.size > 4 * 1024 * 1024) {
              setError('A imagem colada é muito grande (máximo 4MB).');
              return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
              setReferenceImage(reader.result);
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError('A imagem é muito grande. Escolha uma imagem de até 4MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setReferenceImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!apiKey) {
      openSettings();
      return;
    }

    if (!pageName || !niche || !theme) {
      setError('Por favor, preencha o Nome da Página, Nicho e Tema.');
      return;
    }

    setIsGenerating(true);
    try {
      const resultado = await gerarCarrossel({
        apiKey,
        pageName,
        niche,
        theme,
        reference,
        referenceImage
      });
      setGeneratedCarousel(resultado);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao gerar carrossel. Verifique sua chave da API.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '30px' }}>
      <h2 style={{ marginBottom: '20px' }}>Criar Novo Carrossel</h2>
      {error && <div style={{ color: '#ef4444', marginBottom: '15px', fontSize: '0.9rem', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome da Página</label>
          <input value={pageName} onChange={e => setPageName(e.target.value)} placeholder="Ex: @minhapagina" />
        </div>
        
        <div className="form-group">
          <label>Nicho / Assunto</label>
          <input value={niche} onChange={e => setNiche(e.target.value)} placeholder="Ex: Marketing Digital, Nutrição, Finanças" />
        </div>
        
        <div className="form-group">
          <label>Tema do Carrossel</label>
          <input value={theme} onChange={e => setTheme(e.target.value)} placeholder="Ex: 5 erros ao investir em Renda Fixa" />
        </div>
        
        <div className="form-group">
          <label>Modelo de Referência (Opcional)</label>
          <textarea 
            value={reference} 
            onChange={e => setReference(e.target.value)} 
            rows="4"
            placeholder="Cole aqui a estrutura ou os textos de um carrossel base para a IA seguir o estilo..."
          />
        </div>

        <div className="form-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
          <label>Imagem de Referência Visual (Opcional)</label>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Aperte <strong>CTRL+V</strong> em qualquer lugar desta tela para colar a imagem diretamente, ou selecione o arquivo:
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            style={{ background: 'transparent', border: 'none', padding: '5px 0' }}
          />
          {referenceImage && (
            <div style={{ marginTop: '15px', position: 'relative', display: 'inline-block' }}>
              <img src={referenceImage} alt="Reference Preview" style={{ maxHeight: '120px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
              <button 
                type="button" 
                onClick={() => setReferenceImage(null)} 
                style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={isGenerating}>
          {isGenerating ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span className="loader" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
              Gerando com IA...
            </span>
          ) : 'Gerar Roteiro do Carrossel ✨'}
        </button>
      </form>
    </div>
  );
}
