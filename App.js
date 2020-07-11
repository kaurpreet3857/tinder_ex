import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import _ from "lodash";

import ImagePicker from 'react-native-image-picker';

const windowWidth = Dimensions.get('window').width;
const IMAGES_PER_ROW = 3;

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      images: [
        {uri: "https://media.wired.com/photos/5e6c06e613205e0008da2461/4:3/w_2131,h_1598,c_limit/Biz-billgates-950211062.jpg"},
        {uri: "https://media.wired.com/photos/5e6c06e613205e0008da2461/4:3/w_2131,h_1598,c_limit/Biz-billgates-950211062.jpg"},
        {uri: "https://media.wired.com/photos/5e6c06e613205e0008da2461/4:3/w_2131,h_1598,c_limit/Biz-billgates-950211062.jpg"},
        {uri: "https://media.wired.com/photos/5e6c06e613205e0008da2461/4:3/w_2131,h_1598,c_limit/Biz-billgates-950211062.jpg"},
        {uri: "https://media.wired.com/photos/5e6c06e613205e0008da2461/4:3/w_2131,h_1598,c_limit/Biz-billgates-950211062.jpg"},
        {uri: "https://media.wired.com/photos/5e6c06e613205e0008da2461/4:3/w_2131,h_1598,c_limit/Biz-billgates-950211062.jpg"},        
      ],
    };
  }

  calculatedSize(){
    var size = windowWidth / IMAGES_PER_ROW
    return {width: size-15, height: size-15}
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

  renderRow(images) {
    return images.map((image,i) =>{
      return(
        <Image key={i} style={[styles.item, this.calculatedSize()]} source={image} />
      );
    })
  }

  renderImagesInGroupsOf(images) {
    return _.chunk(images, IMAGES_PER_ROW).map((image,i) => {
      return (
        <View style={styles.row} key={i}>
          {this.renderRow(image)}
        </View>
      )
    })
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

                  {this.renderImagesInGroupsOf(images)}
                </View>
            }

          </ScrollView>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    margin: 10
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
  item: {
    marginRight: 8
  }
});

export default App;
