import { memo } from "react";
import { StyleSheet, Image, View, Text } from "react-native";

const CharacterCard = function ({ character }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.infoText}>Status: {character.status}</Text>
        <Text style={styles.infoText}>Species: {character.species}</Text>
        <Text style={styles.infoText}>Gender: {character.gender}</Text>
        <Text style={styles.infoText}>Origin: {character.origin.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 200,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});

export default memo(CharacterCard);
