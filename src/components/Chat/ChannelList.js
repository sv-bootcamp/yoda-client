import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppState,
  AsyncStorage,
  Image,
  ListView,
  NetInfo,
  Platform,
  RefreshControl,
  StyleSheet,
  TextInput,
  Vibration,
  View,
} from 'react-native';
import { dimensions } from '../Shared/Dimensions';
import FCM from 'react-native-fcm';
import Row from './Row';
import SendBird from 'sendbird';
import Text from '../Shared/UniText';

///Todo : Implement Sort by Alphabet & Latest Action in iOS native.
class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      me: props.me,
      dataSource: this.ds.cloneWithRows([]),
      loaded: false,
      channelList: [],
    };
    this.isConnected = false;
    this.sb = SendBird();
    this.ChannelHandler = new this.sb.ChannelHandler();
    this.ChannelHandler.onMessageReceived = this.onChanneListMessageReceived.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.isConnected = isConnected;
    });

    NetInfo.isConnected.addEventListener('change', this.onConnectionStateChange.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.initChannelList();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change');
  }

  initChannelList(callback) {
    this.connectSendBird((user, error) => {
      if (user) {
        this.refreshChannelList();
      }
    });
  }

  refreshChannelList(callback) {
    const channelListQuery = this.sb.GroupChannel.createMyGroupChannelListQuery();
    channelListQuery.includeEmpty = true;

    if (channelListQuery.hasNext) {
      channelListQuery.next(function (channelList, error) {
        if (error) {
          alert(error);
          throw new Error();
        } else {
          this.setState({
            channelList: channelList,
            dataSource: this.ds.cloneWithRows(channelList),
            loaded: true,
          });
          if (typeof callback === 'function') {
            callback();
          }
        }
      }.bind(this));
    }
  }

  connectSendBird(callback) {
    this.sb.connect(this.props.me._id, (user, error) => {
      this.sb.removeChannelHandler('ChannelList');
      this.sb.addChannelHandler('ChannelList', this.ChannelHandler);

      if (typeof callback === 'function') {
        callback(user, error);
      }
    });
  }

  onConnectionStateChange(isConnected) {
    this.isConnected = isConnected;
    if (this.isConnected) {
      this.initChannelList();
    } else {
      this.sb.removeChannelHandler('ChannelList');
      this.sb.disconnect();
    }
  }

  onChanneListMessageReceived(channel, userMessage) {
    FCM.presentLocalNotification(userMessage);
    this.refreshChannelList();
  }

  renderRow(rowData) {
    return (
      <Row
        myId={this.state.me._id}
        dataSource={rowData}
      />
    );
  }

  renderSearchBar() {

    ///Todo : Complete Search bar and sort list.
    return (
      <View style={styles.searchBarContainer}>
        <TextInput
          ref='input'
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={false}
          onChange={this.onSearchChange}
          placeholder='Search people'
          placeholderTextColor='#c6cbcc'
          style={styles.searchBarInput}
          underlineColorAndroid='transparent'
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.ViewContainer}>
        <View style={styles.loadingViewheader}>
          <Text style={styles.loadingViewheaderText}>Loading...</Text>
          <ActivityIndicator
            animating={true}
            style={[styles.loadingViewActivityIndicator]}
            size='large'
          />
        </View>
      </View>
    );
  }

  renderOnboardingView() {
    return (
      <View style={styles.ViewContainer}>
        <View style={styles.onboardingView}>

          <Image
            style={styles.onboardingImage}
            source={require('../../resources/chat_onboarding.png')}
          />
          <Text style={styles.onboardingText1}>Make a chat!</Text>
          <Text style={styles.onboardingText2}>You did not chat with anyone yet.</Text>
        </View>
      </View>
    );
  }

  renderListView() {
    return (
      <View style={styles.ViewContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderHeader={null}
          enableEmptySections={true}
        />
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else {
      if (this.state.channelList.length == 0) {
        return this.renderOnboardingView();
      }

      return this.renderListView();
    }
  }
}

const styles = StyleSheet.create({
  loadingViewheader: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: dimensions.heightWeight * 250,
  },
  loadingViewheaderText: {
    fontSize: dimensions.fontWeight * 20,
    color: '#0e417a',
  },
  loadingViewActivityIndicator: {
    marginTop: dimensions.heightWeight * 30,
  },
  ViewContainer: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: dimensions.heightWeight * 64,
      },
      android: {
        marginTop: dimensions.heightWeight * 54,
      },
    }),
  },
  searchBarContainer: {
    height: dimensions.heightWeight * 50,
    paddingVertical: dimensions.heightWeight * 10,
    paddingHorizontal: dimensions.widthWeight * 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efeff2',
    flexDirection: 'row',
  },
  searchBarInput: {
    flex: 1,
    paddingLeft: dimensions.widthWeight * 10,
    paddingRight: dimensions.widthWeight * 10,
    paddingBottom: 0,
    paddingTop: 0,
    fontSize: dimensions.fontWeight * 12,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    textDecorationLine: 'none',
  },
  header: {
    height: dimensions.heightWeight * 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: dimensions.heightWeight * 55,
  },
  loadingText: {
    fontWeight: 'bold',
    fontSize: dimensions.fontWeight * 20,
    color: 'black',
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: dimensions.heightWeight * 200,
  },

  onboardingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingImage: {
    width: dimensions.widthWeight * 210,
    height: dimensions.heightWeight * 210,
  },
  onboardingText1: {
    marginTop: dimensions.heightWeight * 62,
    fontSize: dimensions.fontWeight * 20,
    color: '#a6aeae',
  },
  onboardingText2: {
    marginTop: dimensions.heightWeight * 15,
    fontSize: dimensions.fontWeight * 14,
    color: '#a6aeae',
  },
});

module.exports = ChannelList;
