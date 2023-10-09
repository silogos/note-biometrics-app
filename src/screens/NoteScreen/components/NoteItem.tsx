import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Note } from '../../../@types';

interface INoteItem {
  item: Note;
  isSelected: boolean;
  onPress: (item: Note) => void;
  onLongPress: (item: Note) => void;
}

function NoteItem({
  item,
  isSelected,
  onPress,
  onLongPress,
}: INoteItem): JSX.Element {
  return (
    <Pressable
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress(item)}>
      <View style={[styles.note, isSelected ? styles.noteSelected : undefined]}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.noteContent} numberOfLines={3}>
          {item.content}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  note: {
    flex: 1,
    backgroundColor: '#FFF',
    marginBottom: 15,
    marginHorizontal: 10,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  noteSelected: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
    borderWidth: 3,
    borderColor: '#CCC',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
    lineHeight: 24,
    color: '#000',
  },
  noteContent: {
    fontSize: 14,
    color: '#000',
  },
});

export default NoteItem;
