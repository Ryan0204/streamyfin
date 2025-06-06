import { Text } from "@/components/common/Text";
import PersonPoster from "@/components/jellyseerr/PersonPoster";
import type { MovieDetails } from "@/utils/jellyseerr/server/models/Movie";
import type { TvDetails } from "@/utils/jellyseerr/server/models/Tv";
import { FlashList } from "@shopify/flash-list";
import type React from "react";
import { useTranslation } from "react-i18next";
import { View, type ViewProps } from "react-native";

const CastSlide: React.FC<
  { details?: MovieDetails | TvDetails } & ViewProps
> = ({ details, ...props }) => {
  const { t } = useTranslation();
  return (
    details?.credits?.cast &&
    details?.credits?.cast?.length > 0 && (
      <View {...props}>
        <Text className='text-lg font-bold mb-2 px-4'>
          {t("jellyseerr.cast")}
        </Text>
        <FlashList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={details?.credits.cast}
          ItemSeparatorComponent={() => <View className='w-2' />}
          estimatedItemSize={15}
          keyExtractor={(item) => item?.id?.toString()}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <PersonPoster
              id={item.id.toString()}
              posterPath={item.profilePath}
              name={item.name}
              subName={item.character}
            />
          )}
        />
      </View>
    )
  );
};

export default CastSlide;
