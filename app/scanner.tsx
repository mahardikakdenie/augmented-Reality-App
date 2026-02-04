import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Komponen Visual Bar untuk Tab 2 (Grafik Nilai)
const ScoreBar = ({
	label,
	score,
	color,
	valueText,
}: {
	label: string;
	score: number;
	color: string;
	valueText: string;
}) => (
	<View style={styles.scoreContainer}>
		<View style={styles.scoreHeader}>
			<Text style={styles.scoreLabel}>{label}</Text>
			<Text style={[styles.scoreValueText, { color }]}>{valueText}</Text>
		</View>
		<View style={styles.scoreBarBackground}>
			<View
				style={[
					styles.scoreBarFill,
					{ width: `${score}%`, backgroundColor: color },
				]}
			/>
		</View>
	</View>
);

export default function ScannerScreen() {
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef<CameraView>(null);
	const router = useRouter();

	// REF Animasi
	const scanAnimRef = useRef<LottieView>(null);
	const successAnimRef = useRef<LottieView>(null);

	// STATE Tahapan & Tab
	const [stage, setStage] = useState<
		'standby' | 'scanning' | 'successAnimation' | 'showCard'
	>('standby');
	const [activeTab, setActiveTab] = useState<'details' | 'analysis'>(
		'details',
	); // State untuk Tab Aktif

	useEffect(() => {
		if (stage === 'scanning') scanAnimRef.current?.play();
		if (stage === 'successAnimation') successAnimRef.current?.play();
	}, [stage]);

	if (!permission) return <View style={styles.container} />;
	if (!permission.granted) {
		return (
			<View style={styles.containerCentered}>
				<Text style={styles.message}>Butuh izin kamera</Text>
				<TouchableOpacity
					style={styles.permissionBtn}
					onPress={requestPermission}>
					<Text style={styles.permissionBtnText}>Berikan Izin</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const handleStartScan = () => {
		setStage('scanning');
		setActiveTab('details'); // Reset tab ke awal saat scan baru
		setTimeout(() => {
			setStage('successAnimation');
		}, 3000);
	};

	const onSuccessAnimationFinish = () => {
		setStage('showCard');
	};

	const handleReset = () => {
		setStage('standby');
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle='light-content' />

			{/* LAYER 1: KAMERA */}
			<CameraView
				style={StyleSheet.absoluteFill}
				facing='back'
				ref={cameraRef}
			/>

			{/* LAYER 2: ANIMASI */}
			<View style={styles.animationLayer} pointerEvents='none'>
				{stage === 'scanning' && (
					<LottieView
						ref={scanAnimRef}
						// Pastikan file ini ada atau gunakan URL
						source={require('@/assets/animations/scanner_loop.json')}
						style={styles.lottieScanner}
						loop={true}
						autoPlay={true}
						speed={1.5}
					/>
				)}
				{stage === 'successAnimation' && (
					<LottieView
						ref={successAnimRef}
						// Pastikan file ini ada atau gunakan URL
						source={require('@/assets/animations/success_burst.json')}
						style={styles.lottieSuccess}
						loop={false}
						autoPlay={true}
						onAnimationFinish={onSuccessAnimationFinish}
					/>
				)}
			</View>

			{/* LAYER 3: UI CONTROLS */}
			<SafeAreaView style={styles.uiContainer} pointerEvents='box-none'>
				{/* Header Back */}
				<View style={styles.headerArea}>
					<TouchableOpacity
						style={styles.topButton}
						onPress={() => router.back()}>
						<Ionicons name='arrow-back' size={24} color='white' />
					</TouchableOpacity>
				</View>

				{/* Center: AR CARD DENGAN TAB */}
				<View style={styles.centerArea} pointerEvents='box-none'>
					{stage === 'showCard' && (
						<View style={styles.arCard}>
							{/* === BAGIAN HEADER KARTU (JUDUL) === */}
							<View style={styles.cardHeader}>
								<View style={styles.iconContainer}>
									<Ionicons
										name='scan-circle'
										size={32}
										color='#007AFF'
									/>
								</View>
								<View>
									<Text style={styles.productName}>
										Kopi Arabika Premium
									</Text>
									<Text style={styles.productType}>
										Minuman Serbuk Instan
									</Text>
								</View>
							</View>

							{/* === BAGIAN TAB SWITCHER === */}
							<View style={styles.tabContainer}>
								<TouchableOpacity
									style={[
										styles.tabButton,
										activeTab === 'details' &&
											styles.activeTabButton,
									]}
									onPress={() => setActiveTab('details')}>
									<Text
										style={[
											styles.tabText,
											activeTab === 'details' &&
												styles.activeTabText,
										]}>
										Detail Produk
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={[
										styles.tabButton,
										activeTab === 'analysis' &&
											styles.activeTabButton,
									]}
									onPress={() => setActiveTab('analysis')}>
									<Text
										style={[
											styles.tabText,
											activeTab === 'analysis' &&
												styles.activeTabText,
										]}>
										Penilaian AI
									</Text>
								</TouchableOpacity>
							</View>

							{/* === BAGIAN ISI KONTEN (BERUBAH SESUAI TAB) === */}
							<View style={styles.contentContainer}>
								{/* KONTEN TAB 1: DETAIL PRODUK */}
								{activeTab === 'details' ? (
									<View>
										<View style={styles.infoRow}>
											<Ionicons
												name='barcode-outline'
												size={20}
												color='#666'
											/>
											<Text style={styles.infoText}>
												BPOM RI MD 123456789
											</Text>
										</View>
										<View style={styles.infoRow}>
											<Ionicons
												name='business-outline'
												size={20}
												color='#666'
											/>
											<Text style={styles.infoText}>
												PT. Kopi Nusantara Jaya
											</Text>
										</View>
										<View style={styles.divider} />
										<Text style={styles.sectionLabel}>
											Komposisi Utama:
										</Text>
										<Text style={styles.descriptionText}>
											Biji kopi pilihan (70%), Gula aren,
											Krimer nabati, Perisa alami vanila.
										</Text>
									</View>
								) : (
									// KONTEN TAB 2: PENILAIAN AI (GRAFIK)
									<View>
										<View style={styles.badgeRow}>
											<View
												style={[
													styles.badge,
													{
														backgroundColor:
															'#E8F5E9',
													},
												]}>
												<Text
													style={{
														color: '#2E7D32',
														fontWeight: 'bold',
													}}>
													✅ SNI Valid
												</Text>
											</View>
											<View
												style={[
													styles.badge,
													{
														backgroundColor:
															'#E3F2FD',
													},
												]}>
												<Text
													style={{
														color: '#1565C0',
														fontWeight: 'bold',
													}}>
													💧 Halal
												</Text>
											</View>
										</View>

										{/* Grafik Batang (Progress Bars) */}
										<ScoreBar
											label='Kepatuhan Label'
											score={95}
											color='#4CD964'
											valueText='Sangat Baik'
										/>
										<ScoreBar
											label='Kadar Gula'
											score={40}
											color='#FFCC00'
											valueText='Sedang (5g)'
										/>
										<ScoreBar
											label='Resiko Bahan Pengawet'
											score={10}
											color='#007AFF'
											valueText='Rendah'
										/>
									</View>
								)}
							</View>
						</View>
					)}
				</View>

				{/* Footer Controls */}
				<View style={styles.bottomArea}>
					{(stage === 'standby' || stage === 'scanning') && (
						<View style={{ alignItems: 'center' }}>
							<Text style={styles.hintText}>
								{stage === 'scanning'
									? 'Memindai...'
									: 'Tap untuk Scan'}
							</Text>
							<TouchableOpacity
								style={[
									styles.captureButton,
									stage === 'scanning' &&
										styles.captureButtonScanning,
								]}
								onPress={handleStartScan}
								disabled={stage === 'scanning'}>
								<View
									style={[
										styles.innerCircle,
										stage === 'scanning' &&
											styles.innerCircleScanning,
									]}
								/>
							</TouchableOpacity>
						</View>
					)}

					{stage === 'showCard' && (
						<TouchableOpacity
							style={styles.resetButton}
							onPress={handleReset}>
							<Ionicons
								name='refresh'
								size={24}
								color='white'
								style={{ marginRight: 8 }}
							/>
							<Text style={styles.resetText}>Scan Ulang</Text>
						</TouchableOpacity>
					)}
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: 'black' },
	containerCentered: {
		flex: 1,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
	},
	message: { color: 'white', marginBottom: 20 },
	permissionBtn: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8 },
	permissionBtnText: { color: 'white', fontWeight: 'bold' },

	// Animasi
	animationLayer: {
		...StyleSheet.absoluteFillObject,
		zIndex: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	lottieScanner: { width: width * 0.8, height: width * 0.8 },
	lottieSuccess: { width: width * 0.6, height: width * 0.6 },

	// UI Container
	uiContainer: { flex: 1, justifyContent: 'space-between', zIndex: 10 },
	headerArea: {
		paddingTop: Platform.OS === 'android' ? 40 : 10,
		paddingHorizontal: 20,
	},
	centerArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	bottomArea: {
		paddingBottom: 50,
		alignItems: 'center',
		height: 150,
		justifyContent: 'flex-end',
	},
	topButton: {
		width: 44,
		height: 44,
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderRadius: 22,
		justifyContent: 'center',
		alignItems: 'center',
	},

	// === STYLING KARTU AR BARU ===
	arCard: {
		width: width * 0.9,
		backgroundColor: 'white',
		borderRadius: 24,
		overflow: 'hidden', // Agar border radius rapi
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 20,
		elevation: 10,
	},

	// Header Kartu
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#F8F9FA',
	},
	iconContainer: { marginRight: 15 },
	productName: { fontSize: 18, fontWeight: '800', color: '#333' },
	productType: { fontSize: 14, color: '#666', marginTop: 2 },

	// Tab Switcher Styles
	tabContainer: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#EEE',
	},
	tabButton: { flex: 1, paddingVertical: 15, alignItems: 'center' },
	activeTabButton: { borderBottomWidth: 3, borderBottomColor: '#007AFF' },
	tabText: { fontSize: 15, fontWeight: '600', color: '#999' },
	activeTabText: { color: '#007AFF', fontWeight: '700' },

	// Isi Konten
	contentContainer: { padding: 20, minHeight: 200 }, // Min height agar kartu tidak goyang saat ganti tab

	// Konten Tab 1 (Detail)
	infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
	infoText: { marginLeft: 10, fontSize: 15, color: '#444' },
	divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
	sectionLabel: {
		fontSize: 14,
		fontWeight: '700',
		color: '#333',
		marginBottom: 8,
	},
	descriptionText: { fontSize: 14, color: '#555', lineHeight: 22 },

	// Konten Tab 2 (Analisa - Score Bar)
	badgeRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
	badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },

	scoreContainer: { marginBottom: 16 },
	scoreHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 6,
	},
	scoreLabel: { fontSize: 14, fontWeight: '600', color: '#555' },
	scoreValueText: { fontSize: 14, fontWeight: '700' },
	scoreBarBackground: {
		height: 8,
		backgroundColor: '#F0F0F0',
		borderRadius: 4,
		overflow: 'hidden',
	},
	scoreBarFill: { height: '100%', borderRadius: 4 },

	// Tombol Bawah
	hintText: { color: 'white', marginBottom: 20, fontWeight: '600' },
	captureButton: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: 'rgba(255,255,255,0.3)',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 4,
		borderColor: 'white',
	},
	captureButtonScanning: {
		borderColor: '#007AFF',
		backgroundColor: 'rgba(0,122,255,0.2)',
	},
	innerCircle: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: 'white',
	},
	innerCircleScanning: {
		backgroundColor: '#007AFF',
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	resetButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FF3B30',
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 30,
		elevation: 5,
	},
	resetText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
