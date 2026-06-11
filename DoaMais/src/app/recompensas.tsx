import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Recompensas() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.htitle}>Loja de Impacto</Text>
          <Text style={styles.hdesc}>Troque seus pontos por cupons.</Text>
        </View>
        <View style={styles.ptsBadge}>
          <Text style={styles.ptsVal}>147</Text>
          <Text style={styles.ptsLbl}>Pts</Text>
        </View>
      </View>

      <View style={styles.sec}>
        <Text style={styles.sect}>Mercado Local</Text>
        <View style={styles.ticketGrid}>
          
          <TouchableOpacity style={styles.ticketCard}>
            <View style={styles.ticketTop}>
              <MaterialCommunityIcons name="food-apple-outline" size={20} color="#1B4332" />
              <View style={styles.ticketCost}><Text style={styles.tcText}>50 pts</Text></View>
            </View>
            <Text style={styles.tTitle}>15% Off Hortifruti</Text>
            <Text style={styles.tDesc}>Válido no Supermercado Central</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ticketCard}>
            <View style={styles.ticketTop}>
              <MaterialCommunityIcons name="bus" size={20} color="#1B4332" />
              <View style={styles.ticketCost}><Text style={styles.tcText}>100 pts</Text></View>
            </View>
            <Text style={styles.tTitle}>Passe Livre Urbano</Text>
            <Text style={styles.tDesc}>2 passagens de ônibus grátis</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ticketCard}>
            <View style={styles.ticketTop}>
              <Feather name="book" size={20} color="#1B4332" />
              <View style={styles.ticketCost}><Text style={styles.tcText}>200 pts</Text></View>
            </View>
            <Text style={styles.tTitle}>30% Off Livraria</Text>
            <Text style={styles.tDesc}>Apoie o comércio local de livros</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ticketCard, { opacity: 0.6 }]}>
            <View style={styles.ticketTop}>
              <Feather name="coffee" size={20} color="#1B4332" />
              <View style={[styles.ticketCost, { backgroundColor: '#ccc' }]}><Text style={styles.tcText}>300 pts</Text></View>
            </View>
            <Text style={styles.tTitle}>Café Artesanal</Text>
            <Text style={styles.tDesc}>Faltam 153 pontos</Text>
          </TouchableOpacity>

        </View>
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
  ticketGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  ticketCard: { width: '48%', backgroundColor: '#fff', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: '#D8F3DC', borderStyle: 'dashed', elevation: 1 },
  ticketTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  ticketCost: { backgroundColor: '#D8F3DC', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  tcText: { color: '#1B4332', fontSize: 10, fontWeight: 'bold' },
  tTitle: { fontSize: 12, fontWeight: 'bold', color: '#1B4332', marginBottom: 4 },
  tDesc: { fontSize: 10, color: '#4A6B5B' }
});