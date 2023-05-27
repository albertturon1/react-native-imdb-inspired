/* eslint-disable @typescript-eslint/no-unused-vars */
import {useMemo} from 'react';

import {Image, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

import ScreenPadding from '@components/ScreenPadding';
import {
  useMovieImagesQuery,
  useMovieQuery,
  useMovieVideosQuery,
} from '@redux/api/hooks/moviesApiHooks';
import {getTMDBImagePath} from '@src/lib/utils';

import {MovieHeader} from './MovieHeader';
import {RootStackProps} from '../navigation/INavigation';
const Movie = ({route}: RootStackProps<'Movie'>) => {
  const {movie: movieInitialData} = route.params;
  const {data: movie} = useMovieQuery(movieInitialData.id);
  const {data: movieImages} = useMovieImagesQuery(movieInitialData.id);
  const {data: videos} = useMovieVideosQuery(movieInitialData.id);

  const photoAspectRatio = movieInitialData.backdrop_path ? 1.77 / 1 : 1 / 1.5;
  const trailerVideo = useMemo(() => {
    if (!videos || !videos.results.length) return;
    return videos.results
      .filter(
        video =>
          video.type.toLowerCase() === 'trailer' &&
          video.official &&
          video.site === 'YouTube',
      )
      .sort((a, b) => (a.published_at < b.published_at ? 1 : -1))[0];
  }, [videos]);

  return (
    <>
      <LinearGradient
        className="w-full h-16 absolute top-0 z-10"
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.30)', 'rgba(0,0,0,0)']}
        locations={[0, 0.4, 1]}
      />
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        {trailerVideo && (
          <View className="w-full h-[200px]">
            <YoutubePlayer height={200} videoId={trailerVideo.key} />
          </View>
        )}
        <Text>{movieInitialData.id}</Text>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780/${
              movieInitialData.backdrop_path ?? movieInitialData.poster_path
            }`,
          }}
          resizeMode="cover"
          style={{aspectRatio: photoAspectRatio}}
        />
        <ScreenPadding>
          <MovieHeader movieInitialData={movieInitialData} movie={movie} />
          <Text className="mt-4 text-[16px] leading-[22px] text-secondaryBlack shrink">
            {movieInitialData.overview}
          </Text>
        </ScreenPadding>
      </ScrollView>
    </>
  );
};

export default Movie;
