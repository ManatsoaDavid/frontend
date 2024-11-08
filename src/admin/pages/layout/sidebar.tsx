import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from "./components/Sidebar/logoutButton";
import ProfileSection from "./components/Sidebar/ProfileSection";
import SidebarLink from "./components/Sidebar/SidebarButton";
import SidebarSection from "./components/Sidebar/SidebarSection";

interface SubSection {
  title: string;
  icon: string;
  path: string;
  badge?: number;
}

interface SidebarConfigItem {
  title: string;
  icon: string;
  path?: string;
  subsections?: SubSection[];
}

const sidebarConfig: Record<string, SidebarConfigItem> = {
  dashboard: {
    title: "Tableau de bord",
    icon: "bi-house",
    path: "/homeAdmin/accueil"
  },
  practitioners: {
    title: "Gestion Praticiens",
    icon: "bi-person-badge",
    subsections: [
      { title: "Liste Praticiens", icon: "bi-list", path: "/homeAdmin/listePraticiens" },
      { title: "Demandes", icon: "bi-bell", path: "/homeAdmin/demande" }
    ]
  },
  visitors: {
    title: "Gestion Visiteurs",
    icon: "bi-people",
    subsections: [
      { title: "Liste Visiteurs", icon: "bi-list", path: "/homeAdmin/visitors" },
      { title: "Statistiques", icon: "bi-graph-up", path: "/homeAdmin/visitor-stats" }
    ]
  },
  subscriptions: {
    title: "Abonnements",
    icon: "bi-credit-card",
    subsections: [
      { title: "Types", icon: "bi-tag", path: "/homeAdmin/subscription-type" },
      { title: "Cycles", icon: "bi-arrow-repeat", path: "/homeAdmin/subscription-cycle" }
    ]
  }
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState<string>(location.pathname);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] h-screen w-64 flex flex-col overflow-y-auto"
    >
      <ProfileSection userName="ADMIN" />

      <hr className="my-4 border-gray-200" />

      <nav className="flex-grow px-4">
        {Object.entries(sidebarConfig).map(([key, section]) => (
          section.subsections ? (
            <SidebarSection
              key={key}
              title={section.title}
              icon={section.icon}
              isExpanded={expandedSection === key}
              onToggle={() => setExpandedSection(expandedSection === key ? null : key)}
            >
              {section.subsections.map(subsection => (
                <SidebarLink
                  key={subsection.path}
                  text={subsection.title}
                  icon={subsection.icon}
                  to={subsection.path}
                  isActive={activeButton === subsection.path}
                  onClick={() => setActiveButton(subsection.path)}
                  badge={subsection.badge}
                />
              ))}
            </SidebarSection>
          ) : (
            <SidebarLink
              key={key}
              text={section.title}
              icon={section.icon}
              to={section.path!}
              isActive={activeButton === section.path}
              onClick={() => setActiveButton(section.path!)}
            />
          )
        ))}
      </nav>

      <div className="px-4 mb-6">
        <LogoutButton
          text="Déconnexion"
          icon="bi-box-arrow-right"
        />
      </div>
    </motion.div>
  );
};

export default Sidebar;
