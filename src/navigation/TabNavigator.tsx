/**
 * TabNavigator.tsx  —  Zero-lag navigation
 *
 * Architecture: ONE Tab.Navigator with ALL screens + custom tab bar.
 * lazy: false → all screens mount at startup → zero switch lag.
 * Custom tab bar renders HOME set or SALON set based on active route.
 *
 * Home  section routes : Home | Services | Gym   | Profile
 * Salon section routes : Salon | MyBookings | ScanQR | Profile
 * Shared               : Profile
 */
import React from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet, Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Home, Wrench, Scissors, Dumbbell,
    User, CalendarCheck, QrCode,
} from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import SalonScreen from '../screens/SalonScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACTIVE = '#E91E63';
const INACTIVE = '#9CA3AF';

// ─── Which routes belong to the Salon section ─────────────────────────────────
const SALON_ROUTES = new Set(['Salon', 'MyBookings', 'ScanQR']);

// ─── Tab descriptors ──────────────────────────────────────────────────────────
type TabItem = { target: string; Icon: any; label: string };

const HOME_ITEMS: TabItem[] = [
    { target: 'Home', Icon: Home, label: 'Home' },
    { target: 'Services', Icon: Wrench, label: 'Services' },
    { target: 'Salon', Icon: Scissors, label: 'Salon' },
    { target: 'Gym', Icon: Dumbbell, label: 'Gym' },
    { target: 'Profile', Icon: User, label: 'Profile' },
];

const SALON_ITEMS: TabItem[] = [
    { target: 'Home', Icon: Home, label: 'Home' },
    { target: 'MyBookings', Icon: CalendarCheck, label: 'Bookings' },
    { target: 'Salon', Icon: Scissors, label: 'Salon' },
    { target: 'ScanQR', Icon: QrCode, label: 'Scan QR' },
    { target: 'Profile', Icon: User, label: 'Profile' },
];

// ─── Custom tab bar ────────────────────────────────────────────────────────────
function CustomTabBar({ state, navigation }: any) {
    const currentRoute = state.routes[state.index].name;
    const inSalon = SALON_ROUTES.has(currentRoute);
    const items = inSalon ? SALON_ITEMS : HOME_ITEMS;

    return (
        <View style={s.bar}>
            {items.map((item, idx) => {
                const isActive = currentRoute === item.target;
                const color = isActive ? ACTIVE : INACTIVE;
                return (
                    <TouchableOpacity
                        key={idx}
                        onPress={() => navigation.navigate(item.target)}
                        activeOpacity={0.7}
                        style={s.tab}
                    >
                        <item.Icon
                            color={color}
                            size={22}
                            strokeWidth={isActive ? 2.4 : 1.8}
                        />
                        <Text style={[s.label, { color }]}>{item.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


// ─── Placeholder screens ──────────────────────────────────────────────────────
const MakePlaceholder = (Icon: any, title: string) => () => (
    <View style={ph.root}>
        <Icon size={38} color={ACTIVE} strokeWidth={1.5} />
        <Text style={ph.title}>{title}</Text>
    </View>
);
const ServicesScreen = MakePlaceholder(Wrench, 'Services');
const GymScreen = MakePlaceholder(Dumbbell, 'Gym');
const MyBookingsScreen = MakePlaceholder(CalendarCheck, 'My Bookings');
const ScanQRScreen = MakePlaceholder(QrCode, 'Scan QR');

const ph = StyleSheet.create({
    root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F7FA', gap: 12 },
    title: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
});

// ─── Single Tab Navigator (all screens, no unmount lag) ───────────────────────
const Tab = createBottomTabNavigator() as any;
const Stack = createNativeStackNavigator() as any;

function MainTabs() {
    return (
        <Tab.Navigator
            tabBar={(props: any) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                lazy: false,          // ← pre-mount every screen → instant switching
            }}
        >
            {/* HOME section */}
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Services" component={ServicesScreen} />
            <Tab.Screen name="Gym" component={GymScreen} />

            {/* SALON section */}
            <Tab.Screen name="Salon" component={SalonScreen} />
            <Tab.Screen name="MyBookings" component={MyBookingsScreen} />
            <Tab.Screen name="ScanQR" component={ScanQRScreen} />

            {/* SHARED */}
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

// ─── Root stack (Notifications slides in over everything) ─────────────────────
export default function TabNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{ animation: 'slide_from_right' }}
            />
        </Stack.Navigator>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        height: 62 + (Platform.OS === 'ios' ? 16 : 0),
        paddingBottom: Platform.OS === 'ios' ? 16 : 0,
        paddingHorizontal: 4,
        elevation: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 3,
    },
    label: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 2,
    },
});
