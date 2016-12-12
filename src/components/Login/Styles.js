import { StyleSheet } from 'react-native';
import { dimensions } from '../Shared/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLogoText: {
    fontFamily: 'ProductSans-Bold',
    color: '#003d6e',
    fontSize: (18 * dimensions.fontWeight),
    marginTop: (16 * dimensions.heightWeight),
  },
  facebookLoginContainer: {
    flexDirection: 'row',
    marginTop: (65 * dimensions.widthWeight),
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookLoginButton: {
    width: (15 * dimensions.widthWeight),
    height: (15 * dimensions.heightWeight),
  },
  facebookLoginText: {
    marginLeft: (20 * dimensions.widthWeight),
    fontSize: (15 * dimensions.fontWeight),
    color: '#4460a0',
  },
  hrContainer: {
    flexDirection: 'row',
    width: (175 * dimensions.widthWeight),
    marginTop: (13 * dimensions.heightWeight),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hr: {
    flex: 1,
    width: (106 * dimensions.widthWeight),
    height: 1,
    backgroundColor: '#efeff2',
  },
  hrText: {
    marginLeft: (14 * dimensions.widthWeight),
    marginRight: (14 * dimensions.widthWeight),
    color: '#d8d8d8',
    fontSize: (15 * dimensions.fontWeight),
  },
  inputContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  input: {
    width: (251 * dimensions.widthWeight),
    height: (45 * dimensions.heightWeight),
    paddingLeft: (14 * dimensions.widthWeight),
    paddingRight: (14 * dimensions.widthWeight),
    fontSize: (14 * dimensions.fontWeight),
  },
  loginBtn: {
    width: (240 * dimensions.widthWeight),
    height: (45 * dimensions.heightWeight),
    borderRadius: 100,
    marginTop: (20 * dimensions.heightWeight),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: (16 * dimensions.fontWeight),
    fontWeight: 'bold',
  },
  subTextContainer: {
    marginTop: (5 * dimensions.heightWeight),
  },
  subText: {
    fontSize: (12 * dimensions.fontWeight),
    color: '#44acff',
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: (56 * dimensions.heightWeight),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTextLeft: {
    fontSize: (12 * dimensions.fontWeight),
    color: '#a6aeae',
  },
  bottomTextRight: {
    fontSize: (12 * dimensions.fontWeight),
    color: '#44acff',
  },
});

module.exports = styles;
