import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';

export const AppContext = createContext<any>(null);

// mudar de acordo com o PC ou celular usado 
const API_URL = "http://192.168.1.7:8000"; 

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [alertasIA, setAlertasIA] = useState([]);
  const [loja, setLoja] = useState([]);

  useEffect(() => {
    fetchUsuarioMock();
    buscarDadosDinamicos();
  }, []);

  const fetchUsuarioMock = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios/1`);
      if (res.ok) setUser(await res.json());
    } catch (e) {
      console.log("Erro ao buscar usuário", e);
    }
  };

  const buscarDadosDinamicos = async () => {
    try {
      const resAlertas = await fetch(`${API_URL}/alertas`);
      const resLoja = await fetch(`${API_URL}/loja`);
      if (resAlertas.ok) setAlertasIA(await resAlertas.json());
      if (resLoja.ok) setLoja(await resLoja.json());
    } catch (e) {
      console.log("Erro ao buscar loja e alertas", e);
    }
  };

  const processarDoacao = async (ponto: string, descricao: string) => {
    if (!user) return null;
    try {
      const res = await fetch(`${API_URL}/doacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: user.id, ponto_coleta: ponto, descricao: descricao })
      });
      const data = await res.json();
      setUser(data.usuario);
      return { totalPontos: data.pontos_ganhos, motivoIA: data.analise_ia };
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar com a API.");
      return null;
    }
  };

  const resgatarRecompensa = async (item_id: number, custo: number, titulo: string) => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/recompensas/resgatar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: user.id, item_id: item_id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);

      setUser(data.usuario); 
      Alert.alert("Sucesso!", data.mensagem);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <AppContext.Provider value={{ user, alertasIA, loja, processarDoacao, resgatarRecompensa }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);