import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';

export default function Recompensas() {
  const { user, resgatarRecompensa, loja } = useAppContext();


  const IconeDinamico = ({ tipo, nome }: { tipo: string, nome: any }) => {
    if (tipo === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={nome} size={20} color="#1B4332" />;
    }
    return <Feather name={nome} size={20} color="#1B4332" />;
  };


  const renderCard = (item: any) => {
    if (!user) return null;

    const saldoSuficiente = user.pontos >= item.custo_pontos;
    const pontosFaltantes = item.custo_pontos - user.pontos;

    return (
      <TouchableOpacity 
        key={item.id}
        style={[styles.ticketCard, { opacity: saldoSuficiente ? 1 : 0.6 }]} 
        disabled={!saldoSuficiente} 
        onPress={() => resgatarRecompensa(item.id, item.custo_pontos, item.nome)}
      >
        <View style={styles.ticketTop}>
          <IconeDinamico tipo={item.tipo_icone} nome={item.icone} />
          
          <View style={[styles.ticketCost, { backgroundColor: saldoSuficiente ? '#D8F3DC' : '#ccc' }]}>
            <Text style={styles.tcText}>{item.custo_pontos} pts</Text>
          </View>
        </View>
        <Text style={styles.tTitle}>{item.nome}</Text>
        <Text style={styles.tDesc}>
          {saldoSuficiente ? item.descricao : `Faltam ${pontosFaltantes} pontos`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.htitle}>Loja de Impacto</Text>
          <Text style={styles.hdesc}>Troque seus pontos por cupons.</Text>
        </View>
        <View style={styles.ptsBadge}>
          <Text style={styles.ptsVal}>{user ? user.pontos : 0}</Text>
          <Text style={styles.ptsLbl}>Pts</Text>
        </View>
      </View>

      <View style={styles.sec}>
        <Text style={styles.sect}>Mercado Local</Text>
        
        {!loja || loja.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#52B788" />
            <Text style={styles.loadingText}>Carregando prateleiras...</Text>
          </View>
        ) : (
          <View style={styles.ticketGrid}>
            {loja.map((item: any) => renderCard(item))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FBF6' },
  header: { backgroundColor: '#1B4332', padding: 18, paddingTop: 50, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  htitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  hdesc: { color: '#B7E4C7', fontSize: 12, marginTop: 4 },
  ptsBadge: { backgroundColor: '#52B788', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center', elevation: 2 },
  ptsVal: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  ptsLbl: { color: '#1B4332', fontSize: 10, fontWeight: 'bold' },
  sec: { padding: 14 },
  sect: { fontSize: 15, fontWeight: 'bold', color: '#1B4332', marginBottom: 12 },
  loadingContainer: { marginTop: 40, alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#6B9E82', fontWeight: 'bold' },
  ticketGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  ticketCard: { width: '48%', backgroundColor: '#fff', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: '#D8F3DC', borderStyle: 'dashed', elevation: 1 },
  ticketTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  ticketCost: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  tcText: { color: '#1B4332', fontSize: 10, fontWeight: 'bold' },
  tTitle: { fontSize: 12, fontWeight: 'bold', color: '#1B4332', marginBottom: 4 },
  tDesc: { fontSize: 10, color: '#4A6B5B' }
});