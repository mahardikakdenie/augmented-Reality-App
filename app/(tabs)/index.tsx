import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
	return (
		<ScrollView
			contentContainerStyle={styles.container}
			showsVerticalScrollIndicator={false}>
			{/* Header */}
			<ThemedView style={styles.header}>
				<ThemedText type='title' style={styles.heroTitle}>
					Smart Packaging Scanner
				</ThemedText>
				<ThemedText style={styles.heroSubtitle}>
					Scan. Analyze. Verify.
				</ThemedText>
			</ThemedView>

			{/* Feature List */}
			<ThemedView style={styles.section}>
				<ThemedText type='subtitle' style={styles.sectionTitle}>
					Point your camera at any product packaging to:
				</ThemedText>
				{[
					'Generate a 3D preview from the 2D image',
					'Get AI-powered compliance analysis based on Indonesian National Standards (SNI)',
					'Receive instant feedback on missing labels, safety risks, or regulatory gaps',
				].map((item, i) => (
					<ThemedText key={i} style={styles.featureItem}>
						• {item}
					</ThemedText>
				))}
			</ThemedView>

			{/* CTA Button */}
			<ThemedView style={styles.ctaSection}>
				<Link href='/' asChild>
					<ThemedText style={styles.scanButton}>
						Scan Packaging with AR
					</ThemedText>
				</Link>
			</ThemedView>

			{/* How It Works */}
			<ThemedView style={styles.section}>
				<ThemedText type='subtitle' style={styles.sectionTitle}>
					How it works
				</ThemedText>
				<ThemedText style={styles.sectionDescription}>
					Your scan is processed securely:
				</ThemedText>
				{[
					'Text extraction happens on-device (privacy-first)',
					'3D model generated via Replicate AI',
					'SNI compliance evaluated by top-tier LLMs via OpenRouter',
				].map((item, i) => (
					<ThemedText key={i} style={styles.featureItem}>
						• {item}
					</ThemedText>
				))}
			</ThemedView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 24,
		paddingTop: 40,
	},
	header: {
		alignItems: 'center',
		marginBottom: 32,
		paddingHorizontal: 8,
	},
	heroTitle: {
		fontSize: 32,
		fontWeight: '800',
		textAlign: 'center',
		lineHeight: 38,
		letterSpacing: -0.5,
	},
	heroSubtitle: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
		marginTop: 8,
		opacity: 0.9,
	},
	section: {
		marginBottom: 32,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: '700',
		marginBottom: 12,
	},
	sectionDescription: {
		marginBottom: 12,
		opacity: 0.9,
	},
	featureItem: {
		paddingLeft: 18,
		lineHeight: 26,
		fontSize: 16,
		marginBottom: 6,
	},
	ctaSection: {
		alignItems: 'center',
		marginBottom: 32,
	},
	scanButton: {
		backgroundColor: '#007AFF',
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '700',
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 16,
		textAlign: 'center',
		minWidth: 240,
		// Shadow for depth (iOS & Android)
		shadowColor: '#007AFF',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 4,
	},
});
