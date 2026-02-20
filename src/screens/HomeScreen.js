import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colors';
import { Home } from 'lucide-react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.emptyIconContainer}>
                    <Home color={Colors.primary} size={64} strokeWidth={1.5} opacity={0.2} />
                </View>
                <Text style={styles.title}>Home</Text>
                <Text style={styles.subtitle}>Welcome to SlotB ecosystem. Your smart dashboard will appear here.</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textMuted,
        textAlign: 'center',
        lineHeight: 24,
    },
});
