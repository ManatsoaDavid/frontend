/**************************ELEMENTS DE L ADMIN********************************** */
import HomeAdmin from "admin/pages/layout";
import ListePraticiens from "admin/pages/layout/components/Practitioners/listePraticient";
import DemandeLists from "admin/pages/layout/demandeLists";
import Home from "admin/pages/layout/Home";
import { createHashRouter } from "react-router-dom";

/************************* ELEMENTS DE LA PAGE PUBLIC *********************************** */
import AdminLogin from "admin/pages/authentification/loginAdmin";
import SubscriptionCycleManager from "admin/pages/layout/subscriptionCycle";
import SubscriptionTypeManager from "admin/pages/layout/subscriptionType";
import Dashboard from "practitioner/pages/dashboard/Dashboard";
import Layout from "practitioner/pages/layout";
import AgendaDisplay from "practitioner/pages/layout/components/agenda/displayAgenda";
import ListAppointment from "practitioner/pages/layout/components/appointment/listAppointment";
import Subscription from "practitioner/pages/layout/components/subscription/subscription";
import ChangePassword from "practitioner/pages/Profile/components/ChangePassword";
import Profile from "practitioner/pages/Profile/Profile";
import PublicHome from "public/pages/layout";
import { Practitioner } from "shared/models/practitionner.model";
import Login from "user/pages/authentification/login/layout/login";
import RegisterStepper from "user/pages/authentification/register/layout";
import Visitor from "visiteur/layout";
import Appointment from "visiteur/layout/appointment";
import MainVisitorProfil from "visiteur/layout/mainVisitorprofile";
import PractitionerBooking from "visiteur/layout/practitionerBooking";
import VisitorHome from "visiteur/layout/visitorHome";

const handlePasswordChange = (oldPassword: string, newPassword: string) => {
  console.log('Password change requested', oldPassword, newPassword);
  // Implement actual password change logic here
};


const router = createHashRouter([
  /************************ROUTES POUR LA PAGE PUBLIC********************************************* */
  {
    path: "/",
    element: <PublicHome />
  },

  /************************ROUTES POUR LES PAGES DE L'ADMIN************************************** */
  {
    path: "/admin",
    element: <AdminLogin />,
  },

  {
    path: "/homeAdmin",
    element: <HomeAdmin />,
    children: [
      {
        path: "listePraticiens",
        element: <ListePraticiens />,
      },
      {
        path: "accueil",
        element: <Home />

      },
      {
        path: "demande",
        element: <DemandeLists />

      },
      {
        path: "subscription-type",
        element: <SubscriptionTypeManager />
      },
      {
        path: "subscription-cycle",
        element: <SubscriptionCycleManager />,
      },
    ],
  },

  /************************ROUTES POUR LES PAGES DE L' PRACTITIONER************************************** */
  {
    path: "/practitioner",
    element: (
      <Layout />
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "profile",
        element: <Profile practitioner={{} as Practitioner} />
      },
      {
        path: "agenda",
        element: <AgendaDisplay />
      },
      {
        path: "list-rendez-vous",
        element: <ListAppointment />

      },
      {
        path: "abonnement",
        element: <Subscription />
      },
      {
        path: "change-password",
        element: <ChangePassword onSubmit={handlePasswordChange} />
      }

    ],
  },

  /************************ROUTES POUR LES PAGES DE L' USER************************************** */
  {
    path: "/register",
    element: <RegisterStepper />

  },

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/visitor",
    element: <Visitor />,
    children: [
      {
        path: "profile",
        element: <MainVisitorProfil />,
      },
      {
        path: "rendez-Vous",
        element: <Appointment />,
      },
      {
        path: "visitor-home",
        element: <VisitorHome />,
      },
      {
        path: "info-pratitient/:practitionerId",
        element: <PractitionerBooking />
      }
    ],
  },

  {
    path: "*",
    element: <PublicHome />,
  },
]); export default router;
