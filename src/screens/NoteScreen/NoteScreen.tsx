import React, { useCallback, useEffect, useId, useState } from 'react';
import {
  FlatList,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteItem from './components/NoteItem';
import useNote from './useNote';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmptyComponent from './components/EmptyComponent';
import usePersistNote from './usePersistNote';

function NoteScreen({}): JSX.Element {
  const {
    data,
    setData,
    handlePressAdd,
    handlePress,
    handleLongPress,
    checkIsSelected,
  } = useNote();
  usePersistNote({ notes: data, setNotes: setData });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#0171cc'} />
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={({ item }) => (
          <NoteItem
            item={item}
            isSelected={checkIsSelected(item)}
            onPress={handlePress}
            onLongPress={handleLongPress}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyComponent onPressAdd={handlePressAdd} />
        )}
      />

      {data.length >= 1 ? (
        <TouchableOpacity
          activeOpacity={0.2}
          style={styles.buttonAdd}
          onPress={handlePressAdd}>
          <Icon name="add" size={28} color={'#FFF'} />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContainer: { paddingTop: 20, paddingBottom: 70 },
  buttonAdd: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: '#007ee5',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  buttonAddText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    lineHeight: 35,
    verticalAlign: 'middle',
  },
});

export default NoteScreen;
