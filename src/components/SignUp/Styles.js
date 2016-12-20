import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  formEditView: {
    width: deviceWidth - 30,
    borderBottomWidth: 1,
    borderBottomColor: '#a6aeae',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 15,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#ffffff',
  },
  formEditBottomLine: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  formView: {
    width: deviceWidth - 40,
    borderBottomWidth: 1,
    borderBottomColor: '#efeff2',
    paddingBottom: 15,
  },
  deleteView: {
    width: 77,
    backgroundColor: '#fd5b52',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#ffffff',
  },
  formNameContainer: {
    width: deviceWidth - 40,
    height: 16,
  },
  formName: {
    color: '#2e3031',
    fontSize: 16,
  },
  formEditName: {
    textAlign: 'left',
    textAlignVertical: 'center',
    height: 40,
  },
  formDate: {
    color: '#2e3031',
    marginTop: 10,
    fontSize: 12,
  },
  formEditDegree: {
    width: deviceWidth - 70,
  },
  formEditYear: {
    width: (deviceWidth - 70) / 2,
    //alignItems: 'center',
  },
  doneWrapper: {
    alignItems: 'flex-end',
    backgroundColor: '#fbfbfb',
    padding: 10,
  },
  doneText: {
    fontSize: 16,
    color: '#44acff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPadding: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  modalCancel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formEditDate: {
    height: 30,
    borderWidth: 0,
    alignItems: 'center',
  },
  firstMargin: {
    marginTop: 20,
  },
  sectionMargin: {
    marginTop: 10.5,
  },
  flexR: {
    flexDirection: 'row',
  },
  editL: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'flex-start',
  },
  editR: {
    width: 26,
    marginTop: 15,
    marginRight: 20,
    justifyContent: 'flex-end',
  },
  editBtn: {
    width: 16,
    height: 16,
  },
});

module.exports = styles;
