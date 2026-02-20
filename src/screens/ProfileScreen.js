import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    User,
    ChevronRight,
    Calendar,
    Heart,
    History,
    Award,
    ShieldCheck,
    LifeBuoy,
    UserPlus,
    Settings,
    CreditCard,
    Zap
} from 'lucide-react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolate
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

const ActionItem = ({ icon: Icon, label, color }) => (
    <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
        <View style={[styles.actionIconContainer, { backgroundColor: `${color}15` }]}>
            <Icon color={color} size={24} />
        </View>
        <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
);

const SettingItem = ({ icon: Icon, label, showChevron = true, highlight = false }) => (
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
    const sparkleValue = useSharedValue(0);

    useEffect(() => {
        sparkleValue.value = withRepeat(
            withTiming(1, { duration: 2000 }),
            -1,
            true
        );
    }, []);

    const animatedSparkle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(sparkleValue.value, [0, 0.5, 1], [0.3, 1, 0.3]),
            transform: [{ scale: interpolate(sparkleValue.value, [0, 1], [0.8, 1.2]) }],
        };
    });

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* User Header */}
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                    <LinearGradient
                        colors={[Colors.primary, Colors.secondary]}
                        style={styles.profileGlow}
                    />
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }}
                        style={styles.profileImage}
                    />
                </View>
                <Text style={styles.userName}>Anya Sharma</Text>
                <View style={styles.badge}>
                    <Award size={14} color={Colors.accent} />
                    <Text style={styles.badgeText}>Member since 2024</Text>
                </View>
            </View>

            {/* SlotB Cash Card */}
            <View style={styles.cardContainer}>
                <LinearGradient
                    colors={['#f59e0b', '#f97316', '#ef4444']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cashCard}
                >
                    <Animated.View style={[styles.sparkle, animatedSparkle, { top: 10, right: 30 }]}>
                        <Zap size={16} color="white" fill="white" />
                    </Animated.View>

                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>SlotB Cash Balance</Text>
                        <CreditCard color="white" size={24} opacity={0.8} />
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
                    <SettingItem icon={LifeBuoy} label="Help Center" />
                    <SettingItem icon={UserPlus} label="Invite Friends" highlight />
                    <SettingItem icon={Settings} label="App Settings" />
                </View>
            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 30,
    },
    profileImageContainer: {
        position: 'relative',
        width: 110,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileGlow: {
        position: 'absolute',
        width: 110,
        height: 110,
        borderRadius: 55,
        opacity: 0.3,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: Colors.background,
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.text,
        marginTop: 16,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 8,
        borderWidth: 1,
        borderColor: 'rgba(245, 158, 11, 0.2)',
    },
    badgeText: {
        color: Colors.accent,
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    cardContainer: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    cashCard: {
        width: '100%',
        borderRadius: 24,
        padding: 24,
        elevation: 10,
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        position: 'relative',
        overflow: 'hidden',
    },
    sparkle: {
        position: 'absolute',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        opacity: 0.9,
    },
    balanceText: {
        color: 'white',
        fontSize: 32,
        fontWeight: '800',
        marginVertical: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    topUpButton: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
    },
    topUpText: {
        color: '#f97316',
        fontWeight: '700',
        fontSize: 14,
    },
    historyLink: {
        color: 'white',
        fontSize: 13,
        fontWeight: '500',
        textDecorationLine: 'underline',
        opacity: 0.9,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionItem: {
        width: (width - 52) / 2,
        backgroundColor: Colors.surface,
        borderRadius: 24,
        padding: 20,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
    },
    actionIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionLabel: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    settingsContainer: {
        backgroundColor: Colors.surface,
        borderRadius: 24,
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingLabel: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: '500',
    },
});
