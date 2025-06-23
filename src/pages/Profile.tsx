import React, { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import SuggestionCard from "../components/Suggestions/SuggestionCard";

const Profile: React.FC = () => {
  const { user, userSuggestions } = useAppStore();

  useEffect(() => {
    if (user) {
      useAppStore.getState().getUserSuggestions();
    }
    console.log("User suggestions fetched:", userSuggestions);
  }, [user]);

  return (
    <div className="flex flex-col justify-center h-full p-6">
      <h1 className="text-2xl font-bold mb-4 self-center">Mon Profil</h1>
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
          {userSuggestions.length > 0 ? (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Mes Suggestions</h3>
              <ul className="list-disc pl-5 space-y-2">
                {userSuggestions.map((suggestion: any) => (
                  //   <SuggestionCard key={suggestion.id} suggestion={suggestion} />
                  <div>
                    <div>{suggestion.title}</div>
                    <div>{suggestion.category}</div>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Vous pouvez maintenant ajouter des suggestions et voter pour
              celles de vos voisins.
            </p>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <p className="text-gray-600">
            Veuillez vous connecter pour voir votre profil.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
