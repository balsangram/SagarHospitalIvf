import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Activity, 
  TestTube, 
  Baby, 
  Database, 
  FileText, 
  CreditCard, 
  Calendar, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Search,
  Plus,
  Save,
  Thermometer,
  Microscope,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Bell,
  Stethoscope,
  Star,
  Award,
  ArrowRight,
  TrendingUp,
  Filter,
  ChevronLeft,
  LayoutDashboard,
  Lock,
  Mail,
  ShieldCheck,
  Phone,
  Layers,
  ClipboardList,
  GitMerge,
  FlaskConical,
  Dna,
  History,
  Archive,
  ThermometerSnowflake,
  ActivitySquare,
  Edit3,
  Trash2,
  FileBadge,
  Pill,
  Wallet,
  HeartPulse
} from 'lucide-react';

/**
 * Project10 HMIS Portal Prototype
 * Developed for Kods Technologies Pvt Ltd
 * Version 13.1 (Functional NICU Module & Vitals Tracking)
 */

// --- Mock Data ---

const PATIENTS = [
  { id: 'P001', name: 'Sarah Jenkins', age: 32, status: 'Active IVF', bloodGroup: 'O+', contact: '555-0123', doctor: 'Dr. Anjali Kumar' },
  { id: 'P002', name: 'Priya Sharma', age: 29, status: 'IUI Consultation', bloodGroup: 'B+', contact: '555-0124', doctor: 'Dr. Rakesh Singh' },
  { id: 'P003', name: 'Emily Chen', age: 35, status: 'NICU Parent', bloodGroup: 'A-', contact: '555-0125', doctor: 'Dr. Susan George' },
  { id: 'P004', name: 'Ananya Iyer', age: 28, status: 'Active IVF', bloodGroup: 'O+', contact: '555-0126', doctor: 'Dr. Anjali Kumar' },
  { id: 'P005', name: 'Monica Geller', age: 31, status: 'IUI Consultation', bloodGroup: 'AB+', contact: '555-0127', doctor: 'Dr. Rakesh Singh' },
];

const PACKAGES = [
  { id: 1, name: 'Basic IUI Package', price: '₹15,000', code: 'PKG-IUI-01', includes: ['Consultation', 'Semen Analysis', 'Single IUI Cycle', 'Follicular Monitoring'] },
  { id: 2, name: 'Standard IVF Package', price: '₹1,20,000', code: 'PKG-IVF-STD', includes: ['Consultation', 'Oocyte Retrieval', 'ICSI', 'Embryo Transfer', 'Vitrification (1yr)'] },
  { id: 3, name: 'Donor Egg IVF Program', price: '₹2,50,000', code: 'PKG-IVF-DNR', includes: ['Donor Screening', 'Donor Compensation', 'IVF Cycle', 'Legal Documentation'] },
];

const ART_INVENTORY = [
  { id: 'D-102', type: 'Sperm Vial', donorCode: 'DON-A44', count: 12, quality: 'High Motility', status: 'Available' },
  { id: 'D-105', type: 'Oocyte', donorCode: 'DON-B21', count: 6, quality: 'MII', status: 'Reserved' },
  { id: 'E-301', type: 'Embryo', donorCode: 'Couple-P001', count: 3, quality: 'Blastocyst 4AA', status: 'Frozen' },
];

const INITIAL_NICU_BEDS = [
  { id: 1, type: 'Occupied', name: 'Baby of Emily', age: '2 Days', weight: '2.1', gender: 'Male', vitals: { hr: 140, spo2: 98, temp: 36.6 } },
  { id: 2, type: 'Occupied', name: 'Baby of Sarah', age: '5 Days', weight: '1.8', gender: 'Female', vitals: { hr: 145, spo2: 97, temp: 36.8 } },
  { id: 3, type: 'Available' },
  { id: 4, type: 'Available' },
  { id: 5, type: 'Available' },
  { id: 6, type: 'Available' },
];

const INITIAL_SCHEDULES = [
  { id: 1, time: '09:00', patient: 'Sarah Jenkins', type: 'Follicular Scan', room: '3B', color: 'purple' },
  { id: 2, time: '10:30', patient: 'Priya Sharma', type: 'Semen Collection', room: 'Andrology', color: 'blue' },
  { id: 3, time: '11:45', patient: 'Monica Geller', type: 'Initial Consultation', room: 'Consult 1', color: 'slate' },
];

const NOTIFICATIONS = [
  { id: 1, type: 'registration', title: 'New Patient Registered', desc: 'Patient #P004 added to queue.', time: '5m ago', icon: User, color: 'blue', link: 'consultation' },
  { id: 2, type: 'alert', title: 'Low Stock Alert', desc: 'Vitrification media stock < 10 units.', time: '20m ago', icon: Database, color: 'rose', link: 'art' },
  { id: 3, type: 'lab', title: 'Lab Results Pending', desc: 'Embryo grading for #P002 requires verification.', time: '1h ago', icon: TestTube, color: 'amber', link: 'ivf' },
  { id: 4, type: 'reminder', title: 'Consultation Reminder', desc: 'Video consult with Mrs. Nair in 15 mins.', time: '1h ago', icon: Clock, color: 'purple', link: 'consultation' },
];

const IVF_STAGES = [
  { id: 'baseline', label: 'Baseline & Profile', icon: History, desc: 'Initial hormone profile & screens.' },
  { id: 'stimulation', label: 'Ovarian Stimulation', icon: Activity, desc: 'Follicle tracking & medication.' },
  { id: 'opu', label: 'OPU Log (Retrieval)', icon: Layers, desc: 'Oocyte retrieval surgical notes.' },
  { id: 'andrology', label: 'Sperm Preparation', icon: TestTube, desc: 'Sample analysis & prep method.' },
  { id: 'fertilization', label: 'Fertilization (ICSI)', icon: Microscope, desc: 'Day 0 insemination records.' },
  { id: 'culture', label: 'Embryo Culture', icon: FlaskConical, desc: 'Day 1-6 development & grading.' },
  { id: 'pgt', label: 'PGT (Genetics)', icon: Dna, desc: 'Biopsy tracking & genetic results.' },
  { id: 'transfer', label: 'Embryo Transfer', icon: Baby, desc: 'Transfer protocol & details.' },
  { id: 'cryo', label: 'Cryopreservation', icon: Archive, desc: 'Vitrification & storage logs.' },
  { id: 'outcome', label: 'Outcome & B-HCG', icon: TrendingUp, desc: 'Cycle result & pregnancy tracking.' },
];

// --- Utility Components ---

const Project10Logo = ({ collapsed, dark = false }) => (
  <svg width={collapsed ? "40" : "180"} height="45" viewBox={collapsed ? "0 0 45 45" : "0 0 200 45"} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 2)">
       <path d="M20.5 8C24 8 28 10 28 15C28 22 20.5 32 20.5 32C20.5 32 13 22 13 15C13 10 17 8 20.5 8Z" fill={dark ? "#ffffff" : "#9333EA"}/> 
       <circle cx="20.5" cy="13" r="3" fill={dark ? "#9333EA" : "white"}/> 
       <path d="M10 20C6 20 2 24 2 24" stroke={dark ? "#f5d0fe" : "#D946EF"} strokeWidth="3" strokeLinecap="round"/> 
       <path d="M31 20C35 20 39 24 39 24" stroke={dark ? "#f5d0fe" : "#D946EF"} strokeWidth="3" strokeLinecap="round"/> 
    </g>
    {!collapsed && (
      <g transform="translate(50, 8)">
        <text x="0" y="18" fill={dark ? "#ffffff" : "#581c87"} fontFamily="serif" fontSize="22" fontWeight="bold" letterSpacing="-0.5">Project10</text>
        <text x="0" y="30" fill={dark ? "#e9d5ff" : "#c026d3"} fontFamily="sans-serif" fontSize="9" fontWeight="bold" letterSpacing="2.5" style={{ textTransform: "uppercase" }}>HMIS</text>
      </g>
    )}
  </svg>
);

const Card = ({ children, className = "", noPadding = false, ...props }) => (
  <div className={`bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(147,51,234,0.05)] border border-purple-50 ${className}`} {...props}>
    <div className={noPadding ? "" : "p-6"}>
      {children}
    </div>
  </div>
);

const Badge = ({ status }) => {
  const styles = {
    'Active IVF': 'bg-purple-50 text-purple-800 border border-purple-100 ring-1 ring-purple-500/20',
    'IUI Consultation': 'bg-fuchsia-50 text-fuchsia-800 border border-fuchsia-100 ring-1 ring-fuchsia-500/20',
    'NICU Parent': 'bg-pink-50 text-pink-800 border border-pink-100 ring-1 ring-pink-500/20',
    'Completed': 'bg-slate-100 text-slate-600 border border-slate-200',
    'Pending': 'bg-amber-50 text-amber-800 border border-amber-100 ring-1 ring-amber-500/20',
    'Available': 'bg-emerald-50 text-emerald-800 border border-emerald-100',
    'Reserved': 'bg-violet-50 text-violet-800 border border-violet-100',
    'Frozen': 'bg-blue-50 text-blue-800 border border-blue-100',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
      {status}
    </span>
  );
};

const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
    <div>
      <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">{title}</h2>
      {subtitle && <p className="text-slate-500 text-sm mt-1 font-medium">{subtitle}</p>}
    </div>
    {action}
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-purple-50">
        <h3 className="text-xl font-bold text-slate-900 font-serif">{title}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50">
          <X size={20} />
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

// --- Modules ---

const ConsultationModule = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const filteredPatients = PATIENTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader 
        title="Consultation & Counselling" 
        subtitle="Manage patient intake, clinical history, and counselling sessions."
        action={
          <button 
            onClick={() => setShowRegistration(true)}
            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition shadow-lg shadow-purple-900/20 font-medium"
          >
            <Plus size={18} /> New Patient
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-4 h-[750px] flex flex-col" noPadding>
          <div className="p-6 border-b border-purple-50 bg-white rounded-t-2xl">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-slate-900 font-serif text-lg">Patient Queue</h3>
               <div className="relative">
                 <button 
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className={`p-2 rounded-lg transition ${statusFilter !== 'All' ? 'bg-purple-100 text-purple-700' : 'text-slate-400 hover:text-purple-700 hover:bg-purple-50'}`}
                 >
                   <Filter size={18}/>
                 </button>
                 {showFilterMenu && (
                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 py-2">
                     {['All', 'Active IVF', 'IUI Consultation', 'NICU Parent'].map(status => (
                       <button
                         key={status}
                         onClick={() => { setStatusFilter(status); setShowFilterMenu(false); }}
                         className={`w-full text-left px-4 py-2 text-sm ${statusFilter === status ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                       >
                         {status}
                       </button>
                     ))}
                   </div>
                 )}
               </div>
            </div>
            <div className="relative group">
              <Search className="absolute left-3 top-3 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name or ID..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-slate-50 p-2">
            {filteredPatients.map((p, i) => (
              <div key={p.id} onClick={() => alert(`Opening details for ${p.name}`)} className={`p-4 mb-2 rounded-xl cursor-pointer transition-all border border-transparent ${i === 0 ? 'bg-purple-50/50 border-purple-100 shadow-sm' : 'hover:bg-slate-50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <p className={`font-bold text-base ${i === 0 ? 'text-purple-900' : 'text-slate-700'}`}>{p.name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${i === 0 ? 'bg-white text-purple-700 border-purple-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>{p.id}</span>
                </div>
                <div className="flex justify-between items-center">
                   <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                     <User size={12}/> {p.doctor}
                   </p>
                   <Badge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-8 flex flex-col h-[750px]" noPadding>
          <div className="border-b border-purple-50 px-8 pt-8 pb-0 bg-gradient-to-b from-white to-purple-50/30 rounded-t-2xl">
            <div className="flex items-center gap-6 mb-8">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl text-purple-800 font-serif border border-purple-50 shadow-md">SJ</div>
               <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-serif">Sarah Jenkins</h3>
                  <div className="flex gap-4 text-sm text-slate-600 mt-2">
                     <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-purple-100 shadow-sm text-xs font-medium"><User size={12} className="text-purple-600"/> 32 Yrs</span>
                     <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-purple-100 shadow-sm text-xs font-medium"><Activity size={12} className="text-pink-500"/> O+ve</span>
                     <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-purple-100 shadow-sm text-xs font-medium"><AlertCircle size={12} className="text-fuchsia-500"/> Penicillin</span>
                  </div>
               </div>
            </div>
            <div className="flex gap-8">
              {['Clinical Details', 'Counselling Notes', 'History'].map((tab) => {
                const key = tab.split(' ')[0].toLowerCase();
                return (
                  <button 
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`pb-4 text-sm font-bold tracking-wide transition-all relative ${activeTab === key ? 'text-purple-900' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {tab.toUpperCase()}
                    {activeTab === key && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 shadow-[0_-2px_6px_rgba(147,51,234,0.4)]"></div>}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="p-8 overflow-y-auto flex-1 bg-white">
            {activeTab === 'details' && (
              <div className="space-y-8 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                      <FileText size={14} className="text-fuchsia-500"/> Chief Complaint
                    </label>
                    <textarea className="w-full p-4 border border-slate-200 rounded-xl h-36 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none shadow-sm text-slate-700 bg-slate-50 hover:bg-white transition-colors" placeholder="Describe the primary reason for visit..."></textarea>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                      <Stethoscope size={14} className="text-fuchsia-500"/> Doctor's Clinical Notes
                    </label>
                    <textarea className="w-full p-4 border border-slate-200 rounded-xl h-36 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none shadow-sm text-slate-700 bg-slate-50 hover:bg-white transition-colors" placeholder="Enter clinical observations and diagnosis..."></textarea>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-50">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Prescription & Plan</label>
                    <button onClick={() => alert("Opening Prescription Template...")} className="text-purple-700 text-xs font-bold hover:underline flex items-center gap-1"><Plus size={12}/> ADD TEMPLATE</button>
                  </div>
                  <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100">
                    <div className="flex gap-3 mb-6">
                      <input type="text" placeholder="Drug Name" className="flex-1 px-4 py-3 border border-purple-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 bg-white shadow-sm" />
                      <input type="text" placeholder="Dosage" className="w-32 px-4 py-3 border border-purple-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 bg-white shadow-sm" />
                      <input type="text" placeholder="Freq" className="w-32 px-4 py-3 border border-purple-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 bg-white shadow-sm" />
                      <button onClick={() => alert("Medicine added!")} className="bg-purple-900 text-white p-3 rounded-lg hover:bg-purple-800 shadow-md transition-transform hover:scale-105"><Plus size={18} /></button>
                    </div>
                    <div className="bg-white rounded-lg p-10 text-center border border-dashed border-purple-200">
                      <p className="text-slate-500 text-sm font-medium">No medicines added to this prescription yet.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 border-t border-purple-50 bg-white rounded-b-2xl flex justify-between items-center">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-2"><Clock size={12}/> Last auto-saved: 2 mins ago</span>
            <div className="flex gap-4">
              <button onClick={() => alert("Changes discarded")} className="px-6 py-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg font-bold text-sm transition">Discard</button>
              <button onClick={() => alert("Consultation Saved Successfully!")} className="px-6 py-2.5 bg-purple-900 text-white rounded-lg flex items-center gap-2 hover:bg-purple-800 shadow-lg shadow-purple-900/20 font-bold text-sm transition transform hover:-translate-y-0.5">
                <Save size={18} /> Save Records
              </button>
            </div>
          </div>
        </Card>
      </div>

      {showRegistration && (
        <Modal title="Patient Registration" onClose={() => setShowRegistration(false)}>
           <form className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div><label className="block text-xs font-bold text-slate-500 mb-1">First Name</label><input type="text" className="w-full p-2 border rounded-lg"/></div>
               <div><label className="block text-xs font-bold text-slate-500 mb-1">Last Name</label><input type="text" className="w-full p-2 border rounded-lg"/></div>
             </div>
             <div><label className="block text-xs font-bold text-slate-500 mb-1">Date of Birth</label><input type="date" className="w-full p-2 border rounded-lg"/></div>
             <div><label className="block text-xs font-bold text-slate-500 mb-1">Phone Number</label><input type="tel" className="w-full p-2 border rounded-lg"/></div>
             <button onClick={(e) => {e.preventDefault(); setShowRegistration(false); alert("Patient Registered!")}} className="w-full bg-purple-700 text-white p-3 rounded-xl font-bold mt-2">Register Patient</button>
           </form>
        </Modal>
      )}
    </div>
  );
};

const IUIProtocolModule = () => {
  const [showAddScan, setShowAddScan] = useState(false);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader 
        title="IUI Protocol" 
        subtitle="Intrauterine Insemination Cycle Management."
        action={
          <button className="bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg font-bold hover:bg-purple-800 transition"><Plus size={18}/> Start IUI Cycle</button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <Card className="p-6 h-full flex flex-col">
            <h3 className="font-bold text-lg mb-4 text-purple-900 border-b border-purple-100 pb-2">Follicular Monitoring</h3>
            <div className="space-y-4 flex-1">
               {[1,2,3].map(day => (
                 <div key={day} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <span className="font-bold text-slate-700 block text-sm">Day {day * 3}</span>
                      <span className="text-xs text-slate-500">14mm, 12mm (RO)</span>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">Recorded</span>
                 </div>
               ))}
            </div>
            <button onClick={() => setShowAddScan(true)} className="w-full mt-6 py-3 border-2 border-dashed border-purple-200 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition">+ Add Scan Data</button>
         </Card>

         <Card className="p-6 h-full flex flex-col">
            <h3 className="font-bold text-lg mb-4 text-purple-900 border-b border-purple-100 pb-2">Stimulation Protocol</h3>
            <div className="space-y-4 flex-1">
               <div className="bg-white border border-slate-100 p-3 rounded-lg flex gap-3">
                 <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Pill size={20}/></div>
                 <div>
                   <p className="font-bold text-sm text-slate-800">Clomiphene Citrate</p>
                   <p className="text-xs text-slate-500">50mg • CD 3-7</p>
                 </div>
               </div>
               <div className="bg-white border border-slate-100 p-3 rounded-lg flex gap-3">
                 <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Pill size={20}/></div>
                 <div>
                   <p className="font-bold text-sm text-slate-800">HMG Injection</p>
                   <p className="text-xs text-slate-500">75 IU • CD 7,9</p>
                 </div>
               </div>
            </div>
            <button className="w-full mt-6 py-3 bg-purple-100 text-purple-700 font-bold rounded-xl hover:bg-purple-200 transition">Adjust Meds</button>
         </Card>
         
         <Card className="p-6 h-full flex flex-col">
            <h3 className="font-bold text-lg mb-4 text-purple-900 border-b border-purple-100 pb-2">Sperm Preparation</h3>
            <div className="space-y-6 flex-1">
               <div><label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Pre-Wash Motility</label><p className="font-bold text-slate-800 text-xl">45%</p></div>
               <div><label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Post-Wash Motility</label><p className="font-bold text-emerald-600 text-xl">90%</p></div>
               <div><label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Technique</label><p className="font-bold text-slate-800">Double Density Gradient</p></div>
            </div>
            <button className="w-full mt-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition">Update Analysis</button>
         </Card>
      </div>

      {showAddScan && (
        <Modal title="Add IUI Scan" onClose={() => setShowAddScan(false)}>
           <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div><label className="text-xs font-bold text-slate-500 uppercase">Right Ovary</label><input type="text" className="w-full p-2 border rounded-lg" placeholder="18mm"/></div>
                 <div><label className="text-xs font-bold text-slate-500 uppercase">Left Ovary</label><input type="text" className="w-full p-2 border rounded-lg" placeholder="16mm"/></div>
              </div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">Endometrium</label><input type="text" className="w-full p-2 border rounded-lg" placeholder="8mm"/></div>
              <button onClick={(e)=>{e.preventDefault(); setShowAddScan(false)}} className="w-full bg-purple-700 text-white p-3 rounded-xl font-bold mt-2">Save Scan</button>
           </form>
        </Modal>
      )}
    </div>
  )
}

const IVFProcessSuite = () => {
  const [activeStage, setActiveStage] = useState('baseline');
  
  // State for functionality
  const [baselineData, setBaselineData] = useState({ amh: '--', fsh: '--', lh: '--', tsh: '--' });
  const [infDiseases, setInfDiseases] = useState({ HBsAg: 'PENDING', HCV: 'PENDING', HIV: 'PENDING', VDRL: 'PENDING' });
  const [meds, setMeds] = useState([{ name: 'Gonal-F', dose: '225 IU', note: 'Daily 9PM' }]);
  const [scansRT, setScansRT] = useState([18, 17, 16, 14, 12]);
  const [scansLT, setScansLT] = useState([16, 15, 14, 11, 10]);
  const [opuCounts, setOpuCounts] = useState({ total: 12, mii: 8, degen: 1 });
  const [clinicalNotes, setClinicalNotes] = useState([]);

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'baseline', 'scan', 'med', 'opu', 'notes'
  const [modalInput, setModalInput] = useState({});

  // Handlers
  const handleBaselineSave = (e) => {
    e.preventDefault();
    setBaselineData({ ...baselineData, ...modalInput });
    setActiveModal(null);
  };

  const handleInfToggle = (key) => {
    setInfDiseases(prev => ({
      ...prev,
      [key]: prev[key] === 'PENDING' ? 'NEGATIVE' : prev[key] === 'NEGATIVE' ? 'POSITIVE' : 'PENDING'
    }));
  };

  const handleMedSave = (e) => {
    e.preventDefault();
    setMeds([...meds, modalInput]);
    setActiveModal(null);
  };

  const handleScanSave = (e) => {
    e.preventDefault();
    if(modalInput.rt) setScansRT([...scansRT, ...modalInput.rt.split(',').map(Number)]);
    if(modalInput.lt) setScansLT([...scansLT, ...modalInput.lt.split(',').map(Number)]);
    setActiveModal(null);
  };

  const handleOPUSave = (e) => {
    e.preventDefault();
    setOpuCounts({ ...opuCounts, ...modalInput });
    setActiveModal(null);
  };
  
  const handleNoteSave = (e) => {
    e.preventDefault();
    setClinicalNotes([...clinicalNotes, { ...modalInput, date: new Date().toLocaleString() }]);
    setActiveModal(null);
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader 
        title="IVF Clinical Suite" 
        subtitle="Comprehensive 10-stage lifecycle management for IVF cycles."
        action={
          <div className="flex gap-3">
             <button onClick={() => alert("Opening Consent Vault...")} className="bg-white border border-purple-100 text-purple-700 px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm font-bold"><FileText size={18}/> Consent Vault</button>
             <button onClick={() => alert("Initializing New Cycle...")} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg font-bold"><Plus size={18}/> New Cycle</button>
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-3 space-y-2">
          {IVF_STAGES.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border text-left group
                ${activeStage === stage.id 
                  ? 'bg-purple-700 text-white border-purple-700 shadow-xl shadow-purple-900/20 translate-x-2' 
                  : 'bg-white text-slate-500 border-slate-100 hover:bg-purple-50 hover:border-purple-200'}`}
            >
              <div className={`p-2 rounded-lg ${activeStage === stage.id ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-purple-100'}`}>
                <stage.icon size={20} className={activeStage === stage.id ? 'text-white' : 'text-purple-600'} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm leading-none mb-1">Stage {i+1}: {stage.label}</p>
                <p className={`text-[10px] ${activeStage === stage.id ? 'text-purple-200 font-medium' : 'text-slate-400 font-medium'}`}>{stage.desc}</p>
              </div>
              {activeStage === stage.id && <ChevronRight size={16} />}
            </button>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-9">
          <Card className="min-h-[750px] flex flex-col" noPadding>
            <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-purple-50/50 to-white rounded-t-2xl flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-100 px-2 py-0.5 rounded-md">Phase {IVF_STAGES.findIndex(s => s.id === activeStage) + 1}</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">P001: Sarah Jenkins</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-slate-900">{IVF_STAGES.find(s => s.id === activeStage).label}</h3>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Protocol</p>
                   <p className="text-xl font-bold text-purple-700">Antagonist</p>
                 </div>
                 <div className="h-12 w-[1px] bg-slate-100"></div>
                 <div className="w-14 h-14 rounded-full border-4 border-slate-50 border-t-purple-600 flex items-center justify-center text-xs font-black text-purple-700 shadow-sm">
                    {Math.round(((IVF_STAGES.findIndex(s => s.id === activeStage) + 1) / 10) * 100)}%
                 </div>
              </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
               {/* 1. Baseline */}
               {activeStage === 'baseline' && (
                 <div className="space-y-8">
                    <div className="grid grid-cols-4 gap-6">
                       {Object.keys(baselineData).map((key) => (
                         <div key={key} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{key} (mIU/ml)</p>
                            <p className="text-2xl font-bold text-slate-800">{baselineData[key]}</p>
                            <button 
                               onClick={() => { setModalInput({ [key]: '' }); setActiveModal('baseline'); }}
                               className="text-xs text-purple-700 font-bold mt-2 hover:underline flex items-center gap-1"
                            >
                               <Edit3 size={10}/> Edit
                            </button>
                         </div>
                       ))}
                    </div>
                    <Card className="p-8 border-dashed border-2 bg-slate-50/30">
                       <h4 className="font-bold text-slate-800 mb-4 font-serif">Infectious Disease Screen (Click to Toggle)</h4>
                       <div className="grid grid-cols-2 gap-4">
                          {Object.keys(infDiseases).map(test => (
                            <div key={test} onClick={() => handleInfToggle(test)} className="flex justify-between items-center p-4 bg-white rounded-xl border border-slate-100 cursor-pointer hover:border-purple-300 transition-colors select-none">
                               <span className="font-bold text-slate-600">{test}</span>
                               <span className={`text-xs font-bold px-2 py-1 rounded ${infDiseases[test] === 'NEGATIVE' ? 'bg-emerald-100 text-emerald-700' : infDiseases[test] === 'POSITIVE' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-500'}`}>
                                 {infDiseases[test]}
                               </span>
                            </div>
                          ))}
                       </div>
                    </Card>
                 </div>
               )}

               {/* 2. Stimulation */}
               {activeStage === 'stimulation' && (
                 <div className="space-y-8 animate-fade-in">
                    <div className="bg-purple-900 text-white p-6 rounded-2xl flex justify-between items-center shadow-xl">
                       <div className="flex gap-10">
                          <div><p className="text-[10px] font-bold text-purple-300 uppercase mb-1">Stim Cycle Day</p><p className="text-2xl font-bold">CD-09</p></div>
                          <div><p className="text-[10px] font-bold text-purple-300 uppercase mb-1">Estrogen (E2)</p><p className="text-2xl font-bold">1,420 pg/ml</p></div>
                       </div>
                       <button onClick={() => setActiveModal('scan')} className="bg-white text-purple-900 px-6 py-2 rounded-xl font-bold text-sm shadow-md flex items-center gap-2"><Plus size={14}/> Add Scan</button>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                       <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity size={18} className="text-purple-600"/> Follicle Tracking (RT)</h4>
                          <div className="space-y-2 max-h-40 overflow-y-auto">{scansRT.map((s, i) => <div key={i} className="flex justify-between text-sm p-2 bg-slate-50 rounded-lg"><span className="text-slate-500">Follicle #{i+1}</span><span className="font-bold text-purple-700">{s} mm</span></div>)}</div>
                       </div>
                       <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity size={18} className="text-fuchsia-600"/> Follicle Tracking (LT)</h4>
                          <div className="space-y-2 max-h-40 overflow-y-auto">{scansLT.map((s, i) => <div key={i} className="flex justify-between text-sm p-2 bg-slate-50 rounded-lg"><span className="text-slate-500">Follicle #{i+1}</span><span className="font-bold text-fuchsia-700">{s} mm</span></div>)}</div>
                       </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                           <h4 className="font-bold text-slate-800">Medications</h4>
                           <button onClick={() => setActiveModal('med')} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold hover:bg-purple-200">+ Add Dose</button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                           {meds.map((m, i) => (
                              <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl min-w-[150px] shadow-sm">
                                 <p className="text-[10px] text-purple-400 font-bold uppercase">{m.name}</p>
                                 <p className="text-lg font-bold text-slate-800">{m.dose}</p>
                                 <p className="text-[10px] text-slate-400 mt-1">{m.note}</p>
                              </div>
                           ))}
                        </div>
                    </div>
                 </div>
               )}

               {/* 3. OPU Log */}
               {activeStage === 'opu' && (
                 <div className="space-y-8 animate-fade-in">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                        <h4 className="font-bold text-slate-800 mb-4">Oocyte Retrieval Summary</h4>
                        <div className="grid grid-cols-3 gap-6 text-center">
                           <div className="p-4 bg-white rounded-xl shadow-sm"><p className="text-xs font-bold text-slate-400">Total Oocytes</p><p className="text-3xl font-bold text-purple-700">{opuCounts.total}</p></div>
                           <div className="p-4 bg-white rounded-xl shadow-sm"><p className="text-xs font-bold text-slate-400">MII (Mature)</p><p className="text-3xl font-bold text-emerald-600">{opuCounts.mii}</p></div>
                           <div className="p-4 bg-white rounded-xl shadow-sm"><p className="text-xs font-bold text-slate-400">Degenerated</p><p className="text-3xl font-bold text-rose-500">{opuCounts.degen}</p></div>
                        </div>
                    </div>
                    <button onClick={() => setActiveModal('opu')} className="w-full p-4 border-2 border-dashed border-purple-200 rounded-xl text-purple-600 font-bold hover:bg-purple-50 transition">+ Update Procedure Counts</button>
                 </div>
               )}

               {/* 4. Andrology */}
               {activeStage === 'andrology' && (
                 <div className="space-y-8 animate-fade-in">
                    <div className="grid grid-cols-2 gap-8">
                       <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                          <h4 className="font-bold text-slate-800 mb-2">Pre-Wash Parameters</h4>
                          <div className="space-y-2">
                             <div className="flex justify-between text-sm"><span className="text-slate-500">Volume</span><span className="font-bold">2.5 ml</span></div>
                             <div className="flex justify-between text-sm"><span className="text-slate-500">Count</span><span className="font-bold">45 M/ml</span></div>
                             <div className="flex justify-between text-sm"><span className="text-slate-500">Motility</span><span className="font-bold">55%</span></div>
                          </div>
                       </div>
                       <div className="p-6 bg-purple-50 border border-purple-100 rounded-2xl shadow-sm">
                          <h4 className="font-bold text-purple-900 mb-2">Post-Wash (Final)</h4>
                          <div className="space-y-2">
                             <div className="flex justify-between text-sm"><span className="text-purple-700">Method</span><span className="font-bold">Density Gradient</span></div>
                             <div className="flex justify-between text-sm"><span className="text-purple-700">Count</span><span className="font-bold">38 M/ml</span></div>
                             <div className="flex justify-between text-sm"><span className="text-purple-700">Motility</span><span className="font-bold">95%</span></div>
                          </div>
                       </div>
                    </div>
                 </div>
               )}

               {/* 5. Fertilization */}
               {activeStage === 'fertilization' && (
                 <div className="space-y-6 animate-fade-in">
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                       <table className="w-full text-sm">
                          <thead className="bg-slate-50 text-slate-500 font-bold"><tr><th className="p-4 text-left">Oocyte #</th><th className="p-4 text-left">Insem. Method</th><th className="p-4 text-left">Sperm Source</th><th className="p-4 text-left">Fertilization Check (18h)</th></tr></thead>
                          <tbody className="divide-y divide-slate-100">
                             {[1,2,3,4,5,6,7,8].map(n => (
                                <tr key={n}>
                                   <td className="p-4 font-bold text-slate-700">O-{n}</td>
                                   <td className="p-4">ICSI</td>
                                   <td className="p-4">Husband</td>
                                   <td className="p-4"><span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold">2PN (Normal)</span></td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
               )}

               {/* 6. Embryo Culture */}
               {activeStage === 'culture' && (
                 <div className="space-y-6 animate-fade-in">
                    <div className="flex gap-4 mb-4">
                       {['Day 1', 'Day 3', 'Day 5', 'Day 6'].map(day => (
                          <button key={day} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-purple-100 hover:text-purple-700 font-bold text-sm transition">{day}</button>
                       ))}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                       {[1,2,3,4,5,6].map(n => (
                          <div key={n} className="p-4 border border-slate-200 rounded-xl bg-white text-center">
                             <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-2 flex items-center justify-center text-xs text-slate-400">Embryo Img</div>
                             <p className="font-bold text-purple-900">E-{n}</p>
                             <p className="text-xs font-bold text-emerald-600">4AA (Blast)</p>
                          </div>
                       ))}
                    </div>
                 </div>
               )}

                {/* 8. Transfer */}
                {activeStage === 'transfer' && (
                 <div className="space-y-6 animate-fade-in">
                    <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                       <h4 className="font-bold text-purple-900 mb-4">Transfer Details</h4>
                       <div className="grid grid-cols-2 gap-6">
                          <div><label className="text-xs text-slate-500 uppercase font-bold">Embryos Transferred</label><p className="font-bold text-slate-800">2 (E-1, E-3)</p></div>
                          <div><label className="text-xs text-slate-500 uppercase font-bold">Catheter</label><p className="font-bold text-slate-800">Wallace Soft</p></div>
                          <div><label className="text-xs text-slate-500 uppercase font-bold">Endometrium</label><p className="font-bold text-slate-800">10mm, Trilaminar</p></div>
                          <div><label className="text-xs text-slate-500 uppercase font-bold">Difficulty</label><p className="font-bold text-slate-800">Easy</p></div>
                       </div>
                    </div>
                 </div>
               )}

               {/* Generic Placeholder for remaining screens */}
               {['pgt', 'cryo', 'outcome'].includes(activeStage) && (
                 <div className="h-full flex flex-col items-center justify-center text-center p-12 animate-fade-in">
                    <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                       <Microscope size={48} className="text-purple-300" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 font-serif">{IVF_STAGES.find(s => s.id === activeStage).label} Workspace</h4>
                    <p className="text-slate-500 max-w-sm mt-3 font-medium">This professional interface is designed for end-to-end medical data capture in the {IVF_STAGES.find(s => s.id === activeStage).label} phase.</p>
                    <div className="mt-10 flex gap-4">
                       <button onClick={() => setActiveModal('notes')} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg">New Data Entry</button>
                    </div>
                    {clinicalNotes.length > 0 && (
                      <div className="w-full mt-8 text-left bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <h5 className="font-bold text-slate-700 mb-2">Recent Log Entries:</h5>
                        {clinicalNotes.map((n, i) => <p key={i} className="text-sm text-slate-600 border-b border-slate-100 last:border-0 py-2">{n.date}: {n.note}</p>)}
                      </div>
                    )}
                 </div>
               )}
            </div>

            {/* Stage Footer */}
            <div className="p-8 border-t border-slate-100 bg-white rounded-b-2xl flex justify-between items-center shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.02)]">
               <div className="flex gap-8">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clinician Verified</span>
                  </div>
               </div>
               <button onClick={() => alert("Stage Synced Successfully!")} className="bg-purple-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-purple-900/20 transition-all transform hover:-translate-y-1 flex items-center gap-2">
                  <Save size={20} /> Save Progress & Sync
               </button>
            </div>
          </Card>
        </div>
      </div>

      {/* --- Modals for IVF Suite --- */}
      
      {activeModal === 'baseline' && (
        <Modal title="Update Hormone Level" onClose={() => setActiveModal(null)}>
           <form onSubmit={handleBaselineSave} className="space-y-4">
              {Object.keys(modalInput).map(key => (
                <div key={key}>
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Enter Value for {key}</label>
                   <input type="number" step="0.1" autoFocus className="w-full p-3 border rounded-lg" value={modalInput[key] || ''} onChange={e => setModalInput({ ...modalInput, [key]: e.target.value })} required />
                </div>
              ))}
              <button type="submit" className="w-full bg-purple-700 text-white p-3 rounded-xl font-bold">Update Record</button>
           </form>
        </Modal>
      )}

      {activeModal === 'scan' && (
        <Modal title="Add Scan Data" onClose={() => setActiveModal(null)}>
           <form onSubmit={handleScanSave} className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div><label className="block text-xs font-bold text-slate-500 mb-1">Right Ovary (comma sep)</label><input type="text" placeholder="18, 16, 14" className="w-full p-2 border rounded-lg" onChange={e => setModalInput({...modalInput, rt: e.target.value})}/></div>
               <div><label className="block text-xs font-bold text-slate-500 mb-1">Left Ovary (comma sep)</label><input type="text" placeholder="15, 12, 10" className="w-full p-2 border rounded-lg" onChange={e => setModalInput({...modalInput, lt: e.target.value})}/></div>
             </div>
             <button type="submit" className="w-full bg-purple-700 text-white p-3 rounded-xl font-bold mt-2">Save Measurements</button>
           </form>
        </Modal>
      )}

      {activeModal === 'med' && (
        <Modal title="Add Medication" onClose={() => setActiveModal(null)}>
           <form onSubmit={handleMedSave} className="space-y-4">
             <input type="text" placeholder="Drug Name" className="w-full p-2 border rounded-lg" onChange={e => setModalInput({...modalInput, name: e.target.value})} required/>
             <input type="text" placeholder="Dose" className="w-full p-2 border rounded-lg" onChange={e => setModalInput({...modalInput, dose: e.target.value})} required/>
             <input type="text" placeholder="Instructions" className="w-full p-2 border rounded-lg" onChange={e => setModalInput({...modalInput, note: e.target.value})} required/>
             <button type="submit" className="w-full bg-purple-700 text-white p-3 rounded-xl font-bold">Add Prescription</button>
           </form>
        </Modal>
      )}

      {activeModal === 'opu' && (
        <Modal title="Update Procedure Counts" onClose={() => setActiveModal(null)}>
           <form onSubmit={handleOPUSave} className="space-y-4">
             <div className="grid grid-cols-3 gap-4">
               <div><label className="block text-xs font-bold text-slate-500 mb-1">Total</label><input type="number" className="w-full p-2 border rounded-lg" onChange={e => setModalInput({...modalInput, total: Number(e.target.value)})} /></div>
               <div><label className="block text-xs font-bold text-slate-500 mb-1">MII</label><input type="number" className="w-full p-2 border rounded-lg" onChange={e => setModalInput({...modalInput, mii: Number(e.target.value)})}/></div>
               <div><label className="block text-xs font-bold text-slate-500 mb-1">Degen</label><input type="number" className="w-full p-2 border rounded-lg" onChange={e => setModalInput({...modalInput, degen: Number(e.target.value)})}/></div>
             </div>
             <button type="submit" className="w-full bg-purple-700 text-white p-3 rounded-xl font-bold">Update OPU Log</button>
           </form>
        </Modal>
      )}

      {activeModal === 'notes' && (
         <Modal title="Clinical Entry" onClose={() => setActiveModal(null)}>
           <form onSubmit={handleNoteSave} className="space-y-4">
             <textarea className="w-full p-3 border rounded-xl h-32" placeholder="Enter clinical observations..." onChange={e => setModalInput({ note: e.target.value })} required></textarea>
             <button type="submit" className="w-full bg-purple-700 text-white p-3 rounded-xl font-bold">Save Note</button>
           </form>
         </Modal>
      )}
    </div>
  );
};

const ScheduleModule = () => {
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppt, setNewAppt] = useState({ time: '', patient: '', type: '', room: '' });
  const [typeFilter, setTypeFilter] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState(null);

  const filteredSchedules = schedules.filter(s => {
    if (typeFilter === 'All') return true;
    if (typeFilter === 'Scans') return s.type.includes('Scan');
    if (typeFilter === 'Consultations') return s.type.includes('Consultation');
    return true;
  });

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (newAppt.time && newAppt.patient) {
      setSchedules([...schedules, { id: Date.now(), ...newAppt, color: 'purple' }].sort((a, b) => a.time.localeCompare(b.time)));
      setShowAddModal(false);
      setNewAppt({ time: '', patient: '', type: '', room: '' });
    }
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    setSchedules(schedules.map(s => s.id === rescheduleData.id ? rescheduleData : s).sort((a, b) => a.time.localeCompare(b.time)));
    setShowRescheduleModal(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader 
        title="Daily Schedule" 
        subtitle="Manage clinical appointments and procedure timings."
        action={
          <button onClick={() => setShowAddModal(true)} className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition shadow-lg shadow-purple-900/20 font-medium">
            <Plus size={18} /> Add Appointment
          </button>
        }
      />
      <div className="grid grid-cols-12 gap-8">
        <Card className="col-span-12 lg:col-span-8" noPadding>
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
             <h3 className="font-bold text-slate-800 font-serif text-lg">Timeline View</h3>
             <div className="relative">
               <button onClick={() => setShowFilterMenu(!showFilterMenu)} className="p-2 text-slate-400 hover:text-purple-700 transition"><Filter size={18}/></button>
               {showFilterMenu && (
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 py-2">
                    {['All', 'Scans', 'Consultations'].map(f => (
                      <button key={f} onClick={() => {setTypeFilter(f); setShowFilterMenu(false);}} className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm font-bold text-slate-600">{f}</button>
                    ))}
                 </div>
               )}
             </div>
          </div>
          <div className="divide-y divide-slate-50">
             {filteredSchedules.map((app) => (
               <div key={app.id} className="flex items-center gap-6 p-6 hover:bg-slate-50 transition cursor-pointer group">
                  <div className="text-center min-w-[60px]">
                    <span className="block text-xl font-bold text-slate-800">{app.time}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today</span>
                  </div>
                  <div className={`w-1.5 h-12 rounded-full bg-purple-500`}></div>
                  <div className="flex-1">
                     <p className="font-bold text-slate-800 text-lg">{app.type}</p>
                     <p className="text-sm text-slate-500 font-medium">{app.patient} • <span className="text-slate-400">{app.room}</span></p>
                  </div>
                  <button onClick={() => {setRescheduleData(app); setShowRescheduleModal(true);}} className="px-5 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:bg-purple-50 transition">Reschedule</button>
               </div>
             ))}
          </div>
        </Card>
      </div>

      {showAddModal && (
        <Modal title="Add New Appointment" onClose={() => setShowAddModal(false)}>
            <form onSubmit={handleAddSchedule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="time" required value={newAppt.time} onChange={(e) => setNewAppt({...newAppt, time: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl" />
                <input type="text" placeholder="Room" required value={newAppt.room} onChange={(e) => setNewAppt({...newAppt, room: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl" />
              </div>
              <input type="text" placeholder="Patient Name" required value={newAppt.patient} onChange={(e) => setNewAppt({...newAppt, patient: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl" />
              <input type="text" placeholder="Type" required value={newAppt.type} onChange={(e) => setNewAppt({...newAppt, type: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl" />
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-purple-700 text-white font-bold rounded-xl shadow-lg">Confirm</button>
              </div>
            </form>
        </Modal>
      )}

      {showRescheduleModal && (
        <Modal title={`Reschedule: ${rescheduleData.patient}`} onClose={() => setShowRescheduleModal(false)}>
              <form onSubmit={handleRescheduleSubmit} className="space-y-4">
                 <input type="time" value={rescheduleData.time} onChange={e => setRescheduleData({...rescheduleData, time: e.target.value})} className="w-full p-3 border rounded-xl" />
                 <div className="flex gap-3">
                   <button onClick={() => setShowRescheduleModal(false)} type="button" className="flex-1 p-3 font-bold text-slate-400">Cancel</button>
                   <button type="submit" className="flex-1 p-3 bg-purple-700 text-white font-bold rounded-xl">Update</button>
                 </div>
              </form>
        </Modal>
      )}
    </div>
  );
};

const PackageModule = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
  <div className="space-y-8 animate-fade-in">
    <SectionHeader 
      title="Package Management" 
      subtitle="Configure and manage treatment bundles."
      action={
        <button onClick={() => setShowCreate(true)} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition shadow-lg">
          <Plus size={18} /> Create Package
        </button>
      }
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PACKAGES.map((pkg) => (
        <Card key={pkg.id} className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden border border-purple-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500"></div>
          <div className="flex justify-between items-start mb-6">
             <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded border border-slate-100">{pkg.code}</span>
             <div className="bg-purple-50 p-3 rounded-xl text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-inner">
               <CreditCard size={20} />
             </div>
          </div>
          <h3 className="font-bold text-xl text-slate-900 mb-2 font-serif">{pkg.name}</h3>
          <p className="text-3xl font-bold text-purple-800 mb-8 tracking-tight">{pkg.price}</p>
          <div className="space-y-4 mb-8">
            {pkg.includes.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                <CheckCircle size={16} className="text-fuchsia-500 mt-0.5 shrink-0" /> 
                <span className="leading-tight">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 pt-6 border-t border-slate-50">
            <button onClick={() => alert("Editing Package Details...")} className="flex-1 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-bold transition">Edit Details</button>
            <button onClick={() => alert("Package Selected")} className="flex-1 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition shadow-md">Select Package</button>
          </div>
        </Card>
      ))}
    </div>
    
    {showCreate && (
        <Modal title="Create New Package" onClose={() => setShowCreate(false)}>
           <form className="space-y-4">
             <div><label className="block text-xs font-bold text-slate-500 mb-1">Package Name</label><input type="text" className="w-full p-2 border rounded-lg"/></div>
             <div><label className="block text-xs font-bold text-slate-500 mb-1">Price</label><input type="text" className="w-full p-2 border rounded-lg"/></div>
             <button onClick={(e) => {e.preventDefault(); setShowCreate(false); alert("Package Created!")}} className="w-full bg-slate-900 text-white p-3 rounded-xl font-bold mt-2">Create Package</button>
           </form>
        </Modal>
    )}
  </div>
)};

const NICUModule = () => {
  const [beds, setBeds] = useState(INITIAL_NICU_BEDS);
  const [showAdmit, setShowAdmit] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [admitData, setAdmitData] = useState({ motherName: '', gender: 'Male', weight: '', notes: '' });
  const [vitalsUpdate, setVitalsUpdate] = useState({ hr: '', spo2: '', temp: '' });
  const [balance, setBalance] = useState(25200);

  // Stats for the "Unit Status" card
  const occupiedCount = beds.filter(b => b.type === 'Occupied').length;
  const occupancyRate = Math.round((occupiedCount / beds.length) * 100);

  const handleAdmit = (e) => {
    e.preventDefault();
    const freeBedIndex = beds.findIndex(b => b.type === 'Available');
    
    if (freeBedIndex === -1) {
      alert("NICU is full! Cannot admit new patient.");
      setShowAdmit(false);
      return;
    }

    const newBeds = [...beds];
    newBeds[freeBedIndex] = {
      ...newBeds[freeBedIndex],
      type: 'Occupied',
      name: `Baby of ${admitData.motherName}`,
      gender: admitData.gender,
      weight: admitData.weight,
      age: '0 Days',
      vitals: { hr: 140, spo2: 98, temp: 36.5 },
      notes: admitData.notes
    };

    setBeds(newBeds);
    setShowAdmit(false);
    setAdmitData({ motherName: '', gender: 'Male', weight: '', notes: '' });
  };

  const handleDischarge = () => {
    if (!selectedBed) return;
    const newBeds = beds.map(b => b.id === selectedBed.id ? { id: b.id, type: 'Available' } : b);
    setBeds(newBeds);
    setSelectedBed(null);
  };

  const handleUpdateVitals = (e) => {
    e.preventDefault();
    if (!selectedBed) return;

    const newBeds = beds.map(b => {
      if (b.id === selectedBed.id) {
        return {
          ...b,
          vitals: {
            hr: vitalsUpdate.hr || b.vitals.hr,
            spo2: vitalsUpdate.spo2 || b.vitals.spo2,
            temp: vitalsUpdate.temp || b.vitals.temp
          }
        };
      }
      return b;
    });

    setBeds(newBeds);
    setSelectedBed(null);
    setVitalsUpdate({ hr: '', spo2: '', temp: '' });
  };

  const handlePayment = () => {
    const payment = 5000;
    if (balance <= 0) return alert("Balance is already cleared.");
    setBalance(Math.max(0, balance - payment));
    alert(`Payment of ₹${payment} recorded successfully.`);
  };

  return (
  <div className="space-y-8 animate-fade-in">
    <SectionHeader 
      title="NICU Management" 
      subtitle="Neonatal Intensive Care Unit Monitoring System"
      action={
        <div className="flex gap-4">
          <button onClick={() => alert("Generating Shift Report PDF...")} className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-slate-50 font-bold shadow-sm transition">
             <FileText size={18} /> Shift Report
          </button>
          <button onClick={() => setShowAdmit(true)} className="bg-purple-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-purple-900 shadow-lg font-bold transition">
             <Plus size={18} /> Admit Infant
          </button>
        </div>
      }
    />
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {beds.map((bed) => (
          <Card 
            key={bed.id} 
            className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-none ring-1 ${bed.type === 'Occupied' ? 'cursor-pointer hover:ring-purple-200 ring-slate-100' : 'ring-slate-100'}`} 
            noPadding
            onClick={() => bed.type === 'Occupied' && setSelectedBed(bed)}
          >
            <div className={`h-1.5 w-full ${bed.type === 'Occupied' ? 'bg-pink-500' : 'bg-emerald-500'}`}></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-5">
                <span className="font-mono text-slate-400 text-[10px] font-bold tracking-widest bg-slate-50 px-2 py-1 rounded">INCUBATOR #{bed.id}</span>
                {bed.type === 'Occupied' ? (
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 border-2 border-white"></span>
                  </span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                )}
              </div>
              
              {bed.type === 'Occupied' ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                     <div className="bg-pink-50 p-3 rounded-xl text-pink-500 shadow-sm border border-pink-100">
                        <Baby size={28} />
                     </div>
                     <div>
                       <span className="font-bold text-slate-900 block text-lg font-serif">{bed.name}</span>
                       <span className="text-xs text-slate-500 font-medium">{bed.gender} • {bed.age}</span>
                     </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="p-1">
                       <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">Wt</span>
                       <span className="font-bold text-slate-700 text-sm">{bed.weight}kg</span>
                    </div>
                    <div className="p-1 border-l border-slate-200">
                       <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">HR</span>
                       <span className="font-bold text-emerald-600 text-sm">{bed.vitals.hr}</span>
                    </div>
                    <div className="p-1 border-l border-slate-200">
                       <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">SpO2</span>
                       <span className="font-bold text-emerald-600 text-sm">{bed.vitals.spo2}%</span>
                    </div>
                  </div>
                  <button className="w-full mt-5 py-2.5 text-xs font-bold text-slate-500 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition uppercase tracking-widest border border-transparent hover:border-purple-100">
                    Update Vitals / Details
                  </button>
                </>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-slate-300">
                  <div className="bg-slate-50 p-4 rounded-full mb-3 border border-slate-100">
                    <CheckCircle size={24} />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wide">Available</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      <div className="col-span-1 space-y-8">
        <Card className="bg-slate-900 text-white border-none shadow-2xl shadow-slate-900/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-white/10 rounded-lg backdrop-blur-md"><Activity size={20} className="text-purple-300"/></div>
            <h4 className="font-bold text-lg">Unit Status</h4>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium">Occupancy</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500" style={{width: `${occupancyRate}%`}}></div>
                </div>
                <span className="font-bold text-sm">{occupancyRate}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-slate-400 text-sm font-medium">Ventilators</span>
               <span className="font-bold text-sm text-purple-200">2 In Use</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
             <h4 className="font-bold text-slate-800">Billing & Charges</h4>
             <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Pending</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-slate-500">NICU Bed Charge</span><span className="font-bold">₹ 5,000</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500">Ventilator</span><span className="font-bold">₹ 3,500</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500">Phototherapy</span><span className="font-bold">₹ 1,200</span></div>
            <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-purple-900">
               <span>Total Daily</span>
               <span>₹ 9,700</span>
            </div>
          </div>
          {/* Advance & Settlements */}
          <div className="mt-6 pt-4 border-t border-slate-100">
             <div className="flex justify-between items-center mb-2">
                <h5 className="font-bold text-slate-700 text-xs uppercase tracking-wider flex items-center gap-1"><Wallet size={12}/> Advance & Settlements</h5>
             </div>
             <div className="bg-slate-50 p-3 rounded-lg text-sm space-y-2">
                <div className="flex justify-between"><span className="text-slate-500">Total Billed</span><span className="font-bold">₹ 45,200</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Advance Paid</span><span className="font-bold text-emerald-600">₹ 20,000</span></div>
                <div className="border-t border-slate-200 pt-1 flex justify-between"><span className="font-bold text-rose-500">Balance Due</span><span className="font-bold text-rose-500">₹ {balance.toLocaleString()}</span></div>
             </div>
             <button onClick={handlePayment} className="w-full mt-3 py-2 text-xs bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled={balance <= 0}>
               {balance > 0 ? 'Record Payment (₹5,000)' : 'Fully Paid'}
             </button>
          </div>
        </Card>
      </div>
    </div>

    {/* Admission Modal */}
    {showAdmit && (
        <Modal title="NICU Admission" onClose={() => setShowAdmit(false)}>
           <form onSubmit={handleAdmit} className="space-y-4">
             <div><label className="block text-xs font-bold text-slate-500 mb-1">Mother's Name</label><input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" value={admitData.motherName} onChange={e => setAdmitData({...admitData, motherName: e.target.value})} required/></div>
             <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-500 mb-1">Gender</label><select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" value={admitData.gender} onChange={e => setAdmitData({...admitData, gender: e.target.value})}><option>Male</option><option>Female</option></select></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-1">Birth Weight (kg)</label><input type="number" step="0.01" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" value={admitData.weight} onChange={e => setAdmitData({...admitData, weight: e.target.value})} required/></div>
             </div>
             <div><label className="block text-xs font-bold text-slate-500 mb-1">Clinical Notes</label><textarea className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Reason for admission..." value={admitData.notes} onChange={e => setAdmitData({...admitData, notes: e.target.value})}></textarea></div>
             <button type="submit" className="w-full bg-pink-600 text-white p-3 rounded-xl font-bold mt-2 hover:bg-pink-700 shadow-lg">Admit Patient</button>
           </form>
        </Modal>
    )}

    {/* Patient Details & Vitals Modal */}
    {selectedBed && (
      <Modal title={`Patient: ${selectedBed.name}`} onClose={() => setSelectedBed(null)}>
        <div className="space-y-6">
           <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 flex gap-4 items-center">
             <div className="bg-white p-2 rounded-full shadow-sm"><Baby size={24} className="text-pink-500"/></div>
             <div>
                <p className="font-bold text-slate-800">Current Vitals</p>
                <div className="flex gap-4 text-xs font-medium text-slate-600 mt-1">
                   <span>HR: {selectedBed.vitals.hr} bpm</span>
                   <span>SpO2: {selectedBed.vitals.spo2}%</span>
                   <span>Temp: {selectedBed.vitals.temp}°C</span>
                </div>
             </div>
           </div>
           
           <form onSubmit={handleUpdateVitals}>
             <h4 className="font-bold text-slate-800 text-sm mb-3 border-b border-slate-100 pb-2">Update Vitals</h4>
             <div className="grid grid-cols-3 gap-3">
               <div><label className="text-[10px] font-bold text-slate-400 uppercase">HR (bpm)</label><input type="number" className="w-full p-2 border rounded-lg text-sm" placeholder={selectedBed.vitals.hr} onChange={e => setVitalsUpdate({...vitalsUpdate, hr: e.target.value})} /></div>
               <div><label className="text-[10px] font-bold text-slate-400 uppercase">SpO2 (%)</label><input type="number" className="w-full p-2 border rounded-lg text-sm" placeholder={selectedBed.vitals.spo2} onChange={e => setVitalsUpdate({...vitalsUpdate, spo2: e.target.value})} /></div>
               <div><label className="text-[10px] font-bold text-slate-400 uppercase">Temp (°C)</label><input type="number" step="0.1" className="w-full p-2 border rounded-lg text-sm" placeholder={selectedBed.vitals.temp} onChange={e => setVitalsUpdate({...vitalsUpdate, temp: e.target.value})} /></div>
             </div>
             <button type="submit" className="w-full mt-4 bg-purple-700 text-white p-3 rounded-xl font-bold text-sm">Save Vitals</button>
           </form>

           <div className="pt-4 border-t border-slate-100">
             <button onClick={handleDischarge} className="w-full border border-rose-200 text-rose-600 p-3 rounded-xl font-bold text-sm hover:bg-rose-50 transition">Discharge Patient & Free Bed</button>
           </div>
        </div>
      </Modal>
    )}
  </div>
)};

const ARTBankModule = () => {
  const [showStock, setShowStock] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');

  return (
  <div className="space-y-8 animate-fade-in">
    <SectionHeader 
      title="ART Bank & Inventory" 
      subtitle="Gamete Inventory and Legal Compliance Log"
      action={
        <div className="flex gap-4">
          <button onClick={() => alert("Exporting Compliance Data...")} className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-slate-50 font-bold shadow-sm transition">
            <FileText size={18} /> Compliance Export
          </button>
          <button onClick={() => setShowStock(true)} className="bg-purple-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-purple-900 shadow-lg font-bold transition">
            <Plus size={18} /> Add Stock
          </button>
        </div>
      }
    />

    <Card className="overflow-hidden shadow-md" noPadding>
      <div className="flex border-b border-slate-200 bg-slate-50/50">
         {['Inventory', 'Disposal Log', 'Donor Registry', 'Registers'].map(tab => (
           <button 
             key={tab} 
             onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
             className={`px-8 py-4 font-bold text-sm ${activeTab === tab.toLowerCase().split(' ')[0] ? 'bg-white text-purple-700 border-t-2 border-t-purple-600' : 'text-slate-500 hover:text-slate-800'}`}
           >
             {tab}
           </button>
         ))}
      </div>

      {activeTab === 'inventory' && (
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-widest border-b border-slate-200">
            <tr><th className="p-6">Sample ID</th><th className="p-6">Type</th><th className="p-6">Donor Code</th><th className="p-6">Count</th><th className="p-6">Grade</th><th className="p-6">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ART_INVENTORY.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-6 font-mono font-bold text-purple-900">{item.id}</td>
                <td className="p-6 flex items-center gap-2">{item.type}</td>
                <td className="p-6 font-medium">{item.donorCode}</td>
                <td className="p-6 font-medium">{item.count}</td>
                <td className="p-6"><span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 shadow-sm">{item.quality}</span></td>
                <td className="p-6"><Badge status={item.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {activeTab === 'disposal' && (
         <div className="p-12 text-center text-slate-400">
           <Trash2 size={48} className="mx-auto mb-4 opacity-50"/>
           <h4 className="text-xl font-bold text-slate-700 mb-2">Disposal Log Empty</h4>
           <p className="max-w-md mx-auto">No bio-waste disposal records found for the current cycle. All expired samples are currently flagged for review.</p>
           <button className="mt-6 px-6 py-3 border border-slate-300 rounded-xl text-slate-600 font-bold hover:bg-slate-50">Log New Disposal</button>
         </div>
      )}

      {activeTab === 'registers' && (
         <div className="p-8 grid grid-cols-3 gap-6">
            {['Form 1: Enrollment', 'Form 2: Oocyte Retrieval', 'Form 3: Embryo Transfer', 'Form 4: Pregnancy Outcome'].map(reg => (
              <div key={reg} className="p-6 border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-md cursor-pointer transition">
                 <FileBadge size={32} className="text-purple-600 mb-4"/>
                 <h4 className="font-bold text-slate-800">{reg}</h4>
                 <p className="text-xs text-slate-500 mt-2">Last Updated: Today</p>
              </div>
            ))}
         </div>
      )}
    </Card>

    {showStock && (
        <Modal title="Add Inventory" onClose={() => setShowStock(false)}>
           <form className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-500 mb-1">Type</label><select className="w-full p-2 border rounded-lg"><option>Sperm Vial</option><option>Oocyte</option></select></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-1">Donor Code</label><input type="text" className="w-full p-2 border rounded-lg"/></div>
             </div>
             <div><label className="block text-xs font-bold text-slate-500 mb-1">Quality Grade</label><input type="text" className="w-full p-2 border rounded-lg"/></div>
             <button onClick={(e) => {e.preventDefault(); setShowStock(false); alert("Inventory Updated!")}} className="w-full bg-purple-700 text-white p-3 rounded-xl font-bold mt-2">Save to Registry</button>
           </form>
        </Modal>
    )}
  </div>
)};

const LifeCycleModule = () => (
    <div className="space-y-8 animate-fade-in">
        <SectionHeader 
          title="Patient Life Cycle Tracking" 
          subtitle="Longitudinal View of Patient Care Journey"
        />
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
             <div className="flex items-center justify-between mb-12 pb-8 border-b border-slate-100">
                 <div className="flex items-center gap-6">
                     <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-fuchsia-800 text-white rounded-full flex items-center justify-center font-serif text-3xl shadow-lg shadow-purple-500/30 border-4 border-white ring-1 ring-slate-100">SJ</div>
                     <div>
                         <h3 className="text-3xl font-bold text-slate-900 font-serif">Sarah Jenkins</h3>
                         <div className="flex gap-5 mt-2 text-sm text-slate-500 font-medium">
                           <span className="flex items-center gap-1.5"><User size={14} className="text-purple-600"/> ID: P001</span>
                           <span className="flex items-center gap-1.5"><Calendar size={14} className="text-purple-600"/> Reg: 26 Oct 2023</span>
                           <span className="flex items-center gap-1.5"><Stethoscope size={14} className="text-purple-600"/> Dr. Anjali Kumar</span>
                         </div>
                     </div>
                 </div>
                 <div className="flex gap-4">
                   <button onClick={() => alert("Viewing Full Profile...")} className="px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition text-slate-600">Patient Profile</button>
                   <button onClick={() => alert("Adding New Event...")} className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition shadow-md">Add Event</button>
                 </div>
             </div>
             <div className="relative border-l-2 border-slate-200 ml-10 space-y-12 pb-6">
                 <div className="relative pl-12 group">
                     <div className="absolute -left-[11px] top-0 w-5 h-5 bg-purple-500 rounded-full border-4 border-white ring-4 ring-purple-50 group-hover:ring-purple-100 transition-all shadow-md"></div>
                     <Card className="border-l-4 border-l-purple-500 relative overflow-visible" noPadding>
                        <div className="absolute -left-2 top-6 w-4 h-4 bg-white rotate-45 border-l border-b border-slate-200"></div>
                        <div className="p-6">
                           <div className="flex justify-between mb-3">
                               <span className="font-bold text-purple-900 text-xl font-serif">Active Cycle: IVF Stimulation</span>
                               <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">Today</span>
                           </div>
                           <p className="text-slate-600 mb-4 font-medium leading-relaxed">Follicular scan showed 5 follicles {'>'} 14mm. Gonal-F dosage increased.</p>
                           <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Logged by Dr. Anjali Kumar</span>
                              <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-500 font-bold border border-slate-200">Ultrasound Report.pdf</span>
                           </div>
                        </div>
                     </Card>
                 </div>
             </div>
        </div>
    </div>
);

const DashboardModule = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader title="Dashboard Overview" subtitle="Welcome back, Dr. Anjali." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-800 to-fuchsia-800 p-6 text-white shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => onNavigate('ivf')}>
           <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-bl-full transform translate-x-6 -translate-y-6 group-hover:scale-110 transition-transform"></div>
           <div className="flex justify-between items-start mb-6">
             <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10"><Activity size={24} className="text-purple-100"/></div>
             <span className="text-[10px] font-bold bg-purple-500/30 px-2 py-1 rounded-md text-emerald-100 border border-purple-400/30">+12%</span>
           </div>
           <p className="text-purple-100/80 text-sm font-medium uppercase tracking-wider">Active IVF Cycles</p>
           <h3 className="text-5xl font-serif font-bold mt-1 tracking-tight text-white">24</h3>
        </Card>
        <Card className="hover:border-purple-500/30 hover:shadow-xl transition-all group bg-white cursor-pointer" onClick={() => onNavigate('consultation')}>
           <div className="flex justify-between items-start mb-6">
             <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Users size={24}/></div>
           </div>
           <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Today's Consultations</p>
           <h3 className="text-4xl font-bold mt-2 text-slate-800 tracking-tight font-serif">12</h3>
        </Card>
        <Card className="hover:border-purple-500/30 hover:shadow-xl transition-all group bg-white cursor-pointer" onClick={() => onNavigate('nicu')}>
           <div className="flex justify-between items-start mb-6">
             <div className="p-3 bg-pink-50 rounded-xl text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors"><Baby size={24}/></div>
           </div>
           <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">NICU Occupancy</p>
           <h3 className="text-4xl font-bold mt-2 text-slate-800 tracking-tight font-serif">33%</h3>
        </Card>
        <Card className="hover:border-purple-500/30 hover:shadow-xl transition-all group bg-white cursor-pointer" onClick={() => onNavigate('art')}>
           <div className="flex justify-between items-start mb-6">
             <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors"><TestTube size={24}/></div>
           </div>
           <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Pending Verification</p>
           <h3 className="text-4xl font-bold mt-2 text-slate-800 tracking-tight font-serif">5</h3>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 h-full" noPadding>
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-2xl">
             <h3 className="font-bold text-slate-800 font-serif text-lg">Today's Schedule</h3>
             <button onClick={() => onNavigate('schedule')} className="text-xs font-bold text-purple-800 uppercase tracking-widest hover:underline flex items-center gap-1">View Calendar <ArrowRight size={12}/></button>
          </div>
          <div className="divide-y divide-slate-50">
             {INITIAL_SCHEDULES.map((app, i) => (
               <div key={i} className="flex items-center gap-6 p-6 hover:bg-slate-50 transition cursor-pointer group">
                  <div className="text-center min-w-[60px]">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mon</span>
                    <span className="block text-xl font-bold text-slate-800 group-hover:text-purple-700 transition-colors">{app.time}</span>
                  </div>
                  <div className={`w-1 h-12 rounded-full bg-${app.color}-500 group-hover:h-14 transition-all`}></div>
                  <div className="flex-1">
                     <p className="font-bold text-slate-800 text-lg group-hover:text-purple-900 transition-colors">{app.type}</p>
                     <p className="text-sm text-slate-500 font-medium">{app.patient} • <span className="text-slate-400">{app.room}</span></p>
                  </div>
                  <button className="ml-auto px-5 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-500 transition-all">Details</button>
               </div>
             ))}
          </div>
        </Card>
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-2xl p-8 text-white text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent pointer-events-none"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-fuchsia-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform">
                <Database size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 font-serif">Daily ART Registry</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">Submit the daily registry data for legal state compliance.</p>
              <button onClick={() => alert("CSV Report Generated and Downloaded.")} className="w-full bg-white text-slate-900 py-3.5 rounded-xl font-bold hover:bg-purple-50 transition-colors uppercase tracking-wide text-xs">
                Generate CSV Report
              </button>
           </div>
           <Card className="p-6">
              <h4 className="font-bold text-slate-800 mb-5 text-sm font-serif border-b border-slate-100 pb-2 text-left uppercase tracking-widest">Quick Actions</h4>
              <div className="space-y-3">
                <button onClick={() => alert("Navigating to Donor Registration...")} className="w-full text-left px-4 py-4 rounded-xl bg-stone-50 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 text-sm font-bold text-slate-600 flex items-center justify-between group transition-all">
                   <span className="group-hover:text-purple-800 transition-colors">Add New Donor</span>
                   <div className="bg-white p-1 rounded-md shadow-sm group-hover:bg-purple-100 transition-colors"><ChevronRight size={16}/></div>
                </button>
                <button onClick={() => alert("Opening Pharmacy Request Portal...")} className="w-full text-left px-4 py-4 rounded-xl bg-stone-50 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 text-sm font-bold text-slate-600 flex items-center justify-between group transition-all">
                   <span className="group-hover:text-purple-800 transition-colors">Pharmacy Requests</span>
                   <div className="bg-white p-1 rounded-md shadow-sm group-hover:bg-purple-100 transition-colors"><ChevronRight size={16}/></div>
                </button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

// --- Profile Page ---
const ProfilePage = () => (
  <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
    <div className="relative mb-20">
      <div className="h-48 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 w-full shadow-lg"></div>
      <div className="absolute -bottom-16 left-12 flex items-end gap-6">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white overflow-hidden p-1">
           <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
             <User size={64} className="text-slate-300"/>
           </div>
        </div>
        <div className="mb-2">
          <h2 className="text-3xl font-bold text-slate-900 font-serif">Dr. Anjali Kumar</h2>
          <p className="text-slate-600 font-medium">Senior Reproductive Endocrinologist</p>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-8 pt-4">
      <Card className="col-span-2 space-y-6 p-8">
        <h3 className="font-bold text-lg border-b border-slate-100 pb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div><label className="text-xs font-bold text-slate-400 uppercase">Email Address</label><p className="text-slate-700 font-medium">dr.anjali@project10.com</p></div>
          <div><label className="text-xs font-bold text-slate-400 uppercase">Department</label><p className="text-slate-700 font-medium">Reproductive Medicine</p></div>
          <div><label className="text-xs font-bold text-slate-400 uppercase">Employee ID</label><p className="text-slate-700 font-medium">EMP-2024-001</p></div>
          <div><label className="text-xs font-bold text-slate-400 uppercase">Phone</label><p className="text-slate-700 font-medium">+91 98765 43210</p></div>
        </div>
      </Card>
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Shift Schedule</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Today</span><span className="font-bold text-purple-700">09:00 - 18:00</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Tomorrow</span><span className="font-bold text-purple-700">09:00 - 14:00</span></div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// --- Main App Component ---
export default function Project10HMIS() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentModule('dashboard');
    setShowProfileMenu(false);
  };

  const renderContent = () => {
    switch(currentModule) {
      case 'consultation': return <ConsultationModule />;
      case 'package': return <PackageModule />;
      case 'iui': return <IUIProtocolModule />;
      case 'ivf': return <IVFProcessSuite />;
      case 'nicu': return <NICUModule />;
      case 'art': return <ARTBankModule />;
      case 'lifecycle': return <LifeCycleModule />;
      case 'profile': return <ProfilePage />;
      case 'schedule': return <ScheduleModule />;
      default: return <DashboardModule onNavigate={setCurrentModule} />;
    }
  };

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => { setCurrentModule(id); setShowProfileMenu(false); }}
      className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-medium transition-all duration-300 border-r-[4px] group relative overflow-hidden
        ${currentModule === id 
          ? 'bg-purple-50/80 text-purple-900 border-purple-600 font-bold' 
          : 'text-slate-500 hover:text-purple-800 hover:bg-purple-50 border-transparent'}`}
    >
      <Icon size={20} className={`relative z-10 transition-colors ${currentModule === id ? 'text-purple-600' : 'text-slate-400 group-hover:text-purple-500'}`} />
      {sidebarOpen && <span className="relative z-10 tracking-wide">{label}</span>}
      {currentModule === id && <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-100/30"></div>}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-900 overflow-hidden">
      
      {/* Light Premium Sidebar */}
      <aside className={`bg-white text-slate-900 transition-all duration-300 flex flex-col shadow-xl z-20 border-r border-slate-100 h-screen ${sidebarOpen ? 'w-80' : 'w-24'}`}>
        <div className="h-24 flex items-center justify-between px-8 border-b border-slate-50 shrink-0">
          <Project10Logo collapsed={!sidebarOpen} />
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-purple-600 transition-colors p-1.5 rounded-lg hover:bg-slate-50">
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 py-8 space-y-1 overflow-y-auto custom-scrollbar px-2">
          <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          
          <div className={`mt-10 mb-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ${!sidebarOpen && 'hidden'}`}>
            Clinical Suite
          </div>
          <NavItem id="consultation" label="Consultation" icon={Users} />
          <NavItem id="iui" label="IUI Protocol" icon={TestTube} />
          <NavItem id="ivf" label="IVF Suite (10 Stages)" icon={FlaskConical} />
          <NavItem id="nicu" label="NICU & Vitals" icon={Baby} />
          
          <div className={`mt-10 mb-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ${!sidebarOpen && 'hidden'}`}>
            Operations
          </div>
          <NavItem id="package" label="Package Mgmt" icon={CreditCard} />
          <NavItem id="art" label="ART Registry" icon={Database} />
          <NavItem id="lifecycle" label="Lifecycle Tracker" icon={Clock} />
        </nav>
        
        {!sidebarOpen && (
          <div className="p-4 border-t border-slate-50 flex justify-center shrink-0">
             <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-slate-50 rounded-lg transition">
               <ChevronRight size={24} />
             </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        <header className="h-24 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 z-10 shrink-0">
          <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-900 font-serif capitalize">
                {currentModule === 'dashboard' ? 'Overview' : 
                 currentModule === 'ivf' ? 'IVF Clinical Suite' :
                 currentModule === 'iui' ? 'IUI Protocol' :
                 currentModule.replace(/([A-Z])/g, ' $1')}
              </h2>
          </div>

          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3 pr-8 border-r border-slate-100 relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-3 text-slate-400 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition relative group"
                >
                   <Bell size={20} />
                   <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-fuchsia-500 rounded-full border-2 border-white group-hover:animate-pulse"></span>
                </button>

                {showNotifications && (
                  <div className="absolute top-full right-4 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fade-in">
                    <div className="p-4 border-b border-slate-50 font-bold text-slate-800">Notifications</div>
                    <div className="max-h-80 overflow-y-auto">
                      {NOTIFICATIONS.map((note) => (
                        <div key={note.id} onClick={() => { setCurrentModule(note.link); setShowNotifications(false); }} className="p-4 hover:bg-slate-50 border-b last:border-0 flex gap-3 cursor-pointer transition-colors">
                          <div className={`p-2 rounded-full h-fit bg-${note.color}-100 text-${note.color}-600`}><note.icon size={16} /></div>
                          <div className="flex-1">
                             <p className="text-sm font-bold text-slate-800">{note.title}</p>
                             <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{note.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
             </div>
             
             <div className="relative">
                <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-4 pl-2 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-purple-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                    <User size={22} className="text-purple-700 mt-2"/>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-purple-900">Dr. Anjali K.</p>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1"><Award size={10} className="text-fuchsia-500"/> Senior Specialist</p>
                  </div>
                  <ChevronRight size={16} className={`text-slate-300 transition-transform ${showProfileMenu ? 'rotate-90' : ''}`}/>
                </div>
                {showProfileMenu && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in">
                    <button onClick={() => { setCurrentModule('profile'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-3 hover:bg-purple-50 flex items-center gap-3 text-sm font-medium text-slate-700 transition"><User size={16} className="text-purple-600"/> My Profile</button>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-rose-50 flex items-center gap-3 text-sm font-medium text-rose-600"><LogOut size={16} /> Sign Out</button>
                  </div>
                )}
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
          <div className="max-w-[1800px] mx-auto pb-10">
            {renderContent()}
          </div>
        </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d8b4fe; border-radius: 4px; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}