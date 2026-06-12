import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext } from '../context/AppContext';

export default function Conquistas() {
  const router = useRouter();
  const { user } = useAppContext();

  const conquistas = [
    { id: 1, titulo: 'Primeiro Passo', desc: 'Faça a sua primeira doação.', icon: 'star', alcancada: user.doacoes >= 1 },
    { id: 2, titulo: 'Coração Generoso', desc: 'Acumule 5 doações no total.', icon: 'heart', alcancada: user.doacoes >= 5 },
    { id: 3, titulo: 'Peso Pesado', desc: 'Doe um total de 10kg ou mais.', icon: 'package', alcancada: user.peso_doado >= 10 },
    { id: 4, titulo: 'Mão Amiga', desc: 'Ajude pelo menos 5 famílias diferentes.', icon: 'users', alcancada: user.familias_ajudadas >= 5 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Redirecionamento forçado para a aba /perfil consertando o bug do Voltar */}
        <TouchableOpacity onPress={() => router.push('/perfil')} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Conquistas</Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {conquistas.map((item) => (
          <View key={item.id} style={[styles.card, !item.alcancada && styles.cardLocked]}>
            <View style={[styles.iconBox, { backgroundColor: item.alcancada ? '#52B788' : '#ccc' }]}>
              <Feather name={item.icon as any} size={24} color="#fff" />
            </View>
            <View style={styles.content}>
              <Text style={[styles.itemTitle, !item.alcancada && styles.textLocked]}>{item.titulo}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
            </View>
            {item.alcancada && <Feather name="check-circle" size={24} color="#52B788" />}
            {!item.alcancada && <Feather name="lock" size={24} color="#ccc" />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4FBF6' },
  header: { backgroundColor: '#1B4332', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 15 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  list: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 12, elevation: 2 },
  cardLocked: { opacity: 0.6, elevation: 0, borderWidth: 1, borderColor: '#ddd' },
  iconBox: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  content: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#1B4332' },
  textLocked: { color: '#666' },
  itemDesc: { fontSize: 12, color: '#6B9E82', marginTop: 4 },
});