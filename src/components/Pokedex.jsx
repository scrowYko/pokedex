import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./pokemon.css";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchData();
  }, [id]);

  const loadingNext = () => {
    setCarregando(true);
    let timerN = setTimeout(() => {
      setCarregando(false);
      nextPokemon();
    }, 500);
    return () => clearTimeout(timerN);
  };

  const loadingPrevious = () => {
    if (id - 1 > 0) {
      setCarregando(true);
        let timerP = setTimeout(() => {
          setCarregando(false);
          previousPokemon();
        }, 500);
        return () => clearTimeout(timerP);
    } else alert("Não tem pokemon antes deste");
  };

  const nextPokemon = () => {
    setId(id + 1);
  };

  const previousPokemon = () => {
    try {
      setId(id - 1);
    } catch (error) {
      console.error("Não tem pokemon anterior", error);
    }
    0;
  };

  return (
    <>
      <div>
        {pokemon && (
          <div className="pokemon">
            {Carregando ? (
              <motion.img
                src="./pokebola.png"
                id="spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <div className="div">
                <p id="name">{pokemon.name}</p>
                <img src={pokemon.sprites.front_default} alt="{pokemon.name}" />
              </div>
            )}

            <div className="buttons">
              <button onClick={loadingPrevious}>Anterior</button>
              <button onClick={loadingNext}>Proximo</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
