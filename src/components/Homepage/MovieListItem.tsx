import {memo} from 'react';

import {Image, Pressable, View} from 'react-native';

import {Movie} from '@components/interfaces/IMovieAPi';
import Theme from '@src/Theme';

const MovieListItem = ({
  item,
  onPressFunc,
}: {
  item: Movie;
  onPressFunc?: () => void;
}) => (
  <View style={Theme.styles.flexOne}>
    <Pressable onPress={onPressFunc} style={Theme.styles.flexOne}>
      <View className="flex flex-1 m-0.5 overflow-hidden">
        <Image
          className="flex flex-1 border-0.5 object-cover"
          source={{uri: `https://image.tmdb.org/t/p/w300/${item.poster_path}`}}
          style={{aspectRatio: 1 / 1.5}}
        />
      </View>
    </Pressable>
  </View>
);

const Memo = memo(MovieListItem);
export default Memo;
