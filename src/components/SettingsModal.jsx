export default function SettingsModal({ closeModal, apiKey, setApiKey }) {
  const saveKey = () => {
    localStorage.setItem('groq_api_key', apiKey);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <button className="modal-close" onClick={closeModal}>&times;</button>
        <h2 style={{ marginBottom: '20px' }}>Configurar API Key</h2>
        <p style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Para usar a inteligência artificial sem custos, vamos utilizar a API da Groq (Llama 3). 
          Gere sua chave gratuita em <b>console.groq.com/keys</b> e cole abaixo.
        </p>
        <div className="form-group">
          <label>Groq API Key</label>
          <input 
            type="password" 
            value={apiKey} 
            onChange={e => setApiKey(e.target.value)}
            placeholder="gsk_..."
          />
        </div>
        <button className="btn-primary" onClick={saveKey} style={{ width: '100%' }}>
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}
