
import { Practitioner } from 'shared/models/practitionner.model';
import Information from './components/Information';
import Sidebar from './components/sidebarPraticien';


interface ProfileProps {
  practitioner: Practitioner;
}

function Profile({ practitioner }: ProfileProps) {
  return (
    <div className="flex flex-col md:flex-row my-10">
      <div className='mx-4 my-4 md:mx-10 md:my-10'>
        <Information />
      </div>
      <div className="flex-1 p-4 md:p-10">
        <Sidebar />

      </div>
    </div>
  );
}

export default Profile;
