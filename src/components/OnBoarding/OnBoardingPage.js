import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import Text from '../Shared/UniText';
import { Actions } from 'react-native-router-flux';
import { dimensions } from '../Shared/Dimensions';
import LinearGradient from 'react-native-linear-gradient';

class OnBoardingPage extends Component {
  constructor(props) {
    super(props);
  }

  onPressLogInButton() {

    ///Todo : Make to go create page.
    Actions.login();
  }

  onPressGetStartedButton() {

    ///Todo : Make to go login page.
    Actions.login();
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity onPress={this.onPressGetStartedButton}>
          <LinearGradient style={styles.getStartedBtnStyle}
            start={[0.9, 0.5]}
            end={[0.0, 0.5]}
            locations={[0, 0.75]}
            colors={['#07e4dd', '#44acff']}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>GET STARTED</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.footerText}>Do you have an account already?
          <Text style={styles.logInText} onPress={this.onPressLogInButton}>  Log in</Text>
        </Text>

      </View>
    );
  }

  renderDot() {
    return (
      <View style={{
        backgroundColor: '#d6dada',
        width: 7,
        height: 7,
        borderRadius: 4,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 3,
        marginBottom: 3,
      }} />
    );
  }

  renderActiveDot() {
    return (
      <View style={{
        backgroundColor: '#a6aeae',
        width: 7,
        height: 7,
        borderRadius: 4,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 3,
        marginBottom: 3,
      }} />
    );
  }

  render() {
    return (
      <View style={styles.onboardingView}>
        <Swiper loop={false}
          height={510}
          dot={this.renderDot()}
          activeDot={this.renderActiveDot()}>
          <View style={styles.imageContainer}>
            <Image style={styles.titleImg1}
              source={require('../../resources/onboarding1_title.png')}/>
            <Image style={styles.image}
              source={require('../../resources/onboarding1_img.png')}/>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.titleImg2}
              source={require('../../resources/onboarding2_title.png')}/>
            <Image style={styles.image}
              source={require('../../resources/onboarding2_img.png')}/>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.titleImg3}
              source={require('../../resources/onboarding3_title.png')}/>
            <Image style={styles.image}
              source={require('../../resources/onboarding3_img.png')}/>
          </View>
        </Swiper>
        {this.renderFooter()}
      </View>

    );
  }
}

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const IMAGE_HEIGHT =  WINDOW_WIDTH * 1.36;
const SWIPER_HEIGHT = IMAGE_HEIGHT + dimensions.heightWeight * 40;

const styles = StyleSheet.create({
  onboardingView: {
    ...Platform.select({
      ios: {
        paddingTop: 55,
      },
      android: {
        paddingTop: 45,
      },
    }),
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    alignItems: 'center',
  },
  titleImg1: {
    height: 60,
    resizeMode: 'contain',
    marginBottom: 55,
  },
  titleImg2: {
    height: 60,
    resizeMode: 'contain',
    marginBottom: 68,
  },
  titleImg3: {
    height: 60,
    resizeMode: 'contain',
    marginBottom: 52,
  },
  image: {
    width: WINDOW_WIDTH,
    resizeMode: 'contain',
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  getStartedBtnStyle: {
    justifyContent: 'center',
    width: dimensions.widthWeight * 270,
    height: dimensions.heightWeight * 45,
    borderRadius: 100,
    marginBottom: dimensions.heightWeight * 10,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: dimensions.fontWeight * 16,
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
  },
  footerText: {
    color: '#a6aeae',
    fontSize: dimensions.fontWeight * 10,
    marginBottom: dimensions.heightWeight * 30,
  },
  logInText: {
    color: '#44acff',
  },
});

module.exports = OnBoardingPage;
