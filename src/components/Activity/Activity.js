import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ListView,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { dimensions } from '../Shared/Dimensions';
import Connected from './Connected';
import NewRequests from './NewRequests';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from './ScrollableTabBar';
import Text from '../Shared/UniText';

class Activity extends Component {
  constructor(props) {
    super(props);

    // TODO: isRefreshing is for refresh control will be added shortly
    this.state = {
        isRefreshing: false,
      };
  }

  componentDidMount() {
    this.setState({
      isRefreshing: false,
      currentActivityPage: this.props.currentActivityPage,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentActivityPage: nextProps.currentActivityPage,
    });
  }

  render() {
    return (
      <ScrollableTabView
        style={styles.container}
        initialPage={0}
        page={this.state.currentActivityPage}
        locked={true}
        tabBarTextStyle={styles.tabBarText}
        tabBarInactiveTextColor={'#a6aeae'}
        tabBarActiveTextColor={'#2e3031'}
        tabBarUnderlineStyle={styles.tabBarUnderline}
        renderTabBar={() => <ScrollableTabBar
        leftOffset={53}
        rightOffset={42}
        />}>
        <NewRequests tabLabel='NEW REQUESTS'/>
        <Connected tabLabel='CONNECTED' me={this.props.me}/>
      </ScrollableTabView>
    );
  }
}

const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop:  dimensions.heightWeight * 64,
      },
      android: {
        marginTop:  dimensions.heightWeight * 54,
      },
    }),
  },
  tabBarText: {
    fontFamily: 'SFUIText-Bold',
    fontSize: dimensions.fontWeight * 12,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: dimensions.heightWeight * 5,
    paddingHorizontal: dimensions.widthWeight * 5,
  },
  text: {
    color: '#546979',
    paddingHorizontal: dimensions.widthWeight * 8,
    fontSize: dimensions.fontWeight * 12,
  },
  loadingText: {
    fontWeight: 'bold',
    fontSize: dimensions.fontWeight * 20,
    color: 'black',
  },
  tabBarUnderline: {
    backgroundColor: '#44acff',
    borderBottomColor: '#44acff',
    height: 2,
    width: WIDTH / 12.5,
    marginLeft: WIDTH / 8,
  },
});

Activity.defaultProps = {
  initialTab: -1,
};

module.exports = Activity;
