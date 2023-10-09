import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { RootStackParamList } from '../../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';

function useEditor() {
  const navigation = useNavigation();
  const router = useRoute<RouteProp<RootStackParamList, 'Editor'>>();
  const item = router.params.item;
  const [editorState, setEditorState] = useState<'read' | 'edit'>(
    !!item ? 'read' : 'edit',
  );
  const [id, setId] = useState(item?.id);
  const [title, setTitle] = useState(item?.title || '');
  const [content, setContent] = useState(item?.content || '');

  const handleSave = useCallback(() => {
    setEditorState('read');
    const data = router.params.onSubmit({ title, content }, id);
    setId(data.newData.id);
  }, [title, content, id, router]);

  const handleDelete = useCallback(() => {
    if (id) {
      navigation.goBack();
      router.params.onDelete(id);
    }
  }, [id]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 5 }}>
          {editorState === 'read' ? (
            <>
              <Icon
                name={'edit'}
                size={28}
                color={'#FFF'}
                onPress={() => setEditorState('edit')}
              />
              <Icon
                name="delete"
                size={28}
                color={'#FFF'}
                onPress={handleDelete}
              />
            </>
          ) : (
            <Icon name={'save'} size={28} color={'#FFF'} onPress={handleSave} />
          )}
        </View>
      ),
    });
  }, [editorState, handleSave]);

  return {
    editorState,
    title,
    setTitle,
    content,
    setContent,
  };
}

export default useEditor;
