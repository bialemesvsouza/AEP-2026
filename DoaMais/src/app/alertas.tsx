import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Alertas() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alertas</Text>
        <Text style={styles.subtitle}>Atualizações da sua cidade</Text>
      </View>

      <View style={styles.section}>
        <AlertCard title="Novo ponto de coleta seletiva" desc="Av. Brasil, 450 — inauguração amanhã às 9h" time="2 min atrás" icon="trash-2" tag="Resíduos" />
        <AlertCard title="Nova ciclovia liberada" desc="Trecho Centro–Parque Industrial, 3,2km" time="15 min atrás" icon="navigation" tag="Mobilidade" />
        <AlertCard title="Meta de energia atingida" desc="Consumo 18% abaixo do esperado em junho" time="1h atrás" icon="zap" tag="Energia" />
      </View>
    </ScrollView>
  );
}

// Componente para não repetir o mesmo código várias vezes
const AlertCard = ({ title, desc, time, icon, tag }: any) => (
  <View style={styles.alertCard}>
    <Feather name={icon} size={24} color="#52B788" style={styles.acIcon} />
    <View style={styles.acContent}>
      <View style={styles.acTop}>
        <Text style={styles.acTitle}>{title}</Text>
        <View style={styles.acTag}><Text style={styles.acTagText}>{tag}</Text></View>
      </View>
      <Text style={styles.acDesc}>{desc}</Text>
      <Text style={styles.acTime}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FBF6' },
  header: { backgroundColor: '#1B4332', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  subtitle: { color: '#B7E4C7', fontSize: 13, marginTop: 4 },
  section: { paddingHorizontal: 20, paddingTop: 20 },
  alertCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, flexDirection: 'row', marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#52B788', elevation: 2 },
  acIcon: { marginRight: 12, marginTop: 4 },
  acContent: { flex: 1 },
  acTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  acTitle: { fontSize: 14, fontWeight: 'bold', color: '#1B4332', flex: 1 },
  acTag: { backgroundColor: '#D8F3DC', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginLeft: 8 },
  acTagText: { color: '#2D6A4F', fontSize: 10, fontWeight: 'bold' },
  acDesc: { fontSize: 12, color: '#4A6B5B', marginBottom: 4 },
  acTime: { fontSize: 11, color: '#6B9E82', fontWeight: 'bold' }
});