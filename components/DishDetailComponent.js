import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, Modal,StyleSheet, Button} from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

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
    if (dish!=null){
        return(
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
                </View>
            </Card>
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
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
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