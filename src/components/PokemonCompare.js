import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BarChart } from 'react-native-chart-kit';
import PokemonStore from '../stores/PokemonStore';

const PokemonCompare = () => {
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectionSlot, setSelectionSlot] = useState(null);

  const openPokemonSelection = (slot) => {
    setSelectionSlot(slot);
    setIsBottomSheetVisible(true);
  };

  const selectPokemon = (pokemon) => {
    if (selectionSlot === 1) {
      setSelectedPokemon1(pokemon);
    } else {
      setSelectedPokemon2(pokemon);
    }
    setIsBottomSheetVisible(false);
  };

  const renderComparisonChart = () => {
    if (!selectedPokemon1 || !selectedPokemon2) return null;

    const chartData = {
      labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
      datasets: [
        {
          data: [
            selectedPokemon1.details.stats[0].base_stat,
            selectedPokemon1.details.stats[1].base_stat,
            selectedPokemon1.details.stats[2].base_stat,
            selectedPokemon1.details.stats[3].base_stat,
            selectedPokemon1.details.stats[4].base_stat,
            selectedPokemon1.details.stats[5].base_stat
          ],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2
        },
        {
          data: [
            selectedPokemon2.details.stats[0].base_stat,
            selectedPokemon2.details.stats[1].base_stat,
            selectedPokemon2.details.stats[2].base_stat,
            selectedPokemon2.details.stats[3].base_stat,
            selectedPokemon2.details.stats[4].base_stat,
            selectedPokemon2.details.stats[5].base_stat
          ],
          color: (opacity = 1) => `rgba(244, 65, 65, ${opacity})`,
          strokeWidth: 2
        }
      ]
    };

    return (
      <BarChart
        data={chartData}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        verticalLabelRotation={30}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.pokemonSelectionContainer}>
        <TouchableOpacity 
          style={styles.pokemonSlot} 
          onPress={() => openPokemonSelection(1)}
        >
          {selectedPokemon1 ? (
            <>
              <Image 
                source={{ uri: selectedPokemon1.imageUrl }} 
                style={styles.pokemonImage} 
              />
              <Text>{selectedPokemon1.name}</Text>
            </>
          ) : (
            <Text>Select Pokemon 1</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.pokemonSlot} 
          onPress={() => openPokemonSelection(2)}
        >
          {selectedPokemon2 ? (
            <>
              <Image 
                source={{ uri: selectedPokemon2.imageUrl }} 
                style={styles.pokemonImage} 
              />
              <Text>{selectedPokemon2.name}</Text>
            </>
          ) : (
            <Text>Select Pokemon 2</Text>
          )}
        </TouchableOpacity>
      </View>

      {renderComparisonChart()}

      {isBottomSheetVisible && (
        <BottomSheet
          snapPoints={['50%', '90%']}
          onClose={() => setIsBottomSheetVisible(false)}
        >
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Choose Pokemon</Text>
            <FlatList
              data={PokemonStore.pokemons}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.pokemonListItem}
                  onPress={() => selectPokemon(item)}
                >
                  <Image 
                    source={{ uri: item.imageUrl }} 
                    style={styles.listPokemonImage} 
                  />
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  pokemonSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  pokemonSlot: {
    width: '45%',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  pokemonImage: {
    width: 100,
    height: 100
  },
  bottomSheetContent: {
    padding: 16
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  pokemonListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  listPokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10
  }
});

export default PokemonCompare;
