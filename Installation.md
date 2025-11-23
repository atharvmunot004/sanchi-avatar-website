# Installation Guide

This guide will walk you through setting up and running the Avatar Creator project on a new system from scratch.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (version 18.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```
   - Both commands should return version numbers.


### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 500MB free space
- **Browser**: Modern browser with WebGL support (Chrome, Firefox, Edge, Safari)

## Step-by-Step Installation

### Step 1: Get the Project Files

#### If you have the project files
1. Extract or copy the project folder to your desired location
2. Open a terminal/command prompt
3. Navigate to the project directory:
   ```bash
   cd path/to/sanchi-project-avatar-website
   ```


### Step 2: Install Dependencies

1. Open a terminal/command prompt in the project root directory

2. Install all required npm packages:
   ```bash
   npm install
   ```

   This will:
   - Download and install all dependencies listed in `package.json`
   - Create a `node_modules` folder with all packages
   - Install development dependencies

   **Expected output**: You should see a progress bar and then "added X packages" message.

   **Note**: This may take 2-5 minutes depending on your internet connection.

3. **Troubleshooting**:
   - If you encounter permission errors (especially on Linux/Mac), try:
     ```bash
     sudo npm install
     ```
   - If you get network errors, check your internet connection
   - If installation fails, try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### Step 3: Generate Placeholder Assets

The project requires GLB 3D model files. Generate placeholder files:

```bash
node scripts/generate-assets.js
```

**Expected output**:
```
Generating GLB assets...

Created GLB: base_male.glb (648 bytes)
Created GLB: base_female.glb (648 bytes)
Created GLB: hair_01.glb (648 bytes)
Created GLB: hair_02.glb (648 bytes)
Created GLB: hair_03.glb (648 bytes)
Created GLB: hair_04.glb (648 bytes)
Created GLB: apparel_01.glb (648 bytes)
Created GLB: apparel_02.glb (648 bytes)

✅ All GLB assets generated!
```

**Verify**: Check that files exist in `public/assets/meshes/` directory:
- `base_male.glb`
- `base_female.glb`
- `hair_01.glb` through `hair_04.glb`
- `apparel_01.glb` and `apparel_02.glb`

### Step 4: Start the Development Server

Run the Next.js development server:

```bash
npm run dev
```

**Expected output**:
```
> avatar-creator@0.1.0 dev
> next dev

  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

### Step 5: Open in Browser

1. Open your web browser
2. Navigate to: `http://localhost:3000`
3. You should see the "Create Your digital identity" page with:
   - A circular 3D viewport on the left
   - Gender selection buttons (Male/Female)
   - Hair and apparel options on the right

## Verification Checklist

After installation, verify the following:

- [ ] Node.js and npm are installed and accessible
- [ ] All dependencies installed successfully (`node_modules` folder exists)
- [ ] GLB files generated in `public/assets/meshes/` (8 files total)
- [ ] Development server starts without errors
- [ ] Website loads at `http://localhost:3000`
- [ ] 3D viewport displays (may show placeholder box if GLB files are placeholders)
- [ ] Buttons are clickable and responsive

## Common Issues and Solutions

### Issue: `npm install` fails with permission errors

**Solution (Windows)**:
- Run Command Prompt as Administrator
- Or use: `npm install --global --production windows-build-tools`

**Solution (Linux/Mac)**:
- Use `sudo npm install` (not recommended for production)
- Or fix npm permissions: https://docs.npmjs.com/resolving-e-perm-errors

### Issue: Port 3000 is already in use

**Solution**:
- Stop the other application using port 3000
- Or run on a different port:
  ```bash
  PORT=3001 npm run dev
  ```
- Then access at `http://localhost:3001`

### Issue: GLB files fail to load / 3D models don't display

**Solution**:
- Verify GLB files exist in `public/assets/meshes/`
- Check browser console for errors (F12 → Console tab)
- Ensure WebGL is enabled in your browser
- Try a different browser
- The placeholder GLB files are minimal - replace with actual 3D models for better results

### Issue: "Module not found" errors

**Solution**:
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Ensure you're in the project root directory

### Issue: TypeScript errors during build

**Solution**:
- Ensure TypeScript is installed: `npm install -g typescript`
- Check `tsconfig.json` exists in project root
- Run `npm run build` to see detailed error messages

### Issue: Three.js / WebGL errors

**Solution**:
- Update your graphics drivers
- Enable hardware acceleration in browser settings
- Try a different browser
- Check if WebGL is supported: https://get.webgl.org/

## Production Build

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `.next` folder.

To run the production build:

```bash
npm start
```

## Project Structure Reference

```
sanchi-project-avatar-website/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── AvatarViewport.tsx # 3D viewport
│   └── OptionButton.tsx   # Button component
├── store/                 # State management
│   └── avatarStore.ts     # Zustand store
├── public/                # Static assets
│   └── assets/
│       └── meshes/        # GLB 3D model files
├── scripts/               # Utility scripts
│   └── generate-assets.js # Asset generator
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── tailwind.config.js     # Tailwind CSS config
```

## Next Steps

After successful installation:

1. **Replace Placeholder Models**: The generated GLB files are minimal placeholders. Replace them with your actual 3D models for a better experience.

2. **Customize Styling**: Edit `app/globals.css` and component files to match your design preferences.

3. **Add Features**: Extend the avatar store in `store/avatarStore.ts` to add more customization options.

4. **Deploy**: When ready, deploy to platforms like Vercel, Netlify, or your own server.

## Getting Help

If you encounter issues not covered here:

1. Check the browser console (F12) for error messages
2. Review the terminal output for build/run errors
3. Verify all prerequisites are installed correctly
4. Ensure you're using the correct Node.js version (18+)
5. Check that all files from the project are present

## System-Specific Notes

### Windows
- Use PowerShell or Command Prompt
- May need to run terminal as Administrator for some operations
- Path separators use backslashes (`\`)

### macOS
- Use Terminal app
- May need to install Xcode Command Line Tools: `xcode-select --install`
- Path separators use forward slashes (`/`)

### Linux
- Use your distribution's terminal
- May need `sudo` for global npm installations
- Ensure build tools are installed: `sudo apt-get install build-essential`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

**Last Updated**: November 2024

