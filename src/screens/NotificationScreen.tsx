import React, { useRef, useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Animated, StatusBar, Dimensions
} from 'react-native';
import {
    Calendar, CreditCard, Tag, Star, Bell, ChevronRight,
    CheckCircle, Gift, Zap, AlertCircle, Trash2
} from 'lucide-react-native';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

// ─── Types ───────────────────────────────────────────────────────────────────
type NotifType = 'booking' | 'payment' | 'promo' | 'reward' | 'alert' | 'system';
type Category = 'All' | 'Bookings' | 'Payments' | 'Offers';

interface Notif {
    id: string;
    type: NotifType;
    title: string;
    body: string;
    time: string;
    read: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const NOTIFICATIONS: Notif[] = [
    { id: '1', type: 'booking', title: 'Booking Confirmed!', body: 'Your salon appointment at TrimTown is confirmed for 22 Feb, 10:30 AM.', time: '2 min ago', read: false },
    { id: '2', type: 'payment', title: 'Payment Successful', body: '₹850 debited from your SlotB Cash for booking #SB-00182.', time: '1 hr ago', read: false },
    { id: '3', type: 'promo', title: '🎉 Weekend Offer!', body: 'Get 30% off on all spa bookings this weekend. Use code SLOTB30.', time: '3 hr ago', read: false },
    { id: '4', type: 'reward', title: 'Points Earned 🏆', body: 'You earned 120 reward points for your last booking. Redeem anytime!', time: '5 hr ago', read: true },
    { id: '5', type: 'booking', title: 'Reminder: Upcoming Booking', body: 'You have a haircut appointment tomorrow at GlowUp Studio, 3:00 PM.', time: 'Yesterday', read: true },
    { id: '6', type: 'alert', title: 'Profile Incomplete', body: 'Add your address and DOB to unlock exclusive member benefits.', time: 'Yesterday', read: true },
    { id: '7', type: 'promo', title: 'New Salons Near You', body: '5 top-rated salons just joined SlotB in your area. Check them out!', time: '2 days ago', read: true },
    { id: '8', type: 'payment', title: 'Refund Processed', body: '₹200 refund for cancelled booking #SB-00165 added to SlotB Cash.', time: '3 days ago', read: true },
    { id: '9', type: 'system', title: 'App Update Available', body: 'SlotB v2.1 is here with faster bookings and new features. Update now!', time: '4 days ago', read: true },
    { id: '10', type: 'reward', title: 'Referral Bonus!', body: 'Your friend Riya joined SlotB via your link. ₹50 added to your wallet!', time: '1 week ago', read: true },
];

const CATEGORIES: Category[] = ['All', 'Bookings', 'Payments', 'Offers'];

// ─── Icon config per type ────────────────────────────────────────────────────
const ICON_CONFIG: Record<NotifType, { icon: React.ElementType; color: string; bg: string }> = {
    booking: { icon: Calendar, color: '#6366f1', bg: '#eef2ff' },
    payment: { icon: CreditCard, color: '#10b981', bg: '#ecfdf5' },
    promo: { icon: Tag, color: '#f59e0b', bg: '#fffbeb' },
    reward: { icon: Gift, color: '#f43f5e', bg: '#fff1f2' },
    alert: { icon: AlertCircle, color: '#ef4444', bg: '#fff5f5' },
    system: { icon: Zap, color: '#8b5cf6', bg: '#f5f3ff' },
};

const CATEGORY_FILTER: Record<Category, NotifType[]> = {
    All: ['booking', 'payment', 'promo', 'reward', 'alert', 'system'],
    Bookings: ['booking'],
    Payments: ['payment'],
    Offers: ['promo', 'reward'],
};

// ─── Animated Item ───────────────────────────────────────────────────────────
const NotifCard: React.FC<{ item: Notif; index: number; onDismiss: (id: string) => void }> = ({ item, index, onDismiss }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(24)).current;
    const pressScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: index * 60, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: index * 60, useNativeDriver: true }),
        ]).start();
    }, []);

    const onPressIn = () => Animated.spring(pressScale, { toValue: 0.97, useNativeDriver: true }).start();
    const onPressOut = () => Animated.spring(pressScale, { toValue: 1, useNativeDriver: true }).start();
    const { icon: Icon, color, bg } = ICON_CONFIG[item.type];

    return (
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: pressScale }] }}>
            <TouchableOpacity
                style={[styles.card, !item.read && styles.cardUnread]}
                activeOpacity={1}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                {/* Unread indicator */}
                {!item.read && <View style={styles.unreadBar} />}

                <View style={[styles.iconBox, { backgroundColor: bg }]}>
                    <Icon color={color} size={20} strokeWidth={2} />
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.cardTop}>
                        <Text style={[styles.cardTitle, !item.read && styles.cardTitleBold]} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.cardTime}>{item.time}</Text>
                    </View>
                    <Text style={styles.cardText} numberOfLines={2}>{item.body}</Text>
                </View>

                <TouchableOpacity style={styles.dismissBtn} onPress={() => onDismiss(item.id)}>
                    <Trash2 size={15} color={Colors.textLight} strokeWidth={1.5} />
                </TouchableOpacity>
            </TouchableOpacity>
        </Animated.View>
    );
};

// ─── Empty State ─────────────────────────────────────────────────────────────
const EmptyState: React.FC = () => {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
            Animated.timing(opacityAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.empty, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.emptyIcon}>
                <Bell color={Colors.primary} size={32} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySub}>No notifications in this category right now.</Text>
        </Animated.View>
    );
};

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function NotificationScreen() {
    const [activeCategory, setActiveCategory] = useState<Category>('All');
    const [notifications, setNotifications] = useState<Notif[]>(NOTIFICATIONS);

    // Header slide-in animation
    const headerAnim = useRef(new Animated.Value(-20)).current;
    const headerOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerAnim, { toValue: 0, duration: 450, useNativeDriver: true }),
            Animated.timing(headerOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        ]).start();
    }, []);

    const filtered = notifications.filter(n => CATEGORY_FILTER[activeCategory].includes(n.type));
    const unreadCount = notifications.filter(n => !n.read).length;

    const dismiss = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));
    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* ── Header ── */}
            <Animated.View style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerAnim }] }]}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    {unreadCount > 0 && (
                        <View style={styles.headerBadge}>
                            <Text style={styles.headerBadgeText}>{unreadCount}</Text>
                        </View>
                    )}
                </View>
                {unreadCount > 0 && (
                    <TouchableOpacity onPress={markAllRead} style={styles.markAllBtn}>
                        <CheckCircle size={14} color={Colors.primary} strokeWidth={2} />
                        <Text style={styles.markAllText}>Mark all read</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>

            {/* ── Category Tabs ── */}
            <Animated.View style={{ opacity: headerOpacity }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabs}
                >
                    {CATEGORIES.map(cat => {
                        const isActive = cat === activeCategory;
                        return (
                            <TouchableOpacity
                                key={cat}
                                style={[styles.tab, isActive && styles.tabActive]}
                                onPress={() => setActiveCategory(cat)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{cat}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </Animated.View>

            {/* ── List ── */}
            {filtered.length === 0 ? (
                <EmptyState />
            ) : (
                <ScrollView
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                >
                    {filtered.map((item, index) => (
                        <NotifCard key={item.id} item={item} index={index} onDismiss={dismiss} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#fafbff' },

    // Header
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 58, paddingHorizontal: 20, paddingBottom: 14,
        backgroundColor: '#fff',
        borderBottomWidth: 1, borderBottomColor: Colors.border,
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
    headerBadge: {
        backgroundColor: Colors.secondary, borderRadius: 12,
        paddingHorizontal: 8, paddingVertical: 2, minWidth: 24, alignItems: 'center',
    },
    headerBadgeText: { color: '#fff', fontSize: 12, fontWeight: '800' },
    markAllBtn: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
        backgroundColor: '#ede9fe', borderRadius: 20,
        paddingHorizontal: 12, paddingVertical: 7,
    },
    markAllText: { color: Colors.primary, fontSize: 12, fontWeight: '700' },

    // Category Tabs
    tabs: { paddingHorizontal: 16, paddingVertical: 14, gap: 8 },
    tab: {
        paddingHorizontal: 18, paddingVertical: 8,
        borderRadius: 20, backgroundColor: '#f1f5f9',
        borderWidth: 1, borderColor: 'transparent',
    },
    tabActive: {
        backgroundColor: '#ede9fe', borderColor: '#c7d2fe',
    },
    tabText: { fontSize: 13, fontWeight: '600', color: Colors.textMuted },
    tabTextActive: { color: Colors.primary },

    // Notification List
    list: { flex: 1, paddingHorizontal: 16 },

    // Card
    card: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff', borderRadius: 18,
        padding: 14, marginBottom: 10,
        borderWidth: 1, borderColor: Colors.border,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
        overflow: 'hidden',
    },
    cardUnread: {
        backgroundColor: '#fafbff',
        borderColor: '#c7d2fe',
        shadowColor: Colors.primary, shadowOpacity: 0.08,
    },
    unreadBar: {
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 4, backgroundColor: Colors.primary, borderTopLeftRadius: 18, borderBottomLeftRadius: 18,
    },
    iconBox: {
        width: 44, height: 44, borderRadius: 14,
        justifyContent: 'center', alignItems: 'center', marginRight: 12,
        flexShrink: 0,
    },
    cardBody: { flex: 1, marginRight: 8 },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    cardTitle: { fontSize: 14, fontWeight: '500', color: Colors.text, flex: 1, marginRight: 8 },
    cardTitleBold: { fontWeight: '700' },
    cardTime: { fontSize: 11, color: Colors.textMuted, flexShrink: 0 },
    cardText: { fontSize: 12, color: Colors.textMuted, lineHeight: 17 },
    dismissBtn: { padding: 6 },

    // Empty
    empty: {
        flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 48,
    },
    emptyIcon: {
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: '#ede9fe', justifyContent: 'center', alignItems: 'center',
        marginBottom: 20,
    },
    emptyTitle: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 8 },
    emptySub: { fontSize: 14, color: Colors.textMuted, textAlign: 'center', lineHeight: 22 },
});
