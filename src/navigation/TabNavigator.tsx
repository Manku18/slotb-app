import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User, Layers, Bell, Search } from 'lucide-react-native';
import { View, StyleSheet, Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabBarItem,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            <Home color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            <Search color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Ecosystem"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            <Layers color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            <Bell color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            <User color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        height: Platform.OS === 'ios' ? 84 : 68,
        paddingBottom: Platform.OS === 'ios' ? 20 : 6,
        paddingTop: Platform.OS === 'ios' ? 8 : 10,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
    },
    tabBarItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: 0,
        paddingBottom: 0,
    },
    activeTab: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ede9fe',
        width: 46,
        height: 46,
        borderRadius: 14,
    },
    inactiveTab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 46,
        height: 46,
    },
});
