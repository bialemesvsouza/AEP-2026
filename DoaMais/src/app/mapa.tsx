import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';

let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;

if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
}

export default function Mapa() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  const pontosColeta = [
    { id: 1, lat: -23.4273, lng: -51.9375, titulo: 'EcoPonto Centro', desc: 'Roupas e Alimentos' },
    { id: 2, lat: -23.4150, lng: -51.9450, titulo: 'Parque Sustentável', desc: 'Recicláveis' },
  ];

  useEffect(() => {
    if (Platform.OS === 'web') {
      setLoading(false);
      return;
    }

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 30 }]}>
        <Feather name="map" size={60} color="#52B788" style={{ marginBottom: 20 }} />
        <Text style={[styles.title, { textAlign: 'center', color: '#1B4332' }]}>Mapa Indisponível na Web</Text>
        <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 10 }]}>
          O mapa interativo utiliza recursos nativos do celular (GPS e Google Maps).
        </Text>
        <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 10 }]}>
          Para testar essa funcionalidade, baixe o aplicativo Expo Go no seu smartphone e escaneie o QR Code! 📱✨
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mapa Urbano</Text>
        <Text style={styles.subtitle}>Pontos sustentáveis próximos a você</Text>
      </View>

      <View style={styles.mapWrap}>
        {loading ? (
          <ActivityIndicator size="large" color="#1B4332" />
        ) : (
          <MapView 
            style={styles.map} 
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location ? location.coords.latitude : -23.4205,
              longitude: location ? location.coords.longitude : -51.9333,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
          >
            {pontosColeta.map((ponto) => (
              <Marker 
                key={ponto.id}
                coordinate={{ latitude: ponto.lat, longitude: ponto.lng }}
                title={ponto.titulo}
                description={ponto.desc}
                pinColor="#1B4332"
              />
            ))}
          </MapView>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legenda</Text>
        <View style={styles.legendRow}>
          <View style={styles.legItem}><Feather name="package" size={16} color="#1B4332" /><Text style={styles.legLabel}>Ponto de Coleta</Text></View>
          <View style={styles.legItem}><Feather name="user" size={16} color="#007AFF" /><Text style={styles.legLabel}>Sua Posição</Text></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FBF6' },
  header: { backgroundColor: '#1B4332', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  subtitle: { color: '#B7E4C7', fontSize: 13, marginTop: 4 },
  mapWrap: { margin: 20, borderRadius: 18, overflow: 'hidden', height: 400, borderWidth: 1, borderColor: '#B7E4C7', elevation: 4, justifyContent: 'center' },
  map: { width: '100%', height: '100%' },
  section: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1B4332', marginBottom: 12 },
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  legItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 10, elevation: 1, gap: 8 },
  legLabel: { fontSize: 12, color: '#1B4332', fontWeight: 'bold' },
});