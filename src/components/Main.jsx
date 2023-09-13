import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CharacterCard from "./characterCard";
import SeeMoreButton from "./SeeMoreButton";

async function getCharacters(uri) {
  return await axios.get(uri);
}

const Main = () => {
  const [next, setNext] = useState("");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigation = useNavigation();
  const goToDetailScreen = (character) => {
    navigation.navigate("CharacterDetail", {
      characterName: character.name,
      character,
    });
  };

  useEffect(() => {
    getCharacters("https://rickandmortyapi.com/api/character")
      .then((res) => {
        setNext(res.data.info.next);
        setCharacters(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const loadMore = () => {
    if (next) {
      setLoadingMore(true);
      getCharacters(next)
        .then((res) => {
          setNext(res.data.info.next);
          setCharacters([...characters, ...res.data.results]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoadingMore(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando datos...</Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goToDetailScreen(item)}>
              <View style={styles.itemContainer}>
                <CharacterCard character={item} />
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            next && (
              <SeeMoreButton loadingMore={loadingMore} onPress={loadMore} />
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginBottom: 16,
  },
});

export default Main;
