import { useState } from "react";
import MovieSwiper from "./MovieSwiper"; // Importação corrigida para o caminho correto
import RecommendedProfiles from "./RecommendedProfiles"; // Importando o componente de recomendação de perfis

const App = () => {
  const [likedGenres, setLikedGenres] = useState<string[] | null>(null);

  return (
    <div>
      {!likedGenres ? (
        <MovieSwiper onFinish={setLikedGenres} />
      ) : (
        <RecommendedProfiles likedGenres={likedGenres} />
      )}
    </div>
  );
};

export default App;
