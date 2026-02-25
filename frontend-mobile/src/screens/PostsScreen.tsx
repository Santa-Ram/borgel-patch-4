import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, Calendar } from 'lucide-react-native';
import axios from 'axios';

const demoPosts = [
  { id: 1, title: 'Nouvelles règles d\'indemnisation 2025', excerpt: 'Les changements importants...', views: 234, created_at: '2025-01-15' },
  { id: 2, title: 'Faute médicale : comment réagir ?', excerpt: 'Tout ce que vous devez savoir...', views: 189, created_at: '2025-01-10' },
  { id: 3, title: 'Accident du travail et indemnisation', excerpt: 'Guide complet sur les démarches...', views: 312, created_at: '2025-01-05' },
];

export default function PostsScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/posts/')
      .then((res) => setPosts(res.data.results || res.data))
      .catch(() => setPosts(demoPosts))
      .finally(() => setLoading(false));
  }, []);

  const displayed = posts.length > 0 ? posts : demoPosts;

  return (
    <SafeAreaView style={s.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {loading ? <ActivityIndicator color="#f97316" style={{ marginTop: 40 }} /> : (
          displayed.map((post) => (
            <TouchableOpacity key={post.id} style={s.card}>
              <Text style={s.title}>{post.title}</Text>
              <Text style={s.excerpt} numberOfLines={2}>{post.excerpt}</Text>
              <View style={s.meta}>
                <View style={s.metaItem}><Calendar size={12} color="rgba(255,255,255,0.4)" /><Text style={s.metaText}>{new Date(post.created_at).toLocaleDateString('fr-FR')}</Text></View>
                <View style={s.metaItem}><Eye size={12} color="rgba(255,255,255,0.4)" /><Text style={s.metaText}>{post.views}</Text></View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080d1e' },
  card: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  title: { color: '#fff', fontWeight: '700', fontSize: 16, marginBottom: 6 },
  excerpt: { color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 18, marginBottom: 10 },
  meta: { flexDirection: 'row', gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
});
