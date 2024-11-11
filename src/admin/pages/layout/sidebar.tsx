import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from "./components/Sidebar/logoutButton";
import ProfileSection from "./components/Sidebar/ProfileSection";
import SidebarLink from "./components/Sidebar/SidebarLink";
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
      { title: "Demandes", icon: "bi-bell", path: "/homeAdmin/demande" },
      { title: "Liste Praticiens", icon: "bi-list", path: "/homeAdmin/listePraticiens" },
      { title: "Abonnements Actifs", icon: "bi-check-circle", path: "/homeAdmin/subscriptions" },
    ]
  },

  visitors: {
    title: "Gestion Visiteurs",
    icon: "bi-people",
    subsections: [
      { title: "Liste Visiteurs", icon: "bi-person-lines-fill", path: "/homeAdmin/visitorsList" },
      { title: "Activités", icon: "bi-activity", path: "/homeAdmin/visitor-activities" }
    ]
  },

  subscriptions: {
    title: "Configuration Abonnements",
    icon: "bi-credit-card",
    subsections: [
      { title: "Types d'Abonnements", icon: "bi-tag", path: "/homeAdmin/subscription-type" },
      { title: "Cycles d'Abonnements", icon: "bi-arrow-repeat", path: "/homeAdmin/subscription-cycle" }
    ]
  },

  rapports: {
    title: "Analyses & Rapports",
    icon: "bi-file-earmark-bar-graph",
    subsections: [
      { title: "Statistiques", icon: "bi-bar-chart", path: "/homeAdmin/statistiques" },
      { title: "Rapports Détaillés", icon: "bi-file-earmark-text", path: "/homeAdmin/rapports" }
    ]
  }
};
const sidebarVariants = {
  open: { x: 0, opacity: 1 },
  closed: { x: -300, opacity: 0 }
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState<string>(location.pathname);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <motion.div
      initial="closed"
      animate="open"
      variants={sidebarVariants}
      className="bg-gradient-to-b from-gray-50 to-gray-100
                 shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)]
                 h-screen w-64 flex flex-col overflow-y-auto
                 border-r border-gray-200"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ProfileSection userName="ADMIN" />
      </motion.div>

      <div className="my-4 px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      <nav className="flex-grow px-4 space-y-2">
        {Object.entries(sidebarConfig).map(([key, section], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {section.subsections ? (
              <SidebarSection
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
                text={section.title}
                icon={section.icon}
                to={section.path!}
                isActive={activeButton === section.path}
                onClick={() => setActiveButton(section.path!)}
              />
            )}
          </motion.div>
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
