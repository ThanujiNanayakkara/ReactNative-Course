import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, Modal,StyleSheet, Button, Alert, PanResponder, Share} from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
});

function RenderDish(props){
    const dish=props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({moveX, moveY, dy, dx}) => {
        if (dx<-200)
            return true;
        else
            return false;
    };

    const recognizeComment = ({moveX, moveY, dy, dx}) => {
        if (dx>200)
            return true;
        else
            return false;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e,gestureState) =>{
            return true;
        },

        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        
        onPanResponderEnd : (e,gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                       { 
                           text: 'Cancel',
                           onPress: () => console.log('Cancel Pressed'),
                           style: 'cancel'
                        },
                        {
                            text: 'Ok',
                            onPress: () => props.favorite ? console.log ('Already favorite'): props.onPressHeart()
                        }
                    ],
                    { cancelable: false}
                )
            else  if (recognizeComment(gestureState))
                props.onPressPencil();
            return true;
        }
    });

    const shareDish= (title,message, url) => {
        Share.share({
            title: title,
            message: title + ": " + message + " "+ url,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        });
    }

    if (dish!=null){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref = {this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}
                    >
                    <Text style={{margin:10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.formRow}>
                        <Icon 
                            raised
                            reverse 
                            name={props.favorite ? 'heart': 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress ={()=> props.favorite ? console.log ('Already favorite'): props.onPressHeart()}>
                        </Icon>
                        <Icon 
                            raised
                            reverse 
                            name='pencil'
                            type='font-awesome'
                            color='#800080'
                            onPress={()=>props.onPressPencil()}>
                        </Icon>
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font=awesome'
                            color='#51D2A8'
                            onPress ={() => shareDish(dish.name, dish.description, baseUrl+ dish.image) }
                            ></Icon>
                    </View>
                </Card>
            </Animatable.View>
        );

    }
    else{
        return(<View></View>)
    }
}

function RenderComments(props) {
    const comments=props.comments;

    const renderCommentItem=({item,index})=> {
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize:12}}>{item.rating}</Text>
                <Text style={{fontSize:12}}> {'--'+ item.author +','+ item.date}</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state={
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        }
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(dishId){
        this.props.postComment(dishId,this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
        this.resetForm();
    }

    resetForm() {
        this.setState({ 
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        });
    }

    static navigationOptions={
        title: 'Dish Details'
    };

    render() {
        const { dishId } = this.props.route.params;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+JSON.stringify(dishId)]} 
                        favorite = {this.props.favorites.some(el=> el === dishId)}
                        onPressHeart= {()=> this.markFavorite(dishId)}
                        onPressPencil={()=> this.toggleModal()}/>
                <RenderComments comments={this.props.comments.comments.filter((comment)=> comment.dishId===dishId)}/>
                <Modal
                    style={styles.modal}
                     animationType={'slide'}
                     transparent={false}
                     visible={this.state.showModal}
                     onDismiss={()=> {this.toggleModal(); this.resetForm();}}
                     onRequestClose={()=> {this.toggleModal(); this.resetForm();}}
                    >
                    <View>
                        <Rating
                            value={this.state.rating}
                            style={{ paddingVertical: 10 }}
                            startingValue={0}
                            ratingCount={5}
                            showRating= {true}
                            onFinishRating={(value)=> this.setState({rating: value})}
                            >     
                        </Rating>
                    </View>
                    <View style={styles.formField}>
                        <Input 
                            placeholder='Author'
                            leftIcon={
                                <Icon                    
                                type='font-awesome'
                                name='user'
                                size={24}
                                color='black'
                                />
                            }
                            value={this.state.author}
                            onChangeText={(value)=>this.setState({author: value})}
                            errorStyle={{color:'red'}}
                            errorMessage="Enter a valid username">
                        </Input>
                    </View>
                    <View style={styles.formField}>
                        <Input 
                            placeholder='Comment'
                            value={this.state.comment}
                            leftIcon={
                                <Icon
                                type='font-awesome'
                                name='comment'
                                size={24}
                                color='black'
                                />
                            }
                            errorStyle={{color:'red'}}
                            errorMessage="Enter a valid comment"
                            onChangeText={(value)=>this.setState({comment: value})}>                            
                        </Input>
                    </View>
                    <View style={{margin:20}}>
                        <Button  
                            onPress={()=> this.handleComment(dishId)}  
                            title="Submit"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                            />
                    </View>
                    <View style={{margin:20}}>
                        <Button
                            onPress={()=> {this.toggleModal(); this.resetForm();}}
                            title="Cancel"
                            color="#808080"
                            accessibilityLabel="Learn more about this purple button"
                            />
                    </View>
                </Modal>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formField: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    modal:{
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);