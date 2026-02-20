import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, LayoutGrid, Scissors, Dumbbell, User } from 'lucide-react-native';
import { View, Text, StyleSheet, Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';

// Placeholder screens for Services, Salon, Gym
const ServicesScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F7FA' }}>
        <Text style={{ fontSize: 18, color: '#555' }}>Services Coming Soon</Text>
    </View>
);
const SalonScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F7FA' }}>
        <Text style={{ fontSize: 18, color: '#555' }}>Salon Coming Soon</Text>
    </View>
);
const GymScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F7FA' }}>
        <Text style={{ fontSize: 18, color: '#555' }}>Gym Coming Soon</Text>
    </View>
);

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = '#FF7A00';   // Orange – matches screenshot active tab
const INACTIVE_COLOR = '#9E9E9E';

export default function TabNavigator() {
    return (
        <Tab.Navigator
            id="MainTabs"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: ACTIVE_COLOR,
                tabBarInactiveTintColor: INACTIVE_COLOR,
                tabBarShowLabel: true,
                tabBarLabelStyle: styles.label,
                tabBarItemStyle: styles.tabBarItem,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Home
                            color={color}
                            size={23}
                            strokeWidth={focused ? 2.5 : 2}
                            fill={focused ? ACTIVE_COLOR : 'none'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Services"
                component={ServicesScreen}
                options={{
                    tabBarLabel: 'Services',
                    tabBarIcon: ({ color, focused }) => (
                        <LayoutGrid color={color} size={23} strokeWidth={focused ? 2.5 : 2} />
                    ),
                }}
            />
            <Tab.Screen
                name="Salon"
                component={SalonScreen}
                options={{
                    tabBarLabel: 'Salon',
                    tabBarIcon: ({ color, focused }) => (
                        <Scissors color={color} size={23} strokeWidth={focused ? 2.5 : 2} />
                    ),
                }}
            />
            <Tab.Screen
                name="Gym"
                component={GymScreen}
                options={{
                    tabBarLabel: 'Gym',
                    tabBarIcon: ({ color, focused }) => (
                        <Dumbbell color={color} size={23} strokeWidth={focused ? 2.5 : 2} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <User color={color} size={23} strokeWidth={focused ? 2.5 : 2} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF',
        height: Platform.OS === 'ios' ? 88 : 64,
        paddingBottom: Platform.OS === 'ios' ? 24 : 8,
        paddingTop: 8,
        elevation: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
    },
    tabBarItem: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    label: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: -2,
    },
});
