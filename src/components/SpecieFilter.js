import { StyleSheet } from 'react-native'
import React, { useState } from 'react'

import ChipFilter from './ChipFilter'

const SpecieFilter = ({  }) => {
  const allSpecie = ['All', 'Human', 'Alien', 'yes', 'no', 'ok']
  const [species, setSpecies] = useState([])
  
  return (
    <ChipFilter allItems={allSpecie} selectedItems={species} setSelectedItems={setSpecies} primaryColour={'#00bcd4'} secondaryColour={'#ffffff'} />
  )
}

export default SpecieFilter

const styles = StyleSheet.create({})