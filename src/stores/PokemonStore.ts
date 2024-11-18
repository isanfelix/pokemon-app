import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

interface PokemonDetails {
  id: number;
  name: string;
  imageUrl: string;
  details: {
    sprites: {
      front_default: string;
      other: {
        'dream_world': {
          front_default: string;
        }
      }
    };
    stats: Array<{
      base_stat: number;
      stat: {
        name: string;
      }
    }>;
    types: Array<{
      type: {
        name: string;
      }
    }>;
    abilities: Array<{
      ability: {
        name: string;
      }
    }>;
    height: number;
    weight: number;
  };
}

class PokemonStore {
  pokemons: PokemonDetails[] = [];
  loading: boolean = false;
  offset: number = 0;
  limit: number = 25;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPokemons() {
    if (this.loading) return;

    this.loading = true;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`);
      
      const newPokemons = await Promise.all(
        response.data.results.map(async (pokemon: { name: string; url: string }) => {
          const detailResponse = await axios.get(pokemon.url);
          const details = detailResponse.data;
          
          return {
            id: details.id,
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            imageUrl: details.sprites.front_default,
            details: details
          };
        })
      );
      
      runInAction(() => {
        this.pokemons = [...this.pokemons, ...newPokemons];
        this.offset += this.limit;
        this.loading = false;
      });
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export default new PokemonStore();
