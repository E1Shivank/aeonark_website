#!/usr/bin/env node

import { build as viteBuild } from 'vite';
import { build as esbuild } from 'esbuild';
import viteConfig from './vite.config.js';

console.log('🏗️  Building Aeonark Labs for production...');

try {
  // Build frontend with Vite
  console.log('📦 Building frontend...');
  await viteBuild(viteConfig);
  console.log('✅ Frontend built successfully');

  // Build backend with esbuild, excluding Vite dependencies
  console.log('🚀 Building backend...');
  await esbuild({
    entryPoints: ['server/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outdir: 'dist',
    packages: 'external',
    external: [
      'vite',
      '@vitejs/plugin-react',
      '@replit/vite-plugin-*',
      '@replit/vite-plugin-cartographer',
      '@replit/vite-plugin-runtime-error-modal',
      '@replit/vite-plugin-shadcn-theme-json'
    ],
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  });
  console.log('✅ Backend built successfully');

  console.log('🎉 Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}