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