import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const App = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('perfil')}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <Icon name="account-circle-outline" size={80} />
          </View>
          
        </View>
      </TouchableOpacity>  
      <View style={styles.subBlocksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('anotacoes')}>  
          <View style={styles.subBlock}>
            <Icon name="book" size={100} />
          </View>
          <Text style={styles.subBlockText}>Anotações</Text>
        </TouchableOpacity>  
        <TouchableOpacity onPress={() => navigation.navigate('tarefas')}>  
          <View style={styles.subBlock}>
            <Icon name="notebook-check" size={100} />
          </View>
          <Text style={styles.subBlockText}>Tarefas</Text>
        </TouchableOpacity>  
      </View>
      <View style={styles.subBlocksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('calendario')}>  
          <View style={styles.subBlock}>
            <Icon name="calendar" size={100} />
          </View>
          <Text style={styles.subBlockText}>calendario</Text>
        </TouchableOpacity>  
        <TouchableOpacity onPress={() => navigation.navigate('maps')}>  
          <View style={styles.subBlock}>
            <Icon name="google-maps" size={90} />
          </View>
          <Text style={styles.subBlockText}>Localização</Text>
        </TouchableOpacity>  
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    width: 350,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    zIndex: 2,
    marginRight: 220,
    marginTop: -10,
  },
  subBlocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 6, 
    marginTop: 30,
  },
  subBlock: {
    width: 100,
    height: 120,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subBlockText: {
    marginTop: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center', 
  },
});

export default App;
