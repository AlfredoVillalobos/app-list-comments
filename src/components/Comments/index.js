import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";
import {
  fetchComments,
  removeItemStorage,
  STORAGE_DATA,
} from "../../../actions/storageAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import HiddenItemWithActions from "../HiddenItemWithActions";
import VisibleItem from "../VisibleItem";
import { wait } from "../../common/timeout";

const Comments = () => {
  const [listComments, setListCommnets] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchComments();
    getStorageData();
  }, []);

  const getStorageData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_DATA);
      if (data && data !== undefined) {
        setListCommnets(JSON.parse(data));
      }
    } catch (error) {
      console.error(
        "error when trying to get data from storage | error: ",
        error
      );
    }
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listComments];
    const prevIndex = listComments.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListCommnets(newData);
    removeItemStorage(rowKey);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getStorageData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item, rowMap }) => {
    return <VisibleItem data={item} />;
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fFF6347" barStyle="light-content" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SwipeListView
          data={listComments}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          disableRightSwipe
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
});

export default Comments;
