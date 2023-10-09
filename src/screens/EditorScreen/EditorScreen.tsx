import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useEditor from './useEditor';

function EditorScreen({}): JSX.Element {
  const { editorState, title, setTitle, content, setContent } = useEditor();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <TextInput
            editable={editorState === 'edit'}
            style={styles.titleText}
            placeholder="Title"
            placeholderTextColor={'#CCC'}
            maxLength={30}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.content}>
          {editorState === 'edit' ? (
            <TextInput
              multiline
              style={styles.contentText}
              placeholder="Note"
              placeholderTextColor={'#CCC'}
              value={content}
              onChangeText={setContent}
            />
          ) : (
            <ScrollView style={styles.contentScrollView}>
              <Text style={styles.contentText}>{content}</Text>
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#FFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  titleText: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 22,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentScrollView: {
    flex: 1,
  },
  contentText: {
    fontSize: 18,
    color: '#000',
    paddingTop: 10,
    padding: 15,
  },
});

export default EditorScreen;
