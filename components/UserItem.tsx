import { Colors } from "@/constants/Colors";
import { pendingReposSelector } from "@/redux/user/User.selector";
import { User } from "@/redux/user/User.types";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import RepoItem from "./RepoItem";
interface UserItemProps {
  user: User;
  expandedId: number;
  setExpandedId: () => void;
  loadMoreRepos: () => void;
}

const UserItem = ({
  user,
  expandedId,
  setExpandedId,
  loadMoreRepos,
}: UserItemProps) => {
  const pending = useSelector(pendingReposSelector);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row} onPress={setExpandedId}>
        <Text style={styles.username}>{user.login}</Text>
        <AntDesign
          name={expandedId === user.id ? "up" : "down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      {expandedId === user.id && (
        <View>
          {pending && (
            <ActivityIndicator animating={true} color={Colors.light.tint} />
          )}
          <FlatList
            ListEmptyComponent={
              <Text>
                {!pending ? "This user does not have a repository" : ""}
              </Text>
            }
            data={user.repos}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            onEndReached={loadMoreRepos}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => <RepoItem repo={item} />}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  username: {
    fontSize: 16,
  },
  list: {
    marginTop: 8,
  },
});

export default UserItem;
