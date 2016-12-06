import React, { Component } from 'react';
import {
  AppState,
  AsyncStorage,
  NetInfo,
  ScrollView,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Activity from './Activity/Activity';
import ChannelList from './Chat/ChannelList';
import FCM from 'react-native-fcm';
import MyPage from './MyPage';
import SendBird from 'sendbird';
import ScrollableTabView  from 'react-native-scrollable-tab-view';
import TabBar from './Shared/TabBar';
import Text from './Shared/UniText';
import UserList from './UserList/UserList';
import UserUtil from '../utils/UserUtil';

const mainPageTitle = {
  DEFAULT: -1,
  HOME: 0,
  TOURNAMENT: 1,
  MYCONNECTION: 2,
  CHAT: 3,
  MYPROFILE: 4,
};

const activityPageTitle = {
  DEFAULT: -1,
  NEWREQUESTS: 0,
  CONNECTED: 1,
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMainPage: mainPageTitle.DEFAULT,
      currentActivityPage: activityPageTitle.DEFAULT,
    };

    this.isConnected = false;
  }

  componentDidMount() {
    console.log('main: componentDidMount');

    this.initSendBird((user, error)=> {
      console.log(user);
      AppState.addEventListener('change', this.onAppStateChange.bind(this));
      NetInfo.isConnected.addEventListener('change', this.onConnectionStateChange.bind(this));

      this.notificationUnsubscribe = FCM.on('notification', this.onNotificationReceived.bind(this));
      FCM.getInitialNotification().then(notif => {
        if (notif) this.actionFromNotification(notif);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.sb.removeChannelHandler('Main');
    this.sb.addChannelHandler('Main', this.ChannelHandler);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    AppState.removeEventListener('change');
    this.notificationUnsubscribe();
  }

  initSendBird(callback) {
    UserUtil.getSendBirdAppId((appId, error) => {
      if (error) {
        alert(error);
        return;
      }

      new SendBird({
        appId: appId.key,
      });
      this.sb = SendBird();
      this.connectSendBird(callback);
    });
  }

  connectSendBird(callback) {
    this.sb.connect(this.props.me._id, (user, error) => {
      this.sb.removeChannelHandler('Main');
      this.ChannelHandler = new this.sb.ChannelHandler();
      this.ChannelHandler.onMessageReceived = this.onMainMessageReceived.bind(this);
      this.sb.addChannelHandler('Main', this.ChannelHandler);
      console.log('main: addChannelHandler complete.');
      if (user) {
        if (user.nickname !== this.props.me.name ||
          user.profileUrl !== this.props.me.profile_picture) {
          this.sb.updateCurrentUserInfo(this.props.me.name, this.props.me.profile_picture);
        }
      }

      if (callback) {
        callback(user, error);
      }
    });
  }

  onAppStateChange(state) {
    if (state === 'active') {
      console.log('onAppStateChange:' + state);
      if (this.isConnected) {
        this.connectSendBird();
      }
    } else {
      console.log('onAppStateChange:' + state);
      SendBird().removeChannelHandler('Main');
      this.sb.disconnect();
    }
  }

  onConnectionStateChange(isConnected) {
    this.isConnected = isConnected;
    if (this.isConnected) {
      console.log('onConnectionStateChange:' + isConnected);
      this.connectSendBird();
    } else {
      console.log('onConnectionStateChange:' + isConnected);
      SendBird().removeChannelHandler('Main');
      this.sb.disconnect();
    }
  }

  onMainMessageReceived(channel, userMessage) {
    console.log('onMainMessageReceived');
    //alert('main.onMessageReceived :' + JSON.stringify(userMessage));
    Vibration.vibrate();
  }

  onNotificationReceived(notif) {
    console.log('onNotificationReceived');
    if (notif.local_notification) {

      //this is a local notification
    }
    if (notif.opened_from_tray) {
      this.actionFromNotification(notif);
    }
  }

  actionFromNotification(notif) {
    Actions.main({ me: this.props.me });
    if (notif.notificationType === 'MESSAGE') {
      this.changeMainPage(mainPageTitle.CHAT, () => {
        //const opponent = JSON.parse(notif.extraData).opponent;
        //Actions.chatPage({
        //  title: opponent.name,
        //  me: { userId: this.props.me._id },
        //  opponent: opponent,
        //});
      });
    } else if (notif.notificationType === 'CONNECTION') {
      this.changeMainPage(
        mainPageTitle.MYCONNECTION, () => this.changeActivityPage(activityPageTitle.CONNECTED));
    } else if (notif.notificationType === 'REQUEST') {
      this.changeMainPage(
        mainPageTitle.MYCONNECTION, () => this.changeActivityPage(activityPageTitle.NEWREQUESTS));
    }
  }

  changeMainPage(pageTitle, callback) {
    this.setState({ currentMainPage: pageTitle }, () => {
      this.setState({ currentMainPage: mainPageTitle.DEFAULT }, () => {
        if (typeof callback === 'function') callback();
      });
    });
  }

  changeActivityPage(pageTitle, callback) {
    this.setState({ currentActivityPage: pageTitle }, () => {
      this.setState({ currentActivityPage: activityPageTitle.DEFAULT }, () => {
        if (typeof callback === 'function') callback();
      });
    });
  }

  render() {

    return (
        <ScrollableTabView
          initialPage={0}
          page={this.state.currentMainPage}
          onChangeTab={(obj) => {
            if (obj.i === pageTitle.HOME) {
              Actions.refresh({ title: 'Bridge Me' });
            } else if (obj.i === mainPageTitle.TOURNAMENT) {
              Actions.refresh({ title: 'Tournament' });
            } else if (obj.i === mainPageTitle.MYCONNECTION) {
              Actions.refresh({ title: 'My Connection' });
            } else if (obj.i === mainPageTitle.CHAT) {
              Actions.refresh({ title: 'Chat' });
            } else if (obj.i === mainPageTitle.MYPROFILE) {
              Actions.refresh({ title: 'My Profile' });
            }
          }}

          tabBarPosition='bottom'
          locked={true}
          scrollWithoutAnimation={true}
          renderTabBar={() => <TabBar />}
        >
          <UserList tabLabel="ios-home" style={styles.tabView} />
          <ScrollView tabLabel="md-shuffle" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Tournament</Text>
            </View>
          </ScrollView>
          <Activity
            tabLabel="ios-people"
            style={styles.tabView}
            currentActivityPage={this.state.currentActivityPage}
            me={this.props.me} />
          <ChannelList tabLabel="ios-chatbubbles" style={styles.tabView} me={this.props.me} />
          <MyPage tabLabel="md-contact" me={this.props.me} />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

module.exports = Main;
