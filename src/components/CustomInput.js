import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

const CustomInput = ({ control, name, rules = {}, placeholder, secureTextEntry, keyboardType }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View style={ [styles.container, { borderColor: error ? "red" : "#3e3e41" }] }>
            <TextInput style={styles.text}
              keyboardType={keyboardType}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor='gray'
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: "100%",
    height: 50,

    borderColor: "#7339e5",
    borderWidth: 1,
    borderRadius: 10,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    color: 'black'
  }
});

export default CustomInput;
