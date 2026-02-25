import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 48) / 2;

const gallery = [
  { id: 1, uri: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600', caption: 'Cabinet' },
  { id: 2, uri: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=600', caption: 'Salle de réunion' },
  { id: 3, uri: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600', caption: 'Bureau' },
  { id: 4, uri: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600', caption: 'Consultation' },
];

export default function GalleryScreen() {
  const [selected, setSelected] = useState<typeof gallery[0] | null>(null);
  return (
    <SafeAreaView style={s.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        <View style={s.grid}>
          {gallery.map((img) => (
            <TouchableOpacity key={img.id} style={s.item} onPress={() => setSelected(img)}>
              <Image source={{ uri: img.uri }} style={s.image} resizeMode="cover" />
              <Text style={s.caption}>{img.caption}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Modal visible={!!selected} transparent animationType="fade">
        <View style={s.modal}>
          <TouchableOpacity style={s.closeBtn} onPress={() => setSelected(null)}><X size={24} color="#fff" /></TouchableOpacity>
          {selected && <Image source={{ uri: selected.uri }} style={s.modalImage} resizeMode="contain" />}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080d1e' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  item: { width: ITEM_SIZE },
  image: { width: ITEM_SIZE, height: ITEM_SIZE, borderRadius: 16 },
  caption: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 6, textAlign: 'center' },
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', alignItems: 'center', justifyContent: 'center' },
  closeBtn: { position: 'absolute', top: 50, right: 20, zIndex: 1, padding: 8 },
  modalImage: { width: width - 32, height: width - 32, borderRadius: 12 },
});
