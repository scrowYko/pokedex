export default function pokemon() {
  <div className="pokemon">
    <p id="name">{pokemon.name}</p>
    <img src={pokemon.sprites.front_default} alt="{pokemon.name}" />

    <div className="buttons">
      <button onClick={previousPokemon}>Anterior</button>
      <button onClick={nextPokemon}>Proximo</button>
    </div>
  </div>;
}
