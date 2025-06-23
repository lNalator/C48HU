import React from 'react';
import { useAppStore } from '../store/useAppStore';


const Profile: React.FC = () => {
    const { user } = useAppStore();

    return(
        <div className="flex flex-col items-center justify-center h-full p-6">
            <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
            {user ? (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
                    <p className="text-sm text-gray-500">Vous pouvez maintenant ajouter des suggestions et voter pour celles de vos voisins.</p>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <p className="text-gray-600">Veuillez vous connecter pour voir votre profil.</p>
                </div>
            )}
        </div>
    )

}

export default Profile;