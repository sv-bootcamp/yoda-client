import React, { PropTypes, Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { dimensions } from '../Shared/Dimensions';
import Text from '../Shared/UniText';

export default class CardScroll extends Component {
  static propTypes = {
    dataSource: PropTypes.instanceOf(ListView.DataSource).isRequired,
    initialIdx: PropTypes.number,
    showPreview: PropTypes.bool,
    previewImageSize: PropTypes.number,
    renderScrollComponent: PropTypes.func,
    style: View.propTypes.style,
    previewContainerStyle: View.propTypes.style,
    imageStyle: View.propTypes.style,
    previewImageStyle: View.propTypes.style,
    width: PropTypes.number,
    height: PropTypes.number,
    getImageSourceFromDataSource: PropTypes.func,
    sizeOfPrevNext: PropTypes.number,
    pageWidth: PropTypes.number,
    inactiveCardScale: PropTypes.number,
    inactiveCardOpacity: PropTypes.number,
  };

  static defaultProps = {
    initialIdx: 0,
    showPreview: true,
    previewImageSize: 80,
    renderScrollComponent: (props) => <ScrollView {...props}/>,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    getImageSourceFromDataSource: (row) => row,
    inactiveCardScale: 0.9,
    inactiveCardOpacity: 1,
  };

  constructor(props) {
    super(props);
    this.resetListView = null;
    this.resetPrevListView = null;
    this.previewOffset = 0;
    this.controlScroll = this.controlScroll.bind(this);
    this.renderScrollComponent = this.renderScrollComponent.bind(this);
    this.renderView = this.renderView.bind(this);
    this.bias = 0;
    this.state = {
      showPreview: props.showPreview,
    };
  }

  componentDidMount() {
    this.reset();
  }

  componentWillReceiveProps() {
    this.reset();
  }

  // Reset card page
  reset() {
    const { initialIdx, previewImageSize, width } = this.props;
    this.resetListView.scrollTo({ x: initialIdx * width, animated: false });
    if (this.resetPrevListView !== null) {
      this.resetPrevListView.scrollTo({
        x: ((initialIdx - 2) * previewImageSize) + this.bias,
        animated: false,
      });
    }
  }

  // Control preview page and next page
  controlScroll(e) {
    const event = e.nativeEvent;
    const interval = Dimensions.get('window').width - dimensions.widthWeight * 57;
    let index =  Math.round(event.contentOffset.x / interval);
    if (index > this.props.dataSource._cachedRowCount - 1 ) index -= 1;
    this.resetListView.scrollTo({x: (Math.round(event.contentOffset.x / interval)) * interval,
      y: 0,
      animated: true,
    });
  }

  renderView(row) {
    const {
      width,
      height,
      imageStyle,
      previewImageSize,
      getImageSourceFromDataSource,
    } = this.props;
    let imageHeight = height;
    if (this.state.showPreview) {
      imageHeight -= previewImageSize;
    }

    return (
      <Image
        style={
          [imageStyle, { width, height: imageHeight },
          ]}
        source={getImageSourceFromDataSource(row.image)}
        resizeMode="contain"
      />
    );
  }

  renderScrollComponent(props) {
    return React.cloneElement(
     this.props.renderScrollComponent(props),
     {
        horizontal: true,
        pagingEnabled: false,
        directionalLockEnabled: true,
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,
        automaticallyAdjustContentInsets: true,
        enableEmptySections: true,
        ...props,
      });
  }

  render() {
    return (
      <ListView
        renderScrollComponent={this.renderScrollComponent}
        onScrollEndDrag={this.controlScroll.bind(this)}
        initialListSize={5}
        dataSource={this.props.dataSource}
        style={styles.listView}
        enableEmptySections={true}
        renderRow={this.props.renderRow.bind(this)}
        ref={comp => {
          this.resetListView = comp;
          return;
        }
        }
      />
    );
  }
}

const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: dimensions.widthWeight * 10,
    paddingVertical: HEIGHT / 10,
    flex: 1,
  },
  listView: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingLeft: dimensions.widthWeight * 36,
    ...Platform.select({
      ios: {
        marginTop: dimensions.heightWeight * 74 + 20 - 45 * (1 - dimensions.heightWeight),
      },
      android: {
        marginTop: dimensions.heightWeight * 74 ,
      },
    }),
  },
});
