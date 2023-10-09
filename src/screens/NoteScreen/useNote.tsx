import { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { Note } from '../../@types';

function useNote() {
  const navigation = useNavigation();
  const [data, setData] = useState<Note[]>([]);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const submitNote = useCallback(
    (item: Omit<Note, 'id'>, id?: number): { newData: Note } => {
      let currentData = data;
      const isAddNew = !id;

      let newData: Note = {
        id: isAddNew
          ? currentData.length < 1
            ? 1
            : Math.max(...currentData.map(i => i.id)) + 1
          : id,
        ...item,
      };

      if (isAddNew) {
        currentData = [...currentData, newData];
      } else {
        const selectedNote = currentData.find(
          currentItem => currentItem.id === id,
        );
        if (selectedNote) {
          selectedNote.title = newData.title;
          selectedNote.content = newData.content;
        }

        currentData = [...currentData];
      }

      setData(currentData);

      return {
        newData,
      };
    },
    [data],
  );

  const deleteNote = useCallback((id: number) => {
    setData(currentData => {
      return currentData.filter(currentItem => currentItem.id !== id);
    });
  }, []);

  const bulkDeleteNote = useCallback(() => {
    setData(data.filter(currentItem => !selected.includes(currentItem.id)));
    setEdit(false);
    setSelected([]);
  }, [data, selected]);

  const handlePressAdd = useCallback(() => {
    navigation.navigate('Editor', {
      onSubmit: submitNote,
      onDelete: deleteNote,
    });
  }, [submitNote, deleteNote]);

  const handlePressDeleteBulk = useCallback(() => {
    Alert.alert('Delete Note', 'Are you sure you want to delete these notes?', [
      {
        text: 'Yes, sure',
        onPress: bulkDeleteNote,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  }, [data, selected]);

  const toggleSelected = useCallback(
    (item: Note) => {
      let nextSelected = [...selected];
      const isSelected = nextSelected.includes(item.id);

      if (isSelected) {
        nextSelected = nextSelected.filter(
          selectedItemId => selectedItemId !== item.id,
        );
      } else {
        nextSelected.push(item.id);
      }

      setSelected(nextSelected);

      if (nextSelected.length < 1) {
        setEdit(false);
      }
    },
    [selected],
  );

  const handlePress = useCallback(
    (item: Note) => {
      if (edit) {
        toggleSelected(item);
      } else {
        navigation.navigate('Editor', {
          item,
          onSubmit: submitNote,
          onDelete: deleteNote,
        });
      }
    },
    [edit, toggleSelected, submitNote, deleteNote],
  );

  const handleLongPress = useCallback(
    (item: Note) => {
      if (edit) return;

      setEdit(true);
      toggleSelected(item);
    },
    [edit],
  );

  const checkIsSelected = useCallback(
    (item: Note) => selected.includes(item.id),
    [selected],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        edit ? (
          <Icon
            name="delete"
            size={28}
            color={'#FFF'}
            onPress={handlePressDeleteBulk}
          />
        ) : null,
    });
  }, [edit, selected]);

  return {
    data,
    setData,
    handlePressAdd,
    handlePress,
    handleLongPress,
    checkIsSelected,
  };
}

export default useNote;
