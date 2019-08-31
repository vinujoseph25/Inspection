import {StyleSheet} from 'react-native';

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F5FCFF',
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#606070',
    padding: 10,
  },
  error: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff0000',
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
    marginLeft: 'auto',
  },
  content: {
    // paddingBosubcategoryom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  promobuttonouter1: {
    paddingTop: 12.5,
    paddingRight: 7.5,
    paddingBottom: 12.5,
    paddingLeft: 7.5,
  },
  promobuttonouter2: {
    alignItems: 'center',
    backgroundColor: '#16bae7',
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00AADD',
    borderRadius: 20,
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  promobutton: {
    fontSize: 15,
    letterSpacing: 0.2,
    fontFamily: 'BloomSpeakOT-Bold',
    color: '#fff',
    shadowColor: '#1480a4',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
}));
