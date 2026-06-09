import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const validarLogin = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexEmail.test(email)) {
      router.replace('/home');
    } else {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DoaMais</Text>
      <Text style={styles.subtitle}>Sua doação inteligente gera impacto.</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        value={email} 
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TouchableOpacity style={styles.button} onPress={validarLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1B4332', justifyContent: 'center', padding: 40 },
  logo: { color: '#fff', fontSize: 42, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#B7E4C7', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 18, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#52B788', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});