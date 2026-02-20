import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { ExpoStatusBar } from 'expo-status-bar';
import { LayoutGrid, Rocket, ShieldCheck, Download } from 'lucide-react-native';
import { Colors } from './src/constants/Colors';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Rocket color={Colors.primary} size={48} strokeWidth={2.5} />
          <Text style={styles.title}>SlotB Premium</Text>
          <Text style={styles.subtitle}>Setup Complete & Ready for Build</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.featureItem}>
            <ShieldCheck color={Colors.accent} size={24} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>EAS Ready</Text>
              <Text style={styles.featureDescription}>eas.json configured for APK & AAB</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <LayoutGrid color={Colors.primary} size={24} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Modern Architecture</Text>
              <Text style={styles.featureDescription}>Clean folder structure initialized in /src</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Download color={Colors.secondary} size={24} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Production Ready</Text>
              <Text style={styles.featureDescription}>Android package ID & versioning set</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Start Building</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 16,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textMuted,
    marginTop: 8,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureText: {
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 2,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});
