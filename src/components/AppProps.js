import {
  StyleSheet,
} from 'react-native';
import {
  Alert,
  ActionConst,
} from 'react-native-router-flux';
import Activity from './Activity/Activity';
import CareerInfo from './SignUp/CareerInfo';
import ChannelList from './Chat/ChannelList';
import ChatPage from './Chat/ChatPage';
import Completed from './SignUp/Completed';
import EvalPage from './Eval/EvalPage';
import ExpertInfo from './SignUp/ExpertInfo';
import OnBoarding from './OnBoarding/OnBoardingPage';
import FindPassStep1 from './Login/FindPassStep1';
import FindPassStep2 from './Login/FindPassStep2';
import FindPassStep3 from './Login/FindPassStep3';
import GeneralInfo from './SignUp/GeneralInfo';
import Login from './Login/Login';
import Main from './Main';
import MyPage from './MyPage';
import Personality from './SignUp/Personality';
import UserList from './UserList/UserList';
import UserProfile from './userProfile/UserProfile';
import RequestPage from './userProfile/RequestPage';
import RequestSent from './userProfile/RequestSent';
import SignUp from './Login/SignUp';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#fafafa',
    borderBottomColor: '#d6dada',
  },
  title: {
    fontSize: 16,
    color: '#2e3031',
  },
  rightBtn: {
    fontSize: 16,
    color: '#557bfc',
  },
  leftBtn: {
    width: 25,
    height: 20,
  },
});

const leftButtonGrey = require('../resources/icon-arrow-left-grey.png');
const backButton = require('../resources/icon-arrow-left-white.png');

const AppProps = {
  rootProp: {
    key: 'root',
    titleStyle: styles.title,
    rightButtonTextStyle: styles.rightBtn,
    navigationBarStyle: styles.bar,
    leftButtonIconStyle: styles.leftBtn,
  },
  sceneProps: [
    {
      key: 'onBoarding',
      component: OnBoarding,
      hideNavBar: true,
      type: ActionConst.RESET,
    },
    {
      initial: true,
      key: 'login',
      component: Login,
      hideNavBar: true,
      type: ActionConst.RESET,
    },
    {
      key: 'signUp',
      component: SignUp,
      hideNavBar: true,
    },
    {
      key: 'findPassStep1',
      component: FindPassStep1,
      hideNavBar: false,
      title: 'Forgot Password',
    },
    {
      key: 'findPassStep2',
      component: FindPassStep2,
      hideNavBar: false,
      title: 'Forgot Password',
    },
    {
      key: 'findPassStep3',
      component: FindPassStep3,
      hideNavBar: false,
      title: 'Forgot Password',
    },
    {
      key: 'generalInfo',
      component: GeneralInfo,
      hideNavBar: false,
      title: 'General Info',
      type: ActionConst.RESET,
    },
    {
      key: 'careerInfo',
      component: CareerInfo,
      hideNavBar: false,
      title: 'Career Info',
      type: ActionConst.RESET,
    },
    {
      key: 'expertInfo',
      component: ExpertInfo,
      hideNavBar: false,
      title: 'I am expertised in',
      hideBackImage: false,
      backButtonImage: leftButtonGrey,
    },
    {
      key: 'personality',
      component: Personality,
      hideNavBar: false,
      title: 'Personality',
      hideBackImage: false,
      backButtonImage: leftButtonGrey,
    },
    {
      key: 'completed',
      component: Completed,
      hideNavBar: false,
      title: 'Congrats!',
      type: ActionConst.RESET,
      backButtonImage: leftButtonGrey,
    },
    {
      key: 'main',
      component: Main,
      hideNavBar: false,
      title: 'Bridgeme',
      type: ActionConst.RESET,
      rightTitle: 'right',
      rightButtonTextStyle: { color: 'transparent' },
      rightButtonIconStyle: { marginBottom: 13, marginRight: 6 },
      rightButtonImage: require('../resources/filter.png'),
      onRight: () => Alert.alert('Filtering service will come soon'),
    },
    {
      key: 'userList',
      component: UserList,
    },
    {
      key: 'myPage',
      component: MyPage,
    },
    {
      key: 'userProfile',
      component: UserProfile,
      hideBackImage: false,
      backButtonImage: require('../resources/icon-arrow-left-white.png'),
      navigationBarStyle: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
      },
    },
    {
      key: 'requestPage',
      component: RequestPage,
      title: 'Request Connection',
      backButtonImage: backButton,
    },
    {
      key: 'requestSent',
      component: RequestSent,
      title: 'Request Sent',
      hideBackImage: true,
      backButtonImage: backButton,
      type: ActionConst.REPLACE,
    },
    {
      key: 'activity',
      component: Activity,
    },
    {
      key: 'chatPage',
      component: ChatPage,
      onBack: () => {
        Actions.pop();

        //Delay 10ms to refresh previous scene when current scene is completely popped.
        setTimeout(() => Actions.refresh(), 10);
      },
    },
    {
      key: 'channelList',
      component: ChannelList,
    },
    {
      key: 'evalPageMain',
      component: EvalPage,
      hideBackImage: true,
      panHandlers: null,
      onBack: () => false,
      title: 'Survey',
      hideNavBar: false,
    },
    {
      key: 'evalPage',
      component: EvalPage,
      title: 'Survey',
      hideNavBar: false,
    },
  ],
};

export default AppProps;