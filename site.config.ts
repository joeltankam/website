/**
 * Site configuration
 * Centralized configuration for the entire blog
 */

// Helper to safely access environment variables
// In browser context, import.meta.env is used; in Node (build time), process.env is used
const getEnvVar = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key]
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key]
  }
  return undefined
}

export const siteConfig = {
  // Hostname configuration
  // In production, this will be resolved from environment or Vite's base URL
  hostname: getEnvVar('VITE_HOSTNAME') || 'https://joeltankam.com',
  
  // Site metadata
  title: "Joël Tankam's Blog",
  description: 'Articles on software engineering, technology, and innovation.',
  author: 'Joël Tankam',
  language: 'en-us',
  
  // Social links
  social: {
    twitter: 'joeltankam',
    github: 'joeltankam',
    linkedin: 'joeltankam'
  },
  
  // Newsletter configuration
  newsletter: {
    buttondownUsername: 'joeltankam'
  }
}
/**
 * Get the hostname dynamically based on environment
 * In dev: uses localhost, in production: uses configured hostname
 */
export function getHostname(mode?: string): string {
  // During build, use configured hostname
  const envMode = getEnvVar('MODE') || getEnvVar('NODE_ENV')
  if (mode === 'production' || envMode === 'production') {
    return siteConfig.hostname
  }
  
  // During dev, you might want to use localhost
  // But for RSS/Sitemap generation, we always want production URL
  return siteConfig.hostname
}
