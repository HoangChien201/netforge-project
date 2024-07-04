import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CommentItem from './CommentItem'; // Điều chỉnh đường dẫn nếu cần

const CommentSection = ({ comments }) => {
    const [replyingTo, setReplyingTo] = useState(null);

    const handleReply = (comment) => {
        setReplyingTo(comment); // Lưu thông tin comment đang được trả lời vào state
    };

    const handleCancelReply = () => {
        setReplyingTo(null); // Hủy trạng thái đang trả lời
    };

    return (
        <View style={styles.container}>
            {replyingTo && (
                <View style={styles.replyingToContainer}>
                    <Text style={styles.replyingToText}>Đang trả lời {replyingTo.user.fullname}</Text>
                    <Button title="Hủy" onPress={handleCancelReply} />
                </View>
            )}
            {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} onReply={handleReply} render={() => {}} />
            ))}
        </View>
    );
};

export default CommentSection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    replyingToContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    replyingToText: {
        fontWeight: 'bold',
        marginRight: 10
    }
});
