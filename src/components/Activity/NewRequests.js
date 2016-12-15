import React, { Component } from 'react';
import {
  ListView,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import MatchUtil from '../../utils/MatchUtil';
import NewRequestsRow from './NewRequestsRow';
import Text from '../Shared/UniText';

class NewRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {

      //  datasource rerendered when change is made (used to set swipeout to active)
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => true,
      }),
      loaded: false,
      isEmpty: false,
      scrollEnabled: true,
    };
  }

  componentDidMount() {
    MatchUtil.getActivityList(this.onRequestCallback.bind(this));
  }

  componentWillReceiveProps(props) {
    MatchUtil.getActivityList(this.onRequestCallback.bind(this));
  }

  allowScroll(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled });
  }

  onRequestCallback(result, error) {
    if (error) {
      alert(error);
    } else if (result) {
      const REQUESTED_PENDING = 2;

      let newRequests = result.requested.filter((value) => value.status === REQUESTED_PENDING);
      newRequests = newRequests.map((value) => {
        value.detail[0]._id = value._id;
        value.detail[0].contents = value.contents;
        value.detail[0].request_date = value.request_date;
        return value.detail[0];
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newRequests),
        loaded: true,
        isEmpty: newRequests.length === 0,
      });
    }
  }

  renderRow(rowData, sectionID, rowID) {
    return <NewRequestsRow
      dataSource={rowData}
      onSelect={this.onRequestCallback.bind(this)}
      closeAllExceptCurrent={this.closeAllExceptCurrent.bind(this)}
      allowScroll={this.allowScroll.bind(this)}
      id={rowID}/>;
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: '#efeff2',
          marginLeft: 70,
        }}
      />
    );
  }

  closeAllExceptCurrent(id) {
    let temp = this.state.dataSource._dataBlob.s1.slice();
    temp.map(value => value.close = id !== value._id);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(temp),
    });
  }

  render() {
    if (this.state.isEmpty)
      return (
        <View style={styles.container}>
          <Image source={require('../../resources/chat_onboarding.png')}/>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Make a connection!</Text>
            <Text style={{ color: '#a6aeae', fontSize: 14, }}>
              You did not connect with anyone yet.
            </Text>
          </View>
        </View>
      );
    else {
      return (
        <ListView
          scrollEnabled = {this.state.scrollEnabled}
          dataSource = {this.state.dataSource}
          renderRow  = {this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator}
          enableEmptySections={true}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginTop: 64,
      },
      android: {
        marginTop: 54,
      },
    }),
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 62,
  },
  title: {
    color: '#a6aeae',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
});
module.exports = NewRequests;
