import React, { useRef, useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Animated, StatusBar
} from 'react-native';
import {
    Calendar, CreditCard, Tag, Star, Bell,
    Gift, Zap, AlertCircle, Trash2, CheckCheck,
    ShoppingBag, Megaphone
} from 'lucide-react-native';
import { Colors } from '../constants/Colors';

// ─── Types ───────────────────────────────────────────────────────────────────
type NotifType = 'booking' | 'payment' | 'promo' | 'reward' | 'alert' | 'system';

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
    { id: '1', type: 'booking', title: 'Booking Confirmed', body: 'TrimTown • 22 Feb, 10:30 AM', time: '2m', read: false },
    { id: '2', type: 'payment', title: 'Payment Successful', body: '₹850 debited • Booking #SB-00182', time: '1h', read: false },
    { id: '3', type: 'promo', title: 'Weekend 30% Off!', body: 'All spa bookings • Code SLOTB30', time: '3h', read: false },
    { id: '4', type: 'reward', title: '120 Points Earned 🏆', body: 'From your last booking', time: '5h', read: true },
    { id: '5', type: 'booking', title: 'Booking Reminder', body: 'GlowUp Studio • Tomorrow 3:00 PM', time: 'Yest', read: true },
    { id: '6', type: 'alert', title: 'Profile Incomplete', body: 'Add address to unlock benefits', time: 'Yest', read: true },
    { id: '7', type: 'promo', title: '5 New Salons Near You', body: 'Top rated • Just joined SlotB', time: '2d', read: true },
    { id: '8', type: 'payment', title: 'Refund Processed', body: '₹200 added to SlotB Cash', time: '3d', read: true },
    { id: '9', type: 'system', title: 'App Update Available', body: 'SlotB v2.1 • Faster bookings', time: '4d', read: true },
    { id: '10', type: 'reward', title: 'Referral Bonus!', body: '₹50 added • Riya joined SlotB', time: '1w', read: true },
];

// ─── Type → icon config ────────────────────────────────────────────────────
const TYPE: Record<NotifType, { icon: React.ElementType; color: string; bg: string }> = {
    booking: { icon: Calendar, color: '#6366f1', bg: '#eef2ff' },
    payment: { icon: CreditCard, color: '#10b981', bg: '#ecfdf5' },
    promo: { icon: Megaphone, color: '#f59e0b', bg: '#fffbeb' },
    reward: { icon: Gift, color: '#f43f5e', bg: '#fff1f2' },
    alert: { icon: AlertCircle, color: '#ef4444', bg: '#fff5f5' },
    system: { icon: Zap, color: '#8b5cf6', bg: '#f5f3ff' },
};

// ─── Category icon tabs ────────────────────────────────────────────────────
const TABS = [
    { key: 'All', icon: Bell, types: ['booking', 'payment', 'promo', 'reward', 'alert', 'system'] },
    { key: 'Bookings', icon: Calendar, types: ['booking'] },
    { key: 'Payments', icon: CreditCard, types: ['payment'] },
    { key: 'Offers', icon: Tag, types: ['promo', 'reward'] },
    { key: 'Alerts', icon: AlertCircle, types: ['alert', 'system'] },
] as const;

// ─── Animated Card ────────────────────────────────────────────────────────────
const NotifItem: React.FC<{ item: Notif; index: number; onDismiss: (id: string) => void }> = ({ item, index, onDismiss }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(16)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 350, delay: index * 50, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 350, delay: index * 50, useNativeDriver: true }),
        ]).start();
    }, []);

    const { icon: Icon, color, bg } = TYPE[item.type];

    return (
        <Animated.View style={[styles.item, { opacity, transform: [{ translateY }] }]}>
            {!item.read && <View style={styles.unreadStripe} />}

            {/* Icon */}
            <View style={[styles.iconBox, { backgroundColor: bg }]}>
                <Icon color={color} size={20} strokeWidth={2} />
                {!item.read && <View style={[styles.unreadDot, { backgroundColor: color }]} />}
            </View>

            {/* Text */}
            <View style={styles.textBox}>
                <Text style={[styles.notifTitle, !item.read && { fontWeight: '700' }]} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.notifBody} numberOfLines={1}>{item.body}</Text>
            </View>

            {/* Time + dismiss */}
            <View style={styles.rightCol}>
                <Text style={styles.time}>{item.time}</Text>
                <TouchableOpacity onPress={() => onDismiss(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Trash2 size={14} color={Colors.textLight} strokeWidth={1.5} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

// ─── Section header ───────────────────────────────────────────────────────────
const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
    <Text style={styles.sectionLabel}>{label}</Text>
);

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function NotificationScreen() {
    const [activeTab, setActiveTab] = useState<string>('All');
    const [notifs, setNotifs] = useState<Notif[]>(NOTIFICATIONS);

    const headerY = useRef(new Animated.Value(-10)).current;
    const headerOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerY, { toValue: 0, duration: 380, useNativeDriver: true }),
            Animated.timing(headerOpacity, { toValue: 1, duration: 380, useNativeDriver: true }),
        ]).start();
    }, []);

    const dismissed = (id: string) => setNotifs(p => p.filter(n => n.id !== id));
    const markAllRead = () => setNotifs(p => p.map(n => ({ ...n, read: true })));

    const activeTypes = TABS.find(t => t.key === activeTab)?.types ?? [];
    const filtered = notifs.filter(n => (activeTypes as string[]).includes(n.type));
    const unread = notifs.filter(n => !n.read);
    const read = filtered.filter(n => n.read);
    const unreadFiltered = filtered.filter(n => !n.read);

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* ── Header ── */}
            <Animated.View style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerY }] }]}>
                <View style={styles.headerLeft}>
                    <Bell color={Colors.text} size={22} strokeWidth={2.5} />
                    {unread.length > 0 && (
                        <View style={styles.badge}><Text style={styles.badgeText}>{unread.length}</Text></View>
                    )}
                </View>
                {unread.length > 0 && (
                    <TouchableOpacity onPress={markAllRead} style={styles.markBtn}>
                        <CheckCheck size={14} color={Colors.primary} strokeWidth={2.5} />
                        <Text style={styles.markBtnText}>Mark read</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>

            {/* ── Icon category tabs ── */}
            <Animated.View style={{ opacity: headerOpacity }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
                    {TABS.map(tab => {
                        const active = tab.key === activeTab;
                        const TabIcon = tab.icon;
                        return (
                            <TouchableOpacity
                                key={tab.key}
                                style={[styles.tab, active && styles.tabActive]}
                                onPress={() => setActiveTab(tab.key)}
                                activeOpacity={0.75}
                            >
                                <TabIcon color={active ? Colors.primary : Colors.textMuted} size={16} strokeWidth={active ? 2.5 : 2} />
                                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.key}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </Animated.View>

            {/* ── List ── */}
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                {unreadFiltered.length > 0 && <SectionHeader label="New" />}
                {unreadFiltered.map((n, i) => (
                    <NotifItem key={n.id} item={n} index={i} onDismiss={dismissed} />
                ))}

                {read.length > 0 && <SectionHeader label="Earlier" />}
                {read.map((n, i) => (
                    <NotifItem key={n.id} item={n} index={i + unreadFiltered.length} onDismiss={dismissed} />
                ))}

                {filtered.length === 0 && (
                    <View style={styles.empty}>
                        <Bell size={32} color={Colors.textLight} strokeWidth={1.5} />
                        <Text style={styles.emptyText}>Nothing here yet</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#fafbff' },

    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 58, paddingHorizontal: 20, paddingBottom: 12,
        backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: Colors.border,
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    badge: {
        backgroundColor: Colors.secondary, borderRadius: 10,
        minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5,
    },
    badgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
    markBtn: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
        backgroundColor: '#ede9fe', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
    },
    markBtnText: { color: Colors.primary, fontSize: 12, fontWeight: '700' },

    // Tabs
    tabs: { paddingHorizontal: 16, paddingVertical: 10, gap: 6 },
    tab: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
        paddingHorizontal: 14, paddingVertical: 7,
        backgroundColor: '#f1f5f9', borderRadius: 20,
        borderWidth: 1, borderColor: 'transparent',
    },
    tabActive: { backgroundColor: '#ede9fe', borderColor: '#c7d2fe' },
    tabLabel: { fontSize: 12, fontWeight: '600', color: Colors.textMuted },
    tabLabelActive: { color: Colors.primary },

    // List
    list: { flex: 1, paddingHorizontal: 16 },
    sectionLabel: {
        fontSize: 11, fontWeight: '700', color: Colors.textMuted,
        textTransform: 'uppercase', letterSpacing: 0.8,
        marginTop: 16, marginBottom: 8, marginLeft: 2,
    },

    // Item — slim row
    item: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff', borderRadius: 16,
        paddingHorizontal: 14, paddingVertical: 12,
        marginBottom: 8,
        borderWidth: 1, borderColor: Colors.border,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
        position: 'relative', overflow: 'hidden',
    },
    unreadStripe: {
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 3, backgroundColor: Colors.primary,
        borderTopLeftRadius: 16, borderBottomLeftRadius: 16,
    },
    iconBox: {
        width: 40, height: 40, borderRadius: 12,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 12, flexShrink: 0, position: 'relative',
    },
    unreadDot: {
        position: 'absolute', top: 0, right: 0,
        width: 8, height: 8, borderRadius: 4,
        borderWidth: 1.5, borderColor: '#fff',
    },
    textBox: { flex: 1, marginRight: 8 },
    notifTitle: { fontSize: 13, fontWeight: '500', color: Colors.text, marginBottom: 2 },
    notifBody: { fontSize: 12, color: Colors.textMuted },
    rightCol: { alignItems: 'flex-end', gap: 6, flexShrink: 0 },
    time: { fontSize: 11, color: Colors.textMuted, fontWeight: '500' },

    // Empty
    empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
    emptyText: { fontSize: 15, color: Colors.textMuted, fontWeight: '500' },
});
