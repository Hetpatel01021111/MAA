// components/Navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <motion.div key={link.href} whileHover={{ scale: 1.05 }}>
          <Link
            href={link.href}
            className={`font-medium transition-colors ${
              pathname === link.href 
                ? 'text-indigo-600' 
                : 'text-gray-700 hover:text-indigo-500'
            }`}
          >
            {link.name}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}