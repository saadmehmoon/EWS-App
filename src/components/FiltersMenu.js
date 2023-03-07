import { Button, Modal, StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";

import CustomDatePicker from "./CustomDatePicker";
import ChipFilter from "./ChipFilter";

const FiltersMenu = ({ filters, setFilters, setEvents, setPage, filterMenuVisibility, setFilterMenuVisibility, organizationDetails }) => {
  const { colors } = useTheme();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [specie, setSpecie] = useState(filters.specie);
  const [camera, setCamera] = useState(filters.camera);

  useEffect(() => {
    setSpecie(filters.specie);
    setCamera(filters.camera);
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
  }, [filters])

  return (
    <Modal
      visible={filterMenuVisibility}
      transparent={true}
      animationType={"slide"}
      onRequestClose={() => {
        setFilterMenuVisibility(!setFilterMenuVisibility);
      }}
    >
      <View style={[styles.container, {backgroundColor: colors.background, borderColor: colors.border, borderWidth: 1}]}>
        <Text style={[styles.title, {color: colors.text}]}>Filter Options</Text>
        <ScrollView style={styles.scrollContainer}>
          <Text style={[styles.subTitles, {color: colors.text}]}>Date</Text>
          <View style={styles.dateFiltersContainer}>
            <CustomDatePicker
              placeHolderText={filters.startDate ? filters.startDate : 'Select Start Date'}
              date={startDate}
              setDate={setStartDate}
            />
            <CustomDatePicker
              placeHolderText={filters.endDate ? filters.endDate : 'Select End Date'}
              date={endDate}
              setDate={setEndDate}
            />
          </View>

          <Text style={[styles.subTitles, {color: colors.text}]}>Specie</Text>
          <ChipFilter allItems={organizationDetails.species} selectedItems={specie} setSelectedItems={setSpecie} primaryColour={colors.primary} secondaryColour={colors.background} nameAttr={'name'} />
          <Text style={[styles.subTitles, {color: colors.text}]}>Camera</Text>
          <ChipFilter allItems={organizationDetails.cameras} selectedItems={camera} setSelectedItems={setCamera} primaryColour={colors.primary} secondaryColour={colors.background} nameAttr={'description'} />
        </ScrollView>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
          <View style={styles.filterMenuButtons}>
            <Button
              title="Ignore"
              onPress={() => {
                setFilterMenuVisibility(false);
                setSpecie(filters.specie);
                setCamera(filters.camera);
                setStartDate(filters.startDate);
                setEndDate(filters.endDate);
              }}
            />
          </View>
          <View style={styles.filterMenuButtons}>
            <Button
              title="Apply"
              onPress={() => {
                setFilterMenuVisibility(false)
                setEvents([]);
                setPage(1);
                setFilters({
                  specie: specie,
                  camera: camera,
                  startDate: startDate,
                  endDate: endDate
                });
                // setFilters({
                //   startDate: startDate,
                //   endDate: endDate,
                //   specie: specie,
                //   camera: camera,
                // })
                // setPage(1);
                // setEvents([]);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FiltersMenu;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: "33%",
    marginBottom: "55%",
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 10,
    padding: '2%',
    elevation: 5,
  },
  scrollContainer: {
    width: '100%',
    paddingLeft: '2.5%'
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    padding: '2.5%'
  },
  subTitles: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  dateFiltersContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  filterMenuButtons: {
    padding: 10,
  }
});
