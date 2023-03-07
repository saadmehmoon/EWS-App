import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Chip } from '@react-native-material/core'

const ChipFilter = ({ allItems, selectedItems, setSelectedItems, primaryColour, secondaryColour, nameAttr }) => {
  return (
    <View style={styles.container}>
      {allItems.map((item, key) => (
        <Chip
          key={key}
          label={item[nameAttr]}
          color={selectedItems.includes(item) ? secondaryColour : primaryColour}
          backgroundColor={selectedItems.includes(item) ? primaryColour : secondaryColour}
          variant={selectedItems.includes(item) ? "filled" : "outlined"}
          style={styles.chip}
          onPress={() => {
            if (selectedItems.includes(item)) {
              setSelectedItems(selectedItems.filter(val => val !== item));
            } else {
              setSelectedItems([...selectedItems, item]);
            }
          }}
        />
      ))}
    </View>
  );
};

export default ChipFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '2%',
  }
});
