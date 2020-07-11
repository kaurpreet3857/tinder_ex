import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};



class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };
  }

  takePicture () {

    let addedImages = this.state.images;
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('User tapped response: ', response);
        addedImages.push(source);
        this.setState({
          images: addedImages
        });
      }
    });

  }

  render() {

    const { images } = this.state;

    return (
      <>
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic">

            <View>
              
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                  <Text style={{ fontSize: 25 }}> Add photo </Text>
                </TouchableOpacity>
              </View>
            </View>

            {
              !images.length
                ?
                null
                :
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 25
                  }}>Profile</Text>

                  <View style={{
                    flex: 1,
                  }}>
                    {
                      images.map((image, index) => {
                        console.log("=  image  ", image)
                        return (
                          <View
                            key={index}
                          >

                            <Image
                              source={image}
                              resizeMode="contain"
                              style={{
                                width: 300,
                                height: 100
                              }}
                            />

                          </View>
                        )
                      })
                    }
                  </View>
                </View>
            }

          </ScrollView>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#ececec',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;
