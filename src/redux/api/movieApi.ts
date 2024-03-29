import {
  MovieCreditsResponse,
  MovieImagesResponse,
  MovieRecommendationsResponse,
  MovieVideosResponse,
  MoviesResponse,
  UpcomingMoviesResponse,
} from '@interfaces/api/IMovieApi';
import {Movie} from '@interfaces/models/IMovie';

import {ApiEndpointBuilder} from './rootApi';

export const MovieApi = {
  endpoints: (builder: ApiEndpointBuilder) => ({
    movie: builder.query<Movie, number>({
      query: (id: number) => ({
        url: `/movie/${id}`,
      }),
    }),
    movieImages: builder.query<MovieImagesResponse, number>({
      query: (id: number) => ({
        url: `/movie/${id}/images`,
      }),
    }),
    movieVideos: builder.query<MovieVideosResponse, number>({
      query: (id: number) => ({
        url: `/movie/${id}/videos`,
      }),
    }),
    movieCredits: builder.query<MovieCreditsResponse, number>({
      query: (id: number) => ({
        url: `/movie/${id}/credits`,
      }),
    }),
    movieRecommendations: builder.query<MovieRecommendationsResponse, number>({
      query: (id: number) => ({
        url: `/movie/${id}/recommendations`,
      }),
      merge: (currentCache, newItems) => {
        currentCache.page = newItems.page;
        currentCache.results.push(...newItems.results);
      },
      serializeQueryArgs: ({endpointName}) => endpointName,
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    upcomingMovies: builder.query<UpcomingMoviesResponse, number>({
      query: (pageNumber = 1) => ({
        url: `/movie/upcoming?page=${pageNumber}`,
      }),
      merge: (currentCache, newItems) => {
        currentCache.page = newItems.page;
        currentCache.results.push(...newItems.results);
      },
      serializeQueryArgs: ({endpointName}) => endpointName,
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    searchMovies: builder.query<MoviesResponse, string>({
      query: (name: string) => ({
        url: `/search/movie?&query=${name}&page=1`,
      }),
    }),
    trendingMovies: builder.query<MoviesResponse, number>({
      query: (pageNumber = 1) => ({
        url: `/trending/movie/week?page=${pageNumber}`,
      }),
      merge: (currentCache, newItems) => {
        currentCache.page = newItems.page;
        currentCache.results.push(...newItems.results);
      },
      serializeQueryArgs: ({endpointName}) => endpointName,
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
  }),
};
