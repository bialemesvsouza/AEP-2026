import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext } from '../context/AppContext';

type ItemHistorico = {
  id: number;
  tipo: 'doacao' | 'resgate';
  titulo: string;
  pontos: string;
  data: string;
};

export default function Historico() {
  const router = useRouter();
  const { user } = useAppContext();
  const [historico, setHistorico] = useState<ItemHistorico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarHistorico() {
      try {
        // Conecta na rota dinâmica criada no banco SQLite usando o IP do projeto
        const res = await fetch(`http://192.168.1.7:8000/usuarios/${user.id}/historico`);
        const data = await res.json();
        setHistorico(data);
      } catch (error) {
        console.log("Erro ao buscar histórico do banco:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarHistorico();
  }, [user.id, user.pontos]); // Recarrega se o saldo mudar (indica nova transação)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Redirecionamento forçado para a aba /perfil consertando o bug do Voltar */}
        <TouchableOpacity onPress={() => router.push('/perfil')} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Meu Histórico</Text>
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#52B788" /></View>
      ) : (
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {historico.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma atividade registrada ainda. 🌱</Text>
          ) : (
            historico.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={[styles.iconBox, { backgroundColor: item.tipo === 'doacao' ? '#D8F3DC' : '#FFE5D9' }]}>
                  <Feather 
                    name={item.tipo === 'doacao' ? 'heart' : 'shopping-bag'} 
                    size={20} 
                    color={item.tipo === 'doacao' ? '#2D6A4F' : '#D62828'} 
                  />
                </View>
                <View style={styles.content}>
                  <Text style={styles.itemTitle}>{item.titulo}</Text>
                  <Text style={styles.itemDate}>{item.data}</Text>
                </View>
                <Text style={[styles.points, { color: item.tipo === 'doacao' ? '#52B788' : '#D62828' }]}>
                  {item.pontos} pts
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FBF6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#1B4332', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 15 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  list: { padding: 20 },
  emptyText: { textAlign: 'center', color: '#6B9E82', marginTop: 40, fontSize: 14, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 12, elevation: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  content: { flex: 1 },
  itemTitle: { fontSize: 14, fontWeight: 'bold', color: '#1B4332', textTransform: 'capitalize' },
  itemDate: { fontSize: 12, color: '#6B9E82', marginTop: 2 },
  points: { fontSize: 16, fontWeight: 'bold' },
});