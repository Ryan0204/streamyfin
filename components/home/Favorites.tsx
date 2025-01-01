import { apiAtom, userAtom } from "@/providers/JellyfinProvider";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api";
import { useAtom } from "jotai";
import { View } from "react-native";
import { ScrollingCollectionList } from "./ScrollingCollectionList";
import { useCallback } from "react";
import { BaseItemKind } from "@jellyfin/sdk/lib/generated-client";

export const Favorites = () => {
  const [api] = useAtom(apiAtom);
  const [user] = useAtom(userAtom);

  const fetchFavoritesByType = useCallback(
    async (itemType: BaseItemKind) => {
      const response = await getItemsApi(api!).getItems({
        userId: user?.Id!,
        sortBy: ["SeriesSortName", "SortName"],
        sortOrder: ["Ascending"],
        filters: ["IsFavorite"],
        recursive: true,
        fields: ["PrimaryImageAspectRatio"],
        collapseBoxSetItems: false,
        excludeLocationTypes: ["Virtual"],
        enableTotalRecordCount: false,
        limit: 20,
        includeItemTypes: [itemType],
      });
      return response.data.Items || [];
    },
    [api, user]
  );

  const fetchFavoriteSeries = useCallback(
    () => fetchFavoritesByType("Series"),
    [fetchFavoritesByType]
  );
  const fetchFavoriteMovies = useCallback(
    () => fetchFavoritesByType("Movie"),
    [fetchFavoritesByType]
  );
  const fetchFavoriteEpisodes = useCallback(
    () => fetchFavoritesByType("Episode"),
    [fetchFavoritesByType]
  );
  const fetchFavoriteVideos = useCallback(
    () => fetchFavoritesByType("Video"),
    [fetchFavoritesByType]
  );
  const fetchFavoriteBoxsets = useCallback(
    () => fetchFavoritesByType("BoxSet"),
    [fetchFavoritesByType]
  );
  const fetchFavoritePlaylists = useCallback(
    () => fetchFavoritesByType("Playlist"),
    [fetchFavoritesByType]
  );
  const fetchFavoriteMusicAlbum = useCallback(
    () => fetchFavoritesByType("MusicAlbum"),
    [fetchFavoritesByType]
  );
  const fetchFavoriteAudio = useCallback(
    () => fetchFavoritesByType("Audio"),
    [fetchFavoritesByType]
  );

  return (
    <View className="flex flex-col space-y-4">
      <ScrollingCollectionList
        queryFn={fetchFavoriteSeries}
        queryKey={["home", "favorites", "series"]}
        title="Series"
        hideIfEmpty
      />
      <ScrollingCollectionList
        queryFn={fetchFavoriteMovies}
        queryKey={["home", "favorites", "movies"]}
        title="Movies"
        hideIfEmpty
        orientation="vertical"
      />
      <ScrollingCollectionList
        queryFn={fetchFavoriteEpisodes}
        queryKey={["home", "favorites", "episodes"]}
        title="Episodes"
        hideIfEmpty
      />
      <ScrollingCollectionList
        queryFn={fetchFavoriteVideos}
        queryKey={["home", "favorites", "videos"]}
        title="Videos"
        hideIfEmpty
      />
      <ScrollingCollectionList
        queryFn={fetchFavoriteBoxsets}
        queryKey={["home", "favorites", "boxsets"]}
        title="Boxsets"
        hideIfEmpty
      />
      <ScrollingCollectionList
        queryFn={fetchFavoritePlaylists}
        queryKey={["home", "favorites", "playlists"]}
        title="Playlists"
        hideIfEmpty
      />
      <ScrollingCollectionList
        queryFn={fetchFavoriteMusicAlbum}
        queryKey={["home", "favorites", "musicAlbums"]}
        title="Music Albums"
        hideIfEmpty
      />
      <ScrollingCollectionList
        queryFn={fetchFavoriteAudio}
        queryKey={["home", "favorites", "audio"]}
        title="Audio"
        hideIfEmpty
      />
    </View>
  );
};