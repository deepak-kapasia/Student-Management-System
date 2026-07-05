import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>My Profile</h1>
      
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--primary-color)', 
            color: 'white', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            {user.name.charAt(0)}
          </div>
          <h2>{user.name}</h2>
          <span style={{ 
            padding: '0.25rem 0.75rem', 
            backgroundColor: '#e2e8f0', 
            borderRadius: '16px', 
            fontSize: '0.875rem',
            fontWeight: 500
          }}>
            Administrator
          </span>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-color)', borderRadius: '50%', color: 'var(--primary-color)' }}>
              <User size={20} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>Full Name</p>
              <p style={{ margin: 0, fontWeight: 500, fontSize: '1.1rem' }}>{user.name}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-color)', borderRadius: '50%', color: 'var(--primary-color)' }}>
              <Mail size={20} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>Email Address</p>
              <p style={{ margin: 0, fontWeight: 500, fontSize: '1.1rem' }}>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
