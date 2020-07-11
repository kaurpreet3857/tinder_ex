import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { RNCamera } from 'react-native-camera';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };
  }

  takePicture = async function () {

    let images = this.state.images;
    console.log(this.camera, " camera ")
    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options);
    //  eslint-disable-next-line
    images.push("https://media.wired.com/photos/5e6c06e613205e0008da2461/4:3/w_2131,h_1598,c_limit/Biz-billgates-950211062.jpg");
    this.setState({
      images
    }, () => {
      console.log(data, images);
    });

  };

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
              <RNCamera
                ref={(ref) => {
                  this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                captureAudio={false}
                galle
              />
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
                              source={{ uri: image }}
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
