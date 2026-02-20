import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User, Layers, Bell, Search, LucideIcon } from 'lucide-react-native';
import { View, StyleSheet, Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();

interface TabIconProps {
    Icon: LucideIcon;
    focused: boolean;
    color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ Icon, focused, color }) => (
    <View style={focused ? styles.activeIconContainer : null}>
        <Icon color={color} size={24} strokeWidth={focused ? 2.5 : 2} />
        {focused && <View style={styles.dot} />}
    </View>
);

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => <TabIcon Icon={Home} color={color} focused={focused} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => <TabIcon Icon={Search} color={color} focused={focused} />,
                }}
            />
            <Tab.Screen
                name="Ecosystem"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => <TabIcon Icon={Layers} color={color} focused={focused} />,
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => <TabIcon Icon={Bell} color={color} focused={focused} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => <TabIcon Icon={User} color={color} focused={focused} />,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderRadius: 25,
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    activeIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.primary,
        marginTop: 4,
    }
});
