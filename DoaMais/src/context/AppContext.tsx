import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';

export const AppContext = createContext<any>(null);

// mudar de acordo com o PC ou celular usado 
const API_URL = "http://192.168.1.7:8000"; 

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    id: 1,
    nome: 'Carregando...',
    email: '',
    pontos: 0,
    doacoes: 0,
    peso_doado: 0,
    familias_ajudadas: 0
  });

  const [alertasIA, setAlertasIA] = useState([
    { id: 1, titulo: 'Frio Extremo', desc: 'A IA detectou queda na temperatura. Roupas de frio valem 2x pontos.' },
    { id: 2, titulo: 'Baixo Estoque', desc: 'Alimentos não perecíveis estão em falta. Doações valem 1.5x pontos.' }
  ]);


  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios/1`);
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log("Erro ao buscar usuário da API:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const processarDoacao = async (ponto: string, descricao: string) => {
    try {
      const res = await fetch(`${API_URL}/doacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: 1, ponto_coleta: ponto, descricao: descricao })
      });
      const data = await res.json();
      
      setUser(data.usuario);
      return { totalPontos: data.pontos_ganhos, motivoIA: data.analise_ia };
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar com a API Python.");
      return null;
    }
  };

  const resgatarRecompensa = async (custo: number, titulo: string) => {
    try {
      const res = await fetch(`${API_URL}/recompensas/resgatar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: 1, custo: custo, recompensa: titulo })
      });
      
      if (!res.ok) {
        Alert.alert("Saldo Insuficiente", `Você precisa de mais ${custo - user.pontos} pontos.`);
        return;
      }

      const data = await res.json();
      setUser(data.usuario); 
      Alert.alert("Sucesso!", data.mensagem);
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar com a API.");
    }
  };

  return (
    <AppContext.Provider value={{ user, fetchUser, alertasIA, processarDoacao, resgatarRecompensa }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);