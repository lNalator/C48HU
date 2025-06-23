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
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <h2 className="text-xl font-semibold mb-10">{user.username}</h2>

          <p className="text-gray-600 mb-4">Email: {user.email}</p>
          <p className="text-gray-600 mb-4">
            Nombre de suggestions: {userSuggestions.length}
          </p>

          <p className="text-gray-600 mb-4">
            Date d'inscription:{" "}
            {new Date(user.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          {userSuggestions.length > 0 ? (
            <div className="mb-4 mt-10 flex flex-col">
              <h3 className="text-lg font-medium mb-2">Mes Suggestions</h3>
              <ul className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {userSuggestions.map((suggestion: any) => (
                  <SuggestionCard key={suggestion.id} suggestion={suggestion} />
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
