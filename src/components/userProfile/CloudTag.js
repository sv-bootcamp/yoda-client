import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class CloudTag extends Component {
  orderData() {
    let tagList = this.props.tagList;
    tagList.sort((a, b) => {
      if (a.point === b.point) return 0;
      else return a.point > b.point ? -1 : 1;
    });
    return tagList;
  }

  getRandomPadding(point) {
    return Math.floor(Math.random() * 10) * (point + 1);
  }

  render() {
    const TagCloud = this.orderData().map((item, key) => {
      const tagContainerStyle = {
        paddingLeft: this.getRandomPadding(item.point),
        paddingTop: this.getRandomPadding(item.point),
        paddingRight: this.getRandomPadding(item.point),
        paddingBottom: this.getRandomPadding(item.point),
      };

      const tagStyle = {
        fontSize: 12 + (item.point * 3),
      };

      return (
        <View key={key} style={tagContainerStyle}>
          <Text style={tagStyle}>{item.title}</Text>
        </View>
      );
    });

    let cloudTagStyle = [styles.cloudTagContainer];
    if (this.props.width) {
      cloudTagStyle.push({ width: this.props.width });
    }

    return (
      <View style={styles.container}>
        <View style={cloudTagStyle}>
          {TagCloud}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
