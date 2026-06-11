import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Doar() {
  const [pontoColeta, setPontoColeta] = useState('');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.htitle}>Nova Doação</Text>
        <Text style={styles.hdesc}>Selecione um ponto e preencha os itens.</Text>
      </View>

      <View style={styles.sec}>
        <Text style={styles.sect}>1. Selecione no Mapa</Text>
        <View style={styles.mapWrap}>
          <View style={styles.mapBg}>
            <View style={styles.mapGridOverlay} />
            {/* Pinos do Mapa Simulado */}
            <TouchableOpacity style={[styles.mapPin, { top: '30%', left: '20%' }]} onPress={() => setPontoColeta('Igreja Matriz - Centro')}>
              <View style={styles.mapBubble}><Feather name="home" size={14} color="#1B4332" /></View>
              <Text style={styles.mapLbl}>Centro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mapPin, { top: '60%', left: '70%' }]} onPress={() => setPontoColeta('EcoPonto - Zona Sul')}>
              <View style={styles.mapBubble}><Feather name="package" size={14} color="#1B4332" /></View>
              <Text style={styles.mapLbl}>Zona Sul</Text>
            </TouchableOpacity>
            <View style={styles.userPin}><Feather name="map-pin" size={24} color="#52B788" /></View>
          </View>
        </View>

        <Text style={styles.label}>Ponto de Coleta Selecionado</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Toque em um pino no mapa acima" 
          value={pontoColeta}
          onChangeText={setPontoColeta}
        />

        <Text style={styles.label}>O que você vai doar?</Text>
        <TextInput style={styles.input} placeholder="Ex: 3 casacos de lã" />

        <TouchableOpacity style={styles.modCard}>
          <MaterialCommunityIcons name="brain" size={24} color="#2D6A4F" />
          <View style={{flex: 1}}>
            <Text style={styles.modT}>Análise Inteligente</Text>
            <Text style={styles.modD}>A IA irá calcular seus pontos baseados na demanda local.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Confirmar e Gerar Rota</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 20}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FBF6' },
  header: { backgroundColor: '#1B4332', padding: 18, paddingTop: 50, paddingBottom: 20 },
  htitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  hdesc: { color: '#B7E4C7', fontSize: 12, marginTop: 4 },
  sec: { padding: 14 },
  sect: { fontSize: 14, fontWeight: 'bold', color: '#1B4332', marginBottom: 10 },
  mapWrap: { borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: '#B7E4C7', marginBottom: 15 },
  mapBg: { height: 160, backgroundColor: '#E8F5EE', position: 'relative' },
  mapGridOverlay: { position: 'absolute', width: '100%', height: '100%', opacity: 0.2, borderStyle: 'dashed', borderWidth: 1, borderColor: '#52B788' },
  mapPin: { position: 'absolute', alignItems: 'center' },
  mapBubble: { backgroundColor: '#fff', borderRadius: 8, width: 28, height: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#52B788', elevation: 2 },
  mapLbl: { fontSize: 9, backgroundColor: '#1B4332', color: '#fff', paddingHorizontal: 4, borderRadius: 4, marginTop: 2, fontWeight: 'bold' },
  userPin: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -12 }, { translateY: -12 }] },
  label: { fontSize: 11, fontWeight: 'bold', color: '#1B4332', marginBottom: 6, marginLeft: 4 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 10, fontSize: 12, borderWidth: 1, borderColor: '#D8F3DC', marginBottom: 12 },
  modCard: { backgroundColor: '#E0F5EC', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5 },
  modT: { fontSize: 12, fontWeight: 'bold', color: '#1B4332' },
  modD: { fontSize: 10, color: '#4A6B5B' },
  confirmBtn: { backgroundColor: '#52B788', padding: 12, borderRadius: 10, marginTop: 15, alignItems: 'center' },
  confirmText: { color: '#fff', fontWeight: 'bold', fontSize: 13 }
});