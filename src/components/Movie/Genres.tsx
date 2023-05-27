import {View, Text} from 'react-native';

import {Genre} from '@components/interfaces/IMovieAPi';

const Genres = ({genres}: {genres: Genre[]}) => (
  <View className="flex flex-row flex-wrap items-center gap-x-2 gap-y-3">
    {genres.map(genre => (
      <View
        key={genre.id}
        className="py-1.5 bg-yellow-300 border rounded-3xl flex items-center justify-center px-4">
        <Text className="font-medium text-tertiaryBlack">{genre.name}</Text>
      </View>
    ))}
  </View>
);

export default Genres;