import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import dayjs from 'dayjs';
import { Base_URL_GET_IMAGE } from 'main/Config/env';

const MoviedDay = (props) => {
	//Delete movie watched
	const useSwipable = useRef(null);
	const closeSwipeable = () => {
		 useSwipable.current.close();
	}
	
	const rightSwipe = (id: number) => {
		return (
			<TouchableOpacity
				onPress={() => {props.handleDelete(id) 
					closeSwipeable()}
				}
				style={styles.buttonDelete}> 
				<Image source={require('../../Assets/ImgWatched/Delete.png')} />
			</TouchableOpacity>
		)
	}
	return (
		<>{
			//Date watched
			props.data[0].watchedAt ? (
				<View>
					<View style={{ flexDirection: 'row', marginLeft: 10 }}>
						<Text style={styles.day}>{dayjs(props.data[0].watchedAt).format('DD')}</Text>
						<Text style={{
							marginTop: 25,
							color: '#FFFF',
							fontSize: 15,
						}}>{dayjs(props.data[0].watchedAt).format('MMMM, YYYY')}</Text>
					</View>
					{
						props.data.map((item) =>
							//List movie watched
							<Swipeable
							ref={useSwipable}
								renderRightActions={() => rightSwipe(item.id)}>
								<TouchableOpacity>
									<View style={{
										flexDirection: 'row',
										marginHorizontal: 15,
										gap: 8,
										margin: 10,
										borderRadius: 15,
										backgroundColor: '#10121b'
									}}>
										<View>
											<Image
												style={{
													height: 105,
													width: 80,
													borderRadius: 15,
													margin: 0,
												}}
												source={{ uri: `${Base_URL_GET_IMAGE}/w500/${item.poster_path}` }} />
										</View>
										<View style={{ marginTop: 20 }}>
											<Text style={styles.date}>{item.media_type}</Text>
											<Text style={styles.name}>{item.name}</Text>
											<Text style={styles.date}>{dayjs(item.release_date).format('MMM DD, YYYY')}</Text>
										</View>
									</View>
								</TouchableOpacity>
							</Swipeable>)
					}
				</View>
			) : <></>
		}</>
	)
}
export default MoviedDay
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20
	},
	top: {
		width: "100%",
		height: 55,
	},
	revert: {
		position: "absolute",
		top: 17,
		left: 20
	},
	title: {
		color: "#FFF",
		textAlign: "center",
		fontSize: 25,
		fontWeight: '700',
		position: "absolute",
		top: 11,
		left: 155
	},
	name: {
		color: '#FFFF',
		fontSize: 18,
	},
	date: {
		color: '#FFF',
		fontSize: 14,
		fontFamily: "Open Sans",
		fontWeight: '300'
	},
	day: {
		color: '#F7BE13',
		fontSize: 40,
		fontWeight: '700',
		fontFamily: "Open Sans",
	},
	button: {
		height: 50,
		width: 50,
		backgroundColor: '#15192D',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginLeft: 15,
	},
	buttonDelete: {
		height: 53,
		width: 51,
		backgroundColor: '#15192D',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginHorizontal: 10,
		marginVertical: 30,
	},
})

