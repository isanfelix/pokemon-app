import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const PokemonDetail = ({ route }) => {
  const { pokemon } = route.params;

  const statsChartData = {
    labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
    datasets: [{
      data: pokemon.details.stats.map(stat => stat.base_stat)
    }]
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.spriteContainer}>
        <Image 
          source={{ uri: pokemon.details.sprites.front_default }} 
          style={styles.sprite} 
        />
        <Image 
          source={{ uri: pokemon.details.sprites.other['dream_world'].front_default }} 
          style={styles.sprite} 
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text>Height: {pokemon.details.height / 10} m</Text>
        <Text>Weight: {pokemon.details.weight / 10} kg</Text>
        <Text>Types: {pokemon.details.types.map(type => type.type.name).join(', ')}</Text>
      </View>

      <View style={styles.abilitiesContainer}>
        <Text style={styles.sectionTitle}>Abilities</Text>
        {pokemon.details.abilities.map((ability, index) => (
          <View key={index} style={styles.abilityItem}>
            <Text style={styles.abilityName}>{ability.ability.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Stats</Text>
        <BarChart
          data={statsChartData}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  spriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  sprite: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  abilitiesContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16
  },
  abilityItem: {
    marginBottom: 8
  },
  abilityName: {
    textTransform: 'capitalize'
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10
  }
});

export default PokemonDetail;
