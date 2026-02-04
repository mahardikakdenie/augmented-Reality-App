---

### 📂 Project Structure

This structure reflects a standard **Expo Router** project with the specific additions we made (Scanner, Animations, etc.).

```graphql
ar-app/
├── app/                        # 🚀 MAIN APPLICATION LOGIC (Expo Router)
│   ├── (tabs)/                 # Tab Navigation Group
│   │   ├── _layout.tsx         # Tab Bar Configuration
│   │   ├── index.tsx           # Home Screen (Entry point with "Start Scan" button)
│   │   └── explore.tsx         # Explore/About Screen
│   ├── _layout.tsx             # Root Layout (Stack Navigator)
│   ├── +not-found.tsx          # 404 Page
│   └── scanner.tsx             # 📸 CORE FEATURE: Camera, AR Logic, & Animation Controller
│
├── assets/                     # 🖼️ STATIC ASSETS
│   ├── animations/             # ✨ Lottie JSON Files (REQUIRED)
│   │   ├── scanner_loop.json   # (The radar/scanning animation)
│   │   └── success_burst.json  # (The checkmark/success animation)
│   ├── images/                 # App icons, splash screens, logos
│   └── fonts/                  # Custom fonts (if any)
│
├── components/                 # 🧩 REUSABLE UI COMPONENTS
│   ├── ui/                     # Small UI elements (Icons, Collapsibles)
│   ├── ThemedText.tsx          # Typography component
│   └── ThemedView.tsx          # View component with theme support
│
├── constants/                  # 🎨 APP CONSTANTS
│   └── Colors.ts               # Color palette (Light/Dark mode)
│
├── hooks/                      # 🎣 CUSTOM HOOKS
│   └── useColorScheme.ts       # Hook to detect Dark/Light mode
│
├── app.json                    # ⚙️ EXPO CONFIGURATION (Name, Permissions, etc.)
├── package.json                # 📦 DEPENDENCIES (Lottie, Expo Camera, etc.)
└── tsconfig.json               # 📘 TYPESCRIPT CONFIGURATION

```

# 📦 Smart Packaging Scanner (AR Demo)

A futuristic **Augmented Reality (AR) Scanner** built with **React Native** and **Expo**.
This application simulates an AI-powered analysis of product packaging to verify SNI compliance, Halal status, and nutritional safety using a Sci-Fi inspired HUD interface.

## ✨ Features

- **📸 Camera Integration:** Full-screen camera preview using `expo-camera`.
- **🤖 Simulated AI Analysis:** A "Fake AR" experience that simulates text extraction and product verification for demo purposes.
- **✨ Lottie Animations:** High-performance vector animations for the scanning process (Radar Sweep) and success state (Burst effect).
- **📊 Tabbed Results UI:** A detailed result card featuring:
    - **Product Details:** Manufacturer info, BPOM ID, and composition.
    - **AI Scoring:** Visual progress bars for Sugar levels, Preservatives, and Label Compliance.
- **📱 Expo Go Compatible:** Works directly on standard Expo Go (no native code compilation required).

## 🛠️ Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) (via [Expo](https://expo.dev/))
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Camera:** `expo-camera`
- **Animations:** `lottie-react-native`
- **Icons:** `@expo/vector-icons`
- **Language:** TypeScript

## 🚀 Getting Started

Follow these steps to run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- **Expo Go** app installed on your Android or iOS device.

### Installation

1. **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ar-app.git](https://github.com/your-username/ar-app.git)
    cd ar-app
    ```

```

```
