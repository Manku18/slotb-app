import React, { useEffect, useRef } from 'react';
import {
    StyleSheet, View, Text, ScrollView, Image,
    TouchableOpacity, Dimensions, Animated, StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    ChevronRight, Calendar, Heart, History, Award,
    ShieldCheck, LifeBuoy, UserPlus, Settings,
    CreditCard, Zap, Edit3, LogOut, Bell, Star
} from 'lucide-react-native';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

// ─── Animated Fade+Slide wrapper ───────────────────────────────────────────
const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(28)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 500, delay, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
            {children}
        </Animated.View>
    );
};

// ─── Stat Item ──────────────────────────────────────────────────────────────
const StatItem: React.FC<{ value: string; label: string; color: string }> = ({ value, label, color }) => (
    <View style={styles.statItem}>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

// ─── Action Tile ────────────────────────────────────────────────────────────
interface TileProps { icon: React.ElementType; label: string; color: string; bg: string; count?: string }
const ActionTile: React.FC<TileProps> = ({ icon: Icon, label, color, bg, count }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const onPressIn = () => Animated.spring(scale, { toValue: 0.93, useNativeDriver: true }).start();
    const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

    return (
        <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut} activeOpacity={1}>
            <Animated.View style={[styles.tile, { transform: [{ scale }] }]}>
                <View style={[styles.tileIcon, { backgroundColor: bg }]}>
                    <Icon color={color} size={22} strokeWidth={2} />
                    {count ? <View style={[styles.tileBadge, { backgroundColor: color }]}><Text style={styles.tileBadgeText}>{count}</Text></View> : null}
                </View>
                <Text style={styles.tileLabel}>{label}</Text>
                <ChevronRight color={Colors.textLight} size={14} strokeWidth={2} />
            </Animated.View>
        </TouchableOpacity>
    );
};

// ─── Setting Row ────────────────────────────────────────────────────────────
interface RowProps { icon: React.ElementType; label: string; sub?: string; accent?: boolean; danger?: boolean }
const SettingRow: React.FC<RowProps> = ({ icon: Icon, label, sub, accent = false, danger = false }) => {
    const tintColor = danger ? '#ef4444' : accent ? Colors.primary : Colors.textMuted;
    const bgColor = danger ? '#fff5f5' : accent ? '#ede9fe' : Colors.surface;

    return (
        <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <View style={[styles.rowIcon, { backgroundColor: bgColor }]}>
                <Icon color={tintColor} size={18} strokeWidth={2} />
            </View>
            <View style={styles.rowText}>
                <Text style={[styles.rowLabel, danger && { color: '#ef4444' }, accent && { color: Colors.primary }]}>{label}</Text>
                {sub ? <Text style={styles.rowSub}>{sub}</Text> : null}
            </View>
            <ChevronRight color={Colors.textLight} size={16} strokeWidth={2} />
        </TouchableOpacity>
    );
};

// ─── Main Screen ────────────────────────────────────────────────────────────
export default function ProfileScreen() {
    // Sparkle on cash card
    const sparkle = useRef(new Animated.Value(0)).current;
    // Pulse for the online dot
    const pulse = useRef(new Animated.Value(1)).current;
    // Scale for card entrance
    const cardScale = useRef(new Animated.Value(0.92)).current;
    const cardOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Sparkle loop
        Animated.loop(
            Animated.sequence([
                Animated.timing(sparkle, { toValue: 1, duration: 1400, useNativeDriver: true }),
                Animated.timing(sparkle, { toValue: 0, duration: 1400, useNativeDriver: true }),
            ])
        ).start();

        // Pulse loop on online dot
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, { toValue: 1.5, duration: 900, useNativeDriver: true }),
                Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
            ])
        ).start();

        // Card entrance
        Animated.parallel([
            Animated.timing(cardScale, { toValue: 1, duration: 600, delay: 300, useNativeDriver: true }),
            Animated.timing(cardOpacity, { toValue: 1, duration: 600, delay: 300, useNativeDriver: true }),
        ]).start();
    }, []);

    const sparkleOpacity = sparkle.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] });
    const sparkleScale = sparkle.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1.3] });

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                {/* ── Hero Header ── */}
                <AnimatedSection delay={0}>
                    <LinearGradient
                        colors={['#f0f4ff', '#fdf2fb', '#fff']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.hero}
                    >
                        {/* Notification + Edit buttons */}
                        <View style={styles.heroActions}>
                            <TouchableOpacity style={styles.heroBtn}>
                                <Bell size={18} color={Colors.primary} strokeWidth={2} />
                                <View style={styles.notifDot} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.heroBtn}>
                                <Edit3 size={18} color={Colors.primary} strokeWidth={2} />
                            </TouchableOpacity>
                        </View>

                        {/* Avatar */}
                        <View style={styles.avatarOuter}>
                            <LinearGradient colors={[Colors.primary, '#a78bfa', Colors.secondary]} style={styles.avatarGradient}>
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' }}
                                    style={styles.avatar}
                                />
                            </LinearGradient>

                            {/* Pulse dot */}
                            <View style={styles.pulseWrap}>
                                <Animated.View style={[styles.pulseBg, { transform: [{ scale: pulse }], opacity: 0.3 }]} />
                                <View style={styles.onlineDot} />
                            </View>

                            {/* Star badge */}
                            <View style={styles.starBadge}>
                                <Star size={10} color="#fff" fill="#fff" strokeWidth={0} />
                            </View>
                        </View>

                        <Text style={styles.name}>Anya Sharma</Text>
                        <Text style={styles.email}>anya.sharma@slotb.in</Text>

                        <View style={styles.tagRow}>
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>✦ Premium</Text>
                            </View>
                            <View style={[styles.tag, styles.tagGreen]}>
                                <Text style={[styles.tagText, { color: Colors.green }]}>Member 2024</Text>
                            </View>
                        </View>

                        {/* ── Stats ── */}
                        <View style={styles.statsCard}>
                            <StatItem value="42" label="Bookings" color={Colors.primary} />
                            <View style={styles.statDiv} />
                            <StatItem value="8" label="Favourites" color={Colors.secondary} />
                            <View style={styles.statDiv} />
                            <StatItem value="320" label="Points" color={Colors.accent} />
                        </View>
                    </LinearGradient>
                </AnimatedSection>

                {/* ── Cash Card ── */}
                <AnimatedSection delay={150}>
                    <Animated.View style={[styles.cardWrap, { opacity: cardOpacity, transform: [{ scale: cardScale }] }]}>
                        <LinearGradient
                            colors={['#6366f1', '#8b5cf6', '#a78bfa']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            style={styles.cashCard}
                        >
                            {/* BG circles */}
                            <View style={styles.c1} />
                            <View style={styles.c2} />
                            <View style={styles.c3} />

                            {/* Sparkle */}
                            <Animated.View style={[styles.sparkle, { opacity: sparkleOpacity, transform: [{ scale: sparkleScale }] }]}>
                                <Zap size={18} color="rgba(255,255,255,0.95)" fill="rgba(255,255,255,0.95)" />
                            </Animated.View>

                            <View style={styles.cardTop}>
                                <View>
                                    <Text style={styles.cardName}>SlotB Cash</Text>
                                    <Text style={styles.cardSub}>Available Balance</Text>
                                </View>
                                <CreditCard color="rgba(255,255,255,0.7)" size={26} strokeWidth={1.5} />
                            </View>

                            <Text style={styles.amount}>₹ 1,250.00</Text>

                            <View style={styles.cardBottom}>
                                <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
                                    <Text style={styles.addBtnText}>+ Add Money</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Text style={styles.txnLink}>History →</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </Animated.View>
                </AnimatedSection>

                {/* ── Quick Actions ── */}
                <AnimatedSection delay={250}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                        <View style={styles.tileGrid}>
                            <ActionTile icon={Calendar} label="My Bookings" color="#6366f1" bg="#eef2ff" count="3" />
                            <ActionTile icon={Heart} label="Favourites" color="#f43f5e" bg="#fff1f2" />
                            <ActionTile icon={History} label="Rental History" color="#10b981" bg="#ecfdf5" />
                            <ActionTile icon={Award} label="My Rewards" color="#f59e0b" bg="#fffbeb" />
                        </View>
                    </View>
                </AnimatedSection>

                {/* ── Account Settings ── */}
                <AnimatedSection delay={350}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Account</Text>
                        <View style={styles.card}>
                            <SettingRow icon={ShieldCheck} label="Privacy & Security" sub="Manage permissions & data" />
                            <View style={styles.div} />
                            <SettingRow icon={LifeBuoy} label="Help Center" sub="FAQs, live support" />
                            <View style={styles.div} />
                            <SettingRow icon={UserPlus} label="Invite Friends" sub="Earn ₹50 per referral" accent />
                            <View style={styles.div} />
                            <SettingRow icon={Settings} label="App Settings" sub="Notifications, theme" />
                        </View>
                    </View>
                </AnimatedSection>

                {/* ── Sign Out ── */}
                <AnimatedSection delay={420}>
                    <View style={styles.section}>
                        <View style={styles.card}>
                            <SettingRow icon={LogOut} label="Sign Out" danger />
                        </View>
                    </View>
                </AnimatedSection>

                <View style={{ height: 32 }} />
            </ScrollView>
        </View>
    );
}

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#fafbff' },
    scroll: { paddingBottom: 20 },

    // Hero
    hero: { paddingTop: 52, paddingBottom: 28, paddingHorizontal: 24, alignItems: 'center' },
    heroActions: {
        width: '100%', flexDirection: 'row',
        justifyContent: 'flex-end', gap: 10, marginBottom: 20,
    },
    heroBtn: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12, shadowRadius: 8, elevation: 4, position: 'relative',
    },
    notifDot: {
        position: 'absolute', top: 9, right: 9,
        width: 7, height: 7, borderRadius: 4,
        backgroundColor: Colors.secondary, borderWidth: 1.5, borderColor: '#fff',
    },

    // Avatar
    avatarOuter: { position: 'relative', marginBottom: 16 },
    avatarGradient: { width: 104, height: 104, borderRadius: 52, padding: 3 },
    avatar: { width: 98, height: 98, borderRadius: 49, borderWidth: 3, borderColor: '#fff' },
    pulseWrap: { position: 'absolute', bottom: 4, right: 0, alignItems: 'center', justifyContent: 'center' },
    pulseBg: { position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.green },
    onlineDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: Colors.green, borderWidth: 2.5, borderColor: '#fff' },
    starBadge: {
        position: 'absolute', top: 2, right: 0,
        width: 22, height: 22, borderRadius: 11,
        backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center',
        borderWidth: 2, borderColor: '#fff',
    },

    name: { fontSize: 22, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
    email: { fontSize: 13, color: Colors.textMuted, marginTop: 4, marginBottom: 14 },

    tagRow: { flexDirection: 'row', gap: 8, marginBottom: 22 },
    tag: {
        backgroundColor: '#ede9fe', borderRadius: 20,
        paddingHorizontal: 12, paddingVertical: 5,
        borderWidth: 1, borderColor: '#ddd6fe',
    },
    tagGreen: { backgroundColor: '#dcfce7', borderColor: '#bbf7d0' },
    tagText: { fontSize: 11, fontWeight: '700', color: Colors.primary },

    // Stats
    statsCard: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff', borderRadius: 20,
        paddingVertical: 18, paddingHorizontal: 10,
        width: '100%',
        shadowColor: '#6366f1', shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08, shadowRadius: 16, elevation: 4,
    },
    statItem: { flex: 1, alignItems: 'center' },
    statValue: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
    statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 3, fontWeight: '500' },
    statDiv: { width: 1, height: 36, backgroundColor: Colors.border },

    // Cash Card
    cardWrap: { paddingHorizontal: 20, marginTop: 20 },
    cashCard: {
        borderRadius: 26, padding: 26, overflow: 'hidden',
        shadowColor: '#6366f1', shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.35, shadowRadius: 22, elevation: 14,
    },
    c1: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.07)', top: -70, right: -50 },
    c2: { position: 'absolute', width: 130, height: 130, borderRadius: 65, backgroundColor: 'rgba(255,255,255,0.05)', bottom: -40, left: -10 },
    c3: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.04)', top: 30, right: 80 },
    sparkle: { position: 'absolute', top: 22, right: 80 },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    cardName: { color: '#fff', fontSize: 15, fontWeight: '700' },
    cardSub: { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 },
    amount: { color: '#fff', fontSize: 38, fontWeight: '800', marginVertical: 16, letterSpacing: -1 },
    cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    addBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.35)',
        paddingHorizontal: 22, paddingVertical: 11, borderRadius: 14,
    },
    addBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
    txnLink: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600' },

    // Sections
    section: { paddingHorizontal: 20, marginTop: 22 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 12, letterSpacing: -0.3 },

    // Tile action grid
    tileGrid: { gap: 10 },
    tile: {
        backgroundColor: '#fff', borderRadius: 16,
        paddingHorizontal: 16, paddingVertical: 14,
        flexDirection: 'row', alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
        borderWidth: 1, borderColor: Colors.border,
    },
    tileIcon: { width: 42, height: 42, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginRight: 14, position: 'relative' },
    tileLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.text },
    tileBadge: {
        position: 'absolute', top: -4, right: -4,
        minWidth: 18, height: 18, borderRadius: 9,
        justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: 4, borderWidth: 1.5, borderColor: '#fff',
    },
    tileBadgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },

    // Settings card
    card: {
        backgroundColor: '#fff', borderRadius: 20,
        borderWidth: 1, borderColor: Colors.border,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 18, paddingVertical: 14,
    },
    rowIcon: {
        width: 38, height: 38, borderRadius: 12,
        justifyContent: 'center', alignItems: 'center', marginRight: 14,
    },
    rowText: { flex: 1 },
    rowLabel: { fontSize: 14, fontWeight: '600', color: Colors.text },
    rowSub: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
    div: { height: 1, backgroundColor: Colors.border, marginHorizontal: 18 },
});
