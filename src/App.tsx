import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // Caso queira manter o dashboard, podemos reutilizá-lo para exibir os perfis recomendados
import MovieSwiper from './components/MovieSwiper'; // Importando o MovieSwiper
import RecommendedProfiles from './components/RecommendedProfiles'; // Importando o componente de perfis recomendados
import { AuthProvider } from './context/AuthContext';

function App() {
  const [likedGenres, setLikedGenres] = useState<string[] | null>(null);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                !likedGenres ? (
                  // Exibe o MovieSwiper se ainda não tiver selecionado os gêneros
                  <MovieSwiper onFinish={setLikedGenres} />
                ) : (
                  // Quando os gêneros são selecionados, mostra os perfis recomendados
                  <RecommendedProfiles likedGenres={likedGenres} />
                )
              }
            />
          </Routes>
          <Toaster position="top-center" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
