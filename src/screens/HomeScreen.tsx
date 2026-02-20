import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
    MapPin,
    Bell,
    Search,
    QrCode,
    ChevronRight,
    Dumbbell,
    Zap,
    Wrench,
    Palette,
    Package,
    Sparkles,
    Scissors,
    Plus,
    User,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// ── service grid items ──────────────────────────────────────────────────────
const SERVICES = [
    { id: '1', label: 'Cleaning', emoji: '✨', bg: '#FFF8E7', icon: Sparkles, color: '#F4B942' },
    { id: '2', label: 'Repairs', emoji: '🔧', bg: '#EAF4FF', icon: Wrench, color: '#4A90D9' },
    { id: '3', label: 'Painting', emoji: '🎨', bg: '#FFF0F5', icon: Palette, color: '#E05C9A' },
    { id: '4', label: 'Movers', emoji: '📦', bg: '#FFF4EC', icon: Package, color: '#E07A3A' },
    { id: '5', label: 'Massage', emoji: '💆', bg: '#FFF8E7', icon: Sparkles, color: '#F4B942' },
    { id: '6', label: 'Salon', emoji: '✂️', bg: '#EAF4FF', icon: Scissors, color: '#4A90D9' },
    { id: '7', label: 'Yoga', emoji: '🧘', bg: '#F0FFF4', icon: User, color: '#3CBB78' },
    { id: '8', label: 'More', emoji: '+', bg: '#F5F5F5', icon: Plus, color: '#888888', isMore: true },
];

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#F6F7FA" />

            {/* ── HEADER ───────────────────────────────────────────────────── */}
            <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
                {/* Location pill */}
                <TouchableOpacity style={styles.locationPill} activeOpacity={0.8}>
                    <MapPin size={14} color="#333" strokeWidth={2.2} />
                    <Text style={styles.locationText}>Home – Bangalore</Text>
                    <Text style={styles.locationChevron}>▾</Text>
                </TouchableOpacity>

                {/* Bell */}
                <TouchableOpacity
                    style={styles.bellBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Notifications')}
                >
                    <Bell size={20} color="#333" strokeWidth={2} />
                    <View style={styles.bellDot} />
                </TouchableOpacity>
            </View>

            {/* ── SEARCH BAR ───────────────────────────────────────────────── */}
            <View style={styles.searchWrapper}>
                <Search size={18} color="#999" strokeWidth={2} style={styles.searchIcon} />
                <Text style={styles.searchPlaceholder}>Find gyms near you</Text>
                <TouchableOpacity style={styles.qrBtn} activeOpacity={0.8}>
                    <QrCode size={20} color="#555" strokeWidth={1.8} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ── GYM HERO CARD ─────────────────────────────────────────── */}
                <View style={styles.gymCard}>
                    {/* instant token tag */}
                    <View style={styles.instantTag}>
                        <View style={styles.greenDot} />
                        <Text style={styles.instantText}>INSTANT TOKEN BOOKING</Text>
                    </View>

                    {/* title + subtitle */}
                    <View style={styles.gymCardLeft}>
                        <Text style={styles.gymTitle}>SlotB Gym</Text>
                        <Text style={styles.gymSubtitle}>Fitness Centers &amp; Yoga</Text>

                        <TouchableOpacity style={styles.bookBtn} activeOpacity={0.85}>
                            <Text style={styles.bookBtnText}>Book Now</Text>
                        </TouchableOpacity>
                    </View>

                    {/* dumbbell icon circle */}
                    <View style={styles.gymIconCircle}>
                        <Dumbbell size={42} color="#fff" strokeWidth={1.6} />
                    </View>
                </View>

                {/* ── EXPLORE SERVICES ──────────────────────────────────────── */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Explore services</Text>
                    <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
                        <ChevronRight size={20} color="#555" />
                    </TouchableOpacity>
                </View>

                {/* Grid – 2 rows × 4 cols */}
                <View style={styles.servicesGrid}>
                    {SERVICES.map((s) => (
                        <TouchableOpacity key={s.id} style={styles.serviceItem} activeOpacity={0.75}>
                            <View style={[styles.serviceIconBox, { backgroundColor: s.bg }]}>
                                {s.isMore ? (
                                    <Plus size={26} color={s.color} strokeWidth={2.4} />
                                ) : (
                                    <Text style={styles.serviceEmoji}>{s.emoji}</Text>
                                )}
                            </View>
                            <Text style={styles.serviceLabel}>{s.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── PROMO BANNER ──────────────────────────────────────────── */}
                <TouchableOpacity activeOpacity={0.88} style={styles.promoCard}>
                    <LinearGradient
                        colors={['#FF8C00', '#FF5E00']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.promoGradient}
                    >
                        <View>
                            <Text style={styles.promoTitle}>Get 50% OFF</Text>
                            <Text style={styles.promoSub}>On your first booking</Text>
                        </View>
                        <View style={styles.promoRightBubble}>
                            <Zap size={28} color="#FF5E00" fill="#FF5E00" />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );
}

// ── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F6F7FA',
    },

    /* Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 10,
        backgroundColor: '#F6F7FA',
    },
    locationPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECECEC',
        borderRadius: 22,
        paddingHorizontal: 12,
        paddingVertical: 7,
        gap: 5,
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
        marginLeft: 2,
    },
    locationChevron: {
        fontSize: 12,
        color: '#555',
        marginLeft: 2,
    },
    bellBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ECECEC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bellDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF3B30',
        borderWidth: 1.5,
        borderColor: '#F6F7FA',
    },

    /* Search */
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 14,
        backgroundColor: '#fff',
        borderRadius: 28,
        paddingHorizontal: 14,
        paddingVertical: 11,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
    },
    searchIcon: { marginRight: 8 },
    searchPlaceholder: {
        flex: 1,
        fontSize: 15,
        color: '#aaa',
    },
    qrBtn: {
        padding: 2,
    },

    /* Scroll */
    scroll: { flex: 1 },
    scrollContent: { paddingHorizontal: 16 },

    /* Gym Card */
    gymCard: {
        backgroundColor: '#1C1C1E',
        borderRadius: 20,
        padding: 20,
        marginBottom: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 14,
        elevation: 8,
        minHeight: 150,
    },
    instantTag: {
        position: 'absolute',
        top: 16,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    greenDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: '#30D158',
    },
    instantText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#30D158',
        letterSpacing: 0.8,
    },
    gymCardLeft: {
        flex: 1,
        marginTop: 26,
    },
    gymTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 4,
    },
    gymSubtitle: {
        fontSize: 13,
        color: '#aaa',
        marginBottom: 18,
    },
    bookBtn: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 9,
        alignSelf: 'flex-start',
    },
    bookBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    gymIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.10)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },

    /* Section Header */
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    seeAllBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ECECEC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    /* Services grid */
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 22,
    },
    serviceItem: {
        width: (width - 32 - 36) / 4,
        alignItems: 'center',
        gap: 6,
    },
    serviceIconBox: {
        width: 64,
        height: 64,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 5,
        elevation: 2,
    },
    serviceEmoji: {
        fontSize: 28,
    },
    serviceLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#444',
        textAlign: 'center',
    },

    /* Promo */
    promoCard: {
        borderRadius: 18,
        overflow: 'hidden',
        shadowColor: '#FF5E00',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 7,
    },
    promoGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    promoTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#fff',
    },
    promoSub: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 2,
    },
    promoRightBubble: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
