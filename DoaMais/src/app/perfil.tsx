import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Perfil() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}><Text style={styles.avatarText}>LM</Text></View>
        <Text style={styles.profName}>Lucas Martins</Text>
        <Text style={styles.profRole}>Cidadão Sustentável · Nível Verde</Text>
        <View style={styles.profBadge}><Text style={styles.badgeText}>🌿 Guardião da Cidade</Text></View>
      </View>

      <View style={styles.pstats}>
        <View style={styles.pstat}><Text style={styles.pstatV}>147</Text><Text style={styles.pstatL}>Pontos</Text></View>
        <View style={styles.idiv} />
        <View style={styles.pstat}><Text style={styles.pstatV}>23</Text><Text style={styles.pstatL}>Doações</Text></View>
        <View style={styles.idiv} />
        <View style={styles.pstat}><Text style={styles.pstatV}>12</Text><Text style={styles.pstatL}>Semanas</Text></View>
      </View>

      <View style={styles.sec}>
        <Text style={styles.sect}>Progresso Mensal</Text>
        <View style={styles.progRow}>
          <View style={styles.progTop}><Text style={styles.progLbl}>Roupas Inverno</Text><Text style={styles.progPct}>78%</Text></View>
          <View style={styles.progTrack}><View style={[styles.progFill, {width: '78%'}]} /></View>
        </View>
        <View style={styles.progRow}>
          <View style={styles.progTop}><Text style={styles.progLbl}>Alimentos</Text><Text style={styles.progPct}>92%</Text></View>
          <View style={styles.progTrack}><View style={[styles.progFill, {width: '92%'}]} /></View>
        </View>
      </View>

      <View style={styles.sec}>
        <Text style={styles.sect}>Menu</Text>      
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/historico')}>
          <Feather name="clipboard" size={16} color="#1B4332" style={styles.miIcon} />
          <Text style={styles.miLabel}>Meu Histórico</Text>
          <Feather name="chevron-right" size={16} color="#6B9E82" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/conquistas')}>
          <Feather name="award" size={16} color="#1B4332" style={styles.miIcon} />
          <Text style={styles.miLabel}>Conquistas</Text>
          <Feather name="chevron-right" size={16} color="#6B9E82" />
        </TouchableOpacity>
      </View>
      <View style={{height: 20}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FBF6' },
  header: { backgroundColor: '#1B4332', paddingBottom: 30, paddingTop: 50, alignItems: 'center' },
  avatar: { width: 60, height: 60, backgroundColor: '#52B788', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  profName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  profRole: { color: '#B7E4C7', fontSize: 12, marginBottom: 10 },
  profBadge: { backgroundColor: 'rgba(255,255,255,.15)', paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,.2)' },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  pstats: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 14, borderRadius: 14, padding: 14, justifyContent: 'space-around', alignItems: 'center', marginTop: -15, elevation: 3 },
  pstat: { alignItems: 'center' },
  pstatV: { fontSize: 20, fontWeight: 'bold', color: '#1B4332' },
  pstatL: { fontSize: 10, color: '#6B9E82', fontWeight: 'bold' },
  idiv: { width: 1, height: 30, backgroundColor: 'rgba(27,67,50,.15)' },
  sec: { paddingHorizontal: 14, paddingTop: 18 },
  sect: { fontSize: 15, fontWeight: 'bold', color: '#1B4332', marginBottom: 12 },
  progRow: { marginBottom: 12 },
  progTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progLbl: { fontSize: 11, color: '#1B4332', fontWeight: 'bold' },
  progPct: { fontSize: 11, color: '#52B788', fontWeight: 'bold' },
  progTrack: { height: 6, backgroundColor: '#D8F3DC', borderRadius: 4 },
  progFill: { height: '100%', backgroundColor: '#52B788', borderRadius: 4 },
  menuItem: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 8, elevation: 1 },
  miIcon: { width: 26 },
  miLabel: { flex: 1, fontSize: 12, color: '#1B4332', fontWeight: 'bold' }
});