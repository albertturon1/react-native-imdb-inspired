import {View, Text} from 'react-native';

import {Genre} from '@components/interfaces/IMovieAPi';

const MovieGenres = ({genres}: {genres: Genre[]}) => (
  <View className="flex flex-row items-center gap-1.5 w-full flex-wrap">
    {genres.map(genre => (
      <View
        key={genre.id}
        className="p-1.5 border-[0.8px] border-tertiaryBlack rounded flex items-center justify-center">
        <Text className="text-tertiaryBlack text-[12px]">{genre.name}</Text>
      </View>
    ))}
  </View>
);

export default MovieGenres;