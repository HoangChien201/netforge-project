import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { reaction } from '../../constant/emoji';
import { Image } from 'react-native';
import { likePost, updateLikePost } from '../../http/userHttp/getpost';
import { useMyContext } from '../navigation/UserContext';

const Reaction = ({postID,reactions}:{postID:number,reactions?:number | null}) => {
  const [indexPress, setIndexPress] = useState(reactions);
  const {user}= useMyContext()
  const handleReaction = async(type:number)=>{
    setIndexPress(type)
    try {
      let result;
      if(reactions){
        result = await updateLikePost(postID,user.id,type)
      }else{
        result = await likePost(postID,type);
      }
      console.log("resulene",result);
      
    } catch (error) {
      throw error;
    }
  }
  const RenderItem = ({ val, index }) => {
    const { Emoji, id,type } = val;
    return (
      <View key={id.toString()} style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => {
         
          handleReaction(type)
          
        }}>
          <View style={{ marginTop:10 }}>
            <Image source={Emoji} style={[{ width:indexPress === index ? 35 : 25,height: indexPress === index ? 35 : 25,marginVertical:indexPress === index ?-6:null}]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled horizontal showsHorizontalScrollIndicator={false}>
        {reaction.map((item, index) => (
          <RenderItem key={index} val={item} index={item.type} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Reaction;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    height: 190,
    bottom: -40,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  emojiContainer: {
    margin: 10,
  },
  emoji: {
    width: 25,
    height: 25,
  },
  textinput: {
    borderWidth: 1,
    width: "50%",
    height: 40,
    justifyContent:'center',
    marginLeft:10,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'white',
  }
});
