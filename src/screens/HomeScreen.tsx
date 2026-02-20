import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Modal,
    Image,
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
    Star,
    Clock,
    Brush,
    Truck,
    Flower2,
    MoreHorizontal,
    Wind,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// ── service grid items ──────────────────────────────────────────────────────
const SERVICES = [
    { id: '1', label: 'Cleaning', icon: Wind, color: '#0EA5E9', bg: '#F0F9FF' },
    { id: '2', label: 'Repairs', icon: Wrench, color: '#6366F1', bg: '#EEF2FF' },
    { id: '3', label: 'Painting', icon: Palette, color: '#EC4899', bg: '#FDF2F8' },
    { id: '4', label: 'Movers', icon: Truck, color: '#F59E0B', bg: '#FFFBEB' },
    { id: '5', label: 'Massage', icon: Flower2, color: '#8B5CF6', bg: '#F5F3FF' },
    { id: '6', label: 'Salon', icon: Scissors, color: '#E91E63', bg: '#FFF1F2' },
    { id: '7', label: 'Yoga', icon: User, color: '#10B981', bg: '#ECFDF5' },
    { id: '8', label: 'More', icon: MoreHorizontal, color: '#6B7280', bg: '#F9FAFB', isMore: true },
];

const TOP_SALONS = [
    {
        id: 'ts1',
        name: 'Glamour Studio & Spa',
        rating: 4.9,
        reviews: 312,
        wait: '12 min',
        distance: '0.8 km',
        price: 299,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1560066984-138daaa8e25a?w=400&h=300&fit=crop',
    },
    {
        id: 'ts2',
        name: 'Luxe Haven Retreat',
        rating: 4.8,
        reviews: 245,
        wait: '20 min',
        distance: '1.2 km',
        price: 499,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop',
    },
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
                        <TouchableOpacity
                            key={s.id}
                            style={styles.serviceItem}
                            activeOpacity={0.7}
                            onPress={() => s.label === 'Salon' ? navigation.navigate('Salon') : null}
                        >
                            <View style={[styles.serviceIconBox, { backgroundColor: s.bg }]}>
                                <s.icon size={22} color={s.color} strokeWidth={2.2} />
                            </View>
                            <Text style={styles.serviceLabel}>{s.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── TOP SALONS NEAR YOU ───────────────────────────────────── */}
                <View style={[styles.sectionHeader, { marginTop: 8 }]}>
                    <Text style={styles.sectionTitle}>Top Salons Near You</Text>
                    <TouchableOpacity
                        style={styles.seeAllBtn}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Salon')}
                    >
                        <ChevronRight size={20} color="#555" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.topSalonsRow}
                >
                    {TOP_SALONS.map((salon) => (
                        <TouchableOpacity key={salon.id} style={styles.tsCard} activeOpacity={0.9}>
                            <Image source={{ uri: salon.image }} style={styles.tsImage} />
                            {salon.isOpen && (
                                <View style={styles.tsOpenBadge}>
                                    <Text style={styles.tsOpenText}>Open</Text>
                                </View>
                            )}
                            <View style={styles.tsInfo}>
                                <View style={styles.tsNameRow}>
                                    <Text style={styles.tsName} numberOfLines={1}>{salon.name}</Text>
                                    <View style={styles.tsVerified}>
                                        <Text style={{ color: '#fff', fontSize: 8 }}>✓</Text>
                                    </View>
                                </View>
                                <View style={styles.tsRatingRow}>
                                    <Star size={14} color="#FBBF24" fill="#FBBF24" />
                                    <Text style={styles.tsRating}>{salon.rating}</Text>
                                    <Text style={styles.tsReviews}>({salon.reviews} reviews)</Text>
                                </View>
                                <View style={styles.tsMetaRow}>
                                    <View style={styles.tsMetaItem}>
                                        <Clock size={12} color="#F87171" strokeWidth={2.5} />
                                        <Text style={styles.tsMetaText}>{salon.wait} wait</Text>
                                    </View>
                                    <View style={styles.tsMetaItem}>
                                        <MapPin size={12} color="#9CA3AF" strokeWidth={2.5} />
                                        <Text style={styles.tsMetaText}>{salon.distance}</Text>
                                    </View>
                                </View>
                                <View style={styles.tsFooter}>
                                    <Text style={styles.tsPriceLabel}>From <Text style={styles.tsPrice}>₹{salon.price}</Text></Text>
                                    <TouchableOpacity style={styles.tsBookBtn}>
                                        <Text style={styles.tsBookBtnText}>Book Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* ── PROMO BANNER ─────────────────────────────────────────── */}
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
        marginBottom: 24,
    },
    serviceItem: {
        width: (width - 32 - 36) / 4,
        alignItems: 'center',
        marginBottom: 8,
    },
    serviceIconBox: {
        width: 62,
        height: 62,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    serviceLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1F2937',
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

    /* Top Salons */
    topSalonsRow: {
        paddingHorizontal: 16,
        gap: 16,
        paddingBottom: 20,
    },
    tsCard: {
        width: 280,
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
    },
    tsImage: {
        width: '100%',
        height: 140,
        backgroundColor: '#f3f4f6',
    },
    tsOpenBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    tsOpenText: {
        color: '#166534',
        fontSize: 11,
        fontWeight: '700',
    },
    tsInfo: {
        padding: 14,
    },
    tsNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    tsName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1F2937',
        flex: 1,
    },
    tsVerified: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tsRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 10,
    },
    tsRating: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1F2937',
    },
    tsReviews: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    tsMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
    },
    tsMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tsMetaText: {
        fontSize: 11,
        color: '#4B5563',
        fontWeight: '600',
    },
    tsFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 12,
    },
    tsPriceLabel: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    tsPrice: {
        fontSize: 16,
        fontWeight: '800',
        color: '#E91E63',
    },
    tsBookBtn: {
        backgroundColor: '#E91E63',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 15,
    },
    tsBookBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
});
