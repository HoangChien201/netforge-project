import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface EventItemProps {
    image: ImageProps,
    name: string,
    participants: Array<ImageProps>,
    address: string
}

const EventItem: React.FC<EventItemProps> = (props) => {
    const { image, name, participants, address } = props
    return (
        <View style={styles.container}>
            <View>
                <View>
                    <View>

                    </View>
                    <View>

                    </View>
                </View>
                <Image source={image} />
            </View>
            <Text>{name}</Text>
            <View>

            </View>
            <View>

            </View>
        </View>
    )
}

export default EventItem

const styles = StyleSheet.create({})