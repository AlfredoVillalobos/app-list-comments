import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from "react-native";
import { elapseTime } from "../../common/elpaseTime";

const VisibleItem = (props) => {
  const { data } = props;

  const redirectToBrowserOrAlert = (item) => {
    if (item.url) {
      Linking.openURL(item.url);
    } else {
      Alert.alert("without url");
    }
  };

  return (
    <View style={styles.rowFront}>
      <TouchableHighlight
        style={styles.rowFrontVisible}
        onPress={() => {
          redirectToBrowserOrAlert(data);
        }}
      >
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}
          </Text>
          <Text style={styles.details} numberOfLines={1}>
            {data.author} - {elapseTime(data.createdAt)}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  details: {
    fontSize: 12,
    color: "#999",
  },
});

export default VisibleItem;
