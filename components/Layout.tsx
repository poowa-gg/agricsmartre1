
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, Users, LayoutDashboard, Settings, UserCircle, Briefcase, Landmark } from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, setRole }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-emerald-700 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-lg">
            <Home className="text-emerald-700 w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AgriSmart Connect</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="bg-emerald-600 text-white border-none rounded px-2 py-1 text-sm focus:ring-2 focus:ring-emerald-400 outline-none font-medium"
          >
            <option value={UserRole.FARMER}>Farmer View</option>
            <option value={UserRole.COOP_ADMIN}>Coop Admin</option>
            <option value={UserRole.LENDER}>Lender View</option>
            <option value={UserRole.MINISTRY_ADMIN}>Federal Ministry</option>
          </select>
          <UserCircle className="w-8 h-8" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-8 max-w-7xl mx-auto w-full px-4 pt-6">
        {children}
      </main>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 flex justify-around items-center z-50">
        <NavItem to="/" icon={<LayoutDashboard />} label="Home" />
        <NavItem to="/credit" icon={<CreditCard />} label="Credit" />
        {role === UserRole.MINISTRY_ADMIN ? (
           <NavItem to="/oversight" icon={<Landmark />} label="National" />
        ) : (
          <NavItem to="/coop" icon={<Users />} label="Coops" />
        )}
        <NavItem to="/market" icon={<Briefcase />} label="Market" />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-600 font-semibold' : 'text-slate-400 font-medium'}`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
    <span className="text-[10px] uppercase tracking-wider">{label}</span>
  </NavLink>
);

export default Layout;
