import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Modal,
    Image,
    Platform,
    Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
    Bell,
    MapPin,
    Search,
    QrCode,
    Star,
    Clock,
    Navigation2,
    BadgeCheck,
    Info,
    X,
    Scissors,
    Calendar,
    Phone,
    MessageSquare,
    Heart,
    Users,
    Sparkles,
    CheckCircle2,
    Timer,
    Hash,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_W = width * 0.62;
const RECENT_W = width * 0.62;

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
    { id: '1', label: 'All' },
    { id: '2', label: "Men's Cut" },
    { id: '3', label: "Women's" },
    { id: '4', label: 'Hair & Spa' },
    { id: '5', label: 'Nails' },
    { id: '6', label: 'Makeup' },
];

// ─── Salon Data ───────────────────────────────────────────────────────────────
// Using picsum for realistic placeholder images (different seed = different photo)
const SALONS = [
    {
        id: '1',
        name: 'Glamour Studio',
        verified: true,
        rating: 4.8,
        distance: '1.5 km',
        waitingSlots: 5,
        maxTime: 10,
        liveToken: 14,
        isOpen: true,
        price: '₹299',
        tag: 'Most Popular',
        services: ['Haircut', 'Facial', 'Manicure', 'Hair Color', 'Keratin', 'Cleanup'],
        address: 'Shop 12, Boring Road, Patna',
        phone: '+91 98765 43210',
        timings: '9:00 AM – 8:30 PM',
        image: 'https://images.unsplash.com/photo-1560066984-138daaa8e25a?w=400&h=280&fit=crop',
    },
    {
        id: '2',
        name: 'The Barbers Club',
        verified: true,
        rating: 4.8,
        distance: '1.5 km',
        waitingSlots: 0,
        maxTime: 15,
        liveToken: 22,
        isOpen: true,
        price: '₹199',
        tag: 'Top Rated',
        services: ["Men's Cut", 'Shave', 'Beard Trim', 'Hair Wash'],
        address: 'Kankarbagh Main Road, Patna',
        phone: '+91 87654 32109',
        timings: '10:00 AM – 9:00 PM',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=280&fit=crop',
    },
    {
        id: '3',
        name: 'Luxe Haven Retreat',
        verified: true,
        rating: 4.9,
        distance: '2.1 km',
        waitingSlots: 3,
        maxTime: 8,
        liveToken: 7,
        isOpen: true,
        price: '₹499',
        tag: 'Premium',
        services: ['Bridal', 'Spa', 'Body Wrap', 'Waxing', 'Hair Spa'],
        address: '4th Floor, Patliputra Colony, Patna',
        phone: '+91 76543 21098',
        timings: '10:00 AM – 9:00 PM',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=280&fit=crop',
    },
    {
        id: '4',
        name: 'Bliss Beauty Lounge',
        verified: false,
        rating: 4.6,
        distance: '0.5 km',
        waitingSlots: 8,
        maxTime: 20,
        liveToken: 31,
        isOpen: true,
        price: '₹149',
        tag: 'Budget Pick',
        services: ['Haircut', 'Threading', 'Waxing', 'Bleach', 'Facial', 'Pedicure'],
        address: 'Near Gandhi Maidan, Patna',
        phone: '+91 65432 10987',
        timings: '8:00 AM – 8:00 PM',
        image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=280&fit=crop',
    },
];

// ─── Featured carousel ────────────────────────────────────────────────────────
const FEATURED = [
    {
        id: 'f1',
        name: 'SlotB Samastipur',
        tagline: 'Premium Unisex Salon',
        offer: '20% OFF on all services',
        wait: '0 mins',
        slots: 8,
        rate: 4.8,
        accent: '#C084FC',
        gradient: ['rgba(74,26,158,0.92)', 'rgba(30,10,80,0.97)'] as [string, string],
        image: 'https://images.unsplash.com/photo-1560066984-138daaa8e25a?w=800&h=400&fit=crop',
    },
    {
        id: 'f2',
        name: 'SlotB Patna Central',
        tagline: 'Expert Barbers & Stylists',
        offer: 'Flat \u20b9100 OFF today only',
        wait: '5 mins',
        slots: 3,
        rate: 4.6,
        accent: '#60A5FA',
        gradient: ['rgba(26,35,126,0.92)', 'rgba(10,20,90,0.97)'] as [string, string],
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=400&fit=crop',
    },
    {
        id: 'f3',
        name: 'SlotB Boring Road',
        tagline: 'Luxury Spa & Salon',
        offer: 'Free blowdry \u2014 first visit',
        wait: '12 mins',
        slots: 5,
        rate: 4.9,
        accent: '#F472B6',
        gradient: ['rgba(49,27,146,0.9)', 'rgba(20,10,70,0.97)'] as [string, string],
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=400&fit=crop',
    },
];
// ─── Recent Bookings ─────────────────────────────────────────────────────────
const RECENTS = [
    {
        id: 'r1',
        name: 'Glamour Studio',
        lastService: 'Haircut + Facial',
        lastDate: 'Feb 18, 2026',
        rating: 4.8,
        distance: '1.5 km',
        waitingSlots: 5,
        maxTime: 10,
        liveToken: 14,
        isOpen: true,
        price: '₹299',
        image: 'https://images.unsplash.com/photo-1560066984-138daaa8e25a?w=400&h=280&fit=crop',
    },
    {
        id: 'r2',
        name: 'The Barbers Club',
        lastService: "Men's Cut + Beard Trim",
        lastDate: 'Feb 14, 2026',
        rating: 4.8,
        distance: '1.5 km',
        waitingSlots: 0,
        maxTime: 15,
        liveToken: 22,
        isOpen: true,
        price: '₹199',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=280&fit=crop',
    },
    {
        id: 'r3',
        name: 'Luxe Haven Retreat',
        lastService: 'Bridal Spa Package',
        lastDate: 'Feb 10, 2026',
        rating: 4.9,
        distance: '2.1 km',
        waitingSlots: 3,
        maxTime: 8,
        liveToken: 7,
        isOpen: true,
        price: '₹499',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=280&fit=crop',
    },
];
type Recent = typeof RECENTS[0];

// ─── Recent Card (premium re-book card) ─────────────────────────────────────────────
const RecentCard = ({ item }: { item: Recent }) => (
    <View style={styles.recentCard}>
        {/* Image with scrim */}
        <View style={styles.recentImgWrapper}>
            <Image source={{ uri: item.image }} style={styles.recentImg} resizeMode="cover" />
            <LinearGradient
                colors={['transparent', 'rgba(10,10,20,0.65)']}
                style={styles.cardScrim}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            {/* OPEN pill */}
            <View style={[
                styles.openGlassPill,
                !item.isOpen && { backgroundColor: 'rgba(107,114,128,0.85)' },
            ]}>
                {item.isOpen && <View style={styles.openDot} />}
                <Text style={styles.openPillText}>{item.isOpen ? 'OPEN' : 'CLOSED'}</Text>
            </View>
            {/* RE-BOOK ribbon */}
            <View style={styles.rebookRibbon}>
                <Text style={styles.rebookRibbonText}>RE-BOOK</Text>
            </View>
        </View>

        {/* Accent bar */}
        <View style={[styles.accentBar, { backgroundColor: '#7C3AED' }]} />

        <View style={styles.recentBody}>
            {/* Name */}
            <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>

            {/* Last visit pill */}
            <View style={styles.recentLastRow}>
                <Clock size={10} color="#7C3AED" strokeWidth={2} />
                <Text style={styles.recentLastText} numberOfLines={1}>{item.lastDate}  •  {item.lastService}</Text>
            </View>

            {/* Stars + distance */}
            <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} color="#F59E0B" fill="#F59E0B" />)}
                <Text style={styles.ratingNum}> {item.rating}</Text>
                <View style={styles.ratingDot} />
                <Navigation2 size={10} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.ratingText}>{item.distance}</Text>
            </View>

            {/* Live chips */}
            <View style={styles.badgesRow}>
                <View style={[styles.liveChip, { backgroundColor: item.waitingSlots > 0 ? '#DCFCE7' : '#F3F4F6' }]}>
                    <CheckCircle2 size={10} color={item.waitingSlots > 0 ? '#16A34A' : '#6B7280'} strokeWidth={2.5} />
                    <Text style={[styles.liveChipText, { color: item.waitingSlots > 0 ? '#15803D' : '#6B7280' }]}>
                        {item.waitingSlots > 0 ? `${item.waitingSlots} slots` : 'Full'}
                    </Text>
                </View>
                <View style={[styles.liveChip, { backgroundColor: '#FEE2E2' }]}>
                    <Timer size={10} color="#DC2626" strokeWidth={2.5} />
                    <Text style={[styles.liveChipText, { color: '#DC2626' }]}>~{item.maxTime} min</Text>
                </View>
                <View style={[styles.liveChip, { backgroundColor: '#F3E8FF' }]}>
                    <Hash size={10} color="#7C3AED" strokeWidth={2} />
                    <Text style={[styles.liveChipText, { color: '#7C3AED' }]}>#{item.liveToken}</Text>
                </View>
            </View>

            {/* Book Again button */}
            <TouchableOpacity activeOpacity={0.85} style={styles.bookSlotBtn}>
                <LinearGradient
                    colors={['#6D28D9', '#7C3AED']}
                    style={styles.bookSlotGrad}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Calendar size={13} color="#fff" strokeWidth={2.5} />
                    <Text style={styles.bookSlotText}>Book Again</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    </View>
);
type Salon = typeof SALONS[0];
type Featured = typeof FEATURED[0];

// ─── Instant Booking Modal ────────────────────────────────────────────────────
const InstantBookingModal = ({
    salon,
    visible,
    onClose,
}: {
    salon: Featured | null;
    visible: boolean;
    onClose: () => void;
}) => {
    if (!salon) return null;
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.ibOverlay}>
                <View style={styles.ibCard}>
                    <View style={styles.ibHeaderRow}>
                        <View style={styles.ibChip}>
                            <View style={styles.ibChipDot} />
                            <Text style={styles.ibChipText}>INSTANT BOOKING</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.ibCloseBtn}>
                            <X size={16} color="#555" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.ibSalonName}>{salon.name}</Text>
                    <View style={styles.ibStatsRow}>
                        <View style={styles.ibStat}>
                            <Text style={styles.ibStatLabel}>WAIT</Text>
                            <Text style={styles.ibStatValue}>{salon.wait}</Text>
                        </View>
                        <View style={styles.ibDivider} />
                        <View style={styles.ibStat}>
                            <Text style={styles.ibStatLabel}>RATE</Text>
                            <Text style={styles.ibStatValue}>\u2605 {salon.rate}</Text>
                        </View>
                    </View>
                    <View style={styles.ibBtnRow}>
                        <TouchableOpacity style={styles.ibViewBtn} onPress={onClose}>
                            <Text style={styles.ibViewBtnText}>VIEW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ibBookBtn} activeOpacity={0.85}>
                            <LinearGradient
                                colors={['#6C3FC5', '#4A1A9E']}
                                style={styles.ibBookBtnGrad}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.ibBookBtnText}>BOOK NOW</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// ─── Details Modal ────────────────────────────────────────────────────────────
const DetailsModal = ({
    salon,
    visible,
    onClose,
}: {
    salon: Salon | null;
    visible: boolean;
    onClose: () => void;
}) => {
    if (!salon) return null;
    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
            <View style={styles.modalRoot}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                        <X size={20} color="#1A1A2E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Salon Details</Text>
                    <TouchableOpacity style={styles.modalFavBtn}>
                        <Heart size={20} color="#E91E63" strokeWidth={2} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <Image
                        source={{ uri: salon.image }}
                        style={styles.modalHeroImage}
                        resizeMode="cover"
                    />
                    {salon.isOpen && (
                        <View style={styles.modalOpenBadge}>
                            <Text style={styles.modalOpenText}>OPEN</Text>
                        </View>
                    )}

                    <View style={styles.modalBody}>
                        <View style={styles.modalNameRow}>
                            <Text style={styles.modalSalonName}>{salon.name}</Text>
                            {salon.verified && <BadgeCheck size={20} color="#2196F3" fill="#2196F3" />}
                        </View>

                        <View style={styles.modalRatingRow}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />
                            ))}
                            <Text style={styles.modalRatingText}>{salon.rating} | {salon.distance}</Text>
                        </View>

                        {/* Live info */}
                        <View style={styles.liveRow}>
                            <View style={styles.slotsBadge}>
                                <CheckCircle2 size={13} color="#fff" strokeWidth={2.5} />
                                <Text style={styles.slotsBadgeText}>{salon.waitingSlots} Waiting Slots</Text>
                            </View>
                            <View style={styles.timeBadge}>
                                <Timer size={13} color="#fff" strokeWidth={2.5} />
                                <Text style={styles.timeBadgeText}>Max Time: {salon.maxTime} min</Text>
                            </View>
                            <View style={styles.tokenBadge}>
                                <Hash size={13} color="#fff" strokeWidth={2.5} />
                                <Text style={styles.tokenBadgeText}>Token #{salon.liveToken}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailRow}>
                            <MapPin size={16} color="#E91E63" />
                            <Text style={styles.detailText}>{salon.address}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Phone size={16} color="#E91E63" />
                            <Text style={styles.detailText}>{salon.phone}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Clock size={16} color="#E91E63" />
                            <Text style={styles.detailText}>{salon.timings}</Text>
                        </View>

                        <View style={styles.divider} />

                        <Text style={styles.modalSectionTitle}>Services Offered</Text>
                        <View style={styles.servicesWrap}>
                            {salon.services.map((s, i) => (
                                <View key={i} style={styles.serviceChip}>
                                    <Scissors size={11} color="#E91E63" />
                                    <Text style={styles.serviceChipText}>{s}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.priceRow}>
                            <View>
                                <Text style={styles.priceLabel}>Starting From</Text>
                                <Text style={styles.modalPrice}>{salon.price}</Text>
                            </View>
                            <TouchableOpacity>
                                <LinearGradient
                                    colors={['#1565C0', '#0D47A1']}
                                    style={styles.modalBookBtn}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Calendar size={15} color="#fff" strokeWidth={2.5} />
                                    <Text style={styles.modalBookBtnText}>Book My Slot</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.contactRow}>
                            <TouchableOpacity style={styles.contactBtn}>
                                <Phone size={18} color="#1565C0" />
                                <Text style={styles.contactBtnText}>Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contactBtn}>
                                <MessageSquare size={18} color="#1565C0" />
                                <Text style={styles.contactBtnText}>Message</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

// ─── Salon Card (premium horizontal portrait card) ───────────────────────────
const SalonCard = ({ salon, onDetails }: { salon: Salon; onDetails: () => void }) => (
    <View style={styles.card}>
        {/* Image block with overlay */}
        <View style={styles.cardImgWrapper}>
            <Image source={{ uri: salon.image }} style={styles.cardImg} resizeMode="cover" />

            {/* Dark scrim at bottom */}
            <LinearGradient
                colors={['transparent', 'rgba(10,10,20,0.72)']}
                style={styles.cardScrim}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />

            {/* OPEN/CLOSED glass pill */}
            <View style={[
                styles.openGlassPill,
                !salon.isOpen && { backgroundColor: 'rgba(107,114,128,0.85)' },
            ]}>
                {salon.isOpen && <View style={styles.openDot} />}
                <Text style={styles.openPillText}>{salon.isOpen ? 'OPEN' : 'CLOSED'}</Text>
            </View>

            {/* Info icon */}
            <TouchableOpacity style={styles.infoBtn} onPress={onDetails}>
                <Info size={14} color="#fff" strokeWidth={2.5} />
            </TouchableOpacity>

            {/* Price tag floating on image */}
            <View style={styles.priceBubble}>
                <Text style={styles.priceBubbleText}>{salon.price}</Text>
            </View>
        </View>

        {/* Indigo accent stripe */}
        <View style={styles.accentBar} />

        {/* Card body */}
        <View style={styles.cardBody}>
            <View style={styles.cardNameRow}>
                <Text style={styles.cardName} numberOfLines={1}>{salon.name}</Text>
                {salon.verified && <BadgeCheck size={15} color="#2196F3" fill="#2196F3" />}
            </View>

            {/* 5 stars + distance */}
            <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={11} color="#F59E0B" fill="#F59E0B" />)}
                <Text style={styles.ratingNum}> {salon.rating}</Text>
                <View style={styles.ratingDot} />
                <Navigation2 size={10} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.ratingText}>{salon.distance}</Text>
            </View>

            {/* Frosted live info chips */}
            <View style={styles.badgesRow}>
                <View style={[styles.liveChip, { backgroundColor: salon.waitingSlots > 0 ? '#DCFCE7' : '#F3F4F6' }]}>
                    <CheckCircle2 size={10} color={salon.waitingSlots > 0 ? '#16A34A' : '#6B7280'} strokeWidth={2.5} />
                    <Text style={[styles.liveChipText, { color: salon.waitingSlots > 0 ? '#15803D' : '#6B7280' }]}>
                        {salon.waitingSlots > 0 ? `${salon.waitingSlots} slots` : 'Full'}
                    </Text>
                </View>
                <View style={[styles.liveChip, { backgroundColor: '#FEE2E2' }]}>
                    <Timer size={10} color="#DC2626" strokeWidth={2.5} />
                    <Text style={[styles.liveChipText, { color: '#DC2626' }]}>~{salon.maxTime} min</Text>
                </View>
                <View style={[styles.liveChip, { backgroundColor: '#EFF6FF' }]}>
                    <Hash size={10} color="#1D4ED8" strokeWidth={2} />
                    <Text style={[styles.liveChipText, { color: '#1D4ED8' }]}>#{salon.liveToken}</Text>
                </View>
            </View>

            {/* Book button with glow */}
            <TouchableOpacity activeOpacity={0.85} style={styles.bookSlotBtn}>
                <LinearGradient
                    colors={['#1E40AF', '#1D4ED8']}
                    style={styles.bookSlotGrad}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Calendar size={13} color="#fff" strokeWidth={2.5} />
                    <Text style={styles.bookSlotText}>Book My Slot</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    </View>
);


// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SalonScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const [activeCategory, setActiveCategory] = useState('1');
    const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [featuredSalon, setFeaturedSalon] = useState<Featured | null>(null);
    const [ibVisible, setIbVisible] = useState(false);
    const [activeDot, setActiveDot] = useState(0);

    // ── Scroll-driven header collapse ──────────────────────────────────────
    const scrollY = useRef(new Animated.Value(0)).current;
    const HEADER_ROW_H = 52; // height of location+bell row (excluding inset)

    const headerRowHeight = scrollY.interpolate({
        inputRange: [0, HEADER_ROW_H],
        outputRange: [HEADER_ROW_H, 0],
        extrapolate: 'clamp',
    });
    const headerRowOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_ROW_H * 0.6],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    // Search bar gets extra shadow when it becomes the top element
    const searchShadowOpacity = scrollY.interpolate({
        inputRange: [HEADER_ROW_H - 10, HEADER_ROW_H + 10],
        outputRange: [0.06, 0.18],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#F6F7FA" />

            {/* ── STATUS BAR INSET — always visible ── */}
            <View style={{ height: insets.top, backgroundColor: '#F6F7FA' }} />

            {/* ── HEADER ROW — collapses on scroll ── */}
            <Animated.View style={[
                styles.header,
                {
                    height: headerRowHeight,
                    opacity: headerRowOpacity,
                    overflow: 'hidden',
                    paddingTop: 0,        // inset handled above
                },
            ]}>
                <TouchableOpacity style={styles.locationPill} activeOpacity={0.8}>
                    <MapPin size={14} color="#333" strokeWidth={2.2} />
                    <Text style={styles.locationText}>Salons – Patna</Text>
                    <Text style={styles.locationChevron}>▾</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bellBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Notifications')}
                >
                    <Bell size={20} color="#333" strokeWidth={2} />
                    <View style={styles.bellDot} />
                </TouchableOpacity>
            </Animated.View>

            {/* ── SEARCH BAR — always visible; becomes sticky header on scroll ── */}
            <Animated.View style={[
                styles.searchStickyWrap,
                { shadowOpacity: searchShadowOpacity },
            ]}>
                <View style={styles.searchWrapper}>
                    <Search size={18} color="#999" strokeWidth={2} style={styles.searchIcon} />
                    <Text style={styles.searchPlaceholder}>Search salons, services...</Text>
                    <TouchableOpacity style={styles.qrBtn} activeOpacity={0.8}>
                        <QrCode size={20} color="#555" strokeWidth={1.8} />
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >

                {/* ── CATEGORY CHIPS ── */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.chipsRow}
                >
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[styles.chip, activeCategory === cat.id && styles.chipActive]}
                            onPress={() => setActiveCategory(cat.id)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.chipText, activeCategory === cat.id && styles.chipTextActive]}>
                                {cat.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* ── FEATURED CAROUSEL ── */}
                <View style={styles.carouselSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        decelerationRate="fast"
                        snapToInterval={width - 32 + 12}
                        contentContainerStyle={styles.carouselContent}
                        onScroll={(e) => {
                            const idx = Math.round(e.nativeEvent.contentOffset.x / (width - 32 + 12));
                            setActiveDot(idx);
                        }}
                        scrollEventThrottle={16}
                    >
                        {FEATURED.map((f) => (
                            <View key={f.id} style={styles.heroCard}>
                                <Image source={{ uri: f.image }} style={styles.heroImg} resizeMode="cover" />
                                <LinearGradient
                                    colors={f.gradient}
                                    style={styles.heroOverlay}
                                    start={{ x: 0.1, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                />

                                {/* Live dot */}
                                <View style={styles.heroLivePill}>
                                    <View style={styles.heroLiveDot} />
                                    <Text style={styles.heroLiveText}>Open Now</Text>
                                </View>

                                {/* Bottom content */}
                                <View style={styles.heroContent}>
                                    <Text style={styles.heroName}>{f.name}</Text>
                                    <Text style={styles.heroOffer}>{f.offer}</Text>
                                    <View style={styles.heroRow}>
                                        <View style={styles.heroMeta}>
                                            <Star size={11} color="#FCD34D" fill="#FCD34D" />
                                            <Text style={styles.heroMetaText}>{f.rate}  ·  {f.wait} wait  ·  {f.slots} slots</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.heroBookBtn}
                                            activeOpacity={0.85}
                                            onPress={() => { setFeaturedSalon(f); setIbVisible(true); }}
                                        >
                                            <Text style={styles.heroBookBtnText}>Book Now</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.carouselDots}>
                        {FEATURED.map((f, i) => (
                            <View key={i} style={[
                                styles.cDot,
                                i === activeDot && { width: 20, backgroundColor: FEATURED[activeDot].accent },
                            ]} />
                        ))}
                    </View>
                </View>

                {/* ── SECTION HEADER ── */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Salons Near You</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All →</Text>
                    </TouchableOpacity>
                </View>

                {/* ── HORIZONTAL SALON CARDS ── */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardsRow}
                    decelerationRate="fast"
                    snapToInterval={CARD_W + 14}
                >
                    {SALONS.map((salon) => (
                        <SalonCard
                            key={salon.id}
                            salon={salon}
                            onDetails={() => { setSelectedSalon(salon); setModalVisible(true); }}
                        />
                    ))}
                </ScrollView>

                {/* ── SECTION: BOOK FROM RECENTS ── */}
                <View style={[styles.sectionHeader, { marginTop: 16 }]}>
                    <View>
                        <Text style={styles.sectionTitle}>Book from Recents</Text>
                        <Text style={styles.sectionSubtitle}>Your last visited salons</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All →</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.recentsRow}
                    decelerationRate="fast"
                    snapToInterval={RECENT_W + 14}
                >
                    {RECENTS.map((item) => (
                        <RecentCard key={item.id} item={item} />
                    ))}
                </ScrollView>
            </Animated.ScrollView>

            {/* ── DETAILS MODAL ── */}
            <DetailsModal
                salon={selectedSalon}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

            {/* ── INSTANT BOOKING MODAL ── */}
            <InstantBookingModal
                salon={featuredSalon}
                visible={ibVisible}
                onClose={() => setIbVisible(false)}
            />
        </View>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F6F7FA' },

    // Header — identical to HomeScreen
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingBottom: 10, backgroundColor: '#F6F7FA',
    },
    locationPill: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#ECECEC', borderRadius: 22,
        paddingHorizontal: 12, paddingVertical: 7, gap: 5,
    },
    locationText: { fontSize: 14, fontWeight: '600', color: '#222', marginLeft: 2 },
    locationChevron: { fontSize: 12, color: '#555', marginLeft: 2 },
    bellBtn: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: '#ECECEC', alignItems: 'center', justifyContent: 'center',
    },
    bellDot: {
        position: 'absolute', top: 8, right: 8,
        width: 8, height: 8, borderRadius: 4,
        backgroundColor: '#FF3B30', borderWidth: 1.5, borderColor: '#F6F7FA',
    },

    // Search sticky wrapper (becomes elevated header on scroll)
    searchStickyWrap: {
        backgroundColor: '#F6F7FA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        elevation: 4,
        zIndex: 10,
    },
    // Search — identical to HomeScreen
    searchWrapper: {
        flexDirection: 'row', alignItems: 'center',
        marginHorizontal: 16, marginBottom: 14,
        backgroundColor: '#fff', borderRadius: 28,
        paddingHorizontal: 14, paddingVertical: 11,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 6, elevation: 3,
    },
    searchIcon: { marginRight: 8 },
    searchPlaceholder: { flex: 1, fontSize: 15, color: '#aaa' },
    qrBtn: { padding: 2 },

    // Category chips
    chipsRow: { paddingHorizontal: 16, gap: 8, paddingBottom: 14 },
    chip: {
        paddingHorizontal: 16, paddingVertical: 8,
        backgroundColor: '#fff', borderRadius: 30,
        borderWidth: 1, borderColor: '#E5E7EB',
    },
    chipActive: { backgroundColor: '#E91E63', borderColor: '#E91E63' },
    chipText: { fontSize: 13, fontWeight: '600', color: '#6B7280' },
    chipTextActive: { color: '#fff' },

    // Featured carousel — minimal, clean
    carouselSection: { marginBottom: 20 },
    carouselContent: { paddingHorizontal: 16, gap: 12 },
    heroCard: {
        width: width - 32,
        height: 172,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#1E1040',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.28,
        shadowRadius: 18,
        elevation: 10,
    },
    heroImg: { position: 'absolute', width: '100%', height: '100%' },
    heroOverlay: { position: 'absolute', width: '100%', height: '100%' },
    heroLivePill: {
        position: 'absolute', top: 12, left: 12,
        flexDirection: 'row', alignItems: 'center', gap: 5,
        backgroundColor: 'rgba(0,0,0,0.35)',
        borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
    },
    heroLiveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4ADE80' },
    heroLiveText: { fontSize: 10, fontWeight: '700', color: '#fff', letterSpacing: 0.4 },
    heroContent: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 16,
    },
    heroName: { fontSize: 19, fontWeight: '800', color: '#fff', marginBottom: 3, letterSpacing: 0.2 },
    heroOffer: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 10, fontWeight: '500' },
    heroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 },
    heroMetaText: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
    heroBookBtn: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    heroBookBtnText: { fontSize: 12, fontWeight: '800', color: '#1E1040' },
    carouselDots: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 10 },
    cDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D1C4E9' },
    cDotActive: {},

    // unused stubs
    featuredCard: { display: 'none' },
    featuredLeft: {}, featuredName: {}, featuredDiscount: {},
    featuredBookBtn: {}, featuredBookBtnText: {}, featuredRight: {}, featuredImgCircle: {},
    heroBadgeRow: {}, heroPremiumBadge: {}, heroPremiumText: {}, heroLiveBadge: {},
    heroTagline: {}, heroStarsRow: {}, heroRating: {}, heroOfferPill: {}, heroOfferText: {},
    heroStatsRow: {}, heroStat: {}, heroStatDivider: {}, heroStatText: {}, heroStatBold: {},
    heroBookBtnInner: {}, heroBookArrow: {}, heroBookArrowText: {},

    // Section header
    sectionHeader: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, marginBottom: 12,
    },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
    seeAll: { fontSize: 13, fontWeight: '700', color: '#E91E63' },

    // ── Premium card styles ───────────────────────────────────────────────────
    cardsRow: { paddingHorizontal: 16, gap: 14, paddingBottom: 4 },
    card: {
        width: CARD_W,
        backgroundColor: '#fff',
        borderRadius: 22,
        overflow: 'hidden',
        shadowColor: '#1E3A8A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 20,
        elevation: 8,
    },
    cardImgWrapper: { position: 'relative' },
    cardImg: { width: CARD_W, height: CARD_W * 0.68 },
    cardScrim: {
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height: CARD_W * 0.35,
    },
    openGlassPill: {
        position: 'absolute', top: 10, left: 10,
        flexDirection: 'row', alignItems: 'center', gap: 5,
        backgroundColor: 'rgba(16,185,129,0.88)',
        borderRadius: 20, paddingHorizontal: 9, paddingVertical: 5,
    },
    openDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },
    openPillText: { fontSize: 9, fontWeight: '800', color: '#fff', letterSpacing: 0.6 },
    infoBtn: {
        position: 'absolute', top: 10, right: 10,
        width: 28, height: 28, borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center', justifyContent: 'center',
    },
    priceBubble: {
        position: 'absolute', bottom: 10, right: 10,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
    },
    priceBubbleText: { fontSize: 12, fontWeight: '800', color: '#1E3A8A' },
    accentBar: {
        height: 3,
        backgroundColor: '#1D4ED8',
        marginHorizontal: 0,
    },
    cardBody: { padding: 12, paddingTop: 10 },
    cardNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
    cardName: { fontSize: 15, fontWeight: '800', color: '#0F172A', flex: 1 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 8 },
    ratingNum: { fontSize: 12, fontWeight: '700', color: '#0F172A', marginLeft: 2 },
    ratingDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#CBD5E1', marginHorizontal: 4 },
    ratingText: { fontSize: 11, color: '#94A3B8', fontWeight: '500' },
    badgesRow: { flexDirection: 'row', gap: 5, marginBottom: 8, flexWrap: 'wrap' },
    liveChip: {
        flexDirection: 'row', alignItems: 'center', gap: 3,
        borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4,
    },
    liveChipText: { fontSize: 10, fontWeight: '700' },
    tokenRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
    tokenText: { fontSize: 11, color: '#64748B' },
    tokenNum: { fontWeight: '800', color: '#1D4ED8' },
    bookSlotBtn: { borderRadius: 30, overflow: 'hidden' },
    bookSlotGrad: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
        paddingVertical: 10, borderRadius: 30,
        shadowColor: '#1D4ED8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    bookSlotText: { fontSize: 13, fontWeight: '800', color: '#fff', letterSpacing: 0.3 },

    // old unused badge styles kept for modal compat
    slotBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 4,
        backgroundColor: '#16A34A', borderRadius: 20,
        paddingHorizontal: 8, paddingVertical: 5,
    },
    slotBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },
    maxTimeBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 4,
        backgroundColor: '#DC2626', borderRadius: 20,
        paddingHorizontal: 8, paddingVertical: 5,
    },
    maxTimeBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },

    // List cards (not used but kept for compat)
    listCard: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff', marginHorizontal: 16,
        marginBottom: 10, borderRadius: 16, overflow: 'hidden',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
    },
    listCardImg: { width: 80, height: 80 },
    listCardBody: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
    listCardName: { fontSize: 14, fontWeight: '800', color: '#1A1A2E', flex: 1 },
    listBadgesRow: { flexDirection: 'row', gap: 6, marginTop: 6 },
    listBookBtn: { paddingRight: 12, borderRadius: 20, overflow: 'hidden' },
    listBookGrad: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
    listBookText: { fontSize: 12, fontWeight: '800', color: '#fff' },

    // ── Modal ─────────────────────────────────────────────────────────────────
    modalRoot: { flex: 1, backgroundColor: '#FAFAFA' },
    modalHeader: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 18, paddingTop: Platform.OS === 'ios' ? 56 : 24, paddingBottom: 14,
        backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
    },
    modalCloseBtn: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center',
    },
    modalTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A2E' },
    modalFavBtn: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: '#FFF0F3', alignItems: 'center', justifyContent: 'center',
        borderWidth: 1, borderColor: '#FECDD3',
    },
    modalHeroImage: { width: '100%', height: 220 },
    modalOpenBadge: {
        position: 'absolute', top: 226, right: 16,
        backgroundColor: '#10B981', borderRadius: 8,
        paddingHorizontal: 10, paddingVertical: 4,
    },
    modalOpenText: { fontSize: 11, fontWeight: '800', color: '#fff' },
    modalBody: { paddingHorizontal: 20, paddingTop: 16 },
    modalNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
    modalSalonName: { fontSize: 22, fontWeight: '900', color: '#1A1A2E', flex: 1 },
    modalRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 12 },
    modalRatingText: { fontSize: 13, fontWeight: '600', color: '#6B7280', marginLeft: 6 },
    liveRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 4 },
    slotsBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
        backgroundColor: '#16A34A', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6,
    },
    slotsBadgeText: { fontSize: 11, fontWeight: '700', color: '#fff' },
    timeBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
        backgroundColor: '#DC2626', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6,
    },
    timeBadgeText: { fontSize: 11, fontWeight: '700', color: '#fff' },
    tokenBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
        backgroundColor: '#1565C0', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6,
    },
    tokenBadgeText: { fontSize: 11, fontWeight: '700', color: '#fff' },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 16 },
    detailRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
    detailText: { fontSize: 13, color: '#374151', flex: 1 },
    modalSectionTitle: { fontSize: 15, fontWeight: '800', color: '#1A1A2E', marginBottom: 10 },
    servicesWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    serviceChip: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
        backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6,
    },
    serviceChipText: { fontSize: 12, color: '#374151', fontWeight: '600' },
    priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
    priceLabel: { fontSize: 11, color: '#9CA3AF', marginBottom: 2 },
    modalPrice: { fontSize: 24, fontWeight: '900', color: '#1565C0' },
    modalBookBtn: {
        flexDirection: 'row', alignItems: 'center', gap: 7,
        borderRadius: 30, paddingHorizontal: 20, paddingVertical: 12,
    },
    modalBookBtnText: { fontSize: 14, fontWeight: '800', color: '#fff' },
    contactRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
    contactBtn: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        borderWidth: 1.5, borderColor: '#1565C0', borderRadius: 30, paddingVertical: 12,
        backgroundColor: '#EFF6FF',
    },
    contactBtnText: { fontSize: 14, fontWeight: '700', color: '#1565C0' },

    // ── Instant booking modal styles ──────────────────────────────────────────
    ibOverlay: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end', paddingHorizontal: 16, paddingBottom: 32,
    },
    ibCard: {
        backgroundColor: '#fff', borderRadius: 24, padding: 20,
        shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1, shadowRadius: 20, elevation: 10,
    },
    ibHeaderRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12,
    },
    ibChip: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        backgroundColor: '#EDE7F6', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
    },
    ibChipDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#7C3AED' },
    ibChipText: { fontSize: 11, fontWeight: '800', color: '#7C3AED', letterSpacing: 0.8 },
    ibCloseBtn: {
        width: 30, height: 30, borderRadius: 15,
        backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center',
    },
    ibSalonName: { fontSize: 22, fontWeight: '900', color: '#1A1A2E', marginBottom: 18 },
    ibStatsRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#FAFAFA', borderRadius: 16,
        padding: 16, marginBottom: 20,
    },
    ibStat: { flex: 1, alignItems: 'center' },
    ibStatLabel: { fontSize: 10, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1, marginBottom: 6 },
    ibStatValue: { fontSize: 24, fontWeight: '900', color: '#F59E0B' },
    ibDivider: { width: 1, height: 40, backgroundColor: '#E5E7EB', marginHorizontal: 8 },
    ibBtnRow: { flexDirection: 'row', gap: 10 },
    ibViewBtn: {
        flex: 1, borderWidth: 1.5, borderColor: '#D1D5DB',
        borderRadius: 30, paddingVertical: 14,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',
    },
    ibViewBtnText: { fontSize: 14, fontWeight: '800', color: '#374151' },
    ibBookBtn: { flex: 2, borderRadius: 30, overflow: 'hidden' },
    ibBookBtnGrad: { paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
    ibBookBtnText: { fontSize: 14, fontWeight: '800', color: '#fff' },

    // ── Section subtitle ─────────────────────────────────────────────────────
    sectionSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },

    // ── Book from Recents cards ───────────────────────────────────────────────
    recentsRow: { paddingHorizontal: 16, gap: 14, paddingBottom: 4 },
    recentCard: {
        width: RECENT_W,
        backgroundColor: '#fff',
        borderRadius: 22,
        overflow: 'hidden',
        shadowColor: '#6D28D9',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 20,
        elevation: 8,
    },
    recentImgWrapper: { position: 'relative' },
    recentImg: { width: RECENT_W, height: RECENT_W * 0.62 },
    recentBody: { padding: 12, paddingTop: 10 },
    recentName: { fontSize: 15, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
    recentLastRow: {
        flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 5,
        backgroundColor: '#F5F3FF', borderRadius: 20,
        paddingHorizontal: 8, paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    recentLastText: { fontSize: 10, color: '#6D28D9', fontWeight: '600', flexShrink: 1 },
    rebookRibbon: {
        position: 'absolute', bottom: 10, right: 10,
        backgroundColor: 'rgba(109,40,217,0.88)',
        borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
    },
    rebookRibbonText: { fontSize: 9, fontWeight: '900', color: '#fff', letterSpacing: 0.8 },
});
