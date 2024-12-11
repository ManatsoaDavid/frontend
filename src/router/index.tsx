/**************************ELEMENTS DE L ADMIN********************************** */
import { createHashRouter } from "react-router-dom";

/************************* ELEMENTS DE LA PAGE PUBLIC *********************************** */

import PublicHome from "public/pages/layout";
import PractitionerResults from "shared/composant/practitionerResultSearch";
import { IPractitionerWithUser } from "shared/models/practitioner.model";


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

  {
    path: '/practitioners-results',
    element: <PractitionerResults />
  },
  /************************ROUTES POUR LES PAGES DE L'ADMIN************************************** */
  

  /************************ROUTES POUR LES PAGES DE L' PRACTITIONER************************************** */
  

  /************************ROUTES POUR LES PAGES DE L' USER************************************** */
  
  

  {
    path: "*",
    element: <PublicHome />,
  },
]); export default router;
