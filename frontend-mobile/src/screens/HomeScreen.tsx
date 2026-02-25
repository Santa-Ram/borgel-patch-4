import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Linking, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Scale, Car, Stethoscope, Phone, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const expertises = [
  { icon: Car, label: 'Accidents de la circulation', color: '#f97316' },
  { icon: Stethoscope, label: 'Droit de la santé', color: '#3b82f6' },
  { icon: Shield, label: 'Dommage corporel', color: '#8b5cf6' },
  { icon: Scale, label: 'Responsabilité médicale', color: '#10b981' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Avocat au Barreau de Marseille</Text>
          </View>
          <Text style={styles.heroTitle}>Borgel{'\n'}& Associés</Text>
          <Text style={styles.heroSubtitle}>
            Cabinet spécialisé en droit du dommage corporel et responsabilité médicale.
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => Linking.openURL('tel:0491335000')}>
            <Phone size={16} color="#fff" />
            <Text style={styles.ctaButtonText}>Nous appeler</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[['15+', "Ans d'expérience"], ['500+', 'Dossiers'], ['95%', 'Satisfaction']].map(([nb, label]) => (
            <View key={label} style={styles.statItem}>
              <Text style={styles.statNumber}>{nb}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Expertises */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DOMAINES</Text>
          <Text style={styles.sectionTitle}>Nos Expertises</Text>
          <View style={styles.expertisesGrid}>
            {expertises.map(({ icon: Icon, label, color }) => (
              <TouchableOpacity key={label} style={styles.expertiseCard}>
                <View style={[styles.expertiseIcon, { backgroundColor: color + '25' }]}>
                  <Icon size={22} color={color} />
                </View>
                <Text style={styles.expertiseLabel}>{label}</Text>
                <ArrowRight size={14} color="rgba(255,255,255,0.4)" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact CTA */}
        <View style={[styles.section, styles.contactSection]}>
          <Text style={styles.sectionTitle}>Consultation gratuite</Text>
          <Text style={styles.contactText}>
            Première consultation téléphonique de 20 minutes offerte pour évaluer votre situation.
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Prendre rendez-vous</Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>89, Rue Saint Jacques — 13006 Marseille</Text>
          <Text style={styles.infoText}>Lundi–Vendredi : 9h00–18h00</Text>
          <TouchableOpacity onPress={() => Linking.openURL('tel:0491335000')}>
            <Text style={[styles.infoText, { color: '#f97316' }]}>04 91 33 50 00</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080d1e' },
  hero: { padding: 24, paddingTop: 32, backgroundColor: '#0a0f1e', marginBottom: 2 },
  badge: { backgroundColor: 'rgba(249,115,22,0.15)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 16 },
  badgeText: { color: '#f97316', fontSize: 11, fontWeight: '600', letterSpacing: 1.5, textTransform: 'uppercase' },
  heroTitle: { fontSize: 38, fontWeight: '800', color: '#fff', marginBottom: 12, lineHeight: 44 },
  heroSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 22, marginBottom: 24 },
  ctaButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f97316', borderRadius: 50, paddingHorizontal: 24, paddingVertical: 14, alignSelf: 'flex-start' },
  ctaButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  statsRow: { flexDirection: 'row', backgroundColor: '#0d1435', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 20, borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.08)' },
  statNumber: { fontSize: 22, fontWeight: '800', color: '#f97316', marginBottom: 2 },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 },
  section: { padding: 24 },
  sectionLabel: { color: '#f97316', fontSize: 10, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 16 },
  expertisesGrid: { gap: 10 },
  expertiseCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  expertiseIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  expertiseLabel: { flex: 1, color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '500' },
  contactSection: { backgroundColor: 'rgba(249,115,22,0.08)', marginHorizontal: 16, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(249,115,22,0.2)', padding: 24 },
  contactText: { color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 20, marginBottom: 16 },
  contactButton: { backgroundColor: '#f97316', borderRadius: 50, paddingVertical: 14, alignItems: 'center' },
  contactButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  infoSection: { padding: 24, alignItems: 'center', gap: 6 },
  infoText: { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
});
