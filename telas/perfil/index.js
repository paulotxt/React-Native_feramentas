import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Perfil = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sexuality, setSexuality] = useState('');
  const [isEditable, setIsEditable] = useState(true);

  const handleTakePhoto = () => {
    launchCamera({}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const handleSave = () => {
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChoosePhoto} style={styles.photoButton}>
        <View style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <Text style={styles.photoText}>Adicionar Foto</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTakePhoto} style={styles.photoButton}>
        <Text style={styles.photoButtonText}>Tirar Foto</Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.input, !isEditable && styles.inputDisabled]}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        editable={isEditable}
        placeholderTextColor="white"
      />
      <TextInput
        style={[styles.input, !isEditable && styles.inputDisabled]}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        editable={isEditable}
        placeholderTextColor="white"
      />
      <TextInput
        style={[styles.input, !isEditable && styles.inputDisabled]}
        placeholder="Sexualidade"
        value={sexuality}
        onChangeText={setSexuality}
        editable={isEditable}
        placeholderTextColor="white"
      />
      {isEditable ? (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    backgroundColor: '#fff',
  },
  photoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  photoText: {
    color: '#000',
  },
  photoButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  photoButtonText: {
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 8,
    backgroundColor: 'gray',
    color: 'white',
  },
  inputDisabled: {
    backgroundColor: '#e0e0e0',
    color: '#a0a0a0',
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default Perfil;
 