import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-16 pb-8 px-6 mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] shadow-[0_0_15px_-2px_var(--color-cyan)]" />
              <span className="font-display text-4xl text-white tracking-tight -mb-1">Terra</span>
            </div>
            <p className="text-[#a3a3a3] text-sm leading-relaxed pr-4">
              Know your impact. Shape your future. A technical dashboard for personal sustainability.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#737373] mb-6">Modules</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-[#a3a3a3] hover:text-white transition-colors focus-visible:outline-none">Overview</Link></li>
              <li><Link to="/assess" className="text-sm text-[#a3a3a3] hover:text-white transition-colors focus-visible:outline-none">Assess Impact</Link></li>
              <li><Link to="/learn" className="text-sm text-[#a3a3a3] hover:text-white transition-colors focus-visible:outline-none">Learning Hub</Link></li>
              <li><Link to="/act" className="text-sm text-[#a3a3a3] hover:text-white transition-colors focus-visible:outline-none">Take Action</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#737373] mb-6">Tools</h4>
            <ul className="space-y-4">
              <li><Link to="/assess/calculator" className="text-sm text-[#a3a3a3] hover:text-white transition-colors focus-visible:outline-none">Carbon Calculator</Link></li>
              <li><Link to="/learn/simulator" className="text-sm text-[#a3a3a3] hover:text-white transition-colors focus-visible:outline-none">Impact Simulator</Link></li>
              <li><Link to="/act/offsets" className="text-sm text-[#a3a3a3] hover:text-white transition-colors focus-visible:outline-none">Offset Marketplace</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#737373] mb-6">Community</h4>
            <ul className="space-y-4">
              <li><Link to="/learn/leaderboard" className="text-sm text-[#a3a3a3] hover:text-white transition-colors focus-visible:outline-none">Leaderboard</Link></li>
              <li><Link to="/learn/news" className="text-sm text-[#a3a3a3] hover:text-white transition-colors focus-visible:outline-none">News & Insights</Link></li>
              <li><Link to="/act/missions" className="text-sm text-[#a3a3a3] hover:text-white transition-colors focus-visible:outline-none">Missions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#525252]">© {new Date().getFullYear()} Terra. All rights reserved.</p>
          
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-emerald)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-emerald)]"></span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3a3a3]">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
