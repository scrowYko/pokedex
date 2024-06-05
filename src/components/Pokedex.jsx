import { useState, useEffect } from "react";
import "./pokemon.css";
import pokeball from "pokeball.jpg";
import pokemon from "./Pokemon";

export default function Pokedex() {
  const [id, setId] = useState(1); //iniciando id com valor 1
  const [pokemon, setPokemon] = useState(null); //iniciando dado pokemon com valor nulo

  const fetchData = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  };

  const [Carregando, setCarregando] = useState(true);
  const Loader = pokeball;
  function setTimer() {
    useEffect(() => {
      const timer = setTimeout(() => {
        setCarregando(false);
      }, 500);
      return () => clearTimeout(timer);
    }, []);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const nextPokemon = () => {
    setId(id + 1);
    setTimer()
  };
  const previousPokemon = () => {
    try {
      setId(id - 1);
      setTimer()
    } catch (error) {
      console.error("Não tem pokemon anterior", error);
    }
    0;
  };

  return (
    <>
      <div>
      { Carregando ? (<Loader/>):( {pokemon && (
          
        )}
        )
      };
      </div>
    </>
  );
}
