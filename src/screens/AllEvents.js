import { StyleSheet, View, Dimensions, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import EventTable from "../components/EventTable";
import FiltersMenu from "../components/FiltersMenu";
import { getOrganizationDetails, updateEventStatus } from "../api";

const windowHeight = Dimensions.get("window").height;
const blankFilters = { startDate: null, endDate: null, specie: [], camera: [] };

const AllEvents = ({ headerNav, navigation, eventsReRender, setEventsReRender, type }) => {
  const { colors } = useTheme();

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(blankFilters);
  const [selected, setSelected] = useState([]);
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [filterMenuVisibility, setFilterMenuVisibility] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const organizationDetails = await getOrganizationDetails();
        setOrganizationDetails(organizationDetails);
      } catch {
        console.log("error getting organization details");
      }
    })();
  }, []);

  useEffect(() => {
    if (type === "FEATURED" ? eventsReRender.featured : type === "ARCHIVED" ? eventsReRender.archived : eventsReRender.all) {
      setEvents([]);
      setPage(1);
      setFilters(blankFilters);
      setSelected([]);
      setUpdate(true);
      setTimeout(() => {
        type === "FEATURED"
          ? setEventsReRender({ ...eventsReRender, featured: false })
          : type === "ARCHIVED"
          ? setEventsReRender({ ...eventsReRender, archived: false })
          : setEventsReRender({ ...eventsReRender, all: false });
      }, 5);
    }
  }, [type === "FEATURED" ? eventsReRender.featured : type === "ARCHIVED" ? eventsReRender.archived : eventsReRender.all]);

  useEffect(() => {
    if (navigation.isFocused()) {
      headerNav.setOptions({
        headerButton: (
          <TouchableOpacity
            onPress={() => {
              if (JSON.stringify(filters) !== JSON.stringify(blankFilters)) {
                setEvents([]);
                setPage(1);
                setFilters(blankFilters);
                setSelected([]);
              } else {
                setFilterMenuVisibility(!filterMenuVisibility);
              }
            }}
          >
            <MaterialCommunityIcons
              name={JSON.stringify(filters) !== JSON.stringify(blankFilters) ? "filter-variant-remove" : "filter-variant"}
              size={24}
              color={JSON.stringify(filters) !== JSON.stringify(blankFilters) ? "red" : colors.text}
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [filters, navigation.isFocused()]);

  useEffect(() => {
    if (navigation.isFocused()) {
      headerNav.setOptions({
        headerButton1:
          selected.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                setSelected([]);
              }}
            >
              <MaterialIcons name="clear-all" size={24} color={colors.text} />
            </TouchableOpacity>
          ) : null,
        headerButton2:
          selected.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                (async () => {
                  try {
                    const res = await updateEventStatus(selected, type === "ARCHIVED" ? "restore" : "archive");
                    if (res) {
                      Alert.alert("Success", "Event(s) successfully updated");
                      setEventsReRender({
                        all: true,
                        featured: true,
                        archived: true,
                      });
                      // setEvents([]);
                      // setPage(1);
                      // setSelected([]);
                    } else {
                      throw "error updating event status";
                    }
                  } catch {
                    Alert.alert("Error", "Error updating event(s)");
                  }
                })();
              }}
            >
              <MaterialIcons name={type === "ARCHIVED" ? "unarchive" : "archive"} size={24} color={type === "ARCHIVED" ? "red" : colors.text} />
            </TouchableOpacity>
          ) : null,
        headerButton3:
          selected.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                (async () => {
                  try {
                    const res = await updateEventStatus(selected, type === "FEATURED" ? "restore" : "feature");
                    if (res) {
                      Alert.alert("Success", "Event(s) successfully updated");
                      setEventsReRender({
                        all: true,
                        featured: true,
                        archived: true,
                      });
                      // setEvents([]);
                      // setPage(1);
                      // setSelected([]);
                    } else {
                      throw "error updating event";
                    }
                  } catch {
                    Alert.alert("Error", "Error updating event(s)");
                  }
                })();
              }}
            >
              <MaterialCommunityIcons name="star-box" size={24} color={type === "FEATURED" ? "red" : colors.text} />
            </TouchableOpacity>
          ) : null,
      });
    }
  }, [selected, navigation.isFocused()]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {navigation.isFocused() ? (
        <FiltersMenu
          filterMenuVisibility={filterMenuVisibility}
          setFilterMenuVisibility={setFilterMenuVisibility}
          organizationDetails={organizationDetails}
          filters={filters}
          setFilters={setFilters}
          setEvents={setEvents}
          setPage={setPage}
        />
      ) : null}

      <View style={styles.eventsContainer}>
        <EventTable
          events={events}
          setEvents={setEvents}
          page={page}
          setPage={setPage}
          filters={filters}
          selected={selected}
          setSelected={setSelected}
          type={type}
          update={update}
          setUpdate={setUpdate}
        />
      </View>
    </View>
  );
};

export default AllEvents;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
  },
  filtersContainer: {
    flex: 1,
  },
  eventsContainer: {
    flex: 3,
  },
  buttonContainer: {
    marginRight: 24,
    marginLeft: 24,
  },
  buttonInnerContainer: {
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 30,
  },
});
