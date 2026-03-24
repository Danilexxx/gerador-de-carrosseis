import { useState, useEffect } from 'react';
import './index.css';
import SettingsModal from './components/SettingsModal';
import CarouselForm from './components/CarouselForm';
import CarouselPreview from './components/CarouselPreview';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [generatedCarousel, setGeneratedCarousel] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('groq_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Carrossel.AI</h1>
        <button className="btn-outline" onClick={() => setIsSettingsOpen(true)}>
          ⚙️ Configurações (API Key)
        </button>
      </header>

      <main className="main-content">
        <section className="left-panel">
          <CarouselForm 
            apiKey={apiKey}
            setGeneratedCarousel={setGeneratedCarousel}
            setIsGenerating={setIsGenerating}
            isGenerating={isGenerating}
            openSettings={() => setIsSettingsOpen(true)}
          />
        </section>

        <section className="right-panel">
          <CarouselPreview 
            carousel={generatedCarousel} 
            isGenerating={isGenerating} 
          />
        </section>
      </main>

      {isSettingsOpen && (
        <SettingsModal 
          closeModal={() => setIsSettingsOpen(false)}
          apiKey={apiKey}
          setApiKey={setApiKey}
        />
      )}
    </div>
  );
}

export default App;
