import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import axios from 'axios';

const demoMembers = [
  { id: 1, name: 'Maître Borgel', role: 'Avocat associé fondateur' },
  { id: 2, name: 'Sophie Durand', role: 'Avocate senior' },
  { id: 3, name: 'Thomas Martin', role: 'Avocat collaborateur' },
  { id: 4, name: 'Julie Leroy', role: 'Juriste spécialisée' },
];

export default function TeamScreen() {
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/team/')
      .then((res) => setMembers(res.data.results || res.data))
      .catch(() => setMembers(demoMembers))
      .finally(() => setLoading(false));
  }, []);

  const displayed = (members.length > 0 ? members : demoMembers).filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={s.container} edges={['bottom']}>
      <View style={s.searchRow}>
        <Search size={15} color="rgba(255,255,255,0.4)" />
        <TextInput style={s.searchInput} placeholder="Rechercher..." placeholderTextColor="rgba(255,255,255,0.3)" value={search} onChangeText={setSearch} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? <ActivityIndicator color="#f97316" style={{ marginTop: 40 }} /> : (
          <View style={s.grid}>
            {displayed.map((m) => (
              <TouchableOpacity key={m.id} style={s.card}>
                <View style={s.avatar}><Text style={s.avatarText}>{m.name[0]}</Text></View>
                <Text style={s.name}>{m.name}</Text>
                <Text style={s.role}>{m.role}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080d1e' },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, margin: 16, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 14 },
  searchInput: { flex: 1, color: '#fff', paddingVertical: 12, fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  card: { width: '50%', padding: 8 },
  avatar: { backgroundColor: 'rgba(249,115,22,0.2)', borderRadius: 16, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  avatarText: { fontSize: 36, fontWeight: '700', color: '#f97316' },
  name: { color: '#fff', fontWeight: '600', fontSize: 14, textAlign: 'center', marginBottom: 2 },
  role: { color: 'rgba(255,255,255,0.5)', fontSize: 12, textAlign: 'center' },
});
