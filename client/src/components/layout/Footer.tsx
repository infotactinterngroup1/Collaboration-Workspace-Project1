import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Footer = () => {
  return (
    <footer className="relative bg-zinc-950 text-zinc-50 border-t border-x border-zinc-900 overflow-hidden pt-20 pb-0 rounded-t-[2.5rem] mt-12">
      {/* Grain Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/5 to-transparent blur-[100px] rounded-t-[100%]"></div>
      </div>

      <div className="container relative z-10 max-w-screen-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-6 flex flex-col justify-between pr-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium tracking-wide text-zinc-300">The Future of Shopping</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
                Curated by AI. <br className="hidden md:block" />
                <span className="text-zinc-500">Designed for you.</span>
              </h2>
              <p className="text-zinc-400 max-w-md leading-relaxed text-base">
                Elevating your lifestyle with premium products, intelligently selected by our proprietary algorithms.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-2 max-w-md p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md focus-within:border-primary/50 focus-within:bg-white/10 transition-all duration-300">
                <div className="relative flex-1 flex items-center">
                  <Mail className="absolute left-4 h-4 w-4 text-zinc-500" />
                  <Input 
                    placeholder="Email address..." 
                    className="pl-11 h-12 bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-zinc-600 w-full"
                  />
                </div>
                <Button className="rounded-full h-12 px-6 bg-white text-black hover:bg-zinc-200 transition-all font-semibold group">
                  Join Waitlist
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-4">
            <div className="flex flex-col space-y-6">
              <h3 className="font-medium text-white tracking-tight">Platform</h3>
              <ul className="space-y-4 text-sm text-zinc-400">
                {[
                  { name: 'All Products', path: '/products' },
                  { name: 'Categories', path: '/categories' },
                  { name: 'AI Search', path: '/search' },
                  { name: 'New Arrivals', path: '#' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="hover:text-white transition-colors relative group w-fit inline-block">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col space-y-6">
              <h3 className="font-medium text-white tracking-tight">Company</h3>
              <ul className="space-y-4 text-sm text-zinc-400">
                {[
                  { name: 'About Us', path: '#' },
                  { name: 'Careers', path: '#' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Blog', path: '#' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="hover:text-white transition-colors relative group w-fit inline-block">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col space-y-6">
              <h3 className="font-medium text-white tracking-tight">Social</h3>
              <ul className="space-y-4 text-sm text-zinc-400">
                {[
                  { name: 'Instagram', path: '#', icon: Instagram },
                  { name: 'Twitter', path: '#', icon: Twitter },
                  { name: 'LinkedIn', path: '#', icon: Linkedin },
                  { name: 'Facebook', path: '#', icon: Facebook }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="hover:text-white transition-colors flex items-center gap-2 group w-fit">
                      <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-white/10 text-sm text-zinc-500">
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div>
            © {new Date().getFullYear()} AI Store. All rights reserved.
          </div>
        </div>
      </div>

      {/* Massive Outlined Text at Bottom */}
      <div className="w-full overflow-hidden flex justify-center items-end leading-none select-none pointer-events-none mt-[-4vw]">
        <h1 
          className="text-[18vw] font-black tracking-tighter text-transparent" 
          style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.05)' }}
        >
          AISTORE
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
