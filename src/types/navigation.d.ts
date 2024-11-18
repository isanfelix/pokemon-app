import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetail: { pokemon: any };
  Home: undefined;
  Compare: undefined;
};

export type PokemonListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PokemonList'>;
export type PokemonDetailScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetail'>;
