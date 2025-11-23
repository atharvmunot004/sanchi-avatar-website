# Avatar Creator - Digital Identity Builder

A 3D avatar creation tool built with Next.js, React Three Fiber, and Three.js.

## Features

- **3D Avatar Builder**: Interactive 3D viewport for sculpting and assembling your digital identity
- **Gender Selection**: Choose between Male and Female base avatars
- **Hair Options**: Select from multiple hair styles
- **Apparel Selection**: Choose from different outfit options
- **Real-time Preview**: See your avatar updates in real-time as you make selections
- **Interactive Controls**: Rotate, zoom, and interact with your 3D avatar

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Generate placeholder GLB assets:
```bash
node scripts/generate-assets.js
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main avatar creation page
├── components/
│   ├── AvatarViewport.tsx # 3D viewport component
│   └── OptionButton.tsx   # Reusable option button component
├── store/
│   └── avatarStore.ts     # Zustand state store
├── public/
│   └── assets/
│       └── meshes/        # GLB 3D model files
└── scripts/
    └── generate-assets.js # Script to generate placeholder GLB files
```

## Assets

The project includes placeholder GLB files that were automatically generated:
- **Base Avatars**: `base_male.glb`, `base_female.glb`
- **Hair Options**: `hair_01.glb` through `hair_04.glb`
- **Apparel**: `apparel_01.glb`, `apparel_02.glb`

These are minimal valid GLB files with simple box geometry. Replace them with your actual 3D models when ready.

## Technologies

- **Next.js 14** - React framework
- **React Three Fiber** - 3D rendering with React
- **Three.js** - 3D graphics library
- **Zustand** - State management
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS

## Design

The application features:
- Radial gradient background matching the specification
- Two-column layout with 3D viewport on the left
- Interactive selection buttons with gradient backgrounds
- Circular 3D viewport (420px diameter)
- Monospace font for body text
- Serif font for headings

## License

MIT
