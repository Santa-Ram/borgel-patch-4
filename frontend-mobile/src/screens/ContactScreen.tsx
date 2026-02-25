import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Mail, MapPin } from 'lucide-react-native';
import axios from 'axios';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) { Alert.alert('Erreur', 'Veuillez remplir tous les champs'); return; }
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/contacts/', { name, email, message });
      Alert.alert('Succès', 'Votre message a été envoyé. Nous vous répondrons sous 24h.');
      setName(''); setEmail(''); setMessage('');
    } catch { Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.'); }
    finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={s.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        <View style={s.infosCard}>
          {[{ icon: MapPin, text: '89, Rue Saint Jacques – 13006 Marseille' }, { icon: Phone, text: '04 91 33 50 00' }, { icon: Mail, text: 'contact@borgel-avocat.fr' }].map(({ icon: Icon, text }) => (
            <View key={text} style={s.infoRow}><Icon size={16} color="#f97316" /><Text style={s.infoText}>{text}</Text></View>
          ))}
          <TouchableOpacity style={s.callBtn} onPress={() => Linking.openURL('tel:0491335000')}>
            <Phone size={16} color="#fff" /><Text style={s.callBtnText}>Appeler maintenant</Text>
          </TouchableOpacity>
        </View>

        <Text style={s.formTitle}>Envoyer un message</Text>
        {[{ value: name, setter: setName, placeholder: 'Votre nom *', multiline: false }, { value: email, setter: setEmail, placeholder: 'Email *', multiline: false }].map(({ value, setter, placeholder }) => (
          <TextInput key={placeholder} style={s.input} value={value} onChangeText={setter} placeholder={placeholder} placeholderTextColor="rgba(255,255,255,0.3)" />
        ))}
        <TextInput style={[s.input, s.textArea]} value={message} onChangeText={setMessage} placeholder="Votre message *" placeholderTextColor="rgba(255,255,255,0.3)" multiline numberOfLines={5} textAlignVertical="top" />
        <TouchableOpacity style={[s.submitBtn, loading && { opacity: 0.6 }]} onPress={handleSubmit} disabled={loading}>
          <Text style={s.submitBtnText}>{loading ? 'Envoi...' : 'Envoyer le message'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080d1e' },
  infosCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  infoText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  callBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#f97316', borderRadius: 50, paddingVertical: 12, marginTop: 8 },
  callBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  formTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  input: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 12, color: '#fff', fontSize: 14, marginBottom: 12 },
  textArea: { height: 120, paddingTop: 12 },
  submitBtn: { backgroundColor: '#f97316', borderRadius: 50, paddingVertical: 15, alignItems: 'center', marginTop: 4 },
  submitBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
