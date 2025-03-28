import { BaseItemKind, ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models";
import { jellyfinApi } from "./api";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api"

export function getSongs(offset, size) {
    return getItemsApi(jellyfinApi).getItems({
        sortBy: ItemSortBy.Artist,
        sortOrder: SortOrder.Ascending,
        includeItemTypes: BaseItemKind.Audio,
        enableImages: true,
        recursive: true,
        startIndex: offset,
        limit: size
    })
}

export function getSongInfo(id) {
    return getItemsApi(jellyfinApi).getItems({
        ids: [id]
    }).then((val) => val.data.Items[0])
}