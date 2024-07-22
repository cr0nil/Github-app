import UserItem from "@/components/UserItem";
import { Colors } from "@/constants/Colors";
import { useUsers } from "@/hooks/useUsers";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Users() {
  const {
    pending,
    expandedId,
    users,
    debounced,
    setExpandedIdHandler,
    loadMoreReposHandler,
    setIsLoading,
  } = useUsers();

  return (
    <SafeAreaView style={styles.box}>
      {/* Search bar */}
      <View style={styles.container}>
        <Text style={styles.title}>GITHUB-APP</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search users..."
          onChangeText={debounced}
        />

        {pending && (
          <ActivityIndicator
            animating={true}
            color={Colors.light.tint}
            size={30}
          />
        )}
        <FlatList
          style={styles.list}
          data={users}
          renderItem={({ item }) => (
            <UserItem
              user={item}
              setExpandedId={() => setExpandedIdHandler(item.id, item.login)}
              expandedId={expandedId}
              loadMoreRepos={loadMoreReposHandler}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  searchBar: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
    padding: 8,
  },
  list: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
