export default function SettingsModal({ closeModal, apiKey, setApiKey }) {
  const saveKey = () => {
    localStorage.setItem('openai_api_key', apiKey);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <button className="modal-close" onClick={closeModal}>&times;</button>
        <h2 style={{ marginBottom: '20px' }}>Configurar API Key</h2>
        <p style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Para que o sistema gratuito e sem backend funcione, você precisa fornecer sua própria chave da OpenAI (começa com sk-proj...). 
          Ela ficará salva apenas no seu navegador localmente, de forma segura.
        </p>
        <div className="form-group">
          <label>OpenAI API Key</label>
          <input 
            type="password" 
            value={apiKey} 
            onChange={e => setApiKey(e.target.value)}
            placeholder="sk-proj-..."
          />
        </div>
        <button className="btn-primary" onClick={saveKey} style={{ width: '100%' }}>
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}
