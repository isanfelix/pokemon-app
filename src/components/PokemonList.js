import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import PokemonStore from '../stores/PokemonStore';

const PokemonList = observer(({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePokemons = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    await PokemonStore.fetchPokemons();
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    loadMorePokemons();
  }, [loadMorePokemons]);

  const renderPokemonItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.pokemonItem}
      onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.pokemonImage} 
        defaultSource={require('../assets/pokeball-placeholder.png')}
      />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={PokemonStore.pokemons}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        onEndReached={loadMorePokemons}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 8
  },
  pokemonItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3
  },
  pokemonImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  pokemonName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  loadingContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE'
  }
});

export default PokemonList;
