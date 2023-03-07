import { StyleSheet, FlatList, View, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";

import EventRow from "./EventRow";
import { getEvents } from "../api";

const EventTable = ({ events, setEvents, page, setPage, filters, selected, setSelected, update, setUpdate, type }) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [endOfEvents, setEndOfEvents] = useState(false);

  useEffect(() => {
    setUpdate(false);
    (async () => {
      if (!refreshing) {
        setLoading(true);
      }
      const eventTable = await getEvents(filters, page, type);
      if (eventTable.length === 0) {
        setEndOfEvents(true);
      }
      const allEvents = [...events, ...eventTable];
      setEvents(allEvents);
      setLoading(false);
      setRefreshing(false);
    })();
  }, [update, filters]);

  if (events.length === 0 && endOfEvents) {
    return (
      <View style={styles.blankEventsContainer}>
        <Text style={{ color: colors.text }}>Oops! No events found</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => <EventRow event={item} selected={selected} setSelected={setSelected} />}
          onEndReached={() => {
            if (!endOfEvents) {
              setPage(page + 1);
              setUpdate(true);
            }
          }}
          ListFooterComponent={() =>
            !endOfEvents ? (
              <View style={styles.moreEventsLoadingContainer}>
                <ActivityIndicator size={"large"} animating={loading} />
              </View>
            ) : (
              <View style={styles.moreEventsLoadingContainer} />
            )
          }
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setEvents([]);
            setPage(1);
            setSelected([]);
            setEndOfEvents(false);
            setUpdate(true);
          }}
        />
      </View>
    );
  }
};

export default EventTable;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  loadingCircleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  blankEventsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  moreEventsLoadingContainer: {
    justifyContent: "center",
    height: 200,
  },
});
