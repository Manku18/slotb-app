import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { Colors } from '../constants/Colors';

const HomeScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <View style={styles.content}>
                <View style={styles.pill}>
                    <Text style={styles.pillText}>SlotB</Text>
                </View>
                <Text style={styles.title}>Welcome Back 👋</Text>
                <Text style={styles.subtitle}>Your smart service dashboard is coming soon. Explore the profile tab to get started.</Text>
            </View>
        </View>
    );
};

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
    pill: {
        backgroundColor: '#ede9fe',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginBottom: 20,
    },
    pillText: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 12,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.textMuted,
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default HomeScreen;
