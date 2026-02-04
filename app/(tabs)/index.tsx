import { Link } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<ThemedView style={styles.header}>
				<ThemedText type='title' style={styles.title}>
					Smart Scanner
				</ThemedText>
				<ThemedText style={styles.subtitle}>Expo Go Version</ThemedText>
			</ThemedView>

			<ThemedView style={styles.ctaContainer}>
				<ThemedText style={styles.description}>
					Gunakan kamera HP untuk scan kemasan. AI akan menganalisa
					kepatuhan SNI dan Label Halal.
				</ThemedText>

				<Link href='/scanner' asChild>
					<TouchableOpacity style={styles.button}>
						<ThemedText style={styles.buttonText}>
							Mulai Scan Kamera
						</ThemedText>
					</TouchableOpacity>
				</Link>
			</ThemedView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 24, paddingTop: 60 },
	header: { marginBottom: 40, alignItems: 'center' },
	title: { fontSize: 32, fontWeight: 'bold' },
	subtitle: { fontSize: 18, color: '#666', marginTop: 5 },
	ctaContainer: { alignItems: 'center', gap: 20 },
	description: { textAlign: 'center', fontSize: 16, lineHeight: 24 },
	button: {
		backgroundColor: '#007AFF',
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 25,
		elevation: 5,
	},
	buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
