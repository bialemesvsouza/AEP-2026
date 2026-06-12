import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../context/AppContext';

export default function LoginScreen() {
  const { user } = useAppContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (user && loading) {
      router.replace('/home');
    }
  }, [user, loading]);

  const handleEntrar = () => {
    setLoading(true);
    setTimeout(() => {
       router.replace('/home');
    }, 600); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DoaMais</Text>
      <Text style={styles.subtitle}>Sua doação inteligente gera impacto.</Text>
      
      <Text style={styles.subtitle2}>Modo Protótipo (Acesso Direto)</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        value="lucas@email.com"
        editable={false}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry 
        value="123456"
        editable={false}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleEntrar} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar no App</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1B4332', justifyContent: 'center', padding: 40 },
  logo: { color: '#fff', fontSize: 42, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#B7E4C7', textAlign: 'center', marginBottom: 10 },
  subtitle2: { color: '#F4A261', textAlign: 'center', marginBottom: 40, fontWeight: 'bold' },
  input: { backgroundColor: '#e0e0e0', borderRadius: 12, padding: 18, marginBottom: 15, fontSize: 16, color: '#555' },
  button: { backgroundColor: '#52B788', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});