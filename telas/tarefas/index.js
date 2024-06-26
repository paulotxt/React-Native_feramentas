import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet,} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'tarefa.db', location: 'default' });
//Usado para armazenar informações do formulário.
const App = () => {
  const [tarefa, settarefa] = useState([]);
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [Prioridade, setPrioridade] = useState('');

  useEffect(() => {
    criarTabela();
    carregarTarefas();
  }, []);

  // Função para criar a tabela no banco de dados.
  const criarTabela = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tarefa (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, endDate TEXT, Prioridade TEXT, completed INTEGER)',
        []
      );
    });
  };

//carregar tarefas do banco de dados.
  const carregarTarefas = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tarefa', [], (_, { rows }) => {
        settarefa(rows.raw());
      });
    });
  };

  // Função para inserir uma nova tarefa 
  const salvarTarefa = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tarefa (description, endDate, Prioridade, completed) VALUES (?, ?, ?, 0)',
        [description, endDate, Prioridade],
        () => {
          carregarTarefas();
          setDescription('');
          setEndDate('');
          setPrioridade('');
        }
      );
    });
  };
//Excluir uma tarefa
  const excluirTarefa = (id) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM tarefa WHERE id = ?', [id], () => {
        carregarTarefas();
      });
    });
  };
 // Usado para mudar de concluir de uma tarefa no banco de dados.
  const alternarConclusaoTarefa = (id, concluida) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE tarefa SET completed = ? WHERE id = ?',
        [concluida ? 0 : 1, id],
        () => {
          carregarTarefas();
        }
      );
    });
  };
// Função para mostra as tarefas
  const renderItem = ({ item }) => (
    <View style={[styles.taskItem, item.completed ? styles.completedTask : null]}>
      <Text style={{color: 'black'}}>{item.description}</Text>
      <Text style={{color: 'black'}}>{item.endDate}</Text>
      <Text style={{color: 'black'}}>{item.Prioridade}</Text>
      <TouchableOpacity onPress={() => alternarConclusaoTarefa(item.id, item.completed)}>
        <Text style={{color: 'black'}}>{item.completed ? 'Desfazer' : 'Concluir'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => excluirTarefa(item.id)}>
        <Text style={{color: 'black'}}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.canpos}>
        <TextInput style={{color: 'black'}}
          placeholder="Descrição"
          placeholderTextColor="black"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View> 
      <View style={styles.canpos}>
        <TextInput style={{color: 'black'}}
          placeholder="Data de Termina"
          placeholderTextColor="black"
          value={endDate}
          onChangeText={(text) => setEndDate(text)}
        />
      </View> 
      <View style={styles.canpos}>
        <TextInput style={{color: 'black'}}
          placeholder="Prioridade"
          placeholderTextColor="black"
          value={Prioridade}
          onChangeText={(text) => setPrioridade(text)}
        />
      </View> 
      <Button title="Adicionar Tarefa" onPress={salvarTarefa} />
      <FlatList
        data={tarefa}
        renderItem={renderItem}
        keyExtractor={(item) => (item ? item.id.toString() : '')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  canpos: {
  
    padding: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 3,
  },
  taskItem: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginVertical: 5,
  },
  completedTask: {
    borderColor: 'black',
    backgroundColor: 'green',
  },
});

export default App;
