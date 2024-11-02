import axios from 'axios';
import { useEffect, useState } from 'react';

type props = {
  isActive: boolean;
  onComplete: () => void;
  key: number;
};

export function ProgressBar({ isActive, onComplete, key }: props) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setConcluido(true);
    } else if (progress === 0) {
      setIsVisible(false);
    }
  }, [progress]);

  useEffect(() => {
    if (concluido) {
      // Oculta a mensagem após 5 segundos, se necessário
      const timer = setTimeout(() => {
        setConcluido(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [concluido]);

  useEffect(() => {
    // Reseta o estado quando isActive muda para true (início de uma nova consulta)
    if (isActive) {
      setProgress(0);
      setMensagem('');
      setIsVisible(true);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('http://localhost:3008/progresso');
        const { total, pagina } = response.data;

        if (total > 0) {
          const progressPercentage = (pagina / total) * 100;
          setProgress(progressPercentage);
          setIsVisible(true);
          
          if (progressPercentage >= 100) {
            clearInterval(interval);
            setMensagem('Cotação Concluída');  
            onComplete();           
          }
        } else {
          setProgress(0); // Reseta o progresso caso total seja 0
          setIsVisible(false);
        }
      } catch (error) {
        console.error('Erro ao buscar progresso:', error);
        setProgress(0); // Em caso de erro, reseta o progresso
        clearInterval(interval);
        setIsVisible(false);
      }
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [isActive, onComplete]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {isVisible && (
        <div style={{ width: '100%', height: '30px', backgroundColor: '#059669', borderRadius: '5px' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#0eeba5',
              transition: 'width 0.5s ease',
            }}
          >
            <span style={{ padding: '5px', color: '#DC2626', fontWeight: 'bold' }}>
              {Math.round(progress)}% 
            </span>
          </div>
        </div>
      )}
      
      {concluido && (
        <div style={{
          marginTop: '10px',
          color: '#0eeba5',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '16px'
        }}>
          {mensagem || 'Processo concluído com sucesso!'}
        </div>
      )}
    </div>
  );
}
