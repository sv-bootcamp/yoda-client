import React, { Component } from 'react';
import {
  Alert,
  Image,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import EditForm from './EditForm';
import EduForm from './EduForm';
import EduFormIOS from './EduFormIOS';
import LinearGradient from 'react-native-linear-gradient';
import MyPic from './MyPic';
import Progress from '../Shared/Progress';
import UserUtil from '../../utils/UserUtil';
import WorkForm from './WorkForm';
import {
  Actions,
  Scene,
} from 'react-native-router-flux';

// List data for rendering each section.
const fieldTitles = [
  { name: 'Name', isArray: false, },
  { name: 'Email', isArray: false, },
  { name: 'About', isArray: false, },
  { name: 'Education', isArray: true, },
  { name: 'Experience', isArray: true, },
];

class GeneralInfo extends Component {

  constructor(props) {
    super(props);

    let eduDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let workDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      refreshFlag: false,
      profile: {},
      eduDataSource: eduDS.cloneWithRows([]),
      workDataSource: workDS.cloneWithRows([]),
      imageResource: null,
      needRefresh: true,
    };
  }

  // After rendering, request user profile to server
  componentDidMount() {
    if (this.props.me) {
      let result = this.props.me;
      result.education.reverse();
      this.setState({
        profile: result,
        eduDataSource: this.state.eduDataSource.cloneWithRows(result.education),
        workDataSource: this.state.workDataSource.cloneWithRows(result.experience),
      });
    } else {
      UserUtil.getMyProfile(this.onGetMyProfileCallback.bind(this));
    }

    if(this.props.fromEdit)
      Actions.refresh({ rightTitle: 'Save', onRight: this.regist.bind(this) });
  }

  componentWillReceiveProps(props) {
    if(props.fromEdit && this.state.needRefresh) {
      Actions.refresh({
        rightTitle: 'Save',
        onRight: this.regist.bind(this),
        onBack: () => {
          this.setState({ needRefresh: true });
          Actions.pop();
        }
      });
      this.setState({ needRefresh: false });
    }
  }

  onGetMyProfileCallback(result, error) {
    if (result) {
      result.education.reverse();
      this.setState({
        profile: result,
        eduDataSource: this.state.eduDataSource.cloneWithRows(result.education),
        workDataSource: this.state.workDataSource.cloneWithRows(result.experience),
      });
    }

    if (error) {
      if (error.msg) {
        Alert.alert(error.msg);
      }
    }
  }

  // Render progress bar, profile image and form.
  render() {
    let readyUploadImage = (imageResource) => {
      this.state.imageResource = imageResource;
    };

    let Forms = this.getForms();
    let submitButton = null;

    if(!this.props.fromEdit)
      submitButton = (
        <View style={styles.nextView}>
          <TouchableOpacity onPress={() => this.regist()}>
            <LinearGradient
              start={[0.9, 0.5]} end={[0.0, 0.5]}
              locations={[0, 0.75]}
              colors={['#07e4dd', '#44acff']}
              style={styles.nextImage}>
              <Text style={styles.nextTxt}>NEXT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>);

    return (
      <View style={styles.container}>
        {this.props.fromEdit ? null : (<Progress level={4} step={1} />)}
        <ScrollView style={styles.scrollView}>
          <MyPic uri={this.state.profile.profile_picture}
            readyUploadImage={readyUploadImage} />
          {Forms}
          {submitButton}
        </ScrollView>
      </View>
    );
  }

  // Regist general user info.
  regist() {
    const profile = this.state.profile;
    if (profile.name === '') {
      Alert.alert('Sign In', 'Please input your name.');
      return;
    }

    let emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailFilter.test(profile.email) === false) {
      Alert.alert('Sign In', 'Please input your correct email.');
      return;
    }

    let image = null;

    if (profile.imageResource) {
      image = profile.imageResource.data;
    }

    let fieldSet = {
      name: profile.name,
      email: profile.email,
      about: profile.about,
      education: profile.education,
      experience: profile.experience,
      image: image,
    };

    UserUtil.editGeneral(this.onUploadCallback.bind(this), fieldSet);
  }

  onUploadCallback(result, error) {
    if (error) {
      alert(error);
    } else if (result) {
      if (this.props.fromEdit) {
        Actions.pop();
      } else {
        Actions.careerInfo({me: this.props.me});
      }
    }
  }

  // Get Forms(name, email, about, education, experience)
  // Each form includes title and input
  getForms() {
    let Forms = fieldTitles.map(
      (title, idx) => {
        let Title = this.getTitle(title);
        let Input = this.getInput(title);
        return (
          <View style={styles.form} key={idx}>
            {Title}
            {Input}
          </View>
        );
      }
    );

    return Forms;
  }

  // If a form has several inputs, the title should be able to add new input set
  getTitle(title) {
    if (title.isArray == false) {
      return <Text style={styles.title}>{title.name}</Text>;
    }

    const onPress = () => this.addNewItem(title.name);
    return (
      <View style={styles.flexR}>
        <View style={styles.horiL}>
          <Text style={styles.title}>{title.name}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.horiR}>
            <Text style={styles.add}>{'+ Add item'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  // Add new empty input set.
  addNewItem(listName) {
    const profile = this.state.profile;
    if (listName == 'Education') {
      if (!profile.education) profile.education = [];
      profile.education.unshift({
        school: { name: '' },
        type: '',
        year: { name: '' },
        concentration: [ { name: '' } ],
      });

      this.setState({
        eduDataSource: this.state.eduDataSource.cloneWithRows(profile.education),
      });
    } else if (listName == 'Experience') {
      if (!profile.experience) profile.experience = [];
      profile.experience.unshift({
        start_date: '',
        end_date: '',
        employer: { name: '' },
        location: { name: '' },
        position: [ { name: '' } ],
      });

      this.setState({
        workDataSource: this.state.workDataSource.cloneWithRows(profile.experience),
      });
    }
  }

  getInput(title) {
    const profile = this.state.profile;
    let Input = null;

    if (title.isArray) {
      const isEdu = title.name === 'Education';
      const props = {
        key: isEdu ? profile.education : profile.experience,
        enableEmptySections: true,
        dataSource: isEdu ? this.state.eduDataSource : this.state.workDataSource,
        renderRow: (data, sectionID, rowID) => {
          if (isEdu) return this.getDefaultEdu(data, sectionID, rowID);
          else return this.getDefaultWork(data, sectionID, rowID);
        },
      };

      Input = <ListView {...props} />;
    } else {
      let propName = title.name.toLowerCase();
      let defaultValue = profile[propName];
      Input = this.getTextInput(propName, defaultValue);
    }

    return Input;
  }

  getDefaultEdu(edu, sectionID, rowID) {
    let eduSubject = '';
    if (!edu.concentration && edu.concentration.length > 0) {
      eduSubject = edu.concentration[0].name;
    }
    let onDelete = (rowID) => this.onDeleteEdu(rowID);
    let onChangeText = (propName1, propName2, idx, text) =>
                        this.onChangeEduInfo(propName1, propName2, idx, text);

    let props = {
      name: edu.school ? edu.school.name : '',
      startYear: edu.startYear ? edu.startYear.name : '1980',
      endYear: edu.year ? edu.year.name : '1980',
      subject: eduSubject,
      id: rowID,
      onDelete: onDelete,
      onChangeText: onChangeText,
    };

    if (Platform.OS === 'ios') {
      return (
        <EduFormIOS {...props} />
      );
    } else {
      return (
        <EduForm {...props} />
      );
    }
  }

  onChangeEduInfo(propName1, propName2, idx, text) {
    const profile = this.state.profile;
    if (propName1 === 'concentration') {
      profile.education[idx][propName1] = [];
      profile.education[idx][propName1][0] = {};
      profile.education[idx][propName1][0][propName2] = text;
      return;
    }

    if (profile.education[idx][propName1] === undefined) {
      profile.education[idx][propName1] = {};
    }
    profile.education[idx][propName1][propName2] = text;
  }

  onDeleteEdu(rowID) {
    const profile = this.state.profile;
    profile.education.splice(rowID, 1);
    this.setState({
      eduDataSource: this.state.eduDataSource.cloneWithRows(profile.education),
    });
  }

  getDefaultWork(experience, sectionID, rowID) {
    let employer = experience.employer === undefined ? '' : experience.employer.name;
    let position = experience.position === undefined ? '' : experience.position.name;
    let start = experience.start_date === undefined ? '' : experience.start_date;
    let end = '';
    if (experience.end_date !== undefined) {
      end = experience.end_date == '0000-00' ? 'present' : experience.end_date;
    }
    let onDelete = (rowID) => this.onDeleteWork(rowID);
    let onChangeText = (propName1, propName2, idx, text) =>
                        this.onChangeExpInfo(propName1, propName2, idx, text);

    return (
      <WorkForm
        employer={employer}
        position={position}
        start={start}
        end={end}
        id={rowID}
        onDelete={onDelete}
        onChangeText={onChangeText} />
    );
  }

  onChangeExpInfo(propName1, propName2, idx, text) {
    if (propName2 == null) {
      this.state.profile.experience[idx][propName1] = text;
    } else {
      this.state.profile.experience[idx][propName1][propName2] = text;
    }
  }

  onDeleteWork(rowID) {
    const profile = this.state.profile;
    profile.experience.splice(rowID, 1);
    this.setState({
      workDataSource: this.state.workDataSource.cloneWithRows(profile.experience),
    });
  }

  getTextInput(propName, defaultValue) {
    let onChangeText = (propName, text) => this.onChangeText(propName, text);
    return <EditForm
            propName={propName}
            defaultValue={defaultValue}
            onChangeText={onChangeText} />;
  }

  onChangeText(propName, text) {
    this.state[propName] = text;
  }

}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: 64,
      },
      android: {
        marginTop: 54,
      },
    }),
    marginBottom: 30,
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {
    paddingLeft: 40,
  },
  form: {
    marginTop: 20,
  },
  title: {
    color: '#a6aeae',
    fontSize: 12,
    fontWeight: 'bold',
  },
  add: {
    color: '#2e3031',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 30,
  },
  nextView: {
    alignItems: 'center',
    marginTop: 64,
    marginBottom: 30,
    marginRight: 40,
  },
  nextImage: {
    width: 230,
    height: 45,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextTxt: {
    fontFamily: 'SFUIText-Bold',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 16,
  },
  flexR: {
    flexDirection: 'row',
  },
  horiL: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  horiR: {
    justifyContent: 'flex-end',
  },
});

module.exports = GeneralInfo;
