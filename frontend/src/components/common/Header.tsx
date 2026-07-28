import React,{useEffect,useState} from "react";
import {Phone,Mail,MapPin,Menu,X,GraduationCap,ChevronRight,Award} from "lucide-react";

const SCHOOL_NAME="VASANT VALLEY";
const SCHOOL_TAGLINE="School · Excellence & Integrity";

const TOP_BAR={
 phone:"+91 (011) 2689-2354",
 email:"admissions@vasantvalley.edu",
 location:"Vasant Kunj, New Delhi",
 rankBadge:"#1 Ranked Day School"
};

const navItems=[
 {id:"home",label:"Home"},
 {id:"about",label:"About Us"},
 {id:"academics",label:"Academics"},
 {id:"achievements",label:"Achievements"},
 {id:"admissions",label:"Admissions"},
 {id:"campus",label:"Campus Life"},
 {id:"news",label:"News & Events"},
 {id:"contact",label:"Contact Us"}
];

interface NavbarProps{
 scrollToSection:(id:string)=>void;
 onOpenPortal:()=>void;
}

export const Header:React.FC<NavbarProps>=({
 scrollToSection,
 onOpenPortal
})=>{

const [mobileMenuOpen,setMobileMenuOpen]=useState(false);
const [activeSection,setActiveSection]=useState("home");
const [showHeader,setShowHeader]=useState(true);
const [lastScrollY,setLastScrollY]=useState(0);

useEffect(()=>{

const observer=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
setActiveSection(entry.target.id);
}
});
},{
rootMargin:"-40% 0px -40% 0px",
threshold:0
});

navItems.forEach(item=>{
const section=document.getElementById(item.id);
if(section) observer.observe(section);
});

return()=>observer.disconnect();

},[]);


useEffect(()=>{

const handleScroll=()=>{

const currentScrollY=window.scrollY;

if(currentScrollY>lastScrollY && currentScrollY>120){
setShowHeader(false);
setMobileMenuOpen(false);
}else{
setShowHeader(true);
}

setLastScrollY(currentScrollY);

};

window.addEventListener("scroll",handleScroll,{passive:true});

return()=>window.removeEventListener("scroll",handleScroll);

},[lastScrollY]);


const handleNavClick=(id:string)=>{
scrollToSection(id);
setMobileMenuOpen(false);
};


return(
<header className={`
fixed top-0 left-0 right-0 z-50
transition-transform duration-500
${showHeader?"translate-y-0":"-translate-y-full"}
`}>

<div className="text-slate-200 text-xs py-2 px-4">

<div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">

<div className="flex items-center gap-5 flex-wrap justify-center">

<span className="flex items-center gap-1.5">
<Phone size={12} className="text-red-500"/>
{TOP_BAR.phone}
</span>

<span className="flex items-center gap-1.5">
<Mail size={12} className="text-red-500"/>
{TOP_BAR.email}
</span>

<span className="hidden md:flex items-center gap-1.5">
<MapPin size={12} className="text-red-500"/>
{TOP_BAR.location}
</span>

</div>

<div className="flex items-center gap-4">

<span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/20 text-amber-300">
<Award size={11} className="text-amber-400"/>
{TOP_BAR.rankBadge}
</span>

<button
onClick={onOpenPortal}
className="flex items-center gap-1 font-bold text-red-400 hover:text-red-300 transition"
>
ERP Login
<ChevronRight size={12}/>
</button>

</div>

</div>

</div>


<nav>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="flex justify-between items-center h-20">

<div
onClick={()=>scrollToSection("home")}
className="flex items-center gap-3 cursor-pointer group"
>

<div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-tr from-red-600 to-amber-600 group-hover:scale-105 transition">

<GraduationCap size={26} color="#fff"/>

</div>

<div>

<h1 className="text-xl font-bold tracking-tight leading-none text-white drop-shadow">

{SCHOOL_NAME}

</h1>

<p className="text-xs tracking-widest font-semibold uppercase mt-0.5 text-red-400">

{SCHOOL_TAGLINE}

</p>

</div>

</div>


<div className="hidden lg:flex items-center gap-1">

{navItems.map(item=>(

<button
key={item.id}
onClick={()=>handleNavClick(item.id)}
className={`
px-3.5 py-2 rounded-xl text-sm font-medium transition
border border-white/20
hover:border-red-400
${activeSection===item.id
?"bg-red-600/30 text-red-400 font-bold border-red-500"
:"text-white hover:bg-white/10"
}
`}
>

{item.label}

</button>

))}


<button
onClick={onOpenPortal}
className="ml-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition"
>

ERP Login

</button>


<button
onClick={()=>handleNavClick("admissions")}
className="ml-2 btn-primary text-sm shadow-xl"
>

Apply 2026–27

</button>


</div>


<div className="lg:hidden">

<button
onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}
className="p-2 rounded-xl bg-white/10 text-white"
>

{mobileMenuOpen?<X size={24}/>:<Menu size={24}/>}

</button>

</div>


</div>

</div>


{mobileMenuOpen && (

<div className="lg:hidden px-4 pt-3 pb-6 space-y-2">

{navItems.map(item=>(

<button
key={item.id}
onClick={()=>handleNavClick(item.id)}
className={`
w-full text-left px-4 py-3 rounded-xl text-base transition
${activeSection===item.id
?"bg-red-600/30 text-red-400"
:"text-white hover:bg-white/10"
}
`}
>

{item.label}

</button>

))}


<button
onClick={()=>handleNavClick("admissions")}
className="btn-primary w-full mt-3 justify-center"
>

Apply for Admissions 2026–27

</button>


</div>

)}

</nav>

</header>

);

};