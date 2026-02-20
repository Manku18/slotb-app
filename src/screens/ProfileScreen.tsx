import React, { useEffect, useRef } from 'react';
import {
    StyleSheet, View, Text, ScrollView, Image,
    TouchableOpacity, Dimensions, Animated, StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    ChevronRight, Calendar, Heart, History, Award,
    ShieldCheck, LifeBuoy, UserPlus, Settings, CreditCard, Zap, Edit2
} from 'lucide-react-native';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

interface ActionItemProps {
    icon: React.ElementType;
    label: string;
    color: string;
    bg: string;
}

const ActionItem: React.FC<ActionItemProps> = ({ icon: Icon, label, color, bg }) => (
    <TouchableOpacity style={[styles.actionItem, { shadowColor: color }]} activeOpacity={0.8}>
        <View style={[styles.actionIconContainer, { backgroundColor: bg }]}>
            <Icon color={color} size={22} strokeWidth={2} />
        </View>
        <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
);

interface SettingItemProps {
    icon: React.ElementType;
    label: string;
    sub?: string;
    highlight?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, label, sub, highlight = false }) => (
    <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
        <View style={[styles.settingIconContainer, { backgroundColor: highlight ? '#ede9fe' : Colors.surface }]}>
            <Icon color={highlight ? Colors.primary : Colors.textMuted} size={18} strokeWidth={2} />
        </View>
        <View style={styles.settingTextBlock}>
            <Text style={[styles.settingLabel, highlight && { color: Colors.primary, fontWeight: '700' }]}>{label}</Text>
            {sub ? <Text style={styles.settingSubLabel}>{sub}</Text> : null}
        </View>
        <ChevronRight color={Colors.textLight} size={18} strokeWidth={2} />
    </TouchableOpacity>
);

export default function ProfileScreen() {
    const sparkleOpacity = useRef(new Animated.Value(0.4)).current;
    const sparkleScale = useRef(new Animated.Value(0.85)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(sparkleOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
                    Animated.timing(sparkleScale, { toValue: 1.25, duration: 1200, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(sparkleOpacity, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
                    Animated.timing(sparkleScale, { toValue: 0.85, duration: 1200, useNativeDriver: true }),
                ]),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Banner */}
                <LinearGradient
                    colors={['#ede9fe', '#fce7f3', '#ffffff']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={styles.headerBanner}
                >
                    {/* Edit Button */}
                    <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
                        <Edit2 size={16} color={Colors.primary} strokeWidth={2.5} />
                    </TouchableOpacity>

                    {/* Profile Avatar */}
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarRing}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' }}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.onlineDot} />
                    </View>

                    <Text style={styles.userName}>Anya Sharma</Text>
                    <Text style={styles.userEmail}>anya.sharma@slotb.in</Text>

                    <View style={styles.badgeRow}>
                        <View style={styles.badge}>
                            <Award size={12} color={Colors.accent} strokeWidth={2.5} />
                            <Text style={styles.badgeText}>Premium Member</Text>
                        </View>
                        <View style={[styles.badge, { backgroundColor: '#dcfce7', borderColor: '#bbf7d0' }]}>
                            <Text style={[styles.badgeText, { color: Colors.green }]}>Since 2024</Text>
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>42</Text>
                            <Text style={styles.statLabel}>Bookings</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>8</Text>
                            <Text style={styles.statLabel}>Favorites</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>320</Text>
                            <Text style={styles.statLabel}>Points</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* SlotB Cash Card */}
                <View style={styles.cardContainer}>
                    <LinearGradient
                        colors={['#667eea', '#764ba2']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.cashCard}
                    >
                        {/* Decorative circles */}
                        <View style={styles.cardCircle1} />
                        <View style={styles.cardCircle2} />

                        <Animated.View style={[styles.sparkle, { opacity: sparkleOpacity, transform: [{ scale: sparkleScale }] }]}>
                            <Zap size={20} color="rgba(255,255,255,0.9)" fill="rgba(255,255,255,0.9)" />
                        </Animated.View>

                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.cardChip}>SlotB Cash</Text>
                                <Text style={styles.balanceLabel}>Available Balance</Text>
                            </View>
                            <CreditCard color="rgba(255,255,255,0.7)" size={28} strokeWidth={1.5} />
                        </View>

                        <Text style={styles.balanceText}>₹ 1,250.00</Text>

                        <View style={styles.cardFooter}>
                            <TouchableOpacity style={styles.topUpButton} activeOpacity={0.8}>
                                <Text style={styles.topUpText}>+ Top Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                                <Text style={styles.historyLink}>View History →</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>

                {/* Action Grid */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.grid}>
                        <ActionItem icon={Calendar} label="My Bookings" color="#6366f1" bg="#ede9fe" />
                        <ActionItem icon={Heart} label="Favourites" color="#f43f5e" bg="#fff1f2" />
                        <ActionItem icon={History} label="History" color="#10b981" bg="#d1fae5" />
                        <ActionItem icon={Award} label="Rewards" color="#f59e0b" bg="#fef3c7" />
                    </View>
                </View>

                {/* Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.settingsCard}>
                        <SettingItem icon={ShieldCheck} label="Privacy & Security" sub="Manage your data" />
                        <View style={styles.settingDivider} />
                        <SettingItem icon={LifeBuoy} label="Help Center" sub="FAQs & support" />
                        <View style={styles.settingDivider} />
                        <SettingItem icon={UserPlus} label="Invite Friends" sub="Earn ₹50 per referral" highlight />
                        <View style={styles.settingDivider} />
                        <SettingItem icon={Settings} label="App Settings" sub="Notifications, theme" />
                    </View>
                </View>

                {/* Sign Out */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8}>
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 30 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: Colors.background },
    container: { flex: 1 },
    scrollContent: { paddingBottom: 20 },

    // Header Banner
    headerBanner: {
        paddingTop: 56,
        paddingBottom: 28,
        paddingHorizontal: 24,
        alignItems: 'center',
        position: 'relative',
    },
    editBtn: {
        position: 'absolute', top: 56, right: 20,
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: Colors.white,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15, shadowRadius: 8, elevation: 4,
    },
    avatarWrapper: { position: 'relative', marginBottom: 14 },
    avatarRing: {
        width: 100, height: 100, borderRadius: 50,
        borderWidth: 3, borderColor: Colors.white,
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2, shadowRadius: 16, elevation: 8,
        backgroundColor: Colors.white,
    },
    avatar: { width: 94, height: 94, borderRadius: 47 },
    onlineDot: {
        position: 'absolute', bottom: 4, right: 2,
        width: 16, height: 16, borderRadius: 8,
        backgroundColor: Colors.green,
        borderWidth: 2.5, borderColor: Colors.white,
    },
    userName: { fontSize: 22, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
    userEmail: { fontSize: 13, color: Colors.textMuted, marginTop: 3, marginBottom: 12 },
    badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
    badge: {
        flexDirection: 'row', alignItems: 'center', gap: 4,
        paddingHorizontal: 10, paddingVertical: 5,
        backgroundColor: '#fef3c7', borderRadius: 20,
        borderWidth: 1, borderColor: '#fde68a',
    },
    badgeText: { fontSize: 11, fontWeight: '700', color: Colors.accent },

    // Stats
    statsRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 20, paddingVertical: 18, paddingHorizontal: 24,
        width: '100%',
        shadowColor: Colors.shadowCard, shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1, shadowRadius: 12, elevation: 4,
    },
    statItem: { flex: 1, alignItems: 'center' },
    statNumber: { fontSize: 22, fontWeight: '800', color: Colors.text },
    statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 2, fontWeight: '500' },
    statDivider: { width: 1, height: 36, backgroundColor: Colors.border },

    // Cash Card
    cardContainer: { paddingHorizontal: 20, marginTop: 20, marginBottom: 8 },
    cashCard: {
        borderRadius: 24, padding: 24, overflow: 'hidden',
        shadowColor: '#667eea', shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.35, shadowRadius: 20, elevation: 12,
    },
    cardCircle1: {
        position: 'absolute', width: 180, height: 180, borderRadius: 90,
        backgroundColor: 'rgba(255,255,255,0.06)', top: -60, right: -40,
    },
    cardCircle2: {
        position: 'absolute', width: 120, height: 120, borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.05)', bottom: -30, left: 20,
    },
    sparkle: { position: 'absolute', top: 20, right: 70 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    cardChip: { color: 'rgba(255,255,255,0.95)', fontSize: 15, fontWeight: '700' },
    balanceLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 },
    balanceText: { color: Colors.white, fontSize: 38, fontWeight: '800', marginVertical: 14, letterSpacing: -1 },
    cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    topUpButton: {
        backgroundColor: 'rgba(255,255,255,0.22)',
        paddingHorizontal: 20, paddingVertical: 10,
        borderRadius: 14, borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    topUpText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
    historyLink: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600' },

    // Sections
    section: { paddingHorizontal: 20, marginTop: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 14, letterSpacing: -0.3 },

    // Grid
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    actionItem: {
        width: (width - 52) / 2,
        backgroundColor: Colors.white,
        borderRadius: 20, padding: 18, alignItems: 'flex-start',
        shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 3,
        borderWidth: 1, borderColor: Colors.border,
    },
    actionIconContainer: {
        width: 46, height: 46, borderRadius: 14,
        justifyContent: 'center', alignItems: 'center', marginBottom: 12,
    },
    actionLabel: { color: Colors.text, fontSize: 13, fontWeight: '700' },

    // Settings
    settingsCard: {
        backgroundColor: Colors.white, borderRadius: 20,
        borderWidth: 1, borderColor: Colors.border,
        shadowColor: Colors.shadowCard, shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1, shadowRadius: 12, elevation: 3,
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 18, paddingVertical: 14,
    },
    settingIconContainer: {
        width: 38, height: 38, borderRadius: 12,
        justifyContent: 'center', alignItems: 'center', marginRight: 14,
    },
    settingTextBlock: { flex: 1 },
    settingLabel: { color: Colors.text, fontSize: 14, fontWeight: '600' },
    settingSubLabel: { color: Colors.textMuted, fontSize: 11, marginTop: 1 },
    settingDivider: { height: 1, backgroundColor: Colors.border, marginHorizontal: 18 },

    // Sign Out
    signOutBtn: {
        backgroundColor: Colors.surface, borderRadius: 16,
        paddingVertical: 16, alignItems: 'center',
        borderWidth: 1, borderColor: Colors.border,
    },
    signOutText: { color: '#ef4444', fontSize: 15, fontWeight: '700' },
});
