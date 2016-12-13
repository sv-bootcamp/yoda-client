import {
  Dimensions,
  StyleSheet,
} from 'react-native';
import { dimensions } from '../Shared/Dimensions';

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  formEditView: {
    borderBottomWidth: 1,
    borderBottomColor: '#a6aeae',
    paddingBottom: dimensions.heightWeight * 15,
  },
  formEditBottomLine: {
    borderBottomColor: '#a6aeae',
    borderBottomWidth: 1,
  },
  formView: {
    width: deviceWidth - dimensions.widthWeight * 40,
    borderBottomWidth: 1,
    borderBottomColor: '#efeff2',
    paddingBottom: dimensions.heightWeight * 15,
  },
  deleteView: {
    width: dimensions.widthWeight * 77,
    backgroundColor: '#fd5b52',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#ffffff',
  },
  formNameContainer: {
    width: deviceWidth - dimensions.widthWeight * 40,
    height: dimensions.heightWeight * 16,
  },
  formName: {
    color: '#2e3031',
    fontSize: dimensions.fontWeight * 16,
  },
  formEditName: {
    textAlign: 'left',
    textAlignVertical: 'center',
    height: dimensions.heightWeight * 40,
  },
  formDate: {
    color: '#2e3031',
    marginTop: dimensions.heightWeight * 10,
    fontSize: dimensions.fontWeight * 12,
  },
  formEditYear: {
    width: dimensions.widthWeight * 100,
  },
  doneWrapper: {
    alignItems: 'flex-end',
    backgroundColor: '#fbfbfb',
    paddingVertical: dimensions.heightWeight * 10,
    paddingHorizontal: dimensions.widthWeight * 10,
  },
  doneText: {
    fontSize: dimensions.fontWeight * 16,
    color: '#44acff',
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
  },
  formEditDate: {
    height: dimensions.heightWeight * 30,
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  firstMargin: {
    marginTop: dimensions.heightWeight * 20,
  },
  sectionMargin: {
    marginTop: dimensions.heightWeight * 10.5,
  },
  flexR: {
    flexDirection: 'row',
  },
  editL: {
    flex: 1,
    marginTop: dimensions.heightWeight * 15,
    justifyContent: 'flex-start',
  },
  editR: {
    width: dimensions.widthWeight * 26,
    marginTop: dimensions.heightWeight * 15,
    marginRight: dimensions.widthWeight * 20,
    justifyContent: 'flex-end',
  },
  editBtn: {
    width: dimensions.widthWeight * 16,
    height: dimensions.heightWeight * 16,
  },
});

module.exports = styles;
