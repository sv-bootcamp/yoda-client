import { Dimensions } from 'react-native';

export const refDimensions = {
  width: 375,
  height: 667,
};
export const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  widthWeight: Dimensions.get('window').width / refDimensions.width,
  heightWeight: Dimensions.get('window').height / refDimensions.height,
  fontWeight: Dimensions.get('window').width / refDimensions.width,
};
