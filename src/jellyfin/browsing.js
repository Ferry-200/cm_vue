import { BaseItemKind, ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models";
import { jellyfinApi } from "./api";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api"
import { getArtistsApi } from "@jellyfin/sdk/lib/utils/api/artists-api"

export function getSongs(offset, size) {
    return getItemsApi(jellyfinApi).getItems({
        sortBy: ItemSortBy.Artist,
        sortOrder: SortOrder.Ascending,
        includeItemTypes: BaseItemKind.Audio,
        recursive: true,
        startIndex: offset,
        limit: size
    }).then((val) => val.data)
}

export function getSongInfo(id) {
    return getItemsApi(jellyfinApi).getItems({
        ids: [id]
    }).then((val) => val.data.Items[0])
}

export function getArtists(offset, size) {
    return getArtistsApi(jellyfinApi).getArtists({
        sortBy: ItemSortBy.Name,
        sortOrder: SortOrder.Ascending,
        startIndex: offset,
        limit: size
    }).then((val) => val.data)
}