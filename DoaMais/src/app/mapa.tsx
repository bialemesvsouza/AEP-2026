import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Mapa() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Mapa Urbano</Text>
          <TouchableOpacity style={styles.notifBtn}>
            <Feather name="sliders" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Pontos sustentáveis próximos a você</Text>
      </View>

      <View style={styles.mapWrap}>
        <View style={styles.mapBg}>
          <View style={styles.userPin}>
            <Feather name="map-pin" size={32} color="#1B4332" />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legenda</Text>
        <View style={styles.legendRow}>
          <View style={styles.legItem}><Feather name="package" size={16} color="#1B4332" /><Text style={styles.legLabel}>Ponto de Coleta</Text></View>
          <View style={styles.legItem}><Feather name="wind" size={16} color="#1B4332" /><Text style={styles.legLabel}>Área Verde</Text></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FBF6' },
  header: { backgroundColor: '#1B4332', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  subtitle: { color: '#B7E4C7', fontSize: 13, marginTop: 4 },
  notifBtn: { width: 42, height: 42, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  mapWrap: { margin: 20, borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: '#B7E4C7', elevation: 4 },
  mapBg: { height: 250, backgroundColor: '#E8F5EE', justifyContent: 'center', alignItems: 'center' },
  userPin: { backgroundColor: '#fff', borderRadius: 20, padding: 8, elevation: 5 },
  section: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1B4332', marginBottom: 12 },
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  legItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 10, elevation: 1, gap: 8 },
  legLabel: { fontSize: 12, color: '#1B4332', fontWeight: 'bold' },
});