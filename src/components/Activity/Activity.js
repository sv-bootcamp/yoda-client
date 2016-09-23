import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  ListView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Row from './Row';
import ServerUtil from '../../utils/ServerUtil';
import ErrorMeta from '../../utils/ErrorMeta';

class Activity extends Component {
  constructor(props) {
    super(props);

    ServerUtil.initCallback(
      (result) => this.onRequestSuccess(result),
      (error) => this.onRequestFail(error));
  }

  getInitialStates() {
    return {
        dataBlob: {},
        dataSource: new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        }),
        loaded: false,
        isRefreshing: false,
      };
  }

  // Refresh data
  onRefresh() {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      ServerUtil.getActivityList();
      this.setState({ isRefreshing: false });
    }, 2000);
  }

  onRequestSuccess(result) {
    console.log(result);
    let sectionIDs = ['Request Sent', 'Connected', 'Request Received'];
    let sectionIndex = 0;
    const REQUESTED_PENDING = 2;
    const REQUESTED_ACCEPT = 1;

    for (let j = 0; j < sectionIDs.length; j++)
      this.state.dataBlob[sectionIDs[j]] = [];

    for (let prop in result) {

      // Skip 'rejected' case since we won't expose it to user
      if (prop === 'rejected') {
        continue;
      }

      for (let i = 0; i < result[prop].length; i++) {
        result[prop][i].detail[0].id = result[prop][i]._id;
        result[prop][i].detail[0].status = result[prop][i].status;
        result[prop][i].detail[0].type = prop;

        if (prop === 'requested') {
          if (result[prop][i].status === REQUESTED_ACCEPT) {
            result[prop][i].detail[0].type = 'accepted';
            this.state.dataBlob[sectionIDs[1]].push(result[prop][i].detail[0]);
          } else if (result[prop][i].status === REQUESTED_PENDING) {
            this.state.dataBlob[sectionIDs[sectionIndex]].push(result[prop][i].detail[0]);
          }
        }
      }

      sectionIndex++;
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.dataBlob, sectionIDs),
      loaded: true,
    });
    console.log(this.state.dataBlob);
  }

  onRequestFail(error) {
    if (error.code !== ErrorMeta.ERR_NONE) {
      alert(error.msg);
    }
  }

  componentWillMount() {
    this.setState(this.getInitialStates);
  }

  componentDidMount() {
    ServerUtil.getActivityList();
  }

  renderRow(rowData) {
    return <Row dataSource={rowData} onSelect={this.onRequestSuccess.bind(this)}/>;
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.section}>
        <Text style={styles.text}>{sectionID}</Text>
      </View>
    );
  }

  renderLoadingView() {
    return (
        <View style={styles.header}>
            <View style={styles.container}>
                <ActivityIndicator
                    animating={!this.state.loaded}
                    style={[styles.activityIndicator, { height: 80 }]}
                    size="large"
                />
            </View>
            <Text style={styles.loadingText}>Loading</Text>
        </View>
    );
  }

  renderListView() {
    return (
      <ListView
        style={styles.listView}
        dataSource = {this.state.dataSource}
        renderRow  = {this.renderRow.bind(this)}
        enableEmptySections={true}
        renderSectionHeader = {this.renderSectionHeader}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
            tintColor="#1ecfe2"
            title="Loading..."
            titleColor="#0e417a"
          />
        }
      />
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return this.renderListView();
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listView: {
    ...Platform.select({
      ios: {
        marginTop: 64,
      },
      android: {
        marginTop: 54,
      },
    }),
  },
  sectionHeader: {
    height: 15,
    margin: 10,
    color: '#546979',
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
  },
  text: {
    color: '#546979',
    paddingHorizontal: 8,
    fontSize: 12,
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    flexDirection: 'column',
    paddingTop: 25,
  },
  loadingText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
});

module.exports = Activity;
