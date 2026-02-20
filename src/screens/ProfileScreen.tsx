import React, { useEffect, useRef } from 'react';
import {
    StyleSheet, View, Text, ScrollView, Image,
    TouchableOpacity, Dimensions, Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    ChevronRight, Calendar, Heart, History, Award,
    ShieldCheck, LifeBuoy, UserPlus, Settings, CreditCard, Zap
} from 'lucide-react-native';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

interface ActionItemProps {
    icon: React.ElementType;
    label: string;
    color: string;
}

const ActionItem: React.FC<ActionItemProps> = ({ icon: Icon, label, color }) => (
    <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
        <View style={[styles.actionIconContainer, { backgroundColor: `${color}20` }]}>
            <Icon color={color} size={24} />
        </View>
        <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
);

interface SettingItemProps {
    icon: React.ElementType;
    label: string;
    showChevron?: boolean;
    highlight?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, label, showChevron = true, highlight = false }) => (
    <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
        <View style={styles.settingLeft}>
            <View style={[styles.settingIconContainer, highlight && { backgroundColor: `${Colors.primary}20` }]}>
                <Icon color={highlight ? Colors.primary : Colors.textMuted} size={20} />
            </View>
            <Text style={[styles.settingLabel, highlight && { color: Colors.primary, fontWeight: '600' }]}>{label}</Text>
        </View>
        {showChevron && <ChevronRight color={Colors.textMuted} size={20} />}
    </TouchableOpacity>
);

export default function ProfileScreen() {
    const sparkleOpacity = useRef(new Animated.Value(0.3)).current;
    const sparkleScale = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(sparkleOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
                    Animated.timing(sparkleScale, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(sparkleOpacity, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
                    Animated.timing(sparkleScale, { toValue: 0.8, duration: 1000, useNativeDriver: true }),
                ]),
            ])
        ).start();
    }, []);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* User Header */}
            <LinearGradient
                colors={['rgba(99,102,241,0.15)', 'transparent']}
                style={styles.headerGradient}
            >
                <View style={styles.header}>
                    <View style={styles.profileImageWrapper}>
                        <LinearGradient
                            colors={[Colors.primary, Colors.secondary]}
                            style={styles.profileGlowRing}
                        />
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }}
                            style={styles.profileImage}
                        />
                    </View>
                    <Text style={styles.userName}>Anya Sharma</Text>
                    <View style={styles.badge}>
                        <Award size={13} color={Colors.accent} />
                        <Text style={styles.badgeText}>Member since 2024</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* SlotB Cash Card */}
            <View style={styles.cardContainer}>
                <LinearGradient
                    colors={['#f59e0b', '#f97316', '#ef4444']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cashCard}
                >
                    {/* Sparkle animation using RN Animated */}
                    <Animated.View style={[styles.sparkle, { opacity: sparkleOpacity, transform: [{ scale: sparkleScale }] }]}>
                        <Zap size={18} color="white" fill="white" />
                    </Animated.View>

                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>SlotB Cash Balance</Text>
                        <CreditCard color="white" size={22} opacity={0.8} />
                    </View>
                    <Text style={styles.balanceText}>₹1,250.00</Text>
                    <View style={styles.cardFooter}>
                        <TouchableOpacity style={styles.topUpButton}>
                            <Text style={styles.topUpText}>Top Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.historyLink}>Transaction History</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>

            {/* Action Grid */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.grid}>
                    <ActionItem icon={Calendar} label="My Bookings" color={Colors.primary} />
                    <ActionItem icon={Heart} label="Favorite Salons" color={Colors.secondary} />
                    <ActionItem icon={History} label="Rental History" color="#10b981" />
                    <ActionItem icon={Award} label="Rewards" color="#f59e0b" />
                </View>
            </View>

            {/* Settings List */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <View style={styles.settingsContainer}>
                    <SettingItem icon={ShieldCheck} label="Privacy & Security" />
                    <View style={styles.divider} />
                    <SettingItem icon={LifeBuoy} label="Help Center" />
                    <View style={styles.divider} />
                    <SettingItem icon={UserPlus} label="Invite Friends" highlight />
                    <View style={styles.divider} />
                    <SettingItem icon={Settings} label="App Settings" />
                </View>
            </View>

            <View style={{ height: 110 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    headerGradient: { paddingBottom: 10 },
    header: { alignItems: 'center', paddingTop: 60, paddingBottom: 20 },
    profileImageWrapper: {
        width: 112, height: 112,
        justifyContent: 'center', alignItems: 'center', position: 'relative',
    },
    profileGlowRing: {
        position: 'absolute', width: 112, height: 112,
        borderRadius: 56, opacity: 0.35,
    },
    profileImage: {
        width: 100, height: 100, borderRadius: 50,
        borderWidth: 3, borderColor: Colors.background,
    },
    userName: {
        fontSize: 24, fontWeight: '800', color: Colors.text, marginTop: 14,
    },
    badge: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(245,158,11,0.12)',
        paddingHorizontal: 12, paddingVertical: 5,
        borderRadius: 20, marginTop: 8,
        borderWidth: 1, borderColor: 'rgba(245,158,11,0.25)',
    },
    badgeText: { color: Colors.accent, fontSize: 12, fontWeight: '600', marginLeft: 5 },
    cardContainer: { paddingHorizontal: 20, marginBottom: 28 },
    cashCard: {
        width: '100%', borderRadius: 24, padding: 24,
        elevation: 12, shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 16,
        overflow: 'hidden', position: 'relative',
    },
    sparkle: { position: 'absolute', top: 14, right: 28 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardTitle: { color: 'white', fontSize: 14, fontWeight: '500', opacity: 0.9 },
    balanceText: { color: 'white', fontSize: 36, fontWeight: '800', marginVertical: 10 },
    cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
    topUpButton: {
        backgroundColor: 'white', paddingHorizontal: 22,
        paddingVertical: 10, borderRadius: 12,
    },
    topUpText: { color: '#f97316', fontWeight: '700', fontSize: 14 },
    historyLink: { color: 'white', fontSize: 13, fontWeight: '500', textDecorationLine: 'underline', opacity: 0.9 },
    section: { paddingHorizontal: 20, marginBottom: 22 },
    sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: 14 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    actionItem: {
        width: (width - 52) / 2, backgroundColor: Colors.surfaceSolid,
        borderRadius: 20, padding: 20, alignItems: 'center', marginBottom: 12,
        borderWidth: 1, borderColor: Colors.glassBorder,
    },
    actionIconContainer: {
        width: 50, height: 50, borderRadius: 16,
        justifyContent: 'center', alignItems: 'center', marginBottom: 10,
    },
    actionLabel: { color: Colors.text, fontSize: 14, fontWeight: '600' },
    settingsContainer: {
        backgroundColor: Colors.surfaceSolid, borderRadius: 20,
        paddingVertical: 4, borderWidth: 1, borderColor: Colors.glassBorder,
    },
    settingItem: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14,
    },
    settingLeft: { flexDirection: 'row', alignItems: 'center' },
    settingIconContainer: {
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.06)',
        justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    settingLabel: { color: Colors.text, fontSize: 15, fontWeight: '500' },
    divider: { height: 1, backgroundColor: Colors.glassBorder, marginHorizontal: 16 },
});
