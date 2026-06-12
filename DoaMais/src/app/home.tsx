import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const router = useRouter();
  const [modalAlertas, setModalAlertas] = useState(false);
  const { user, alertasIA } = useAppContext();

  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [loadingClima, setLoadingClima] = useState(true);

  useEffect(() => {
    const fetchClima = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-23.4205&longitude=-51.9333&current_weather=true');
        const data = await res.json();
        setTemperatura(data.current_weather.temperature);
      } catch (error) {
        console.error("Erro ao buscar clima:", error);
        setTemperatura(25); 
      } finally {
        setLoadingClima(false);
      }
    };
    fetchClima();
  }, []);

  const getClimaInfo = () => {
    if (temperatura === null) return null;
    
    if (temperatura >= 25) {
      return {
        tipo: 'Dia quente',
        mensagem: 'A doação dará mais pontos para roupas frescas (camisetas, shorts).',
        icone: 'weather-sunny',
        cor: '#E07A5F',
        bg: '#FDF0ED'
      };
    } else {
      return {
        tipo: 'Dia frio',
        mensagem: 'A doação dará mais pontos para roupas de inverno (casacos, etc).',
        icone: 'weather-snowy',
        cor: '#3D5A80',
        bg: '#E0FBFC'
      };
    }
  };

  const climaInfo = getClimaInfo();

  return (
    <View style={{ flex: 1, backgroundColor: '#F4FBF6' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Bom dia, {user?.nome?.split(' ')[0] || 'Doador'}</Text>
              <Text style={styles.htitle}>DoaMais</Text>
            </View>
            <TouchableOpacity style={styles.notifbtn} onPress={() => setModalAlertas(true)}>
              <View style={styles.ndot} />
              <Feather name="bell" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          {loadingClima ? (
            <ActivityIndicator size="small" color="#52B788" style={{ marginTop: 10 }} />
          ) : climaInfo ? (
            <View style={[styles.climaBadge, { backgroundColor: climaInfo.bg }]}>
              <MaterialCommunityIcons name={climaInfo.icone as any} size={28} color={climaInfo.cor} />
              <View style={{ flex: 1 }}>
                <View style={styles.climaRow}>
                  <Text style={[styles.climaLabel, { color: climaInfo.cor }]}>
                    {temperatura}ºC • Maringá - PR
                  </Text>
                  <Text style={[styles.climaAlert, { color: climaInfo.cor }]}>
                    {climaInfo.tipo}
                  </Text>
                </View>
                <Text style={[styles.climaText, { color: climaInfo.cor }]}>
                  {climaInfo.mensagem}
                </Text>
              </View>
            </View>
          ) : null}

        </View>

        <View style={styles.sec}>
          <View style={styles.sech}>
            <Text style={styles.sect}>Monitoramento das doações</Text>
            <Text style={styles.seca}>Tempo real</Text>
          </View>
          <View style={styles.iotGrid}>
            <View style={[styles.iotCard, { borderColor: '#52B788' }]}>
              <Text style={styles.em}>👕</Text>
              <Text style={styles.iotVal}>{user?.doacoes || 0}</Text>
              <Text style={styles.iotUnit}>Qtd. Geral</Text>
              <View style={[styles.iotDot, { backgroundColor: '#52B788' }]} />
              <Text style={styles.iotLbl}>Doações Feitas</Text>
            </View>
            <View style={[styles.iotCard, { borderColor: '#E8A87C' }]}>
              <Text style={styles.em}>🥫</Text>
              <Text style={styles.iotVal}>{user?.peso_doado || 0}</Text>
              <Text style={styles.iotUnit}>Kg</Text>
              <View style={[styles.iotDot, { backgroundColor: '#E8A87C' }]} />
              <Text style={styles.iotLbl}>Peso Estimado</Text>
            </View>
            <View style={[styles.iotCard, { borderColor: '#52B788' }]}>
              <Text style={styles.em}>👨‍👩‍👧</Text>
              <Text style={styles.iotVal}>{user?.familias_ajudadas || 0}</Text>
              <Text style={styles.iotUnit}>Pessoas</Text>
              <View style={[styles.iotDot, { backgroundColor: '#52B788' }]} />
              <Text style={styles.iotLbl}>Famílias Ajudadas</Text>
            </View>
            <View style={[styles.iotCard, { borderColor: '#40916C' }]}>
              <Text style={styles.em}>♻️</Text>
              <Text style={styles.iotVal}>{user?.pontos || 0}</Text>
              <Text style={styles.iotUnit}>Pontos</Text>
              <View style={[styles.iotDot, { backgroundColor: '#40916C' }]} />
              <Text style={styles.iotLbl}>Saldo Atual</Text>
            </View>
          </View>
        </View>

        <View style={styles.sec}>
          <View style={styles.sech}><Text style={styles.sect}>Ações Rápidas</Text></View>
          <View style={styles.qaRow}>
            <TouchableOpacity style={styles.qa} onPress={() => router.push('/doar')}>
              <View style={[styles.qaIcon, { backgroundColor: '#52B788' }]}><Feather name="plus" size={20} color="#fff" /></View>
              <Text style={styles.qaLbl}>Doar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qa} onPress={() => router.push('/recompensas')}>
              <View style={[styles.qaIcon, { backgroundColor: '#2D6A4F' }]}><Feather name="shopping-cart" size={20} color="#fff" /></View>
              <Text style={styles.qaLbl}>Loja</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qa} onPress={() => router.push('/mapa')}>
              <View style={[styles.qaIcon, { backgroundColor: '#1B4332' }]}><Feather name="map-pin" size={20} color="#fff" /></View>
              <Text style={styles.qaLbl}>Mapa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qa}>
              <View style={[styles.qaIcon, { backgroundColor: '#40916C' }]}><Feather name="bar-chart-2" size={20} color="#fff" /></View>
              <Text style={styles.qaLbl}>Relatório</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.impact}>
          <Text style={styles.impactT}>SEU IMPACTO ESTE MÊS</Text>
          <View style={styles.impactRow}>
            <View style={styles.impactStat}><Text style={styles.impactVal}>{user?.familias_ajudadas || 0}</Text><Text style={styles.impactLbl}>Famílias</Text></View>
            <View style={styles.idiv} />
            <View style={styles.impactStat}><Text style={styles.impactVal}>{user?.peso_doado || 0}kg</Text><Text style={styles.impactLbl}>Doados</Text></View>
            <View style={styles.idiv} />
            <View style={styles.impactStat}><Text style={styles.impactVal}>{user?.pontos || 0}</Text><Text style={styles.impactLbl}>Pontos</Text></View>
          </View>
        </View>
        
        <View style={{height: 30}} />
      </ScrollView>

      <Modal visible={modalAlertas} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notificações Inteligentes</Text>
              <TouchableOpacity onPress={() => setModalAlertas(false)}>
                <Feather name="x" size={24} color="#1B4332" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {alertasIA?.map((alerta: any) => (
                <View key={alerta.id} style={styles.alertCard}>
                  <Feather name="info" size={20} color="#52B788" style={{marginRight: 10}}/>
                  <View style={{flex: 1}}>
                    <Text style={styles.acTitle}>{alerta.titulo}</Text>
                    <Text style={styles.acDesc}>{alerta.desc}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: '#1B4332', padding: 18, paddingTop: 50, paddingBottom: 22 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  greeting: { color: '#B7E4C7', fontSize: 12, fontWeight: '600', marginBottom: 3 },
  htitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  notifbtn: { width: 38, height: 38, backgroundColor: 'rgba(255,255,255,.12)', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  ndot: { position: 'absolute', top: 7, right: 7, width: 7, height: 7, backgroundColor: '#5DDE8C', borderRadius: 4, borderWidth: 1, borderColor: '#1B4332', zIndex: 1 },
  
  climaBadge: { borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, elevation: 2 },
  climaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  climaLabel: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  climaAlert: { fontSize: 10, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  climaText: { fontSize: 11, fontWeight: '500', opacity: 0.9 },

  sec: { paddingHorizontal: 14, paddingTop: 14 },
  sech: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sect: { fontSize: 15, fontWeight: 'bold', color: '#1B4332' },
  seca: { fontSize: 12, fontWeight: 'bold', color: '#52B788' },
  iotGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  iotCard: { width: '48%', backgroundColor: '#fff', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 10, alignItems: 'center', borderWidth: 1.5, elevation: 1, marginBottom: 10 },
  em: { fontSize: 20, marginBottom: 3 },
  iotVal: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', lineHeight: 24 },
  iotUnit: { fontSize: 10, color: '#6B9E82', fontWeight: 'bold', marginBottom: 4 },
  iotDot: { width: 7, height: 7, borderRadius: 3.5, marginBottom: 3 },
  iotLbl: { fontSize: 10, color: '#4A6B5B', fontWeight: 'bold', textAlign: 'center' },
  qaRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  qa: { alignItems: 'center', flex: 1 },
  qaIcon: { width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', elevation: 2, marginBottom: 5 },
  qaLbl: { fontSize: 10, color: '#4A6B5B', fontWeight: 'bold', textAlign: 'center' },
  impact: { margin: 14, backgroundColor: '#2D6A4F', borderRadius: 18, padding: 16 },
  impactT: { color: '#B7E4C7', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 12 },
  impactRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  impactStat: { alignItems: 'center' },
  impactVal: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  impactLbl: { color: '#B7E4C7', fontSize: 10, fontWeight: 'bold', marginTop: 2 },
  idiv: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,.2)' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(27,67,50,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#F4FBF6', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, height: '50%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B4332' },
  alertCard: { backgroundColor: '#fff', padding: 14, borderRadius: 12, flexDirection: 'row', borderLeftWidth: 4, borderLeftColor: '#52B788', marginBottom: 10, elevation: 1 },
  acTitle: { fontSize: 12, fontWeight: 'bold', color: '#1B4332', marginBottom: 4 },
  acDesc: { fontSize: 11, color: '#4A6B5B' }
});