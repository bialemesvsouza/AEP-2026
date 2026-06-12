import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'expo-router';


let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;

if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
}

const BASE_LAT = -23.4205;
const BASE_LNG = -51.9333;


const generateRandomMarkers = (count: number) => {
  const markers = [];
  const nomes = ['EcoPonto Central', 'Associação Solidária', 'Igreja Matriz', 'Centro de Triagem', 'Praça da Juventude'];
  
  for (let i = 0; i < count; i++) {
    markers.push({
      id: i.toString(),
      lat: BASE_LAT + (Math.random() - 0.5) * 0.04,
      lng: BASE_LNG + (Math.random() - 0.5) * 0.04,
      title: nomes[i % nomes.length],
      desc: 'Ponto disponível para doações'
    });
  }
  return markers;
};

export default function Doar() {
  const [pontoColeta, setPontoColeta] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);
  
  const { processarDoacao } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    setMarkers(generateRandomMarkers(5));
  }, []);

  const handleDoacao = async () => {
    if (!pontoColeta || !descricao) {
      Alert.alert("Erro", "Preencha o ponto de coleta e o que vai doar.");
      return;
    }
    
    setLoading(true);
    const resultado = await processarDoacao(pontoColeta, descricao);
    setLoading(false);

    if (resultado) {
      Alert.alert(
        "Rota Gerada! 🚀", 
        `Análise da IA: ${resultado.motivoIA}\nVocê vai ganhar ${resultado.totalPontos} pontos ao entregar!`,
        [{ text: "OK", onPress: () => router.push('/home') }]
      );
      setDescricao('');
      setPontoColeta('');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.htitle}>Nova Doação</Text>
        <Text style={styles.hdesc}>Selecione um ponto e preencha os itens.</Text>
      </View>

      <View style={styles.sec}>
        <Text style={styles.sect}>1. Selecione no Mapa</Text>
        
        {Platform.OS === 'web' ? (
          <View style={styles.mapWrapWeb}>
             <Feather name="map" size={40} color="#52B788" />
             <Text style={styles.mapWebText}>Mapa indisponível na Web.</Text>
             <Text style={styles.mapWebDesc}>Use o Expo Go no celular para ver o mapa interativo.</Text>
          </View>
        ) : (
          <View style={styles.mapWrap}>
            <MapView 
              style={styles.map} 
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: BASE_LAT,
                longitude: BASE_LNG,
                latitudeDelta: 0.06,
                longitudeDelta: 0.06,
              }}
            >
              {markers.map((m) => (
                <Marker 
                  key={m.id}
                  coordinate={{ latitude: m.lat, longitude: m.lng }}
                  title={m.title}
                  description={m.desc}
                  pinColor="#52B788"
                  onPress={() => setPontoColeta(m.title)}
                />
              ))}
            </MapView>
          </View>
        )}

        <Text style={styles.label}>Ponto de Coleta Selecionado</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Toque em um pino no mapa ou digite..." 
          value={pontoColeta} 
          onChangeText={setPontoColeta} 
        />

        <Text style={styles.label}>O que você vai doar?</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 3 casacos de lã, 1 celular antigo..." 
          value={descricao} 
          onChangeText={setDescricao} 
        />

        <TouchableOpacity style={styles.confirmBtn} onPress={handleDoacao} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmText}>Confirmar e Gerar Rota</Text>}
        </TouchableOpacity>
      </View>
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
  mapWrap: { borderRadius: 14, overflow: 'hidden', height: 200, borderWidth: 1, borderColor: '#B7E4C7', marginBottom: 15, elevation: 2 },
  map: { width: '100%', height: '100%' },
  mapWrapWeb: { borderRadius: 14, height: 200, backgroundColor: '#E8F5EE', borderWidth: 1, borderColor: '#B7E4C7', marginBottom: 15, justifyContent: 'center', alignItems: 'center', padding: 20 },
  mapWebText: { color: '#1B4332', fontWeight: 'bold', marginTop: 10 },
  mapWebDesc: { color: '#4A6B5B', fontSize: 11, textAlign: 'center', marginTop: 5 },
  label: { fontSize: 11, fontWeight: 'bold', color: '#1B4332', marginBottom: 6, marginLeft: 4 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 10, fontSize: 12, borderWidth: 1, borderColor: '#D8F3DC', marginBottom: 12 },
  modCard: { backgroundColor: '#E0F5EC', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5 },
  modT: { fontSize: 12, fontWeight: 'bold', color: '#1B4332' },
  modD: { fontSize: 10, color: '#4A6B5B' },
  confirmBtn: { backgroundColor: '#52B788', padding: 12, borderRadius: 10, marginTop: 15, alignItems: 'center' },
  confirmText: { color: '#fff', fontWeight: 'bold', fontSize: 13 }
});