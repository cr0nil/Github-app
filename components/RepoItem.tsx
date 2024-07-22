import { Repo } from "@/redux/user/User.types";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
interface RepoItemProps {
  repo: Repo;
}

const RepoItem = ({ repo }: RepoItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, styles.textRow]}>{repo.name ?? ""}</Text>
        <Text style={styles.text}>
          {repo.stargazers_count}
          <AntDesign name={"star"} size={17} color="black" />
        </Text>
      </View>

      <Text>{repo.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#def",
    marginBottom: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlignVertical: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textRow: {
    width: "85%",
  },
});

export default RepoItem;
